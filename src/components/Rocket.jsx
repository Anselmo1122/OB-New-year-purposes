import React from 'react';
import rocketImg from "../assets/rocket.png";
import "../index.scss";
import { motion } from 'framer-motion';

const Rocket = ({ porpuse }) => {
  const porpusesCompleted = porpuse.porpuses.filter((porpuse) => porpuse.complete === true)
  const percentage = `${(100 / (porpuse.porpuses.length / porpusesCompleted.length) - 35)}%` 
  
  console.log(percentage, porpusesCompleted)

  return (
    <section className='rocket'>
      <motion.div className='rocket__carrousel'>
        <motion.img 
          src={rocketImg} 
          alt="rocket" 
          animate={{ bottom: percentage }}
        />
      </motion.div>
    </section>
  )
}

export default Rocket