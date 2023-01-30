import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import imgExample from "../assets/example.png";
import "../index.scss";
import Porpuse from "./Porpuse";
import PorpuseForm from "./PorpuseForm";

const Dashboard = ({ next }) => {
  const [porpuses, setPorpuses] = useState([
    {
      id: "34tnfjkne3t8jgrju4",
      name: "Porpuse example",
      description: `This is the description 
      of my porpuses, This is the description 
      of my porpuses, This is the description 
      of my porpuses. `,
      image: imgExample,
      complete: false,
      date: new Date().toDateString(),
    }
  ])

  const deletePorpuse = (id) => {
    const currentPurposes = porpuses.filter((porpuse) => porpuse.id !== id);
    setPorpuses(currentPurposes);
  }
  const completePorpuse = (id) => {
    const currentPurposes = porpuses.map((porpuse)=>{
      if(porpuse.id === id) porpuse.complete = !porpuse.complete;
      return porpuse
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
