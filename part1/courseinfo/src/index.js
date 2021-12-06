import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <div key={index}>
          {part.name}
          {part.exercises}
        </div>
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const part0 = parts[0];
  const part1 = parts[1];
  const part2 = parts[2];
  return (
    <div>
      <p>
        Number of exercises{" "}
        {part0.exercises + part1.exercises + part2.exercises}
      </p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
