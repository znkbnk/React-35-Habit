import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";

const HabitForm = ({
  addHabit,
  setSelectedCategory,
  categories,
  setSelectedDate,
  selectedDate,
  setSelectedFrequency,
  selectedFrequency,
}) => {
  const [habit, setHabit] = useState({
    name: "",
    reminderTime: "",
    goalDays: "",
    initialGoalDays: "",
    category: "",
    notes: "",
  });
  const [goalDaysError, setGoalDaysError] = useState("");
  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    // Filter out duplicate categories and include default categories
    const defaultCategories = [];
    const filteredCategories = categories.filter(
      (category) => !defaultCategories.includes(category)
    );
    setUniqueCategories([...defaultCategories, ...filteredCategories]);
  }, [categories]);

  const handleHabitChange = (event) => {
    setHabit((prevHabit) => ({ ...prevHabit, name: event.target.value }));
  };

  const handleReminderChange = (event) => {
    setHabit((prevHabit) => ({
      ...prevHabit,
      reminderTime: event.target.value,
    }));
  };

  const handleGoalDaysChange = (event) => {
    const goalDays = parseInt(event.target.value);
    if (!isNaN(goalDays) && goalDays >= 1) {
      setHabit((prevHabit) => ({
        ...prevHabit,
        goalDays,
        initialGoalDays: goalDays,
      }));
      setGoalDaysError(""); // Clear error message
    } else {
      setGoalDaysError("Number must be higher than 0");
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setHabit((prevHabit) => ({
      ...prevHabit,
      category: selectedCategory,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (habit.name.trim() !== "" && habit.category !== "") {
      // Ensure that 'category' is not empty
      const habitWithCategory = {
        ...habit,
        name: `${habit.name}`,
        category: habit.category,
      };
      addHabit(habitWithCategory);

      // Set the selected category to the newly added habit's category
      setSelectedCategory(habit.category);

      setHabit({
        name: "",
        reminderTime: "",
        goalDays: "",
        initialGoalDays: "",
        category: "",
        notes: "",
      });
    }
  };

  const handleNotesChange = (event) => {
    setHabit((prevHabit) => ({
      ...prevHabit,
      notes: event.target.value,
    }));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type='text'
        value={habit.name}
        onChange={handleHabitChange}
        placeholder='Enter a new habit'
        required
      />
      <input
        type='text'
        value={habit.reminderTime}
        onChange={handleReminderChange}
        placeholder='Enter reminder time (e.g., 12:00)'
      />
      <input
        type='number'
        value={habit.goalDays}
        onChange={handleGoalDaysChange}
        placeholder='Enter goal days'
        required
      />
      {goalDaysError && <p style={{ color: "red" }}>{goalDaysError}</p>}
      <div className='input-container'>
        <select value={habit.category} onChange={handleCategoryChange} required>
          <option value='' disabled>
            Please choose category
          </option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setSelectedFrequency(e.target.value)}
          value={selectedFrequency}
        >
          <option value='none'>Select Frequency</option>
          <option value='daily'>Daily</option>
          <option value='weekly'>Weekly</option>
          <option value='monthly'>Monthly</option>
        </select>

        <div className='textarea-container'>
          <textarea
            value={habit.notes}
            onChange={handleNotesChange}
            placeholder='Enter notes (optional)'
          />
        </div>
        {selectedFrequency !== "none" && (
          <div className='custom-calendar'>
            <label htmlFor='selectedDate'>Select Date:</label>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              minDate={new Date()}
              required
            />
          </div>
        )}
      </div>
      <button type='submit'>Add Habit</button>
    </form>
  );
};

export default HabitForm;
