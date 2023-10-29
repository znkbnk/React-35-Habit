import React, { useEffect, useRef } from "react";

const SkillBar = ({ percentage }) => {
  const skillPerRef = useRef(null);

  useEffect(() => {
    // Update the skill bar width when the percentage changes
    if (skillPerRef.current) {
      skillPerRef.current.style.width = percentage + "%";
    }
  }, [percentage]);

  return (
    <div className='skill-main'>
      <div className='skill-wrap'>
        <div className='skill-bar'>
          <div
            className='skill-per'
            ref={skillPerRef}
            per={percentage.toFixed(2) + "%"}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SkillBar;
