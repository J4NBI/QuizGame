import React from "react";
import Logo from "../assets/QuizGameLogo.png";

const Header = ({ onSubmit }) => {
  function handleSubmit(formData) {
    let submitObject = Object.fromEntries(formData);
    onSubmit(submitObject);
  }

  return (
    <div className="flex items-center gap-4 bg-blue-200 px-8 py-4 rounded-md">
      <img className="w-[10%] rounded-[100%]" src={Logo} alt="Quizgame Logo" />
      <form
        className="flex items-center justify-between w-full h-full"
        action={handleSubmit}
      >
        <div>
          <label htmlFor="number">Questions</label>
          <input
            className=" ml-4 w-[100px] bg-blue-400 h-[38px] p-2 rounded-md"
            type="number"
            min="1"
            max="50"
            placeholder="Max 50"
            id="number"
            name="number"
            required
          />
        </div>

        <select className="bg-blue-400 p-2 rounded-md" name="difficulty">
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>

        <select className="bg-blue-400 p-2 rounded-md" name="category">
          <option value="10">Books</option>
          <option value="11">Film</option>
          <option value="12">Music</option>
          <option value="26">Celebreties</option>
        </select>
        <button className="border-2 border-blue-400 py-2 px-4 hover:border-white hover:bg-blue-400 rounded-md">
          Start
        </button>
      </form>
    </div>
  );
};

export default Header;
