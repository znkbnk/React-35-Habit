import React, { useState, useEffect } from "react";

const DeletedHabits = ({ deletedHabits, onClose }) => {
  const [deletedHabitsState, setDeletedHabitsState] = useState(deletedHabits);

  useEffect(() => {
    const storedDeletedHabits = JSON.parse(
      localStorage.getItem("deletedHabits")
    );
    if (storedDeletedHabits) {
      setDeletedHabitsState(storedDeletedHabits);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("deletedHabits", JSON.stringify(deletedHabitsState));
  }, [deletedHabitsState]);

  const handleDelete = (index) => {
    const updatedDeletedHabits = [...deletedHabitsState];
    updatedDeletedHabits.splice(index, 1);
    setDeletedHabitsState(updatedDeletedHabits);
  };

  return (
    <div className='deleted-habits-modal'>
      <div className='deleted-habits-content'>
        <h2>Deleted Habits</h2>
        <ul>
          {deletedHabitsState.map((habit, index) => (
            <li key={index}>
              Habit name: {habit.name}
              <button
                className='deleted-delete-button'
                onClick={() => handleDelete(index)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className='close-button'>
          Close
        </button>
      </div>
    </div>
  );
};

export default DeletedHabits;
