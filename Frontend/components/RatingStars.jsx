import React from "react";
import { FaStar } from "react-icons/fa";

const RatingStars = ({ rating }) => {
  const totalStars = 5;

  const stars = Array.from({ length: totalStars }, (_, i) => {
    const fill = Math.min(Math.max(rating - i, 0), 1) * 100;

    return (
      <div
        key={i}
        style={{
          position: "relative",
          width: 20,
          height: 20,
          display: "inline-block",
        }}
      >
        {/* Empty Star */}
        <FaStar
          style={{
            color: "#d1d5db",
            width: 20,
            height: 20,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        {/* Filled Star */}
        <div
          style={{
            overflow: "hidden",
            width: `${fill}%`,
            height: 20,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <FaStar
            style={{
              color: "#fbbf24",
              width: 20,
              height: 20,
            }}
          />
        </div>
      </div>
    );
  });

  return <div className="flex space-x-1">{stars}</div>;
};

export default RatingStars;

