import style from "./result.module.css";
import Data from "../Data";

export default function Result(props) {
  return (
    <div className={style.resultContainer}>
      {props.marks >= (Data.length * 2 * 60) / 100 ? (
        <>
          <h1>Congratulations !!</h1>
          <p>You passed the Test</p>
        </>
      ) : (
        <>
          <h1> Uh oh..!</h1>
          <p>Better Luck Next Time !</p>
        </>
      )}
      <h1> Your Score </h1>
      <p>
        Marks: {props.marks} / {props.total}
      </p>
      <button className={style.nextBtn} onClick={props.startAgain}>
        Start Again
      </button>
    </div>
  );
}
