import React from "react";
import { FaStar } from "react-icons/fa";

const RatingStars = ({ rating }) => {
  const totalStars = 5;

  const stars = Array.from({ length: totalStars }, (_, i) => {
    const fill = Math.min(Math.max(rating - i, 0), 1) * 100;

    return (
      <div
        key={i}
        className="relative inline-block w-5 h-5"
        style={{ width: 20, height: 20 }} // keep for exact pixel sizing if needed
      >
        {/* Empty Star */}
        <FaStar
          className="text-gray-300 absolute top-0 left-0 w-5 h-5"
          style={{ width: 20, height: 20 }}
        />
        {/* Filled Star */}
        <div
          className="overflow-hidden absolute top-0 left-0 h-5"
          style={{ width: `${fill}%`, height: 20 }}
        >
          <FaStar
            className="text-yellow-400 w-5 h-5"
            style={{ width: 20, height: 20 }}
          />
        </div>
      </div>
    );
  });

  return <div className="flex space-x-1">{stars}</div>;
};

export default RatingStars;
