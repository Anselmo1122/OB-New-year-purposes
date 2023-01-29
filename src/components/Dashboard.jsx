import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import imgExample from "../assets/example.png";
import "../index.scss";
// import Porpuse from "./Porpuse";
import PorpuseForm from "./PorpuseForm";

const Dashboard = ({ next }) => {
  const [porpuses, setPorpuses] = useState([
    {
      id: "34tnfjkne3t8jgrju4",
      name: "Porpuse example",
      description: "this is the description",
      image: imgExample,
      date: new Date().toDateString(),
    }
  ])

  return (
    <section id="dashboard">
      <button className="dashboard__button" onClick={() => { next.setNext(!next.next) }}>
        <BsArrowLeft className='button__icon' />
      </button>
      <PorpuseForm porpuse={{ porpuses, setPorpuses }} />
      {/* <section className="list">
        {
          porpuses.map((porpuse, id) => {
            return (
              <Porpuse 
                key={ id }
                data={ porpuse }   
              />
            )
          })
        }
      </section> */}
    </section>
  );
};

export default Dashboard;
