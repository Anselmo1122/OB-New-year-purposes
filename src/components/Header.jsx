import React from 'react'
import "../index.scss"
import { BsArrowRight } from "react-icons/bs";
import { GiTargetShot } from "react-icons/gi";
import { motion } from 'framer-motion';

let headerAnimate = { 
  x: "-100%",
  opacity: 0
}

const Header = ({ next }) => {

  return (
    <motion.header 
      id='header'
      animate={next.next ? headerAnimate : {}}
      transition={{ duration: ".5" }}
    >
      <a 
        className='header__author' 
        href='https://anselmo-del-hoyo.netlify.app'
        rel='noreferrer'
        target='_blank'
      >
        created by ADH
      </a>
      <article className='header__content'>
        <h1 className='content__title'>
          My Porpuses 
          <br/>
          <span className='title__year'>
            <GiTargetShot className='year__icon' /> 
            { new Date().getFullYear() }
          </span>
        </h1>
        <p className='content__info'>
          Make a list of your porpuses for this year.
        </p>
      </article>
      <button onClick={ () => { next.setNext(!next.next )} } className='header__button'>
        Continue
        <BsArrowRight className='button__icon' />
      </button>
    </motion.header>
  )
}

export default Header