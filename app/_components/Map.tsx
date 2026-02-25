import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import makerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface MarkerPositionProps {
  markerPosition: [number, number] | undefined;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: makerIcon2x,
  shadowUrl: markerShadow,
});

//I found the above code on internet, without it the marker is not working.

export default function Map({ markerPosition }: MarkerPositionProps) {
  return (
    <MapContainer
      className="h-[35vh] rounded-lg"
      center={markerPosition || [51.505, -0.09]}
      zoom={markerPosition ? 4 : 2}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markerPosition && <Marker position={markerPosition} />}
    </MapContainer>
  );
}
