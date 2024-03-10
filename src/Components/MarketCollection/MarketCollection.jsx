import React from 'react';
import "./marketCollection.css";
import Slider from "react-slick";
import FarmerRices from "../../Images/FarmerRices.png"
import FarmerCandies from "../../Images/FarmerCandies.png"
import FarmerDryFruits from "../../Images/FarmerDryFruits.png"
import FarmerPulses from "../../Images/FarmerPulses.png"
import FarmerSpices from "../../Images/FarmerSpices.png"
import FarmerVegetables from "../../Images/FarmerVegetables.png"
import FarmerFruits from "../../Images/FarmerFruits.png"
import FarmerFlours from "../../Images/FarmerFlours.png"


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

    // Slider functionality from "Slick" react component

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      };

    return (
     
        <div className="collection-container">
      <div className="market-collection">
          <div className="collection-title">
              Be Healthy Buy Healthy
          </div>
          <Slider {...settings}>
            {marketCollection.map((items) => {
                return (<div key={items.id}>
                      <div  className="market-collection-img-cover">
                      <img src={items.url} className="market-collection-img" />
                    </div>
                    <div className="market-collection-img-title">
                        {items.title}
                    </div>
                  </div>)
              })}
            </Slider>
            </div>
            </div>
      
  )
}

export default MarketCollection