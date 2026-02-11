import React from "react";
import Logo from "../assets/QuizGameLogo.png";

const Header = ({ onSubmit, finishedQuestions }) => {
  function handleSubmit(formData) {
    let submitObject = Object.fromEntries(formData);
    onSubmit(submitObject);
  }

  return (
    <div className="flex md:flex-row flex-col justify-center items-center gap-4 bg-blue-200 px-8 py-4 rounded-md">
      <img
        className="md:w-[10%] w-[20%] rounded-[100%]"
        src={Logo}
        alt="Quizgame Logo"
      />
      <form
        className="md:px-8 flex md:flex-row flex-col gap-4 md:items-center justify-between w-full h-full"
        action={!finishedQuestions && handleSubmit}
      >
        <div className="flex flex-col items-center md:flex-row">
          <input
            className="w-full md:w-[180px] bg-blue-400 h-[38px] rounded-md placeholder:text-white/50 p-2"
            type="number"
            min="1"
            max="50"
            placeholder="Questions - Max. 50"
            id="number"
            name="number"
            required
            disabled={finishedQuestions}
          />
        </div>

        <select
          className="bg-blue-400 p-2 rounded-md"
          name="difficulty"
          disabled={finishedQuestions}
        >
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>

        <select
          className="bg-blue-400 p-2 rounded-md"
          name="category"
          disabled={finishedQuestions}
        >
          <option value="10">Books</option>
          <option value="11">Film</option>
          <option value="12">Music</option>
          <option value="26">Celebreties</option>
        </select>
        <button
          className="border-2 border-blue-400 py-2 px-4 hover:border-white hover:bg-blue-400 rounded-md"
          disabled={finishedQuestions}
        >
          Start
        </button>
      </form>
    </div>
  );
};

export default Header;
