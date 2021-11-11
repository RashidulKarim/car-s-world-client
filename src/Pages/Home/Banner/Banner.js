import React from 'react';
import Carousel from 'react-material-ui-carousel';
import car1 from '../../../images/carousel image/car1.jpg';
import car2 from '../../../images/carousel image/car2.jpg';
import car3 from '../../../images/carousel image/car3.jpg';
import CarouselItem from './CarouselItem/CarouselItem';
const Banner = () => {
    var items = [
        {
            name: "WELCOME TO CAR'S WORLD",
            description: "We offer high quality car at unbelievable price & creates pleasant buying experience.",
            img:car1
        },
        {
            name: "BEST PLACE FOR CAR",
            description: "We offer high quality car at unbelievable price & creates pleasant buying experience.",
            img:car2
        },
        {
            name: "FIND YOUR DREAM CAR",
            description: "We offer high quality car at unbelievable price & creates pleasant buying experience.",
            img:car3
        }
    ]
    return (
        <Carousel>
            {
                items.map( (item, i) => <CarouselItem key={i} item={item} /> )
            }
        </Carousel>
    );
};

export default Banner;