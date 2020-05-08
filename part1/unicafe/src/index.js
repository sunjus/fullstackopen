import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad;
  //the average score (good: 1, neutral: 0, bad: -1)
  let avg = all === 0 ? 0 : (good - bad) / all;
  let positive = all === 0 ? 0 : (good / all) * 100;

  return (
    <div>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>avarage {avg}</div>
      <div>positive {positive} %</div>
    </div>
  );
};

const App = (props) => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handlegoodClick = () => setGood(good + 1);

  const handleneutralClick = () => setNeutral(neutral + 1);

  const handlebadClick = () => setBad(bad + 1);

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button onClick={handlegoodClick} text="good" />
        <Button onClick={handleneutralClick} text="neutral" />
        <Button onClick={handlebadClick} text="bad" />
        <Statistics good={good} bad={bad} neutral={neutral} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
