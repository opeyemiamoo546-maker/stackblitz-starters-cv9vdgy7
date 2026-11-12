
"use client";

import { useMemo, useState } from "react";

type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
  questions: number;
  used: number;
  limit: number;
};

const initialCategories: Category[] = [
  {
    id: "general",
    name: "General Knowledge",
    description: "Test your knowledge of everyday facts and interesting topics.",
    icon: "🧠",
    questions: 120,
    used: 2,
    limit: 10,
  },
  {
    id: "science",
    name: "Science",
    description: "Explore discoveries, nature, physics and scientific facts.",
    icon: "🔬",
    questions: 85,
    used: 1,
    limit: 10,
  },
  {
    id: "history",
    name: "History",
    description: "Discover important events, people and civilizations.",
    icon: "📜",
    questions: 95,
    used: 0,
    limit: 10,
  },
  {
    id: "technology",
    name: "Technology",
    description: "Challenge yourself with computers, AI and innovation.",
    icon: "💻",
    questions: 75,
    used: 3,
    limit: 10,
  },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Questions about movies, music, celebrities and culture.",
    icon: "🎬",
    questions: 100,
    used: 0,
    limit: 10,
  },
  {
    id: "sports",
    name: "Sports",
    description: "Football, basketball and other sporting competitions.",
    icon: "🏆",
    questions: 110,
    used: 1,
    limit: 10,
  },
];

const questions = [
  {
    question: "What is the capital city of France?",
    options: ["London", "Paris", "Rome", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Saturn"],
    answer: "Mars",
  },
  {
    question: "Who invented the World Wide Web?",
    options: [
      "Bill Gates",
      "Steve Jobs",
      "Tim Berners-Lee",
      "Mark Zuckerberg",
    ],
    answer: "Tim Berners-Lee",
  },
  {
    question: "How many continents are there?",
    options: ["Five", "Six", "Seven", "Eight"],
    answer: "Seven",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Pacific Ocean",
      "Arctic Ocean",
    ],
    answer: "Pacific Ocean",
  },
];

export default function TriviaPage() {
  const [categories, setCategories] =
    useState(initialCategories);

  const [energy, setEnergy] = useState(10);
  const [dailyAnswers, setDailyAnswers] = useState(7);
  const [lastScore, setLastScore] = useState(0);
  const [lastCategory, setLastCategory] = useState("");
  const [round, setRound] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showEnergyInfo, setShowEnergyInfo] = useState(false);

  const randomCategory = useMemo(() => ({
    id: "random",
    name: "Random Mix",
    description: "A surprise selection of questions from different categories.",
    icon: "🎲",
    questions: 150,
    used: 0,
    limit: 10,
  }), []);

  const currentQuestion = questions[questionIndex];

  const startRound = (category: Category) => {
    if (energy < 1) {
      alert("You don't have enough Energy to start a round.");
      return;
    }

    if (dailyAnswers >= 10) {
      alert("You have reached your daily answer limit.");
      return;
    }

    if (category.id !== "random") {
      const current = categories.find(
        (item) => item.id === category.id
      );

      if (current && current.used >= current.limit) {
        alert("You have reached this category's daily limit.");
        return;
      }
    }

    setEnergy((value) => value - 1);
    setSelectedCategory(category.name);
    setQuestionIndex(0);
    setScore(0);
    setSelectedAnswer("");
    setAnswered(false);
    setFinished(false);
    setRound(true);

    if (category.id !== "random") {
      setCategories((items) =>
        items.map((item) =>
          item.id === category.id
            ? { ...item, used: item.used + 1 }
            : item
        )
      );
    }
  };

  const submitAnswer = () => {
    if (!selectedAnswer || answered) return;

    const correct =
      selectedAnswer === currentQuestion.answer;

    if (correct) {
      setScore((value) => value + 1);
    }

    setAnswered(true);
  };

  const nextQuestion = () => {
    setDailyAnswers((value) => value + 1);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((value) => value + 1);
      setSelectedAnswer("");
      setAnswered(false);
    } else {
      const finalScore =
        score +
        (selectedAnswer === currentQuestion.answer ? 1 : 0);

      setLastScore(finalScore);
      setLastCategory(selectedCategory);
      setFinished(true);
    }
  };

  const closeRound = () => {
    setRound(false);
    setFinished(false);
  };

  const refillEnergy = () => {
    setEnergy((value) => Math.min(value + 3, 10));
    setShowEnergyInfo(false);
  };

  const allCategories = [...categories, randomCategory];

  return (
    <main className="trivia-page">

      <header className="topbar">
        <div className="brand">
          <span className="brand-icon">🧠</span>
          <span>TRIVIA<span className="brand-dot">.</span></span>
        </div>

        <div className="topbar-right">
          <span className="demo-label">DEMO MODE</span>
          <div className="profile-avatar">U</div>
        </div>
      </header>

      <div className="page-container">

        <section className="hero">
          <div>
            <span className="eyebrow">
              KNOWLEDGE & REWARDS
            </span>

            <h1>
              Test your <span>knowledge.</span>
            </h1>

            <p>
              Answer questions, build your score and
              challenge yourself with Trivia.
            </p>
          </div>

          <div className="hero-badge">
            <span>🧠</span>
            <strong>Trivia</strong>
          </div>
        </section>

        <section className="stats-grid">

          <article className="stat-card energy-card">
            <div className="stat-heading">
              <span className="stat-icon">⚡</span>
              <span>Energy</span>
            </div>

            <div className="stat-number">{energy}</div>

            <p>Available energy for starting a Trivia round.</p>

            <button
              className="energy-button"
              onClick={() => setShowEnergyInfo(true)}
            >
              ⚡ Get demo Energy
            </button>

            <small>
              Demo refill only. No real rewards are credited.
            </small>
          </article>

          <article className="stat-card">
            <div className="stat-heading">
              <span className="stat-icon">✓</span>
              <span>Today's answers</span>
            </div>

            <div className="stat-number">
              {dailyAnswers}
              <small> / 10</small>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${dailyAnswers * 10}%`,
                }}
              />
            </div>

            <p>{10 - dailyAnswers} answers remaining today.</p>
          </article>

          <article className="stat-card">
            <div className="stat-heading">
              <span className="stat-icon">🏆</span>
              <span>Last round</span>
            </div>

            <div className="stat-number">
              {lastScore}
              <small> / 5</small>
            </div>

            <p>
              {lastCategory || "No completed round yet"}
            </p>
          </article>

        </section>

        <section className="notice">
          <span className="notice-icon">⚡</span>
          <div>
            <strong>Choose your Trivia challenge</strong>
            <p>
              Select a category, answer questions and
              improve your score.
            </p>
          </div>
        </section>

        <section className="categories-section">

          <div className="section-heading">
            <div>
              <span className="eyebrow">
                CHOOSE YOUR CHALLENGE
              </span>
              <h2>Pick a category</h2>
            </div>

            <p>
              You can use your available Energy to start a round.
            </p>
          </div>

          <div className="category-grid">

            {allCategories.map((category) => {
              const isRandom = category.id === "random";
              const percentage = category.limit
                ? (category.used / category.limit) * 100
                : 0;

              const limitReached =
                !isRandom &&
                category.used >= category.limit;

              const disabled =
                energy < 1 ||
                dailyAnswers >= 10 ||
                limitReached;

              return (
                <article
                  className={`category-card ${disabled ? "disabled" : ""}`}
                  key={category.id}
                >
                  <div className="category-top">
                    <div className="category-icon">
                      {category.icon}
                    </div>

                    <div className="question-count">
                      {isRandom ? "Mixed" : `${category.questions}+`}
                      <small>
                        {isRandom ? "pool" : "questions"}
                      </small>
                    </div>
                  </div>

                  <div className="category-content">
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                  </div>

                  {!isRandom && (
                    <div className="category-progress">
                      <div className="progress-label">
                        <span>Today's usage</span>
                        <strong>
                          {category.used} / {category.limit}
                        </strong>
                      </div>

                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      <small>{Math.round(percentage)}%</small>
                    </div>
                  )}

                  <button
                    className="start-button"
                    disabled={disabled}
                    onClick={() => startRound(category)}
                  >
                    {limitReached
                      ? "Daily limit reached"
                      : energy < 1
                      ? "No energy"
                      : dailyAnswers >= 10
                      ? "Daily quota reached"
                      : "Start round →"}
                  </button>
                </article>
              );
            })}

          </div>
        </section>

        {lastCategory && (
          <section className="last-round">
            <span className="last-icon">🏆</span>

            <div>
              <small>YOUR LAST ROUND</small>
              <strong>{lastCategory}</strong>
            </div>

            <div className="last-score">
              <strong>{lastScore}/5</strong>
              <small>correct</small>
            </div>
          </section>
        )}

        <footer>
          ◷ Read each question carefully and choose your answer.
        </footer>

      </div>

      {showEnergyInfo && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="close-button"
              onClick={() => setShowEnergyInfo(false)}
            >
              ×
            </button>

            <span className="modal-icon">⚡</span>
            <h2>Demo Energy Refill</h2>
            <p>
              This is a local preview. You can add 3 demo
              Energy points to test the Trivia interface.
              This does not connect to a real rewarded ad.
            </p>

            <button
              className="primary-button"
              onClick={refillEnergy}
            >
              Add 3 Energy
            </button>
          </div>
        </div>
      )}

      {round && (
        <div className="modal-overlay">
          <div className="quiz-modal">

            {!finished ? (
              <>
                <div className="quiz-header">
                  <div>
                    <small>TRIVIA CHALLENGE</small>
                    <h2>{selectedCategory}</h2>
                  </div>

                  <button
                    className="close-button"
                    onClick={closeRound}
                  >
                    ×
                  </button>
                </div>

                <div className="quiz-meta">
                  <span>
                    Question {questionIndex + 1} of 5
                  </span>
                  <span>⚡ {energy} Energy</span>
                </div>

                <div className="progress-track quiz-progress">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${((questionIndex + 1) / 5) * 100}%`,
                    }}
                  />
                </div>

                <h3 className="question-title">
                  {currentQuestion.question}
                </h3>

                <div className="answer-options">
                  {currentQuestion.options.map((option) => {
                    let className = "answer-option";

                    if (selectedAnswer === option) {
                      className += " selected";
                    }

                    if (answered && option === currentQuestion.answer) {
                      className += " correct";
                    } else if (
                      answered &&
                      selectedAnswer === option
                    ) {
                      className += " incorrect";
                    }

                    return (
                      <button
                        key={option}
                        className={className}
                        disabled={answered}
                        onClick={() => setSelectedAnswer(option)}
                      >
                        {option}
                        {answered &&
                          option === currentQuestion.answer &&
                          " ✓"}
                      </button>
                    );
                  })}
                </div>

                {answered && (
                  <p className="feedback">
                    {selectedAnswer === currentQuestion.answer
                      ? "✓ Correct answer!"
                      : `✗ Correct answer: ${currentQuestion.answer}`}
                  </p>
                )}

                {!answered ? (
                  <button
                    className="primary-button"
                    disabled={!selectedAnswer}
                    onClick={submitAnswer}
                  >
                    Submit answer
                  </button>
                ) : (
                  <button
                    className="primary-button"
                    onClick={nextQuestion}
                  >
                    {questionIndex === 4
                      ? "Finish round"
                      : "Next question →"}
                  </button>
                )}
              </>
            ) : (
              <div className="result-content">
                <span className="result-icon">🏆</span>
                <small>ROUND COMPLETED</small>
                <h2>Well played!</h2>
                <div className="result-score">
                  {score}<small>/5</small>
                </div>
                <p>
                  You answered {score} out of 5 questions correctly
                  in {selectedCategory}.
                </p>
                <button
                  className="primary-button"
                  onClick={closeRound}
                >
                  Back to Trivia
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #0b1020;
          color: #f5f6fa;
          font-family: Arial, Helvetica, sans-serif;
        }

        button {
          font: inherit;
        }

        .trivia-page {
          min-height: 100vh;
          background: #0b1020;
        }

        .topbar {
          height: 76px;
          padding: 0 7%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #222b40;
          background: #10172a;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 20px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .brand-icon {
          font-size: 27px;
        }

        .brand-dot {
          color: #a78bfa;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .demo-label {
          color: #bca6ff;
          background: #281e48;
          border: 1px solid #49367a;
          border-radius: 20px;
          padding: 7px 12px;
          font-size: 10px;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .profile-avatar {
          width: 37px;
          height: 37px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #7253c5;
          font-weight: bold;
        }

        .page-container {
          width: min(1200px, 88%);
          margin: auto;
          padding: 55px 0;
        }

        .hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
          margin-bottom: 40px;
        }

        .eyebrow {
          color: #a78bfa;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .hero h1 {
          margin: 13px 0;
          font-size: clamp(34px, 5vw, 52px);
          letter-spacing: -2px;
        }

        .hero h1 span {
          color: #a78bfa;
        }

        .hero p, .section-heading p {
          color: #98a4bb;
          line-height: 1.7;
          max-width: 550px;
        }

        .hero-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px 22px;
          border: 1px solid #303b56;
          border-radius: 15px;
          background: #141d33;
        }

        .hero-badge span {
          font-size: 23px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .stat-card {
          background: #141d33;
          border: 1px solid #29344c;
          border-radius: 17px;
          padding: 23px;
          min-width: 0;
        }

        .stat-heading {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #b4bfd1;
          font-size: 14px;
        }

        .stat-icon {
          width: 35px;
          height: 35px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: #28264b;
          color: #c4aaff;
          font-size: 19px;
        }

        .stat-number {
          font-size: 37px;
          font-weight: 800;
          margin: 20px 0 10px;
        }

        .stat-number small {
          font-size: 17px;
          color: #929eb5;
        }

        .stat-card p {
          color: #98a4bb;
          font-size: 13px;
          line-height: 1.6;
        }

        .energy-button {
          width: 100%;
          border: 0;
          padding: 12px;
          border-radius: 9px;
          color: white;
          background: #7655d7;
          cursor: pointer;
          font-weight: 700;
          margin-top: 10px;
        }

        .energy-card > small {
          display: block;
          color: #8190a8;
          font-size: 10px;
          margin-top: 9px;
        }

        .progress-track {
          height: 7px;
          border-radius: 20px;
          background: #2a354b;
          overflow: hidden;
          margin: 15px 0;
        }

        .progress-fill {
          height: 100%;
          border-radius: 20px;
          background: linear-gradient(90deg, #7755d8, #b18aff);
          transition: width .3s;
        }

        .notice {
          display: flex;
          gap: 15px;
          align-items: center;
          padding: 21px;
          margin: 35px 0 55px;
          border: 1px solid #44366d;
          border-radius: 14px;
          background: #1b1832;
        }

        .notice-icon {
          font-size: 25px;
        }

        .notice p {
          color: #a5a7c0;
          font-size: 13px;
          margin-bottom: 0;
          line-height: 1.5;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 20px;
          margin-bottom: 25px;
        }

        .section-heading h2 {
          font-size: 29px;
          margin: 10px 0 0;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .category-card {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 23px;
          background: #141d33;
          border: 1px solid #29344c;
          border-radius: 16px;
          transition: .2s;
        }

        .category-card:hover {
          border-color: #8968e7;
          transform: translateY(-3px);
        }

        .category-card.disabled {
          opacity: .65;
        }

        .category-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .category-icon {
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          background: #272447;
          border-radius: 13px;
          font-size: 25px;
        }

        .question-count {
          font-size: 17px;
          font-weight: 800;
          text-align: right;
        }

        .question-count small {
          display: block;
          color: #8592aa;
          font-size: 10px;
          font-weight: 400;
          margin-top: 4px;
        }

        .category-content {
          flex: 1;
          min-height: 125px;
        }

        .category-content h3 {
          margin: 23px 0 9px;
          font-size: 19px;
        }

        .category-content p {
          color: #98a4bb;
          font-size: 13px;
          line-height: 1.7;
        }

        .category-progress {
          margin: 15px 0;
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          color: #a1aec2;
          font-size: 11px;
        }

        .progress-label strong {
          color: white;
        }

        .category-progress small {
          color: #a78bfa;
          font-size: 11px;
        }

        .start-button, .primary-button {
          width: 100%;
          padding: 14px;
          border: 0;
          border-radius: 9px;
          background: #7655d7;
          color: white;
          font-weight: 700;
          cursor: pointer;
          margin-top: 12px;
          transition: .2s;
        }

        .start-button:hover:not(:disabled),
        .primary-button:hover {
          background: #8969e8;
        }

        .start-button:disabled,
        .primary-button:disabled {
          background: #343d52;
          color: #8792a6;
          cursor: not-allowed;
        }

        .last-round {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 23px;
          margin-top: 35px;
          border: 1px solid #34344e;
          border-radius: 14px;
          background: #171b30;
        }

        .last-icon {
          font-size: 27px;
        }

        .last-round div:nth-child(2) {
          display: grid;
          gap: 7px;
          flex: 1;
        }

        .last-round small {
          color: #a78bfa;
          font-size: 10px;
        }

        .last-score {
          text-align: right;
        }

        .last-score strong {
          display: block;
          font-size: 22px;
        }

        footer {
          text-align: center;
          color: #8491a8;
          font-size: 12px;
          margin-top: 45px;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(3, 6, 16, .85);
          backdrop-filter: blur(7px);
        }

        .modal, .quiz-modal {
          position: relative;
          width: min(520px, 100%);
          max-height: 90vh;
          overflow-y: auto;
          padding: 30px;
          border: 1px solid #3c4560;
          border-radius: 18px;
          background: #151e33;
        }

        .close-button {
          width: 34px;
          height: 34px;
          border: 0;
          border-radius: 50%;
          background: #29344b;
          color: white;
          font-size: 23px;
          cursor: pointer;
        }

        .modal > .close-button {
          position: absolute;
          top: 18px;
          right: 18px;
        }

        .modal-icon {
          display: block;
          font-size: 38px;
          margin-bottom: 18px;
        }

        .modal h2, .quiz-modal h2 {
          margin-top: 0;
        }

        .modal p, .result-content p {
          color: #a2aec2;
          line-height: 1.7;
          font-size: 14px;
        }

        .quiz-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .quiz-header small, .result-content > small {
          color: #ad91ff;
          letter-spacing: 1.5px;
          font-size: 10px;
        }

        .quiz-header h2 {
          margin: 8px 0;
        }

        .quiz-meta {
          display: flex;
          justify-content: space-between;
          color: #a5b0c4;
          font-size: 12px;
          margin-top: 25px;
        }

        .quiz-progress {
          margin: 12px 0 25px;
        }

        .question-title {
          font-size: 21px;
          line-height: 1.5;
          margin-bottom: 22px;
        }

        .answer-options {
          display: grid;
          gap: 11px;
        }

        .answer-option {
          text-align: left;
          padding: 15px;
          border: 1px solid #36435d;
          border-radius: 10px;
          color: white;
          background: #1b2941;
          cursor: pointer;
        }

        .answer-option.selected {
          border-color: #a78bfa;
          background: #30244f;
        }

        .answer-option.correct {
          border-color: #37c98c;
          background: #143c34;
        }

        .answer-option.incorrect {
          border-color: #ed6c75;
          background: #44262f;
        }

        .answer-option:disabled {
          cursor: default;
        }

        .feedback {
          font-size: 13px;
          color: #b5a2ff;
          margin-top: 20px;
        }

        .result-content {
          text-align: center;
          padding: 20px 0;
        }

        .result-icon {
          display: block;
          font-size: 55px;
          margin-bottom: 15px;
        }

        .result-score {
          font-size: 65px;
          font-weight: 900;
          margin: 20px 0;
        }

        .result-score small {
          color: #9ba8bd;
          font-size: 22px;
        }

        @media (max-width: 850px) {
          .category-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .section-heading {
            align-items: start;
            flex-direction: column;
          }
        }

        @media (max-width: 550px) {
          .topbar {
            padding: 0 5%;
          }

          .page-container {
            width: 90%;
            padding: 35px 0;
          }

          .hero {
            align-items: start;
          }

          .hero-badge {
            display: none;
          }

          .category-grid {
            grid-template-columns: 1fr;
          }

          .category-content {
            min-height: auto;
          }

          .modal, .quiz-modal {
            padding: 23px;
          }
        }
      `}</style>
    </main>
  );
}
