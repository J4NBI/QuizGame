import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import { decodeHtml } from "./utils/htmlHelper.js";

function App() {
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [givenAnswers, setGivenAnswers] = useState([]);
  const [isGame, setIsGame] = useState(false);
  const [submittedEntries, setSubmittedEntries] = useState({});

  useEffect(() => {
    if (!isGame) return;

    fetch(
      `https://opentdb.com/api.php?amount=${submittedEntries.number}&category=${submittedEntries.category}&difficulty=${submittedEntries.difficulty}&type=multiple`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => setQuizQuestions(json))
      .catch((err) => {
        console.log(err);
      });
  }, [isGame, submittedEntries]);

  useEffect(() => {
    if (!quizQuestions) return;

    setGivenAnswers([
      ...quizQuestions.results[answers.length].incorrect_answers,
      quizQuestions.results[answers.length].correct_answer,
    ]);
  }, [quizQuestions, answers.length]);

  if (givenAnswers) {
    givenAnswers.sort(() => Math.random() - 0.5);
  }

  function handleAnswerClick(value) {
    setAnswers((prev) => [...prev, value]);
  }

  function onSubmit(object) {
    setSubmittedEntries(object);
    setIsGame(true);
  }

  return (
    <div className="bg-gradient-to-b from-[#1ac6ac] to-blue-500 min-h-screen h-full p-8">
      <Header onSubmit={onSubmit} />

      {isGame && quizQuestions && (
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
                    className="bg-blue-400 my-4 p-4 rounded-md shadow-md hover:bg-[#1ac6ac] transition duration-200"
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
      )}
    </div>
  );
}

export default App;
