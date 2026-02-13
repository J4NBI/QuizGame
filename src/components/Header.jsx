import React, { useState } from "react";
import Logo from "../assets/QuizGameLogo.png";
import Box from "@mui/material/Box";
import NumberField from "./NumberField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const Header = ({ onSubmit, finishedQuestions }) => {
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const submitObject = Object.fromEntries(formData);
    onSubmit(submitObject);
  }

  const menuPaperSx = { bgcolor: "rgba(96,165,250,0.5)", color: "#ffffff" };

  return (
    <div className="max-w-[900px] m-auto flex flex-col md:flex-row items-center justify-center bg-blue-200/50 px-8 py-8 rounded-md shadow-md">
      <img
        className="md:w-[10%] w-[25%] rounded-full mb-8 md:mb-0 md:mr-6 self-center"
        src={Logo}
        alt="Quizgame Logo"
      />
      <Box className="ml-4 w-full" component="form" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 w-full">
          <div className="h-[90px] border-2 border-[#1ac6ac] py-2 px-4 rounded-md w-full flex-2 bg-blue-400/50">
            <NumberField
              label="Number of Questions"
              min={1}
              max={50}
              name="number"
              required
            />
          </div>

          <FormControl
            size="medium"
            className="h-[90px] border-2 border-[#1ac6ac] py-2 px-4 rounded-md w-full flex-[40%] bg-blue-400/50"
          >
            <InputLabel id="difficulty-label">Difficulty</InputLabel>
            <Select
              labelId="difficulty-label"
              id="difficulty-select"
              name="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              MenuProps={{ PaperProps: { sx: menuPaperSx } }}
              label="Difficulty"
              required
            >
              <MenuItem sx={{ color: "#000000" }} value="">
                Select difficulty
              </MenuItem>
              <MenuItem sx={{ color: "#000000" }} value="easy">
                easy
              </MenuItem>
              <MenuItem sx={{ color: "#000000" }} value="medium">
                medium
              </MenuItem>
              <MenuItem sx={{ color: "#000000" }} value="hard">
                hard
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl
            size="medium"
            className="h-[90px] border-2 border-[#1ac6ac] py-2 px-4 rounded-md w-full flex-[40%] bg-blue-400/50"
          >
            <InputLabel id="genre-label">Category</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              MenuProps={{ PaperProps: { sx: menuPaperSx } }}
              label="Category"
              required
            >
              <MenuItem sx={{ color: "#000000" }} value="">
                Select Category
              </MenuItem>
              <MenuItem sx={{ color: "#000000" }} value="10">
                Books
              </MenuItem>
              <MenuItem sx={{ color: "#000000" }} value="11">
                Film
              </MenuItem>
              <MenuItem sx={{ color: "#000000" }} value="12">
                Music
              </MenuItem>
              <MenuItem sx={{ color: "#000000" }} value="26">
                Celebrities
              </MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            className="border-2 border-blue-400 py-2 px-4 hover:border-[#1ac6ac] hover:bg-blue-400 rounded-md"
            disabled={finishedQuestions}
          >
            Start
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Header;
