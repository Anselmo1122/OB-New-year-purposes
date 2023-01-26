import React from 'react'
import "../index.scss"
import { BsArrowRight } from "react-icons/bs";
import { GiTargetShot } from "react-icons/gi";


const Header = () => {
  return (
    <header id='header'>
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
      <button className='header__button'>
        Continue
        <BsArrowRight className='button__icon' />
      </button>
    </header>
  )
}

export default Header