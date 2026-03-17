import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import shipIconImg from "../assets/ship.png";

function WorldMap() {

  const shipIcon = new L.Icon({
    iconUrl: shipIconImg,
    iconSize: [32, 32]
  });

  const [ships, setShips] = useState([
    {
      name: "Oil Tanker Alpha",
      position: [7.5, 79.8],
      cargo: "Crude Oil",
      heading: 45
    },
    {
      name: "LNG Carrier Beta",
      position: [1.3, 103.8],
      cargo: "LNG",
      heading: 120
    },
    {
      name: "Fuel Tanker Gamma",
      position: [25.2, 55.3],
      cargo: "Diesel",
      heading: 270
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShips((prevShips) =>
        prevShips.map((ship) => ({
          ...ship,
          position: [
            ship.position[0] + (Math.random() - 0.5) * 0.2,
            ship.position[1] + (Math.random() - 0.5) * 0.2
          ]
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "100vh", width: "100%" }}>
      
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {ships.map((ship, index) => (
        <Marker key={index} position={ship.position} icon={shipIcon}>
          <Popup>
            <b>{ship.name}</b>
            <br />
            Cargo: {ship.cargo}
          </Popup>
        </Marker>
      ))}

    </MapContainer>
  );
}

export default WorldMap;