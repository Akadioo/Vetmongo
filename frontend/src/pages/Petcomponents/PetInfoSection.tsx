import React from "react";
import "./PetCard.css";

interface PetInfoSectionProps {
  petName: string;
  petImage: string;
  petInfo: string[];
}

const PetInfoSection: React.FC<PetInfoSectionProps> = ({
  petName,
  petImage,
  petInfo,
}) => {
  return (
    <section className="pet-info-section">
      <h1>{petName}</h1>
      <div className="pet-content">
        <div className="pet-image-container">
          <img
            src={petImage}
            alt={`Foto de ${petName}`}
            className="pet-image"
          />
        </div>
        <div className="pet-info">
          <h2>Información de la mascota</h2>
          <ul>
            {petInfo.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PetInfoSection;
