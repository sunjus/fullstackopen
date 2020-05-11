import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad;
  //the average score (good: 1, neutral: 0, bad: -1)
  let avg = all === 0 ? 0 : (good - bad) / all;
  let positive = all === 0 ? 0 : (good / all) * 100;

  // let feedback = "";
  // console.log("if else : ", feedback);
  // //  ternary operator
  // let showFeedback = all === 0 ? "No feedback given" : all;
  // console.log("ternary operator, showFeedback", showFeedback);

  return (
    <div>
      <h1>statistics</h1>
      {all === 0 ? (
        <div>No feedback given</div>
      ) : (
        <table>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={all} />
            <Statistic text="average" value={avg} />
            <Statistic text="positive" value={positive + "%"} />
          </tbody>
        </table>
      )}
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
