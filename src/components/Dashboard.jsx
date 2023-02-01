import { useWindowSize } from "@react-hook/window-size";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { BsArrowLeft } from "react-icons/bs";
import "../index.scss";
import Porpuse from "./Porpuse";
import PorpuseForm from "./PorpuseForm";
import Rocket from "./Rocket";


const initialState = JSON.parse(localStorage.getItem("porpuses"));

const Dashboard = ({ next }) => {
  const [porpuses, setPorpuses] = useState(initialState || [])
  const [width, height] = useWindowSize();
  const [porpusesCompleted, setPorpusesCompleted] = useState(false)

  useEffect(() => {
    window.localStorage.setItem("porpuses", JSON.stringify(porpuses), [porpuses])
  })

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

  if (porpusesCompleted) setTimeout(() => {
    const currentPurposes = porpuses.map((porpuse)=>{
      if(porpuse.complete === true) porpuse.complete = !porpuse.complete;
      return porpuse;
    })
    setPorpuses(currentPurposes);
    next.setNext(!next.next)
  }, 15000)

  return (
    <section id="dashboard">
      <button className="dashboard__button" onClick={() => { next.setNext(!next.next) }}>
        <BsArrowLeft className='button__icon' />
      </button>
      <PorpuseForm porpuse={{ porpuses, setPorpuses }} />
      <div className="dashboard__content">
        <section className="list">
          {
            porpuses.length > 0 
              ? porpuses.map((porpuse, id) => {
              return (
                <Porpuse 
                  key={ id }
                  data={ porpuse } 
                  deletePorpuse={ deletePorpuse }
                  completePorpuse={ completePorpuse }
                />
              )
              })
              : <p className="message">Add purposes to <br /> the list.</p>
          }
        </section>
        <Rocket 
          porpuse={{ porpuses, setPorpuses }}
          completed={setPorpusesCompleted}
          redirect={next}
        />
        {
          porpusesCompleted
            ? <Confetti 
                width={width}
                height={height}
                run={porpusesCompleted}
                tweenDuration={16000}
              />
            : ""
        }
      </div>
    </section>
  );
};

export default Dashboard;
