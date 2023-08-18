import React, { useState } from "react";

export default function QuizzicalQuesPage(props) {
  const dataLists = props.results;

  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [score, setScore] = useState(null);

  const chooseAnswer = (answer, itemId, index) => {
    const filteredChosenAnswers = chosenAnswers.filter(
      (item) => item.itemId !== itemId
    );

    filteredChosenAnswers.push({ itemId, chosenIndex: index });

    setChosenAnswers(filteredChosenAnswers);

    const updatedDataList = dataList.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          chosenIndex: index,
        };
      }
      return item;
    });

    setDataList(updatedDataList);
  };

  const [dataList, setDataList] = useState(
    dataLists.map((item) => ({ ...item, chosenIndex: -1 }))
  );

  const checkAnswers = () => {
    const updatedDataList = dataList.map((item) => {
      const correctIndex = item.all_answers.indexOf(item.correct_answer);
      return {
        ...item,
        correctIndex,
      };
    });

    setDataList(updatedDataList);

    const correctCount = updatedDataList.filter(
      (item) => item.chosenIndex === item.correctIndex
    ).length;
    setScore(correctCount);
  };

  const resetQuiz = () => {
    console.log("reset quiz");
  };

  return (
    <>
      {dataList && (
        <>
          {dataList.map((item, i) => (
            <div
              className="w-full flex flex-col md:w-1/2 p-4 justify-center items-left"
              key={item.id}
            >
              <h1 className="font-bold text-xl h-15">{item.question}</h1>
              <div className="flex flex-wrap my-3">
                {item.all_answers.map((answers, index) => (
                  <button
                    key={index}
                    onClick={() => chooseAnswer(answers, item.id, index)}
                    id="chAns"
                    className={`bg-gray-300 text-xs uppercase px-2 py-1 rounded-md border border-gray-300 text-teal-600 font-bold inline my-4 mx-2 ${
                      item.chosenIndex === index && item.correctIndex !== index
                        ? "bg-red-500 text-white"
                        : item.correctIndex === index
                        ? "bg-green-500 text-white"
                        : item.chosenIndex === index
                        ? "bg-red-500 text-white"
                        : ""
                    }`}
                    disabled={chosenAnswers.some(
                      (chosen) => chosen.itemId === item.id
                    )}
                  >
                    {answers}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
      <button
        className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-5"
        onClick={score === null ? checkAnswers : resetQuiz}
      >
        {score === null ? "Check answers" : "Play again"}
      </button>
      {score !== null && (
        <div className="mt-3">
          Your score: {score}/{dataList.length}
        </div>
      )}
    </>
  );
}
