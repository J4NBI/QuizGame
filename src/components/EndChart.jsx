import { decodeHtml } from "../utils/htmlHelper.js";
import PieChart from "./Chart.jsx";
import { useState, useEffect } from "react";

export default function EndChart({ answers, quizQuestions, ...props }) {
  const [countAnswerWrongWrite, setCountAnswerWrongWrite] = useState({
    correct: 0,
    wrong: 0,
    length: 0,
  });

  useEffect(() => {
    let correctCount = 0;
    let wrongCount = 0;

    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === quizQuestions.results[i].correct_answer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    }

    setCountAnswerWrongWrite({
      correct: correctCount,
      wrong: wrongCount,
      length: answers.length,
    });
  }, [answers, quizQuestions]);

  console.log(countAnswerWrongWrite);

  return (
    <div className="flex items-center justify-center mt-12">
      <div className="bg-[#0E65A2] shadow-2xl rounded-md w-[90%] pt-4 px-12 flex items-center justify-center flex-col">
        <div className="flex flex-col items-center ">
          <h2 className="text-4xl my-8 font-bold text-[#ffa51a]">
            {" "}
            YOUR RESULTS{" "}
          </h2>
          <PieChart counts={countAnswerWrongWrite} />
          {quizQuestions.results.map((question, index) => {
            return (
              <div
                key={Math.random() * 1000}
                className=" bg-blue-200/10 w-full flex flex-col items-center border-2 border-blue-200 rounded-md p-8 mb-8"
              >
                <h3 className="text-[#24cebc] m-4 text-xl">
                  {index + 1}. {decodeHtml(question.question)}{" "}
                </h3>
                <p className="text-[#ffa51a] mb-4">{question.correct_answer}</p>
                <p className="flex flex-col items-center text-[#24cebc]">
                  YOUR ANSWER:{" "}
                  <span
                    className={
                      answers[index] === question.correct_answer
                        ? "text-green-300 pt-2"
                        : "text-red-700 pt-2"
                    }
                  >
                    {answers[index]}
                  </span>{" "}
                </p>
              </div>
            );
          })}
        </div>
        <button className="bg-[#ffa51a] py-4 px-8 mb-4 rounded-md" {...props}>
          {" "}
          NEW GAME
        </button>
      </div>
    </div>
  );
}
