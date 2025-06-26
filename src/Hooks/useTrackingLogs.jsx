import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";


const useTrackingLogs = ({trackingId}) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

   useEffect(() => {
    if (!trackingId) return;
    setLoading(true);
    setError(null);

    axiosSecure
      .get(`/tracking?tracking_id=${trackingId}`)
      .then((res) => setLogs(res.data || []))
      .catch((err) => setError(err.message || "Failed to fetch tracking logs."))
      .finally(() => setLoading(false));
  }, [trackingId, axiosSecure]);

  return { logs, loading, error };
};

export default useTrackingLogs;
