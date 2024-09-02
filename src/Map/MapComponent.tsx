import React, { CSSProperties } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngLiteral } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server'

const cincinnatiLatLng: LatLngLiteral = {
  lat: 39.103,
  lng: -84.512,
};
export class MapComponentProps {
  position: LatLngLiteral = cincinnatiLatLng;
  style?: CSSProperties;
}

export function MapComponent(props: MapComponentProps) {

  const markerIcon = MarkerIcon();
  return (
    <MapContainer center={props.position} zoom={13} scrollWheelZoom={true} style={props.style}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={cincinnatiLatLng} icon={markerIcon}/>
        {/* <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
  );
};



function MarkerSvg() {

  return (
    <svg height="24" version="1.1" width="24" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0 -1028.4)">
        <path d="m12.031 1030.4c-3.8657 0-6.9998 3.1-6.9998 7 0 1.3 0.4017 2.6 1.0938 3.7 0.0334 0.1 0.059 0.1 0.0938 0.2l4.3432 8c0.204 0.6 0.782 1.1 1.438 1.1s1.202-0.5 1.406-1.1l4.844-8.7c0.499-1 0.781-2.1 0.781-3.2 0-3.9-3.134-7-7-7zm-0.031 3.9c1.933 0 3.5 1.6 3.5 3.5 0 2-1.567 3.5-3.5 3.5s-3.5-1.5-3.5-3.5c0-1.9 1.567-3.5 3.5-3.5z" fill="#c0392b" />
        <path d="m12.031 1.0312c-3.8657 0-6.9998 3.134-6.9998 7 0 1.383 0.4017 2.6648 1.0938 3.7498 0.0334 0.053 0.059 0.105 0.0938 0.157l4.3432 8.062c0.204 0.586 0.782 1.031 1.438 1.031s1.202-0.445 1.406-1.031l4.844-8.75c0.499-0.963 0.781-2.06 0.781-3.2188 0-3.866-3.134-7-7-7zm-0.031 3.9688c1.933 0 3.5 1.567 3.5 3.5s-1.567 3.5-3.5 3.5-3.5-1.567-3.5-3.5 1.567-3.5 3.5-3.5z" fill="#e74c3c" transform="translate(0 1028.4)" />
      </g>
    </svg>
  )
}

function MarkerIcon() {

  return new Icon({
    iconUrl: `data:image/svg+xml;charset=utf-8,${encodedSvgString}`,
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon
    popupAnchor: [0, -32], // Popup anchor
  });
}
const encodedSvgString = encodeURIComponent(renderToStaticMarkup(MarkerSvg()));


