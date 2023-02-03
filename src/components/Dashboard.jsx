import { useWindowSize } from "@react-hook/window-size";
import React, { useState } from "react";
import Confetti from "react-confetti";
import { BsArrowLeft } from "react-icons/bs";
import "../index.scss";
import Purpose from "./Purpose";
import PurposeForm from "./PurposeForm";
import Rocket from "./Rocket";


const Dashboard = ({ next, purpose }) => {

  const [width, height] = useWindowSize();
  const [purposesCompleted, setPurposesCompleted] = useState(false)

  const deletePurpose = (id) => {
    const currentPurposes = purpose.purposes.filter((purpose) => purpose.id !== id);
    purpose.setPurposes(currentPurposes);
  }

  const completePurpose = (id) => {
    const currentPurposes = purpose.purposes.map((purpose)=>{
      if(purpose.id === id) purpose.complete = !purpose.complete;
      return purpose;
    })
    purpose.setPurposes(currentPurposes);
  }

  if (purposesCompleted) setTimeout(() => {
    const currentPurposes = purpose.purposes.map((purpose)=>{
      if(purpose.complete === true) purpose.complete = !purpose.complete;
      return purpose;
    })
    purpose.setPurposes(currentPurposes);
    next.setNext(!next.next)
  }, 15000)

  return (
    <section id="dashboard">
      <button className="dashboard__button" onClick={() => { next.setNext(!next.next) }}>
        <BsArrowLeft className='button__icon' />
      </button>
      <PurposeForm purposeState={ purpose } />
      <div className="dashboard__content">
        <section className="list">
          {
            purpose.purposes.length > 0 
              ? purpose.purposes.map((purpose, id) => {
              return (
                <Purpose 
                  key={ id }
                  data={ purpose } 
                  deletePurpose={ deletePurpose }
                  completePurpose={ completePurpose }
                />
              )
              })
              : <p className="message" style={{ userSelect: "none" }}>
                Add purposes to <br /> the list.
              </p>
          }
        </section>
        <Rocket 
          purposeState={purpose.purposes}
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
                className="confetti"
                colors={[
                  "#ffffff",
                  "#00eeff",
                  "#880000",
                  "#223355",
                  "#900088",
                  "#f234ee",
                  "#ff8800",
                  "#00fca8"
                ]}
              />
            : ""
        }
      </div>
    </section>
  );
};

export default Dashboard;
