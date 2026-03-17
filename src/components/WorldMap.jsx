import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import shipIconImg from "../assets/ship.png";

function WorldMap() {

  const shipIcon = new L.Icon({
    iconUrl: shipIconImg,
    iconSize: [30, 30]
  });

  const [ships, setShips] = useState([]);

  const routes = [
    [[26.5, 52.3], [31.2, 121.5]], // Saudi → China
    [[29.7, -95.0], [51.5, 0.0]],  // USA → Europe
    [[60.0, 30.3], [19.0, 72.8]],  // Russia → India
    [[25.3, 51.5], [35.6, 139.7]]  // Qatar → Japan
  ];

  async function loadShips() {
    try {
      const response = await fetch("https://opensky-network.org/api/states/all");
      const data = await response.json();

      if (!data.states) return;

      const vessels = data.states
        .filter(item => item[5] && item[6])
        .slice(0, 100)
        .map(item => ({
          name: item[1] || "Unknown Vessel",
          position: [item[6], item[5]],
          cargo: "Cargo Vessel"
        }));

      setShips(vessels);

    } catch (error) {
      console.error("Error loading vessels:", error);
    }
  }

  useEffect(() => {

    loadShips();

    const interval = setInterval(() => {
      loadShips();
    }, 15000);

    return () => clearInterval(interval);

  }, []);

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100vh", width: "100%" }}
    >

      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {routes.map((route, index) => (
        <Polyline
          key={index}
          positions={route}
          pathOptions={{ color: "orange", weight: 3 }}
        />
      ))}

      <MarkerClusterGroup>

        {ships.map((ship, index) => (
          <Marker key={index} position={ship.position} icon={shipIcon}>
            <Popup>
              <b>{ship.name}</b>
              <br />
              Type: {ship.cargo}
            </Popup>
          </Marker>
        ))}

      </MarkerClusterGroup>

    </MapContainer>
  );
}

export default WorldMap;