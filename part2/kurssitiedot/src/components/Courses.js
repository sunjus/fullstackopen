import React from "react";

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

export default Courses;
