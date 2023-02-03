import React, { useState } from "react";
import "../index.scss";
import { FaTrashAlt, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const Purpose = ({ data, deletePurpose, completePurpose }) => {

  const [isOpen, setIsOpen] = useState(false)

  const variants = {
    closed: { height: 65 },
    open: { height: "auto" }
  }

  return (
    <motion.article className="purpose-container">
      <motion.div 
        className="purpose"
        style={{ background: data.color }}
        initial={{ height: 65 }}
        animate={ isOpen ? "open" : "closed" }
        variants={variants}
      >
        <motion.div 
          className="purpose__data"
          onClick={ () => { setIsOpen(!isOpen) } }
        >
          <h2 className="data__title">{data.name}</h2>
          <span className="data__date">{data.date}</span>
          <p className="data__description">{data.description}</p>
        </motion.div>
        <div className="purpose__controls">
          <button 
            className="controls__button"
            onClick={() => { deletePurpose(data.id) }}
          >
            <FaTrashAlt className="button__icon" />
          </button>
          <button 
            className="controls__button"
            onClick={() => { completePurpose(data.id) }}
          >
            <FaCheck className="button__icon" />
          </button>
        </div>
        {
          data.image ? <img src={data.image} alt={data.name} /> : ""
        }
      </motion.div>
      <div 
        className="folder"
        style={ data.complete 
          ? { background: "rgba(0, 158, 119, 0.726)" } 
          : {}
        }
      ></div>
    </motion.article>
  );
};

export default Purpose;
