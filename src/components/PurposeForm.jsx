import React, { useState, useRef } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { AiOutlineArrowUp } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import * as Yup from 'yup';
import { nanoid } from "nanoid";
import { motion } from "framer-motion";
import "../index.scss";

const purposeSchema = Yup.object({
  name: Yup.string()
    .max(56, 'Must be 56 characters or less')
    .required('Required'),
  description: Yup.string()
    .max(512, 'Must be 512 characters or less')
    .required('Required'),
  color: Yup.string()
})

const initialValues = { 
  name: '', 
  description: '', 
  color: '#000000' 
}

const PurposeForm = ({ purposeState }) => {

  const [isOpen, setIsOpen] = useState(false)
  let imageRef = useRef();

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
    <Formik
      initialValues={initialValues}
      validationSchema={purposeSchema}
      onSubmit={(values, actions) => {

        let imageURL = imageRef.current.files[0]
          ? URL.createObjectURL(imageRef.current.files[0])
          : undefined

        let newPurpose = {
          id: nanoid(20),
          name: values.name,
          description: values.description,
          image: imageURL,
          color: values.color,
          complete: false,
          date: new Date().toDateString()
        }

        purposeState.setPurposes([  newPurpose, ...purposeState.purposes ])
        
        actions.resetForm(initialValues)
        
        setIsOpen(!isOpen)
      }}
    >
      <motion.div 
        className='form'
        variants={container}
        initial="hidden"
        animate={ isOpen ? "show" : "" }
      >
        <Form>
          <h3 className="form__title">Create a new purpose</h3>
          <div className="form__button-display" onClick={ () => { setIsOpen(!isOpen) } }>
            <AiOutlineArrowUp 
              className={ isOpen 
                ? "button-display__icon-active" 
                : "button-display__icon" 
              } 
            />
          </div>

          <motion.div className='form__input' variants={item}>
            <label htmlFor="name">Name</label>
            <Field id="name" name="name" type="text" autoComplete="off" placeholder="Write purpose name..." />
            <p className='input__message'><ErrorMessage name="name" /></p>
          </motion.div>

          <motion.div className='form__input' variants={item}>
            <label htmlFor="description">Description</label>
            <Field id="description" name="description" as="textarea" type="text" autoComplete="off" placeholder="Write a description..." />
            <p className='input__message'><ErrorMessage name="description" /></p>
          </motion.div>

          <motion.div className='form__input' variants={item}>
            <label htmlFor="image">Image</label>
            <input id="image" name="image" type="file" accept=".png" ref={imageRef}/>
          </motion.div>

          <motion.div className='form__input' variants={item}>
            <label htmlFor="color">Color</label>
            <Field id="color" name="color" type="color" />
            <p className='input__message'><ErrorMessage name="color" /></p>
          </motion.div>

          <button type="submit" className="form__button">
            Add purpose
            <IoMdAdd className="button__icon" />
          </button>
        </Form>
      </motion.div>
    </Formik>
  );
};

export default PurposeForm;