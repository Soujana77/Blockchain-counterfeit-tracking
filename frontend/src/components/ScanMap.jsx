import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

export default function ScanMap({ logs }) {

  // ✅ Filter valid coordinates only
  const validLogs = (logs || []).filter(

    (log) =>

      log.latitude !== undefined &&
      log.longitude !== undefined &&
      !isNaN(log.latitude) &&
      !isNaN(log.longitude)
  );

  // ✅ Default center
  const center = validLogs.length > 0
    ? [validLogs[0].latitude, validLogs[0].longitude]
    : [20.5937, 78.9629];

  return (

    <div className="mt-10">

      <h2 className="text-2xl font-bold text-cyan-400 mb-5">

        🌍 Scan Location Map

      </h2>

      <MapContainer
        center={center}
        zoom={5}
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "20px"
        }}
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {validLogs.map((log, index) => (

          <Marker
            key={index}
            position={[log.latitude, log.longitude]}
          >

            <Popup>

              <div>

                <h3>
                  💊 {log.medicineId}
                </h3>

                <p>
                  📍 Lat: {log.latitude}
                </p>

                <p>
                  📍 Lng: {log.longitude}
                </p>

                <p>
                  🕒 {new Date(log.scannedAt).toLocaleString()}
                </p>

              </div>

            </Popup>

          </Marker>
        ))}

      </MapContainer>

    </div>
  );
}