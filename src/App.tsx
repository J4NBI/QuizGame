import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Questions from "./components/Questions.jsx";
import EndChart from "./components/EndChart.jsx";

function App() {
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [givenAnswers, setGivenAnswers] = useState([]);
  const [isGame, setIsGame] = useState(false);
  const [submittedEntries, setSubmittedEntries] = useState({});
  const [finishedQuestions, setFinishedQuestions] = useState(false);


  useEffect(() => {
    if (!isGame) return;

    fetch(
      `https://opentdb.com/api.php?amount=${submittedEntries.number}&category=${submittedEntries.category}&difficulty=${submittedEntries.difficulty}&type=multiple`
    )
      .then((response) => response.json())
      .then((json) => setQuizQuestions(json))
      .catch((err) => console.log(err));
  }, [isGame, submittedEntries]);

  useEffect(() => {
    if (!quizQuestions) return;
    if (answers.length >= quizQuestions.results.length) return;

    const currentQuestion = quizQuestions.results[answers.length];

    const shuffledAnswers = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ].sort(() => Math.random() - 0.5);

    setGivenAnswers(shuffledAnswers);
  }, [quizQuestions, answers.length]);

  function handleAnswerClick(value) {
    setAnswers((prev) => [...prev, value]);
  }

  function onSubmit(object) {
    setSubmittedEntries(object);
    setIsGame(true);
  }

  function handleNewGame(){
    setIsGame(false);
    setAnswers([]);
    setQuizQuestions(null);
    setFinishedQuestions(false)
  }

  useEffect(() => {
    if (!quizQuestions) return;
  
    if (answers.length === quizQuestions.results.length) {
      setFinishedQuestions(true);
    }
  }, [answers.length, quizQuestions]);
  

    
  

  return (
    <div className="bg-gradient-to-b from-[#1ac6ac] to-blue-500 min-h-screen h-full p-8">
      <Header onSubmit={onSubmit} />
      {!finishedQuestions ? (
        <Questions
          isGame={isGame}
          quizQuestions={quizQuestions}
          answers={answers}
          givenAnswers={givenAnswers}
          handleAnswerClick={handleAnswerClick}
        />
      ) : (
        <EndChart answers={answers} quizQuestions={quizQuestions} onClick={handleNewGame} />
      )}
    </div>
  );
}

export default App;
