import { decodeHtml } from "../utils/htmlHelper.js";
import { useState } from "react";

export default function Questions({
  isGame,
  quizQuestions,
  answers,
  givenAnswers,
  handleAnswerClick,
}) {
  if (!isGame || !quizQuestions) return null;

  const [clickedAnswer, setClickedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quizQuestions?.results[answers.length];

  if (!currentQuestion) return null;
  const correctAnswer = currentQuestion.correct_answer;

  function onAnswerClick(answer) {
    if (showResult) return;

    setClickedAnswer(answer);
    setShowResult(true);

    setTimeout(() => {
      handleAnswerClick(answer);
      setClickedAnswer(null);
      setShowResult(false);
    }, 3000);
  }

  const baseStyle =
    "my-4 p-4 rounded-md shadow-md transition-all duration-300 w-full";

  return (
    <main className="flex items-center justify-center mt-12">
      <div className="bg-[#0E65A2] shadow-2xl rounded-md w-[90%] pt-14 px-12">
        <div className="flex justify-between bg-blue-300 px-12 py-4 rounded-md">
          <h2 className="font-bold">
            QUESTION {answers.length + 1} / {quizQuestions.results.length}
          </h2>
          <p>{currentQuestion.category}</p>
          <p>
            <span>Difficulty:</span> {currentQuestion.difficulty}
          </p>
        </div>

        <div className="p-8">
          <h3 className="text-[#1ac6ac] text-xl">
            {decodeHtml(currentQuestion.question)}
          </h3>

          <ol className="mt-4">
            {givenAnswers.map((answer, index) => {
              let style = "bg-blue-400 hover:bg-[#1ac6ac]";

              if (showResult) {
                if (answer === correctAnswer) {
                  style = "bg-green-400 scale-105";
                } else if (answer === clickedAnswer) {
                  style = "bg-red-400";
                }
              }

              return (
                <li key={index} className={`${baseStyle} ${style}`}>
                  <button
                    onClick={() => onAnswerClick(answer)}
                    className="w-full h-full"
                    disabled={showResult}
                  >
                    {decodeHtml(answer)}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </main>
  );
}
