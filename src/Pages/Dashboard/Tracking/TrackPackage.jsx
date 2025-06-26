import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import useTrackingLogs from "../../../hooks/useTrackingLogs";

const TrackPackage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState(params.trackingId || "");
  const [trackingId, setTrackingId] = useState(params.trackingId || "");

  const { logs, loading, error } = useTrackingLogs(trackingId);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      // Optionally update the URL for shareability:
      navigate(`/dashboard/track-package/${input.trim()}`);
      setTrackingId(input.trim());
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Track Your Parcel</h1>
      <form className="flex gap-2 mb-8 justify-center" onSubmit={handleSearch}>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          placeholder="Enter Tracking ID"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Track
        </button>
      </form>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-error text-center">{error}</div>}
      {!loading && !error && (
        <>
          {logs.length === 0 ? (
            <div className="text-center text-gray-400">No tracking updates found.</div>
          ) : (
            <ul className="timeline timeline-vertical">
              {logs.map((log, idx) => (
                <li key={log._id || idx}>
                  <div className={`timeline-start ${idx === 0 ? "text-primary" : ""}`}>
                    {new Date(log.time).toLocaleString()}
                  </div>
                  <div className="timeline-middle">
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                  </div>
                  <div className="timeline-end">
                    <div className="card bg-base-100 shadow-lg px-4 py-2">
                      <span className="font-semibold">{log.status}</span>
                      <p className="text-sm">{log.message}</p>
                      {log.updated_by && (
                        <span className="text-xs text-gray-500">By: {log.updated_by}</span>
                      )}
                    </div>
                  </div>
                  {idx < logs.length - 1 && <hr className="bg-primary h-1" />}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default TrackPackage;
;
