import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = (props) => {
  const [selected, setSelected] = useState(0);

  const [points, setPoints] = useState(Array(props.anecdotes.length).fill(0));

  const generateRandom = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  };

  const votes = (selected) => {
    // increment the property 2 value by one
    const copy = [...points];
    copy[selected] += 1;
    return setPoints(copy);
  };

  return (
    <div>
      <div>{props.anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <Button onClick={() => votes(selected)} text="vote" />
      <Button onClick={generateRandom} text="next anecdote" />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
