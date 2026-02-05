import { decodeHtml } from "../utils/htmlHelper.js";

export default function Questions({
  isGame,
  quizQuestions,
  answers,
  givenAnswers,
  handleAnswerClick,
}) {
  if (!isGame || !quizQuestions) return null;

  let isCorrectAnswer =
    answers.length &&
    quizQuestions.results[answers.length - 1].correct_answer ===
      answers[answers.length - 1];
  console.log(isCorrectAnswer);

  return (
    <main className="flex items-center justify-center mt-12">
      <div className="bg-[#0E65A2] shadow-2xl rounded-md w-[90%] pt-14 px-12">
        <div className="flex justify-between bg-blue-300 p-4 rounded-md">
          <h2 className="font-bold">
            QUESTION {answers.length + 1} / {quizQuestions.results.length}
          </h2>
          <p>{quizQuestions.results[answers.length].category}</p>
          <p>
            <span>Difficulty:</span>{" "}
            {quizQuestions.results[answers.length].difficulty}
          </p>
        </div>

        <div className="p-8">
          <h3 className="text-[#1ac6ac] text-xl">
            {decodeHtml(quizQuestions.results[answers.length].question)}
          </h3>

          <ol className="mt-4 mb-0">
            {givenAnswers.map((givenAnswer, index) => (
              <li
                key={index}
                className={
                  answers[answers.length - 1] ===
                  quizQuestions.results[answers.length - 1].correct_answer
                    ? "bg-green-400 my-4 p-4 rounded-md shadow-md hover:bg-[#1ac6ac] transition duration-200"
                    : "bg-blue-400 my-4 p-4 rounded-md shadow-md hover:bg-[#1ac6ac] transition duration-200"
                }
              >
                <button
                  onClick={(e) => handleAnswerClick(e.target.value)}
                  value={givenAnswer}
                  className="w-full h-full block"
                >
                  {givenAnswer}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
}
