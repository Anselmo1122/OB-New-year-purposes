import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import React, { useRef, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io"
import "../index.scss";

// TODO: validar mejor los datos del formulario.

const PorpuseForm = ({ porpuse }) => {

  const [isOpen, setIsOpen] = useState(false)

  const nameRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();
  const colorRef = useRef()

  const addPorpuse = (e) => {
    e.preventDefault();

    const imgURL = 
      imageRef.current.files[0]
        ? URL.createObjectURL(imageRef.current.files[0])
        : undefined

    let newPorpuse = {
      id: nanoid(20),
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      image: imgURL,
      color: colorRef.current.value,
      complete: false,
      date: new Date().toDateString()
    }

    porpuse.setPorpuses([  newPorpuse, ...porpuse.porpuses ])
  }

  const container = {
    hidden: { y: "90%", x: "50%" },
    show: {
      y: 0,
      x: "50%",
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  return (
    <motion.form 
      className="form"
      variants={container}
      initial="hidden"
      animate={ isOpen ? "show" : "" }
    >
      <div 
        className="form__button-display"
        onClick={ () => { setIsOpen(!isOpen) } }
      >
        <AiOutlineArrowUp 
          className={ isOpen 
            ? "button-display__icon-active" 
            : "button-display__icon" 
          } 
        />
      </div>
      <h3 className="form__title">Create a new porpuse</h3>
      <motion.div 
        className="form__input"
        variants={item}
        whileFocus={{ scale: 1.05 }}
      >
        <label htmlFor="name">Name</label>
        <motion.input 
          id="name" 
          type="text" 
          placeholder="Write porpuse name..." 
          required
          autoComplete="off"
          ref={nameRef}
          whileFocus={{ scale: 1.05 }}
        />
      </motion.div>
      <motion.div 
        className="form__input"
        variants={item}
      >
        <label htmlFor="description">Description</label>
        <motion.textarea 
          id="description" 
          placeholder="Write a description..."
          required 
          autoComplete="off"
          ref={descriptionRef}
          whileFocus={{ scale: 1.05 }}
        />
      </motion.div>
      <motion.div 
        className="form__input"
        variants={item}
      >
        <label htmlFor="img">Image</label>
        <motion.input
          id="img"
          type="file"
          accept=".png"
          placeholder="Select an image that represent your porpuse..."
          ref={imageRef}
          whileFocus={{ scale: 1.05 }}
        />
      </motion.div>
      <motion.div
        className="form__input"
        variants={item}
      >
        <label htmlFor="color">Color</label>
        <motion.input
          id="color"
          type="color"
          placeholder="Select an color that represent your porpuse..."
          ref={colorRef}
          whileFocus={{ scale: 1.05 }}
        />
      </motion.div>
      <button 
        className="form__button"
        onClick={(e) => { addPorpuse(e) }}
      >
        Add porpuse
        <IoMdAdd className="button__icon" />
      </button>
    </motion.form>
  );
};

export default PorpuseForm;
