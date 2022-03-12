import { Coordinates } from 'models/parking';
import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
interface IMapBox {
  coordinates: Coordinates;
}
// eslint-disable-next-line no-unused-vars
const MapBox = ({ coordinates }: IMapBox): JSX.Element => {
  console.log(coordinates);
  const [viewState, setViewState] = React.useState({
    longitude: 106.66280645454323,
    latitude: 0.850609017864555,
    zoom: 14,
  });

  React.useEffect(() => {
    if (coordinates.latitude !== 0 && coordinates.longitude !== 0) {
      setViewState({
        longitude: coordinates.longitude,
        latitude: coordinates.latitude,
        zoom: 14,
      });
    }
  }, [coordinates]);

  return (
    <div>
      <ReactMapGL
        {...viewState}
        onMove={(evt): void => setViewState(evt.viewState)}
        style={{ width: 800, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoiYmFvc3Bob2EwNDAzIiwiYSI6ImNsMGVtdzd5YzBrcjEzZXBybWluMzMwOWcifQ.6TYjMo7wU8pmej9pgeij4Q"
      >
        <Marker
          longitude={coordinates.longitude}
          latitude={coordinates.latitude}
          anchor="bottom"
        >
          <img src="https://img.icons8.com/pastel-glyph/64/000000/parking--v1.png" />
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default React.memo(MapBox);
