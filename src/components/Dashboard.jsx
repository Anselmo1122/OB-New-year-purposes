import { useWindowSize } from "@react-hook/window-size";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { BsArrowLeft } from "react-icons/bs";
import "../index.scss";
import Purpose from "./Purpose";
import PurposeForm from "./PurposeForm";
import Rocket from "./Rocket";

const initialState = JSON.parse(localStorage.getItem("purposes"));

const Dashboard = ({ next }) => {
  const [purposes, setPurposes] = useState(initialState || [])
  const [width, height] = useWindowSize();
  const [purposesCompleted, setPurposesCompleted] = useState(false)

  useEffect(() => {
    window.localStorage.setItem("purposes", JSON.stringify(purposes), [purposes])
  })

  const deletePurpose = (id) => {
    const currentPurposes = purposes.filter((purpose) => purpose.id !== id);
    setPurposes(currentPurposes);
  }

  const completePurpose = (id) => {
    const currentPurposes = purposes.map((purpose)=>{
      if(purpose.id === id) purpose.complete = !purpose.complete;
      return purpose;
    })
    setPurposes(currentPurposes);
  }

  if (purposesCompleted) setTimeout(() => {
    const currentPurposes = purposes.map((purpose)=>{
      if(purpose.complete === true) purpose.complete = !purpose.complete;
      return purpose;
    })
    setPurposes(currentPurposes);
    next.setNext(!next.next)
  }, 15000)

  return (
    <section id="dashboard">
      <button className="dashboard__button" onClick={() => { next.setNext(!next.next) }}>
        <BsArrowLeft className='button__icon' />
      </button>
      <PurposeForm purpose={{ purposes, setPurposes }} />
      <div className="dashboard__content">
        <section className="list">
          {
            purposes.length > 0 
              ? purposes.map((purpose, id) => {
              return (
                <Purpose 
                  key={ id }
                  data={ purpose } 
                  deletePurpose={ deletePurpose }
                  completePurpose={ completePurpose }
                />
              )
              })
              : <p className="message">Add purposes to <br /> the list.</p>
          }
        </section>
        <Rocket 
          purpose={{ purposes, setPurposes }}
          completed={setPurposesCompleted}
          redirect={next}
        />
        {
          purposesCompleted
            ? <Confetti 
                width={width}
                height={height}
                run={purposesCompleted}
                tweenDuration={16000}
              />
            : ""
        }
      </div>
    </section>
  );
};

export default Dashboard;
