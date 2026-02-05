import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Questions from "./components/Questions.jsx";

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
      <Questions
        isGame={isGame}
        quizQuestions={quizQuestions}
        answers={answers}
        givenAnswers={givenAnswers}
        handleAnswerClick={handleAnswerClick}
      />
    </div>
  );
}

export default App;
