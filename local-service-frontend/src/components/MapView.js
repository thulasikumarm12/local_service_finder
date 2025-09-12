// src/components/MapView.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Fix for default marker icons in Leaflet (optional)
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapView({ center, providers }) {
  return (
    <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {providers.map((provider) => (
        <Marker key={provider.id} position={[provider.lat, provider.lng]}>
          <Popup>
            <strong>{provider.name}</strong> <br />
            {provider.serviceType} <br />
            {provider.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
