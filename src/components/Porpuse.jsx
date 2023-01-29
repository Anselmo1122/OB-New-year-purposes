import React from "react";

const Porpuse = ({ data }) => {
  return (
    <article>
      <h2>{ data.name }</h2>
      <span>{ data.date }</span>
      <p>{ data.description }</p>
      {
        data.image
          ? <img src={ data.image } alt={ data.name } />
          : ""
      }
    </article>
  );
};

export default Porpuse;
