import Data from "../Data";
import style from "./testApp.module.css";
import { useState } from "react";
import Result from "./Result";

export default function TestApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [marks, setMarks] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [attempted, setAttempted] = useState(0);

  function handleNextQuestion() {
    handleProgress();
    handleMarks();

    if (currentQuestion < Data.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  }
  function handleClickedOption(index) {
    setClickedOption(index + 1);
  }
  function handleMarks() {
    if (clickedOption === Data[currentQuestion].answer) {
      setMarks(marks + 2);
    }
  }
  function handleProgress() {
    if (clickedOption > 0) setAttempted(attempted + 1);
    setClickedOption(0);
  }

  function swichQuestion(index) {
    setCurrentQuestion(index);
  }
  function resetAll() {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setMarks(0);
    setAttempted(0);
  }
  return (
    <div className={style.testContainer}>
      {showResult ? (
        <Result marks={marks} total={Data.length * 2} startAgain={resetAll} />
      ) : (
        <>
          <div className={style.testArea}>
            <div className={style.questionArea}>
              <span className={style.questionNumber}>
                {currentQuestion + 1}.
              </span>
              <span className={style.questionTxt}>
                {" "}
                {Data[currentQuestion].question}
              </span>
            </div>
            <div className={style.optionsArea}>
              {Data[currentQuestion].options.map((option, index) => {
                return (
                  <button
                    className={style.option}
                    key={index}
                    onClick={() => handleClickedOption(index)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {currentQuestion === Data.length - 1 ? (
              <button className={style.nextBtn} onClick={handleNextQuestion}>
                Submit
              </button>
            ) : (
              <button className={style.nextBtn} onClick={handleNextQuestion}>
                Next
              </button>
            )}
          </div>
        </>
      )}
      <div className={style.progress}>
        <h1>Progress</h1>
        {/* <div className={style.questionProgress}>
          {Data.map((elem, index) => (
            <div className={style.box} onClick={() => swichQuestion(index)}>
              <p
                key={index}
                // className={(isAttempted)? style.boxAttempted: null}
              >
                {index + 1}
              </p>
            </div>
          ))}
        </div> */}
        <h3>Total Questions: {Data.length}</h3>
        <h3>Attempted: {attempted}</h3>
        <h3>Unattempted:{Data.length - attempted} </h3>
        {showResult ? (
          <>
            <h3> Correct : {marks / 2}</h3>
            <h3> Wrong :{attempted - marks / 2} </h3>
          </>
        ) : null}
      </div>
    </div>
  );
}
