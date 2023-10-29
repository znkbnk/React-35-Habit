Step 1: Visit Harsh Patel's CodePen Profile.

- Once you are on Harsh Patel's CodePen profile page, 
with this code as our foundation, we'll be
crafting our very own component.

Step 2: Create a function calculatePercentage.

- In yout HabitList.js file create a function 
called calculatePercentage that takes a habit 
as a parameter and calculates the percentage
based on the number of completed days and
the initial goal days.

Step 3: Use the calculatePercentage function
to pass the percentage to SkillBar component.

- In your HabitList component, you can now
pass the calculated percentage to the
SkillBar component. You should do this
within your JSX where you render the
habit information. You can use the
<SkillBar> component with the percentage prop.

Step 4: Create the SkillBar component.

- Create SkillBar component in a separate
file (e.g., SkillBar.js) or include it in
your existing code.
- Import the necessary dependencies at
the beginning of your file.
- Define a functional React component
named SkillBar that takes the percentage prop.
- Inside the SkillBar component, create a ref
using the useRef hook.
- Use the useEffect hook to listen for changes
in the percentage prop. This effect runs whenever
the percentage prop changes. If the skillPerRef.current
(i.e., the referenced DOM element) exists, it updates
the width style property to reflect the new percentage.
- In the component's return statement, create the
JSX structure for your skill bar. This structure
includes a wrapper <div> with class names for
styling and a nested <div> with the ref set
to skillPerRef.

Step 5: Update your index.css file.

- Utilize the code from Harsh Patel's CodePen
Profile to enhance your style definitions
within the index.css file.
