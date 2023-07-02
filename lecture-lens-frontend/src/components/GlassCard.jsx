import React, { useState, useRef, useEffect } from "react";
import "./GlassCard.css";
import VanillaTilt from "vanilla-tilt";

export const GlassCard = (props) => {
  const { details, filterClass, searchText } = props;
  const [isHovered, setIsHovered] = useState(false);
  const tiltRef = useRef(null);
  const [flagArray, setFlagArray] = useState([]);
  const [countArray, setCountArray] = useState([]);
  const [searchFlag, setSearchFlag] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (!filterClass || typeof filterClass !== "object") {
      return;
    }

    const flagArray = Object.keys(filterClass).filter((output) => {
      return filterClass[output] && details.class.includes(output);
    });
    const countArray = Object.values(filterClass).filter((output) => {
      return output === true;
    });
    const searchFlag = details.name.includes(searchText);

    setFlagArray(flagArray);
    setCountArray(countArray);
    setSearchFlag(searchFlag);
  }, [filterClass, details, searchText]);

  useEffect(() => {
    if (!searchFlag || countArray.length !== flagArray.length) {
      return;
    }
    const tiltNode = tiltRef.current;
    if (tiltNode) {
      VanillaTilt.init(tiltNode, {
        reverse: true,
        max: 30,
        speed: 400,
        perspective: 700,
        glare: true,
        "max-glare": 0.05,
      });
      return () => tiltNode.vanillaTilt.destroy();
    }
  }, [searchFlag, countArray, flagArray]);

  return (
    <>
      {searchFlag && countArray.length === flagArray.length && (
        <a
          href={"./LecturePage?lecture_id=" + details.key + "&professor_name=" + details.professor_name + "&year_term=" + details.year_term + "&name=" + details.name + "&url=" + details.url}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
        >
          <div
            ref={tiltRef}
            className={`glass-card ${isHovered ? "hovered" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="glass-card__image-container">
              <p className="className">{details.name}</p>
              <p>{details.year_term}</p>
              <p>{details.professor_name}</p>
              <p>{details.key}</p>
            </div>
          </div>
        </a>
      )}
    </>
  );
};
