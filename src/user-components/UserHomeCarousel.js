import '../css/Main.css';
import { useEffect, useState } from 'react';
import Carousel from './Carousel';

export default function UserHomeCarousel(props) {
  const {
    promotionImage,
  } = props;
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    const setToState = () => {
      for (let i = 0; i < promotionImage.length; i += 1) {
        setBanners((current) => [...current, `data:image/png;base64,${promotionImage[i].photo}`]);
      }
    };
    setToState();
  }, [promotionImage]);

  return (
    <div className="container carousel-container">
      <div className=" carouselContainer" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>
        <Carousel>
          {banners.map((banner) => (
            <img className="d-block w-100" src={banner} alt="First slide" key={Math.random()} />
          ))}
        </Carousel>
      </div>
    </div>

  );
}
