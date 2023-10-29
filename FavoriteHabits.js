import React, { useState, useEffect } from "react";

const FavoriteHabits = ({ favoriteHabits, setShowFavoriteHabits }) => {
  const [habits, setHabits] = useState(favoriteHabits);

  useEffect(() => {
    const storedHabits = localStorage.getItem("favoriteHabits");
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  }, []);

  const handleDelete = (index) => {
    const updatedHabits = [...habits];
    updatedHabits.splice(index, 1);
    setHabits(updatedHabits);
    localStorage.setItem("favoriteHabits", JSON.stringify(updatedHabits));
  };

  return (
    <div className='favorite-habits-modal'>
      <div className='favorite-habits-content'>
        <h2>Favorite Habits</h2>
        <ul>
          {habits.map((habit, index) => (
            <li key={index}>
              {habit.name}
              <button
                className='favorite-delete-button'
                onClick={() => handleDelete(index)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => setShowFavoriteHabits(false)}>Close</button>
      </div>
    </div>
  );
};

export default FavoriteHabits;
