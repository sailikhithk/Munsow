import React from "react";

const CardContainer = ({ cardLists = [], className = "" }) => {
  return cardLists.map((cardItem, index) => {
    const { cardContent = "", cardValue = "",icon="" } = cardItem;
    return (
      <div className={`sm:w-1/2 lg:w-1/3 ${index !== 0 ? "ms-4" : ""} ${className}`} key={index}>
        <div className="bg-blue-600 mb-3 p-4 rounded-lg shadow-md">
          <div className="w-6 h-6 mb-3">
            {icon}
          </div>
          <div className="text-truncate text-white text-lg mt-6 font-bold" title={cardContent}>
            {cardContent}
          </div>
          <div className="text-truncate text-white text-xl mt-2 font-bold">
            {cardValue}
          </div>
        </div>
      </div>
    );
  });
};

export default CardContainer;
