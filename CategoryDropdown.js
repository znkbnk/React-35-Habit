import React, { useEffect, useState } from "react";

const CategoryDropdown = ({
  showCategoriesDropdown,
  onCategorySelect,
  onDeleteCategory, 
  selectedCategory,
  onCreateCategory,
  categories,
}) => {
  const [newCategory, setNewCategory] = useState("");

  const [dropdownWidth, setDropdownWidth] = useState(150);

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleCreateCategory = () => {
    if (newCategory.trim() !== "") {
      const updatedCategories = [...categories, newCategory];
      onCreateCategory(newCategory);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      setNewCategory("");
    }
  };

  
  const defaultCategories = ["All"];

  useEffect(() => {
    const maxWidth = categories.reduce((max, category) => {
      const categoryWidth = category.length * 10;
      return Math.max(max, categoryWidth);
    }, 150); // Minimum width of 150px

    setDropdownWidth(maxWidth);
  }, [categories]);

  return (
    showCategoriesDropdown && (
      <div className='dropdown-content' style={{ width: `${dropdownWidth}px` }}>
        {defaultCategories.map((category, index) => (
          <div key={index} className='category-item-all'>
            <button
              onClick={() => onCategorySelect(category)}
              className={`dropdown-link ${
                category === selectedCategory ? "selected" : ""
              }`}
            >
              {category}
            </button>
          </div>
        ))}
        {categories.map((category, index) => (
          <div key={index} className='category-item-rest'>
            <button
              onClick={() => onCategorySelect(category)}
              className={`dropdown-link ${
                category === selectedCategory ? "selected" : ""
              }`}
            >
              {category}
            </button>
            {category !== "All" && (
              <button
                onClick={() => onDeleteCategory(category)}
                className='delete-button'
              >
                x
              </button>
            )}
          </div>
        ))}
        {/* to show newly created category in dropdown */}
        {/* {newCategory.trim() !== "" && (
          <div key='newCategory' className='category-item'>
            <button
              onClick={() => onCategorySelect(newCategory)}
              className={`dropdown-link ${
                newCategory === selectedCategory ? "selected" : ""
              }`}
            >
              {newCategory}
            </button>
            <button
              onClick={() => onDeleteCategory(newCategory)}
              className='delete-button'
            >
              x
            </button>
          </div>
        )} */}
        {/* end of comment  */}
        <div>
          <input
            type='text'
            placeholder='Create Category'
            value={newCategory}
            onChange={handleNewCategoryChange}
            className='category-input'
          />
          {newCategory.trim() !== "" && (
            <button onClick={handleCreateCategory} className='category-button'>
              Create
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default CategoryDropdown;

// Alternative approach using concat

// {defaultCategories.concat(categories).map((category, index) => (
//   <button
//     key={index}
//     onClick={() => onCategorySelect(category)}
//     className={`dropdown-link ${
//       category === selectedCategory ? "selected" : ""
//     } ${index === defaultCategories.length + categories.length - 1 ? "last" : ""}`}
//   >
//     {category}
//   </button>
// ))}
