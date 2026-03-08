import React from "react";
import "./PetCard.css";

interface PetCardProps {
  name: string;
  image: string;
  info: string[];
}

const PetCard: React.FC<PetCardProps> = ({ name, image, info }) => {
  return (
    <div className="pet-card">
      <img src={image} alt={name} className="pet-card-image" />
      <div className="pet-card-info">
        <h3>{name}</h3>
        <ul>
          {info.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PetCard;
