export async function getShips() {
  const response = await fetch(
    "https://opensky-network.org/api/states/all"
  );

  const data = await response.json();

  const ships = data.states.slice(0, 20).map((item, index) => ({
    name: item[1] || "Unknown Vessel",
    position: [item[6] || 0, item[5] || 0],
    cargo: "Unknown Cargo"
  }));

  return ships;
}