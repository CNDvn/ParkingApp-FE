import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './Mapbox.css';
const MapBoxTest = (): JSX.Element => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYmFvc3Bob2EwNDAzIiwiYSI6ImNsMGVtdzd5YzBrcjEzZXBybWluMzMwOWcifQ.6TYjMo7wU8pmej9pgeij4Q';

  useEffect(() => {
    new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [106.70672373954707, 10.768897531555082],
      zoom: 9,
    });
  }, []);
  return <div id="mapContainer" className="map"></div>;
};

export default MapBoxTest;
