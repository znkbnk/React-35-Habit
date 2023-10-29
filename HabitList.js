import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SkillBar from "./SkillBar";

const HabitList = ({
  habits,
  favoriteHabits,
  updateHabit,
  deleteHabit,
  makeFavoriteHabit,
  setHabits,
  selectedCategory,
  setCompletedHabits,
  completedHabits,
}) => {
  const [editableHabitIndex, setEditableHabitIndex] = useState(-1);
  const [unfinishedHabits, setUnfinishedHabits] = useState([]);
  const [showUnfinished, setShowUnfinished] = useState(false);

   const calculatePercentage = (habit) => {
     if (habit.goalDays === 0) return 100;
     const completedDays = habit.checkedDates?.length || 0;
     return (completedDays / habit.initialGoalDays) * 100;
   };

  useEffect(() => {
    // Load habits from localStorage
    const savedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(savedHabits);

    // Load unfinished habits from localStorage
    const savedUnfinishedHabits =
      JSON.parse(localStorage.getItem("unfinishedHabits")) || [];
    setUnfinishedHabits(savedUnfinishedHabits);
  }, [setHabits]);

  useEffect(() => {
    if (unfinishedHabits.length > 0) {
      setShowUnfinished(true);
    }
  }, [unfinishedHabits]);

  const handleEditClick = (index) => {
    setEditableHabitIndex(index);
  };

  const handleEditChange = (event, index) => {
    const updatedHabit = { ...habits[index], name: event.target.value };
    updateHabit(index, updatedHabit);
    // Save updated habits to local storage
    localStorage.setItem("habits", JSON.stringify(habits));

    // Check if the habit is unfinished and save it to the unfinishedHabits array
    if (updatedHabit.goalDays > 0) {
      const unfinished = habits.filter((habit) => habit.goalDays > 0);
      localStorage.setItem("unfinishedHabits", JSON.stringify(unfinished));
    }
  };

  const handleEditSave = () => {
    setEditableHabitIndex(-1);
  };

  const handleCompleteClick = (index) => {
    const filteredHabits =
      selectedCategory === "All"
        ? habits
        : habits.filter(
            (habit) => habit.category.trim() === selectedCategory.trim()
          );

    const completedHabit = filteredHabits[index];
    if (completedHabit.goalDays > 0) {
      // Decrease the goal days by 1
      const updatedGoalDays = completedHabit.goalDays - 1;
      const updatedHabit = { ...completedHabit, goalDays: updatedGoalDays };

      // Update the habit in the habits array
      const updatedHabits = [...habits];
      updatedHabits[habits.indexOf(completedHabit)] = updatedHabit;
      setHabits(updatedHabits);

      // Save updated habits to local storage
      localStorage.setItem("habits", JSON.stringify(habits));

      // Check if the habit is unfinished and save it to the unfinishedHabits array
      if (updatedHabit.goalDays > 0) {
        const unfinished = habits.filter((habit) => habit.goalDays > 0);
        localStorage.setItem("unfinishedHabits", JSON.stringify(unfinished));
      }

      if (updatedGoalDays === 0) {
        // Move the habit to completedHabits when the goal is achieved
        setCompletedHabits((prevCompletedHabits) => [
          ...prevCompletedHabits,
          updatedHabit,
        ]);

        saveCompletedHabitsToStorage([...completedHabits, updatedHabit]);

        // Display a toast message when the habit is achieved
        toast.success(`You achieved the habit "${updatedHabit.name}" today!`);
      }
    }
  };

  const handleCheckClick = (habit) => {
    const currentDate = new Date();
    const updatedGoalDays = habit.goalDays - 1;
    const updatedHabit = { ...habit, goalDays: updatedGoalDays };

    // Add the checked date to the habit
    const checkedDate = { date: currentDate, goalDays: updatedGoalDays };
    updatedHabit.checkedDates = [
      ...(updatedHabit.checkedDates || []),
      checkedDate,
    ];

    const updatedHabits = [...habits];
    const habitIndex = updatedHabits.findIndex((h) => h.key === habit.key);
    updatedHabits[habitIndex] = updatedHabit;
    setHabits(updatedHabits);

    // Save habits to local storage
    localStorage.setItem("habits", JSON.stringify(updatedHabits));

    if (updatedGoalDays === 0) {
      setCompletedHabits((prevCompletedHabits) => [
        ...prevCompletedHabits,
        updatedHabit,
      ]);

      saveCompletedHabitsToStorage([...completedHabits, updatedHabit]);
      if (updatedGoalDays > 0) {
        const unfinished = updatedHabits.filter((h) => h.goalDays > 0);
        localStorage.setItem("unfinishedHabits", JSON.stringify(unfinished));
      }
    }

    // Show a toast message with days left
    if (updatedGoalDays === 0) {
      toast.success(
        `You've completed the habit "${
          updatedHabit.name
        }" on ${currentDate.toLocaleString()}`
      );
    } else {
      const daysLeftMessage =
        updatedGoalDays === 1 ? "1 day left" : `${updatedGoalDays} days left`;
      toast.success(
        `You've checked off a day for the habit "${
          updatedHabit.name
        }" (${daysLeftMessage}) on ${currentDate.toLocaleString()}.`
      );
    }
  };

  const saveCompletedHabitsToStorage = (completedHabits) => {
    localStorage.setItem("completedHabits", JSON.stringify(completedHabits));
  };

  const filteredHabits =
    selectedCategory === "All"
      ? habits
      : habits.filter(
          (habit) => habit.category.trim() === selectedCategory.trim()
        );

  const handleToggleUnfinished = () => {
    setShowUnfinished(!showUnfinished);
  };
  const showCompletedHabits = !showUnfinished;

  return (
    <div>
      <button onClick={handleToggleUnfinished}>
        {showUnfinished ? "Show All Habits" : "Show Unfinished Habits"}
      </button>
      <ul className='habitlist-buttons'>
        {filteredHabits
          .filter((habit) =>
            showCompletedHabits
              ? completedHabits.some(
                  (completedHabit) => completedHabit.key === habit.key
                )
              : !completedHabits.some(
                  (completedHabit) => completedHabit.key === habit.key
                )
          )
          .map((habit, index) => (
            <li key={index}>
              {habit?.category ? (
                <>
                  {editableHabitIndex === index ? (
                    <div>
                      <input
                        type='text'
                        value={habit.name}
                        onChange={(e) => handleEditChange(e, index)}
                      />
                      <button onClick={handleEditSave}>Save</button>
                    </div>
                  ) : (
                    <div id='completed-habits-modal'>
                      <div className='completed-habits-content'>
                        <h2>Category: {habit.category}</h2>
                        <div>
                          <span>Habit Name: {habit.name}</span>
                          <br />
                          <span>
                            Date:{" "}
                            {habit.date instanceof Date && !isNaN(habit.date)
                              ? habit.date.toDateString()
                              : "Invalid Date"}
                          </span>
                          {habit.goalDays > 0 ? (
                            <p>
                              Goal: {habit.goalDays}{" "}
                              {habit.goalDays === 1 ? "day" : "days"} left
                              <br />
                              <br />
                              <br />
                              <SkillBar
                                percentage={calculatePercentage(habit)}
                              />
                              {habit?.notes && <p>Notes: {habit.notes}</p>}
                            </p>
                          ) : (
                            <></>
                          )}
                          {habit.goalDays === 0 ? (
                            <p>
                              Goal achieved in: {habit.initialGoalDays}{" "}
                              {habit.initialGoalDays === 1 ? "day" : "days"}
                            </p>
                          ) : (
                            <div className='habitlist-button'>
                              <button onClick={() => handleEditClick(index)}>
                                Edit
                              </button>
                              <button onClick={() => deleteHabit(index)}>
                                Delete
                              </button>
                              <button
                                className={
                                  favoriteHabits.includes(habit)
                                    ? "favorite-button favorite"
                                    : "favorite-button"
                                }
                                onClick={() => makeFavoriteHabit(index)}
                              >
                                Favorite
                              </button>
                              <button
                                onClick={() => handleCompleteClick(index)}
                              >
                                Complete
                              </button>
                              <button
                                onClick={() => handleCheckClick(habit)}
                                disabled={habit.goalDays <= 0}
                              >
                                CHECK
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HabitList;
