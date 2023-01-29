import { nanoid } from "nanoid";
import React, { useRef } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io"
import "../index.scss";

// TODO: validar mejor los datos del formulario.

const PorpuseForm = ({ porpuse }) => {

  const nameRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();

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
      date: new Date().toDateString()
    }

    porpuse.setPorpuses([  newPorpuse, ...porpuse.porpuses ])
  }

  return (
    <form className="form">
      <div className="form__button-display">
        <AiOutlineArrowUp className="button-display__icon" />
      </div>
      <h3 className="form__title">Create a new porpuse</h3>
      <div className="form__input">
        <label htmlFor="name">Name</label>
        <input 
          id="name" 
          type="text" 
          placeholder="Write porpuse name..." 
          required
          autoComplete="off"
          ref={nameRef}
        />
      </div>
      <div className="form__input">
        <label htmlFor="description">Description</label>
        <textarea 
          id="description" 
          placeholder="Write a description..."
          required 
          autoComplete="off"
          ref={descriptionRef}
        />
      </div>
      <div className="form__input">
        <label htmlFor="img">Image</label>
        <input
          id="img"
          type="file"
          accept=".png"
          placeholder="Select an image that represent your porpuse..."
          ref={imageRef}
        />
      </div>
      <button 
        className="form__button"
        onClick={(e) => { addPorpuse(e) }}
      >
        Add porpuse
        <IoMdAdd className="button__icon" />
      </button>
    </form>
  );
};

export default PorpuseForm;
