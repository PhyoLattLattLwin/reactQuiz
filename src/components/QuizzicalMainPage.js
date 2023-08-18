import React from "react";
import QuizzicalQuesPage from "./QuizzicalQuesPage";
import { nanoid } from "nanoid";

export default function QuizzicalMainPage() {
  // State to store the fetched data
  const [currentPage, setCurrentPage] = React.useState();
  const [data, setData] = React.useState([]);

  // Effect to fetch data when the component mounts
  React.useEffect(() => {
    // Function to fetch data
    async function fetchData() {
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=5`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // Call the fetch function
    fetchData();
  }, []);

  function pageChange() {
    setCurrentPage("ques");
  }

  if (data.results != undefined) {
    // console.log(data);
    // var tmp = JSON.parse(JSON.stringify(data.results));
    data.results.map((item) => {
      var arr = [...item.incorrect_answers]; // Clone
      arr.push(item.correct_answer);
      arr.sort(() => Math.random() - 0.5);
      item.all_answers = arr;
      item.chk = "false";
      item.id = nanoid();
    });
  }
  // console.log(data);

  return (
    <div className="bg-white h-400 max-w-800 rounded-5 p-20 flex flex-col justify-center items-center">
      {currentPage === "ques" && <QuizzicalQuesPage {...data} />}
      {currentPage !== "ques" && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-xl">Quiz Game</h1>
          <button
            onClick={pageChange}
            className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-5"
          >
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
}
