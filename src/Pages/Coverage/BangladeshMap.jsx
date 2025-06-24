import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const center = [23.685, 90.3563];

function FlyToDistrict({ coords }) {
  const map = useMap();
  React.useEffect(() => {
    if (coords) {
      map.flyTo(coords, 12, { duration: 2 });
    }
  }, [coords, map]);
  return null;
}

const BangladeshMap = ({ warehouses }) => {
  const defaultZoom = 9;
  const [searchText, setSearchText] = useState("");
  const [flyToCoords, setFlyToCoords] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = searchText.trim().toLowerCase();
    if (!search) return;

    // Find the first warehouse district that matches search (partial, case-insensitive)
    const found = warehouses.find((w) =>
      w.district.toLowerCase().includes(search)
    );
    console.log(found)
    if (found) {
      setFlyToCoords([found.latitude, found.longitude]);
    } else {
      alert("District not found");
    }
  };

  return (
    <div>
      {/* Search form */}
      <form onSubmit={handleSubmit} className="flex max-w-md mb-4 gap-2 mx-auto">
        <input
          type="text"
          placeholder="Enter district name"
          className="input input-bordered flex-grow"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Go
        </button>
      </form>
    <div className="container mx-auto p-5 rounded-2xl  bg-white overflow-hidden">

   
      <MapContainer
        center={center}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        className="h-[600px] w-full mx-auto  z-10"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {warehouses.map((warehouse, index) => (
          <Marker
            key={index}
            position={[warehouse.latitude, warehouse.longitude]}
          >
            <Popup>
              <span>
                <strong>District:</strong> {warehouse.district}
              </span>
              <br />
              <span>
                <strong>City:</strong> {warehouse.city}
              </span>
              <br />
              Delivery available in{" "}
              {warehouse.covered_area.map((area, idx) => (
                <span key={idx}>
                  {area}
                  {idx !== warehouse.covered_area.length - 1 ? ", " : ""}
                </span>
              ))}
              .
            </Popup>
          </Marker>
        ))}

        <FlyToDistrict coords={flyToCoords} />
      </MapContainer>
       </div>
    </div>
  );
};

export default BangladeshMap;
