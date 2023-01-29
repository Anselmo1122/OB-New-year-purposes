import React from "react";
import "../index.scss";

const Porpuse = ({ data }) => {
  return (
    <article className="porpuse">
      <div className="porpuse__data">
        <h2 className="data__title">{data.name}</h2>
        <span className="data__date">{data.date}</span>
        <p className="data__description">{data.description}</p>
      </div>
      {data.image ? <img src={data.image} alt={data.name} /> : ""}
    </article>
  );
};

export default Porpuse;
