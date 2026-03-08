import React from "react";
import "../Petcomponents/PetCard.css";

interface ExamsSectionProps {
  title: string;
  items?: string[];
  isImages?: boolean;
}

const ExamsSection: React.FC<ExamsSectionProps> = ({
  title,
  items = [],
  isImages = false,
}) => {
  return (
    <section className="exams-section">
      <h2>{title}</h2>
      <div className="exams-content">
        {isImages ? (
          <div className="exams-images">
            {items.map((item, index) => (
              <img
                key={index}
                src={item}
                alt={`Examen ${index + 1}`}
                className="exam-image"
              />
            ))}
          </div>
        ) : (
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ExamsSection;
