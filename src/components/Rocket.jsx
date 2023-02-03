import React from 'react';
import rocketImg from "../assets/rocket.png";
import "../index.scss";
import { motion } from 'framer-motion';

const Rocket = ({ purposeState, completed }) => {
  const purposesCompleted = purposeState.filter((purpose) => purpose.complete === true)
  
  const getPercentage = () => {
    let percentage = `${
      purposeState.lenght !== 0 && purposesCompleted !== 0
        ? (100 / (purposeState.length / purposesCompleted.length) - 30)
        : -20
    }%`
    if (percentage === "70%") {
      completed(true)
      setTimeout(()=>{
        completed(false)
      }, 15000)
      percentage = "69%"
    }
    return percentage;
  }

  return (
    <section className='rocket'>
      <motion.div className='rocket__carrousel'>
        <motion.img 
          src={rocketImg} 
          alt="rocket" 
          initial={{ bottom: "-30%" }}
          animate={{ bottom: getPercentage() }}
        />
      </motion.div>
    </section>
  )
}

export default Rocket