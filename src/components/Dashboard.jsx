import React, { useState, useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "../index.scss";
import Porpuse from "./Porpuse";
import PorpuseForm from "./PorpuseForm";

const initialState = JSON.parse(localStorage.getItem("porpuses"));

const Dashboard = ({ next }) => {
  const [porpuses, setPorpuses] = useState(initialState || [])

  useEffect(() => {
    window.localStorage.setItem("porpuses", JSON.stringify(porpuses), [porpuses])
  }, [porpuses])

  const deletePorpuse = (id) => {
    const currentPurposes = porpuses.filter((porpuse) => porpuse.id !== id);
    setPorpuses(currentPurposes);
  }
  const completePorpuse = (id) => {
    const currentPurposes = porpuses.map((porpuse)=>{
      if(porpuse.id === id) porpuse.complete = !porpuse.complete;
      return porpuse;
    })
    setPorpuses(currentPurposes);
  }

  return (
    <section id="dashboard">
      <button className="dashboard__button" onClick={() => { next.setNext(!next.next) }}>
        <BsArrowLeft className='button__icon' />
      </button>
      <PorpuseForm porpuse={{ porpuses, setPorpuses }} />
      <section className="list">
        {
          porpuses.map((porpuse, id) => {
            return (
              <Porpuse 
                key={ id }
                data={ porpuse } 
                deletePorpuse={ deletePorpuse }
                completePorpuse={ completePorpuse }
              />
            )
          })
        }
      </section>
    </section>
  );
};

export default Dashboard;
