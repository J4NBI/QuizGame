import { decodeHtml } from "../utils/htmlHelper.js";

export default function EndChart({ answers , quizQuestions, ...props}) {
console.log(quizQuestions.results[0])
  return (

      <div className="flex items-center justify-center mt-12">
        <div className="bg-[#0E65A2] shadow-2xl rounded-md w-[90%] pt-4 px-12 flex items-center justify-center flex-col">
            <div className='flex flex-col items-center'>
                <h2 className='text-4xl my-8 font-bold text-[#ffa51a]'> YOUR RESULTS </h2>
                {quizQuestions.results.map((question, index)=> {
                   return (
                   <div className='flex flex-col items-center border-2 border-blue-200 rounded-md p-8 mb-8'>
                    <h3 className='text-[#24cebc] m-4 text-xl'>{index +1}. {decodeHtml(question.question)} </h3>
                    <p className='text-[#ffa51a] mb-4'>{question.correct_answer}</p>
                    <p >YOUR ANSWER: <span className={answers[index] === question.correct_answer ? 'text-green-300' : 'text-red-700'}>{answers[index]}</span> </p>
                    </div>
                   )    
                })}
            </div>
            <button className='bg-[#ffa51a] py-4 px-8 mb-4 rounded-md' {...props}> NEW GAME</button>
        </div>
    </div>
    
  );
}
