import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Image } from 'models/parking';
interface ICarouselParking {
  images: Image[];
}
const CarouselParking: React.FC<ICarouselParking> = ({
  images,
}: ICarouselParking): JSX.Element => {
  return (
    <div>
      <Carousel>
        {images.map((item, index) => {
          return (
            <div key={index}>
              <img src={item.url} height={500} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselParking;
