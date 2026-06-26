import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, CheckCircle2, ChevronRight, RotateCcw, 
  Database, Film
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export default function Lesson4({ onComplete }: { onComplete: (xp: number) => void }) {
  // Playground State: Dataset training
  const [dataSize, setDataSize] = useState<number>(100);
  const [trainingAccuracy, setTrainingAccuracy] = useState<number>(50);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [progressVal, setProgressVal] = useState<number>(0);

  const startTraining = () => {
    setIsTraining(true);
    setProgressVal(0);
    const interval = setInterval(() => {
      setProgressVal(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          // Accuracy climbs based on dataSize
          const baseAccuracy = 55;
          const boost = Math.round((dataSize / 5000) * 40);
          setTrainingAccuracy(Math.min(99, baseAccuracy + boost));
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  // Movie recommendation project state
  const [searchGenre, setSearchGenre] = useState<string>('action');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  
  const movieDatabase: Record<string, string[]> = {
    action: ["The Dark Knight 🦇", "Avengers: Endgame 🛡️", "Naruto: The Last 🦊", "Mad Max: Fury Road 🏎️"],
    comedy: ["Superbad 🕶️", "Free Guy 🎮", "The Hangover 🍻", "Kung Fu Hustle 🥋"],
    scifi: ["Interstellar 🚀", "The Matrix 🕶️", "Inception 🌀", "WALL-E 🤖"],
    romance: ["Your Name ☄️", "About Time ⏰", "La La Land 🎹", "Weathering With You ⛅"]
  };

  const getRecommendations = () => {
    const list = movieDatabase[searchGenre] || [];
    setRecommendations(list);
  };

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Completion state
  const [lessonFinished, setLessonFinished] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the primary difference in input/outputs between Traditional Programming and Machine Learning?",
      options: [
        "Traditional Programming gets Data + Answers to learn Rules; ML gets Rules + Data to yield Answers.",
        "Traditional Programming gets Rules + Data to yield Answers; ML gets Data + Answers to learn Rules.",
        "Traditional Programming uses Python, while ML uses binary code.",
        "There is no difference."
      ],
      answer: 1,
      explanation: "In traditional coding, you write the rules yourself. In ML, you feed inputs and expected outcomes to let the algorithm construct the rules."
    },
    {
      id: 2,
      question: "Which type of learning involves training a model on data that has already been labeled with correct answers?",
      options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Self-Directed Learning"],
      answer: 0,
      explanation: "Supervised Learning relies on datasets containing labeled inputs (e.g. email body tagged as 'spam' or 'legit')."
    },
    {
      id: 3,
      question: "What is 'Clustering' in Unsupervised Learning?",
      options: [
        "Grouping data points into segments based on similarity without pre-existing labels.",
        "Adding correct tags to a dataset.",
        "Forcing the model to run faster on GPU.",
        "Clearing unused files from the memory cache."
      ],
      answer: 0,
      explanation: "Clustering finds hidden structures in unlabeled datasets, grouping similar instances together automatically."
    },
    {
      id: 4,
      question: "What does Reinforcement Learning rely on to train an agent?",
      options: [
        "A database of spreadsheets.",
        "A system of rewards (points) and penalties (mistakes) to learn strategies.",
        "Strict If/Else logic statements.",
        "Human teachers manually adjusting code every step."
      ],
      answer: 1,
      explanation: "Reinforcement Learning trains an agent through trial-and-error feedback (rewards/punishments), common in games and robotics."
    },
    {
      id: 5,
      question: "Which of the following is a classic example of Unsupervised Learning?",
      options: [
        "Predicting house prices from square footage.",
        "Customer segmentation for marketing campaigns.",
        "Classifying emails as spam or ham.",
        "Self-driving cars learning to avoid lane lines."
      ],
      answer: 1,
      explanation: "Customer segmentation groups buyers by behavior patterns without predefined tags, which is unsupervised clustering."
    },
    {
      id: 6,
      question: "In the ML workflow, what should you do right after collecting data?",
      options: ["Train the model", "Clean the data", "Deploy to production", "Run the quiz"],
      answer: 1,
      explanation: "Data cleanup (removing duplicates, handling missing values, standardizing formats) is essential before feeding it to your model."
    },
    {
      id: 7,
      question: "In our Pokémon analogy, training Pokémon to learn attacks represents what?",
      options: ["Deploying a container", "Training an ML model on dataset rules", "Purchasing a faster GPU", "Writing a database query"],
      answer: 1,
      explanation: "Training a Pokémon with trials and battles represents training a machine learning model to optimize performance on observations."
    },
    {
      id: 8,
      question: "Why is 'Garbage In, Garbage Out' a major rule in ML?",
      options: [
        "If you throw your hardware in the trash, the code will fail.",
        "If you train a model with noisy, incomplete, or biased data, its predictions will be terrible.",
        "Models need physical garbage data to learn about recycling.",
        "It refers only to delete commands."
      ],
      answer: 1,
      explanation: "An algorithm only learns from what you give it. Dirty data guarantees incorrect predictions."
    },
    {
      id: 9,
      question: "What is 'Overfitting' in Machine Learning?",
      options: [
        "The model is too large for the computer storage.",
        "The model memorizes the training data so perfectly that it fails to generalize to new, unseen data.",
        "A tool that fits images into small boxes.",
        "The GPU getting too hot."
      ],
      answer: 1,
      explanation: "Overfitting happens when a model learns noise in the training set too well, making it perform poorly on real-world test inputs."
    },
    {
      id: 10,
      question: "Self-driving cars navigating complex streets typically use which learning method?",
      options: ["Unsupervised Learning", "Supervised Learning", "Reinforcement Learning", "Static logic trees"],
      answer: 2,
      explanation: "Self-driving systems rely heavily on Reinforcement Learning (along with Supervised vision models) to learn steering policies through simulations."
    },
    {
      id: 11,
      question: "How does YouTube recommend videos you might want to watch next?",
      options: [
        "Employees manually curate a list for you.",
        "Recommendation engines using ML algorithms analyze your history and similar user behaviors.",
        "A randomized number generator chooses.",
        "It only suggests videos with the letter 'Y'."
      ],
      answer: 1,
      explanation: "YouTube uses machine learning models (collaborative filtering and deep neural nets) to match patterns in your watch history with videos watched by similar users."
    },
    {
      id: 12,
      question: "Which of these is NOT a type of Machine Learning?",
      options: ["Supervised Learning", "Unsupervised Learning", "Logic Gates Learning", "Reinforcement Learning"],
      answer: 2,
      explanation: "Logic Gates are basic physical circuitry, not categories of Machine Learning algorithms."
    },
    {
      id: 13,
      question: "What is the training dataset?",
      options: [
        "The final database deployed in production.",
        "The sample of data used to fit and train the model weights.",
        "The code that builds the webpage.",
        "The answers you write in a quiz."
      ],
      answer: 1,
      explanation: "The training dataset is the initial data given to the model, from which it extracts structural patterns and sets parameter values."
    },
    {
      id: 14,
      question: "In the funny key analogy, how does ML predict you'll forget your keys tomorrow?",
      options: [
        "It reads your mind.",
        "It uses historical data of how often you forgot them in the past.",
        "It guesses randomly.",
        "It uses a calendar API."
      ],
      answer: 1,
      explanation: "ML analyzes past historical patterns (e.g. forgetting keys on 4 out of 5 Mondays) to make a probabilistic prediction."
    },
    {
      id: 15,
      question: "What XP reward does completing Lesson 4 unlock?",
      options: ["100 XP", "200 XP", "300 XP", "350 XP"],
      answer: 3,
      explanation: "Completing Lesson 4 grants +350 XP and unlocks the 'ML Explorer' badge!"
    }
  ];

  const handleQuizAnswer = (qId: number, optionIdx: number) => {
    if (showQuizResults) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const submitQuiz = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.answer) {
        score++;
      }
    });
    setQuizScore(score);
    setShowQuizResults(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setShowQuizResults(false);
    setQuizScore(0);
  };

  const claimXP = () => {
    setLessonFinished(true);
    onComplete(350);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      {/* Hero Header */}
      <div className="relative p-8 rounded-3xl overflow-hidden glass-panel">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Database className="w-3.5 h-3.5" /> Core Concepts • Lesson 4
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            🤖 Machine Learning – How Computers Learn
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl font-light">
            How does YouTube know what video you'll watch next? Let's discover how machines learn rules directly from data instead of relying on manually written code.
          </p>
        </div>
      </div>

      {/* Hook */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          🎬 The Hook
        </h3>
        <p className="text-slate-300 leading-relaxed">
          How does YouTube recommend the perfect video right when you open the app? Hint: It isn't human editors working 24/7. It is algorithms learning your preferences directly from your watch history.
        </p>
      </div>

      {/* Objectives */}
      <div className="p-6 rounded-2xl glass-panel space-y-3">
        <h3 className="text-white font-semibold text-lg flex items-center gap-2">
          🎯 Learning Objectives
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-300">
          <li className="flex items-center gap-2">⚙️ Differentiate Rules vs Data learning paradigms</li>
          <li className="flex items-center gap-2">📂 Master Supervised, Unsupervised & Reinforcement Learning</li>
          <li className="flex items-center gap-2">📈 Understand model training workflows</li>
          <li className="flex items-center gap-2">🛠️ Tweak dataset sizes to optimize accuracy</li>
        </ul>
      </div>

      {/* What is Machine Learning? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          🤖 What is Machine Learning?
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          In normal programming, you write the rules (e.g. If/Else clauses) and input the data, and the computer computes the answer. In **Machine Learning**, you input the data and the correct answers, and the computer **learns the rules automatically**.
        </p>

        <div className="p-6 rounded-2xl bg-[#0d1117] border border-slate-800 font-mono text-xs overflow-x-auto text-emerald-400 leading-relaxed">
{`   [ Traditional Programming ]
   Rules (Code) + Data ───► [ Computer ] ───► Answers

   [ Machine Learning ]
   Data + Expected Answers ───► [ ML Algorithm ] ───► Learned Rules (Model)`}
        </div>
      </section>

      {/* Why Do We Need ML? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">🚀 Why Do We Need Machine Learning?</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Imagine writing an If/Else chain to recognize hand-written numbers. Every person writes '7' or '3' differently. You'd have to write millions of hardcoded pixel checks to cover every shape! With ML, you simply show the model 60,000 pictures of numbers, and it figures out the features itself.
        </p>
      </section>

      {/* Types of Machine Learning */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">📂 The Three Branches of Machine Learning</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-panel space-y-3 border-t-4 border-t-cyan-400">
            <h4 className="text-white font-bold text-base">1. Supervised Learning</h4>
            <p className="text-xs text-slate-400 uppercase font-mono">The Teacher Method</p>
            <p className="text-xs text-slate-300">
              You give the model inputs labeled with correct answers (e.g. photos labeled 'Dog' or 'Cat'). It learns parameters to map inputs to those labels.
            </p>
            <p className="text-[10px] text-cyan-400 italic">Examples: House Price Forecast, Spam filter</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel space-y-3 border-t-4 border-t-purple-500">
            <h4 className="text-white font-bold text-base">2. Unsupervised Learning</h4>
            <p className="text-xs text-slate-400 uppercase font-mono">The Explorer Method</p>
            <p className="text-xs text-slate-300">
              You feed unlabeled data and let the model find hidden patterns and clusters itself.
            </p>
            <p className="text-[10px] text-purple-400 italic">Examples: Customer Segments, Recommendation groups</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel space-y-3 border-t-4 border-t-amber-500">
            <h4 className="text-white font-bold text-base">3. Reinforcement Learning</h4>
            <p className="text-xs text-slate-400 uppercase font-mono">The Trial & Error Method</p>
            <p className="text-xs text-slate-300">
              An agent interacts with an environment, receiving points (rewards) for success and penalties for errors.
            </p>
            <p className="text-[10px] text-amber-400 italic">Examples: Robotics, Chess AI, Autopilot</p>
          </div>
        </div>
      </section>

      {/* ML Workflow */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">⚙️ The Machine Learning Workflow</h2>
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4 text-sm text-slate-300 font-mono text-xs leading-relaxed">
{`   [ Define Problem ] 
           │
           ▼
     [ Collect Data ] ───► (Gathering pictures, statistics, or logs)
           │
           ▼
     [ Clean Data ] ───► (Discarding corrupted values, standardizing files)
           │
           ▼
     [ Train Model ] ───► (Feeding clean datasets through ML algorithms)
           │
           ▼
     [ Test Model ] ───► (Evaluating accuracy against fresh verification test data)
           │
           ▼
     [ Deploy & Improve ]`}
        </div>
      </section>

      {/* Anime Analogies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          🎌 Anime & Movie Analogies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚡</span>
              <div>
                <h4 className="text-white font-semibold">Pokémon: Battle Training</h4>
                <p className="text-xs text-slate-400">Optimization Loops</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">
              To defeat gym leaders, you train your Pokémon against wild opponents. It tries attacks, gains experience, and refines its move pool. This represents training weights in an ML model—running loops of dataset predictions to optimize accuracy.
            </p>
          </div>
          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🕶️</span>
              <div>
                <h4 className="text-white font-semibold">The Matrix: Instant Skills</h4>
                <p className="text-xs text-slate-400">Dataset Loading</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">
              Neo gets loaded with Helicopter flight programs instantly. In ML, pre-training models involves loading massive clean parameter state weights (like downloading base models) to gain functional capabilities instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Playground: Accuracy vs Data size */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🎮 Interactive: Model Training Playground
          </h2>
          <span className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20 font-mono">
            Sandbox Widget
          </span>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-6">
          <p className="text-sm text-slate-300">
            Tweak the **Dataset Size** slider. Observe how larger sets yield higher prediction accuracy, but take longer to process!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 block uppercase tracking-wider">
                  Dataset Size (Rows): {dataSize}
                </label>
                <input 
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={dataSize}
                  onChange={(e) => setDataSize(Number(e.target.value))}
                  disabled={isTraining}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <button
                onClick={startTraining}
                disabled={isTraining}
                className="w-full py-2 bg-cyan-400 text-slate-950 font-bold rounded-lg text-sm hover:bg-cyan-300 transition-colors disabled:opacity-50"
              >
                {isTraining ? `Training model (${progressVal}%)...` : "Start Training"}
              </button>
            </div>

            <div className="flex flex-col justify-center space-y-4 p-4 bg-slate-950/40 rounded-xl border border-slate-800">
              <div className="text-center">
                <div className="text-xs text-slate-400 uppercase tracking-wider">Model Accuracy</div>
                <div className="text-5xl font-black text-cyan-400 mt-1">{trainingAccuracy}%</div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <motion.div 
                  className="bg-cyan-400 h-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${trainingAccuracy}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="text-center text-xs text-slate-400">
                {isTraining ? "Adjusting linear values on training vectors..." : "Model ready for predictions."}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Sandbox Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          💻 React + TypeScript Code Example
        </h2>
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <p className="text-sm text-slate-300">
            Below is a React component demonstrating a mock prediction simulation. Drag parameters to predict prices:
          </p>

          <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0d1117]">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
              <span className="text-xs font-mono text-slate-400">PricePredictor.tsx</span>
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20 font-semibold uppercase">
                Prediction Simulation
              </span>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`import React, { useState } from 'react';

export const PricePredictor: React.FC = () => {
  const [rooms, setRooms] = useState<number>(3);
  
  // A simple linear regression equation (Price = base + rooms * multiplier)
  const predictPrice = (roomCount: number) => {
    const basePrice = 50000;
    const roomMultiplier = 25000;
    return basePrice + roomCount * roomMultiplier;
  };

  return (
    <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
      <h4 className="text-xs text-slate-400">INPUT: ROOM COUNT</h4>
      <input 
        type="number" 
        value={rooms} 
        onChange={(e) => setRooms(Math.max(1, Number(e.target.value)))} 
        className="bg-slate-900 border border-slate-800 text-white rounded p-1 text-xs mt-1"
      />
      <div className="mt-3 text-xs text-cyan-400 font-bold">
        Predicted Value: \$\${predictPrice(rooms).toLocaleString()}
      </div>
    </div>
  );
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Mini Project: Movie Recommendation App */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🚀 Mini Project: Build a Movie Recommendation Engine
          </h2>
          <span className="text-xs px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 font-mono">
            App Demo
          </span>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <p className="text-sm text-slate-300">
            Select your favorite genre, and let our pattern matching simulator recommend films that share high structural correlation index scores:
          </p>

          <div className="flex gap-2">
            <select
              value={searchGenre}
              onChange={(e) => setSearchGenre(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="action">Action & Adventure</option>
              <option value="comedy">Comedy & Fun</option>
              <option value="scifi">Sci-Fi & Cyberpunk</option>
              <option value="romance">Romance & Anime Drama</option>
            </select>
            <button
              onClick={getRecommendations}
              className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg text-xs transition-colors"
            >
              Get Recommendations
            </button>
          </div>

          {recommendations.length > 0 && (
            <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 space-y-2">
              <div className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Film className="w-3.5 h-3.5 text-purple-400" /> RECOMMENDED FOR YOU:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {recommendations.map((movie, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-slate-950/60 border border-slate-900 text-xs text-white">
                    {movie}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          ⚠️ Common Mistakes
        </h2>
        <div className="space-y-3">
          {[
            {
              title: "Assuming ML is magic",
              desc: "Machine Learning is advanced statistics. It works entirely on identifying numeric correlation patterns inside data."
            },
            {
              title: "Garbage In, Garbage Out",
              desc: "Feeding messy, incomplete, or biased datasets into models will guarantee bad, inaccurate predictions."
            },
            {
              title: "Ignoring Overfitting",
              desc: "Making your model memorize training parameters too tightly will cause it to perform horribly in real-world environments."
            },
            {
              title: "Confusing Supervised vs Unsupervised learning",
              desc: "Always remember: Supervised requires labeled correct outputs; Unsupervised explorer models find groups on unlabeled assets."
            },
            {
              title: "Underestimating the work to clean data",
              desc: "Most ML engineers spend 80% of their time cleaning and organizing raw data files, and only 20% training models."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex gap-3">
              <span className="text-rose-500 font-bold">{idx + 1}.</span>
              <div>
                <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                <p className="text-xs text-slate-300 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          📝 Check Your Understanding (Quiz)
        </h2>

        <div className="p-6 rounded-2xl glass-panel space-y-6">
          {quizQuestions.map((q) => (
            <div key={q.id} className="space-y-3">
              <div className="text-sm font-semibold text-white">
                {q.id}. {q.question}
              </div>
              <div className="grid grid-cols-1 gap-2">
                {q.options.map((option, idx) => {
                  const isSelected = quizAnswers[q.id] === idx;
                  const isCorrect = q.answer === idx;
                  
                  let optionClass = "bg-slate-950/40 hover:bg-slate-900 border-slate-800 text-slate-300";
                  if (isSelected) {
                    optionClass = "bg-cyan-500/20 border-cyan-500/50 text-cyan-200";
                  }
                  if (showQuizResults) {
                    if (isCorrect) {
                      optionClass = "bg-emerald-500/20 border-emerald-500/50 text-emerald-300";
                    } else if (isSelected) {
                      optionClass = "bg-rose-500/20 border-rose-500/50 text-rose-300";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(q.id, idx)}
                      disabled={showQuizResults}
                      className={`w-full p-3 rounded-lg border text-left text-xs transition-all ${optionClass}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {showQuizResults && (
                <div className="text-xs text-slate-400 mt-1 bg-slate-950/30 p-2.5 rounded-lg">
                  💡 <span className="font-semibold text-slate-300">Explanation:</span> {q.explanation}
                </div>
              )}
            </div>
          ))}

          <div className="flex gap-4">
            {!showQuizResults ? (
              <button
                onClick={submitQuiz}
                disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-lg text-sm transition-colors disabled:opacity-50"
              >
                Submit Quiz
              </button>
            ) : (
              <div className="flex gap-4 items-center w-full justify-between">
                <div className="text-sm font-semibold text-white">
                  Score: <span className="text-cyan-400 font-bold text-lg">{quizScore} / {quizQuestions.length}</span>
                </div>
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg text-sm transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Retake
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lesson Summary */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">📝 Summary: 15 Key Takeaways</h2>
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
            <li>Machine Learning enables computers to construct mathematical rules from data.</li>
            <li>In ML, you feed Data + Answers to generate Rules.</li>
            <li>Traditional coding requires humans to write rules manually.</li>
            <li>Supervised Learning trains on datasets labeled with correct answers.</li>
            <li>Unsupervised Learning uncovers hidden clusters in unlabeled datasets.</li>
            <li>Reinforcement Learning relies on feedback loops of rewards and penalties.</li>
            <li>ML workflows always start with problem definitions and data collection.</li>
            <li>Data cleanup is critical, taking up most of the development lifecycle.</li>
            <li>Noisy or biased datasets yield bad predictions (Garbage In, Garbage Out).</li>
            <li>Overfitting is when a model memorizes training noise and fails on new data.</li>
            <li>YouTube and Netflix suggestion systems run on collaborative ML algorithms.</li>
            <li>Linear regression predicts numeric targets using mathematical weights.</li>
            <li>Training loops adjust coefficients to minimize prediction errors.</li>
            <li>Pre-training transfers base parameter weights to kickstart models.</li>
            <li>Generalization to fresh inputs is the gold standard of ML.</li>
          </ul>
        </div>
      </section>

      {/* XP Reward & Next Lesson */}
      <div className="p-8 rounded-3xl glass-panel text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/5 to-purple-500/5 pointer-events-none" />
        
        {!lessonFinished ? (
          <div className="space-y-4">
            <Award className="w-16 h-16 text-cyan-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold text-white">Lesson 4 Completed!</h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto">
              You have mastered the foundations of Machine Learning. Ready to claim your experience points?
            </p>
            <button
              onClick={claimXP}
              className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-bold rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Claim +350 XP & Unlock Badge
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white">🏆 Badge Unlocked: ML Explorer</h3>
            <p className="text-emerald-400 font-semibold">+350 XP Awarded</p>
            <div className="pt-4 max-w-xs mx-auto">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">Next up:</div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center text-left">
                <div>
                  <h4 className="text-sm font-semibold text-white">Lesson 5: Deep Learning</h4>
                  <p className="text-xs text-slate-400">Neural networks and human brain modeling</p>
                </div>
                <ChevronRight className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
