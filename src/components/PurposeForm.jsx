// import { motion } from "framer-motion";
// import { nanoid } from "nanoid";
// import React, { useRef, useState } from "react";
// import { AiOutlineArrowUp } from "react-icons/ai";
// import { IoMdAdd } from "react-icons/io"
// import "../index.scss";

// // TODO: validar mejor los datos del formulario.

// const PurposeForm = ({ purpose }) => {

//   const [isOpen, setIsOpen] = useState(false)

//   let nameRef = useRef();
//   let descriptionRef = useRef();
//   let imageRef = useRef();
//   let colorRef = useRef()

//   const addPurpose = (e) => {
//     e.preventDefault();

//     let imgURL = 
//       imageRef.current.files[0]
//         ? URL.createObjectURL(imageRef.current.files[0])
//         : undefined

//     let newPurpose = {
//       id: nanoid(20),
//       name: nameRef.current.value,
//       description: descriptionRef.current.value,
//       image: imgURL,
//       color: colorRef.current.value,
//       complete: false,
//       date: new Date().toDateString()
//     }

//     setIsOpen(!isOpen)
//     purpose.setPurposes([  newPurpose, ...purpose.purposes ])

//     nameRef.current.value = ""
//     descriptionRef.current.value = ""
//     imgURL = ""
//     colorRef.current.value = "#000000"
//   }

//   const container = {
//     hidden: { y: "90%", x: "50%" },
//     show: {
//       y: 0,
//       x: "50%",
//       transition: {
//         delayChildren: 0.2,
//         staggerChildren: 0.2
//       }
//     }
//   }
  
//   const item = {
//     hidden: { opacity: 0 },
//     show: { opacity: 1 }
//   }

//   return (
//     <motion.form 
//       className="form"
//       variants={container}
//       initial="hidden"
//       animate={ isOpen ? "show" : "" }
//     >
//       <div 
//         className="form__button-display"
//         onClick={ () => { setIsOpen(!isOpen) } }
//       >
//         <AiOutlineArrowUp 
//           className={ isOpen 
//             ? "button-display__icon-active" 
//             : "button-display__icon" 
//           } 
//         />
//       </div>
//       <h3 className="form__title">Create a new purpose</h3>
//       <motion.div 
//         className="form__input"
//         variants={item}
//         whileFocus={{ scale: 1.05 }}
//       >
//         <label htmlFor="name">Name</label>
//         <motion.input 
//           id="name" 
//           type="text" 
//           placeholder="Write purpose name..." 
//           required
//           autoComplete="off"
//           ref={nameRef}
//           whileFocus={{ scale: 1.05 }}
//         />
//       </motion.div>
//       <motion.div 
//         className="form__input"
//         variants={item}
//       >
//         <label htmlFor="description">Description</label>
//         <motion.textarea 
//           id="description" 
//           placeholder="Write a description..."
//           required 
//           autoComplete="off"
//           ref={descriptionRef}
//           whileFocus={{ scale: 1.05 }}
//         />
//       </motion.div>
//       <motion.div 
//         className="form__input"
//         variants={item}
//       >
//         <label htmlFor="img">Image</label>
//         <motion.input
//           id="img"
//           type="file"
//           accept=".png"
//           placeholder="Select an image that represent your purpose..."
//           ref={imageRef}
//           whileFocus={{ scale: 1.05 }}
//         />
//       </motion.div>
//       <motion.div
//         className="form__input"
//         variants={item}
//       >
//         <label htmlFor="color">Color</label>
//         <motion.input
//           id="color"
//           type="color"
//           placeholder="Select an color that represent your purpose..."
//           ref={colorRef}
//           whileFocus={{ scale: 1.05 }}
//         />
//       </motion.div>
//       <button 
//         className="form__button"
//         onClick={(e) => { addPurpose(e) }}
//       >
//         Add purpose
//         <IoMdAdd className="button__icon" />
//       </button>
//     </motion.form>
//   );
// };

// export default PurposeForm;

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

const PurposeForm = ({ purpose }) => {

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

        purpose.setPurposes([  newPurpose, ...purpose.purposes ])
        
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