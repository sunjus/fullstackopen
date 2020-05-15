import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Anecdote = ({ point, text }) => (
  <div>
    <div>{text}</div>
    <div>has {point} votes</div>
  </div>
);

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(props.anecdotes.length).fill(0));
  const [mostVoted, setMostVoted] = useState(0);

  const generateRandom = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  };

  const votes = (selected) => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
    setMostVoted(copy.indexOf(Math.max(...copy)));
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote point={points[selected]} text={props.anecdotes[selected]} />
      <Button onClick={() => votes(selected)} text="vote" />
      <Button onClick={generateRandom} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <Anecdote point={points[mostVoted]} text={props.anecdotes[mostVoted]} />
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
