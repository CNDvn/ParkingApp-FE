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
    latitude: 10.850609017864555,
    zoom: 14,
  });

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
          longitude={106.66280645454323}
          latitude={10.850609017864555}
          anchor="bottom"
        >
          <img
            style={{ height: 50, width: 50 }}
            src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
          />
          <div>Im there</div>
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default MapBox;
