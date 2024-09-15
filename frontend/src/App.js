import React, { useState, useEffect } from "react";

function App() {
const [questionIndex, setQuestionIndex] = useState(0); // 現在の問題のインデックス
const [question, setQuestion] = useState(null);
const [selectedOption, setSelectedOption] = useState("");
const [result, setResult] = useState(null);

useEffect(() => {
    fetch(`http://127.0.0.1:8000/question/${questionIndex}`)
    .then(response => response.json())
    .then(data => {
        setQuestion(data);
        setResult(null); // 次の問題に進んだ際にリセット
        setSelectedOption(""); // 選択肢もリセット
    })
    .catch(error => console.error("Error fetching question:", error));
}, [questionIndex]); // questionIndex が変わるたびに新しい問題を取得

const handleSubmit = () => {
    if (selectedOption === question.answer) {
    setResult("正解です！");
    } else {
    setResult("不正解です。");
    }
};

const handleNextQuestion = () => {
    setQuestionIndex((prevIndex) => prevIndex + 1); // 次の問題へ
};

if (!question) return <div>Loading...</div>;

return (
    <div className="App">
    <h1>{question.question}</h1>
    <div>
        {question.options.map((option, index) => (
        <div key={index}>
            <label>
            <input
                type="radio"
                name="options"
                value={option}
                checked={selectedOption === option}
                onChange={(e) => setSelectedOption(e.target.value)}
            />
            {option}
            </label>
        </div>
        ))}
    </div>
    <button onClick={handleSubmit}>答え合わせ</button>

    {result && (
        <div>
        <h2>{result}</h2>
        <button onClick={handleNextQuestion}>次の問題へ</button>
        </div>
    )}
    </div>
);
}

export default App;
