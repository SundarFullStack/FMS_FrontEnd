import React from 'react';
import "./marketCollection.css";
import FarmerRices from "../../Images/FarmerRices.png"
import FarmerCandies from "../../Images/FarmerCandies.png"
import FarmerDryFruits from "../../Images/FarmerDryFruits.png"
import FarmerPulses from "../../Images/FarmerPulses.png"
import FarmerSpices from "../../Images/FarmerSpices.png"
import FarmerVegetables from "../../Images/FarmerVegetables.png"
import FarmerFruits from "../../Images/FarmerFruits.png"
import FarmerFlours from "../../Images/FarmerFlours.png"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const marketCollection = [
    {
        id: 1,
        url: FarmerVegetables,
        title:"Vegetables"
    },
    {
        id: 2,
        url: FarmerFruits,
        title:"Fruits"
        
    },
    {
        id: 3,
        url: FarmerPulses,
        title:"Pulses"
        
    },
    {
        id: 4,
        url:FarmerRices,
        title:"Rice"
        
    },{
        id: 5,
        url:FarmerFlours,
        title:"Flours"
        
    },
    {
        id: 5,
        url: FarmerSpices,
        title:"Spices"
        
    },
    {
        id: 6,
        url: FarmerDryFruits,
        title:"Dry Fruits"
        
    },
    {
        id: 7,
        url: FarmerCandies,
        title:"Chocolate Candies"
        
    }
];


  
const MarketCollection = () => {

 

       // Carousel responsiveness
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
    return (
        <div className="home-card-container-cover">
        <div className="home-card-container">
          {/* Carousel Container */}
          <div className="row row-carousel">
            <Carousel
              responsive={responsive}
              removeArrowOnDeviceType={["tablet", "mobile"]}
            >
              {/* Product list array mapping */}
              {marketCollection.map((item, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mt-2 home-product-list-container"
                  key={index + 1}
                >
                  {/* Image */}
                  <div className="home-img-cover home-custom-center pointer">
                    <img
                      src={item.url}
                      className="home-prod_img custom-center"
                      alt="image"
                    />
                  </div>
                  {/* product name */}
                  <p className="home-prodName custom-center">
                    {item.title}
                  </p>
               
                  </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
  
      
  )
}

export default MarketCollection