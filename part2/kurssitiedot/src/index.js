import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h2>{props.course}</h2>;
};

const Part = (props) => {
  return (
    <p>
      {props.id}
      {props.part} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((value) => (
        <Part part={value.name} exercises={value.exercises} key={value.id} />
      ))}
    </div>
  );
};

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};

const Courses = (props) => {
  return (
    <div>
      {props.courses.map((value) => (
        <Course course={value} key={value.name} />
      ))}
    </div>
  );
};

const Total = (props) => {
  const total = props.parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
