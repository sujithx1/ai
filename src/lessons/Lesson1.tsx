import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Brain, Award, CheckCircle2, ChevronRight, RotateCcw
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export default function Lesson1({ onComplete }: { onComplete: (xp: number) => void }) {
  // Playground state
  const [datasetSize, setDatasetSize] = useState<number>(100);
  const [epochs, setEpochs] = useState<number>(10);
  const [trainingState, setTrainingState] = useState<'idle' | 'training' | 'completed'>('idle');
  const [accuracy, setAccuracy] = useState<number>(0);

  // Mini project state
  const [emailText, setEmailText] = useState<string>('');
  const [classificationResult, setClassificationResult] = useState<{ label: string; score: number; type: 'rule' | 'ml' } | null>(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Completion state
  const [lessonFinished, setLessonFinished] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the primary difference between traditional programming and Machine Learning?",
      options: [
        "Traditional programming is faster, while Machine Learning is slower.",
        "In traditional programming, you write the rules. In Machine Learning, the computer figures out the rules from data.",
        "Traditional programming only works on Windows, while Machine Learning runs on Linux.",
        "Machine Learning does not use any code at all."
      ],
      answer: 1,
      explanation: "Traditional coding relies on 'If/Else' rules written by humans. Machine Learning feeds data and outcomes to the computer, allowing it to generate the rules itself!"
    },
    {
      id: 2,
      question: "Which of the following is the best real-world analogy for training an AI model?",
      options: [
        "Sending an email and waiting for a reply.",
        "Teaching a puppy commands by giving treats for correct behaviors.",
        "Formatting a hard drive to clear all data.",
        "Reading a textbook cover-to-cover without doing any practice exercises."
      ],
      answer: 1,
      explanation: "Just like a puppy learns through repeated practice and positive reinforcement, an AI model adjusts its weights (parameters) when it gets predictions right."
    },
    {
      id: 3,
      question: "What happens when you increase the Dataset Size in training?",
      options: [
        "The model's accuracy generally increases because it has more patterns to learn from.",
        "The model gets confused and accuracy drops to zero.",
        "The computer will always crash.",
        "The training time decreases significantly."
      ],
      answer: 0,
      explanation: "More quality data gives the model more examples to learn the true underlying patterns, which generally leads to higher prediction accuracy."
    },
    {
      id: 4,
      question: "In our Naruto analogy, what represents 'Multiple AI Outputs'?",
      options: [
        "Rasengan",
        "Shadow Clone Jutsu",
        "Nine-Tails Chakra",
        "Sharinggan"
      ],
      answer: 1,
      explanation: "Shadow Clone Jutsu creates multiple copies to search or perform tasks simultaneously, much like running parallel AI generations or outputs."
    },
    {
      id: 5,
      question: "What is Artificial Intelligence (AI) at its most basic level?",
      options: [
        "A robot that is conscious and wants to take over the world.",
        "A system or software that can perform tasks that typically require human intelligence.",
        "A database that stores infinite amounts of text.",
        "A super-fast calculator that only does basic arithmetic."
      ],
      answer: 1,
      explanation: "AI refers to broad systems or algorithms capable of reasoning, learning, and making decisions to solve human-like problems."
    },
    {
      id: 6,
      question: "Which of the following is a classic example of Narrow AI (Weak AI)?",
      options: [
        "A spam filter in your email inbox.",
        "JARVIS from Iron Man.",
        "Skynet from Terminator.",
        "A sentient operating system."
      ],
      answer: 0,
      explanation: "Narrow AI is built and trained for a single specific task, like detecting spam, recommending movies, or recognizing faces."
    },
    {
      id: 7,
      question: "What is the danger of having too small a dataset for training?",
      options: [
        "The model will memorize the few examples (overfitting) and fail on new data.",
        "The computer will use too much electricity.",
        "The dataset will get corrupted.",
        "The AI will become too smart too quickly."
      ],
      answer: 0,
      explanation: "With too little data, the model simply memorizes the inputs rather than understanding the general concept, leading to terrible real-world performance."
    },
    {
      id: 8,
      question: "In the Iron Man analogy, Jarvis represents what type of AI?",
      options: [
        "An AI Assistant",
        "A Cursed Object",
        "A Simple Calculator",
        "A GPU Cluster"
      ],
      answer: 0,
      explanation: "Jarvis acts as Tony Stark's ultimate AI assistant, managing schedules, analyzing data, and automating tasks."
    },
    {
      id: 9,
      question: "Why are rules-based systems (like nested If/Else statements) bad for complex tasks like image recognition?",
      options: [
        "They are illegal to write in modern coding.",
        "You would have to manually write trillions of rules to cover every pixel combination, which is impossible.",
        "If/Else statements cannot run on modern browsers.",
        "They use too many vectors."
      ],
      answer: 1,
      explanation: "Images have millions of variations in lighting, angles, and colors. Writing rules manually for every variation is practically impossible, which is why we let AI learn the features."
    },
    {
      id: 10,
      question: "What is the XP reward you get for completing this first lesson?",
      options: [
        "10 XP",
        "50 XP",
        "100 XP",
        "200 XP"
      ],
      answer: 3,
      explanation: "Completing this lesson unlocks the first badge and awards you +200 XP!"
    }
  ];

  const handleTrain = () => {
    setTrainingState('training');
    setAccuracy(0);
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / epochs;
      // Accuracy increases based on dataset size and epochs
      const targetAccuracy = Math.min(
        98,
        Math.round((datasetSize / (datasetSize + 200)) * 100 + (progress * 15))
      );
      setAccuracy(Math.round(progress * targetAccuracy));

      if (currentStep >= epochs) {
        clearInterval(interval);
        setTrainingState('completed');
      }
    }, 150);
  };

  const handleClassify = () => {
    const text = emailText.toLowerCase();
    
    // Simple Rule-based check
    const hasSpamKeywords = text.includes('free money') || text.includes('win') || text.includes('click here') || text.includes('nigerian prince') || text.includes('lottery');
    
    // Simulating ML prediction
    let mlLabel = 'Legit';
    let mlScore = 0.95;
    
    if (hasSpamKeywords) {
      mlLabel = 'Spam';
      mlScore = 0.99;
    } else if (text.includes('urgent') || text.includes('bank') || text.includes('verify')) {
      // Rule-based might miss this or incorrectly classify, let's show ML capability
      mlLabel = 'Phishing/Spam';
      mlScore = 0.88;
    } else if (text.trim() === '') {
      setClassificationResult(null);
      return;
    }

    setClassificationResult({
      label: mlLabel,
      score: mlScore,
      type: hasSpamKeywords ? 'rule' : 'ml'
    });
  };

  const handleQuizAnswer = (qId: number, optionIdx: number) => {
    if (showQuizResults) return;
    setQuizAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
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
    onComplete(200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      {/* Hero Header */}
      <div className="relative p-8 rounded-3xl overflow-hidden glass-panel">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Core Basics • Lesson 1
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            🚀 What Actually Happens When You Ask ChatGPT a Question?
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl font-light">
            Have you ever wondered how ChatGPT answers in just a few seconds? Let's peel back the curtain and look inside the brain of AI.
          </p>
        </div>
      </div>

      {/* Why Should I Learn This */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl glass-panel space-y-2 border-l-4 border-l-cyan-400">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            💡 Demystify AI
          </h3>
          <p className="text-sm text-slate-300">
            Stop seeing AI as magic. Learn the concrete math and code that powers modern LLMs.
          </p>
        </div>
        <div className="p-6 rounded-2xl glass-panel space-y-2 border-l-4 border-l-purple-500">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            🛠️ Build Better Apps
          </h3>
          <p className="text-sm text-slate-300">
            Knowing how AI thinks helps you write better prompts, configure parameters, and design agent architectures.
          </p>
        </div>
        <div className="p-6 rounded-2xl glass-panel space-y-2 border-l-4 border-l-amber-500">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            💰 Career Evolution
          </h3>
          <p className="text-sm text-slate-300">
            AI engineers are in massive demand. Start your transition from a normal dev to an AI wizard.
          </p>
        </div>
      </div>

      {/* Explain Like I'm 10 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          👶 Explain Like I'm 10
        </h2>
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 leading-relaxed">
          <p>
            Imagine you have a super-smart parrot. 🦜
          </p>
          <p>
            You don't teach it grammar rules. Instead, you let it listen to millions of conversations for months. Over time, the parrot notices patterns:
          </p>
          <div className="pl-4 border-l-2 border-cyan-500/50 py-1 text-cyan-300 italic">
            "When someone says 'Good morning', they usually get 'Good morning' or 'Hello' back."
          </div>
          <p>
            The parrot doesn't *really* know what a morning is, but it knows exactly which words go together! Modern AI is just a massive digital parrot that has read almost the entire internet.
          </p>
        </div>
      </section>

      {/* Visual Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          🗺️ Visual Flow
        </h2>
        <div className="p-6 rounded-2xl bg-[#0d1117] border border-slate-800 font-mono text-xs overflow-x-auto text-emerald-400">
{`   [ Your Input Prompt ]
             │
             ▼
     [ Tokenizer ]  ───► (Chopped into chunks like 'Chat' + 'G' + 'PT')
             │
             ▼
     [ Neural Network ]  ───► (Brain calculates probabilities of the next word)
             │
             ▼
  [ Output Word Selector ]  ───► (Chooses the best fitting next token)
             │
             ▼
     [ Final Answer ]`}
        </div>
      </section>

      {/* Pop Culture Analogies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          🎬 Anime & Movie Analogies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🦊</span>
              <div>
                <h4 className="text-white font-semibold">Naruto: Shadow Clones</h4>
                <p className="text-xs text-slate-400">Parallel AI Outputs</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">
              When Naruto summons multiple shadow clones to search a forest, he receives all their collective memories at once. Similarly, an AI agent system spawns multiple LLM threads to analyze code, write tests, and document features in parallel!
            </p>
          </div>
          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🦾</span>
              <div>
                <h4 className="text-white font-semibold">Iron Man: Jarvis</h4>
                <p className="text-xs text-slate-400">The Ultimate Assistant</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">
              Tony Stark's Jarvis isn't just a search engine. It understands context, controls physical machinery, coordinates tasks, and reasons through complex battles. This represents the peak of Narrow AI running complex workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Playground */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🎮 Interactive Playground: The Learning Curve
          </h2>
          <span className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20 font-mono">
            Interactive Widget
          </span>
        </div>
        
        <div className="p-6 rounded-2xl glass-panel space-y-6">
          <p className="text-sm text-slate-300">
            Adjust the dataset size and the training duration (epochs) to see how accuracy scales, but watch out for the training time!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase tracking-wider block">
                  Dataset Size (Examples): {datasetSize}
                </label>
                <input 
                  type="range" 
                  min="50" 
                  max="5000" 
                  step="50"
                  value={datasetSize}
                  onChange={(e) => {
                    setDatasetSize(Number(e.target.value));
                    setTrainingState('idle');
                  }}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase tracking-wider block">
                  Epochs (Training Loops): {epochs}
                </label>
                <input 
                  type="range" 
                  min="5" 
                  max="50" 
                  step="5"
                  value={epochs}
                  onChange={(e) => {
                    setEpochs(Number(e.target.value));
                    setTrainingState('idle');
                  }}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <button
                onClick={handleTrain}
                disabled={trainingState === 'training'}
                className="w-full py-2.5 rounded-lg bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Brain className="w-4 h-4" /> 
                {trainingState === 'training' ? 'Training...' : 'Start Training Model'}
              </button>
            </div>

            <div className="flex flex-col justify-center space-y-4 p-4 bg-slate-950/40 rounded-xl border border-slate-800">
              <div className="text-center">
                <div className="text-xs text-slate-400 uppercase tracking-wider">Model Accuracy</div>
                <div className="text-5xl font-black text-cyan-400 mt-1">{accuracy}%</div>
              </div>

              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <motion.div 
                  className="bg-cyan-400 h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${accuracy}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              <div className="text-center text-xs text-slate-400">
                {trainingState === 'idle' && "Ready to train."}
                {trainingState === 'training' && "Feeding inputs, updating neural node weights..."}
                {trainingState === 'completed' && `Training complete! Speed: ${Math.round((epochs * datasetSize) / 100)} weights/sec.`}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          💻 Code Example: Rules vs ML
        </h2>
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <p className="text-sm text-slate-300">
            Here is how you would check if an email is spam using normal code, versus how a Machine Learning approach would operate in TypeScript:
          </p>

          <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0d1117]">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
              <span className="text-xs font-mono text-slate-400">spam_classifier.ts</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold uppercase">
                Bun / TS
              </span>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`// ❌ Traditional Way: Rigid Hardcoded Rules
function isSpamRuleBased(text: string): boolean {
  const keywords = ['free money', 'lottery', 'click here'];
  return keywords.some(word => text.toLowerCase().includes(word));
}

// 🟢 AI/ML Way: Probabilistic Classifier
import { loadTrainedWeights } from './ai_brain';

interface Prediction {
  isSpam: boolean;
  confidence: number;
}

async function predictSpamML(text: string): Promise<Prediction> {
  const model = await loadTrainedWeights();
  // Vectorizes input text and feeds to neural networks
  const [spamProbability] = await model.predict(text);
  
  return {
    isSpam: spamProbability > 0.85,
    confidence: spamProbability
  };
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Mini Project: Interactive Spam Classifier */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🛠️ Mini Project: Dynamic Spam Filter
          </h2>
          <span className="text-xs px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 font-mono">
            Interactive Demo
          </span>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <p className="text-sm text-slate-300">
            Write an email below. Traditional filters only look for strict words like "win" or "lottery". The simulated ML model checks semantic urgency:
          </p>

          <textarea
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            placeholder="Type your test email here (e.g., 'URGENT: Please verify your bank account details or lose access')"
            className="w-full h-24 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
          />

          <button
            onClick={handleClassify}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg text-sm transition-colors"
          >
            Classify Email
          </button>

          {classificationResult && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${
                classificationResult.label.includes('Spam') || classificationResult.label.includes('Phishing')
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' 
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider">Classification Result</div>
              <div className="text-lg font-bold mt-1">
                Detected: {classificationResult.label} ({Math.round(classificationResult.score * 100)}% Confidence)
              </div>
              <p className="text-xs mt-2 text-slate-400">
                {classificationResult.type === 'rule' 
                  ? 'Matched direct rule keyword.' 
                  : 'Identified using linguistic patterns (simulated ML node logic).'}
              </p>
            </motion.div>
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
              title: "Thinking AI is self-aware",
              desc: "AI doesn't have feelings or actual understanding. It works entirely on probability mathematics."
            },
            {
              title: "Expecting 100% accuracy",
              desc: "AI models predict possibilities. They are probabilistic, meaning they can always hallucinate or make minor errors."
            },
            {
              title: "Using rules instead of training",
              desc: "Don't write hardcoded rules when features are fuzzy or complex (e.g. image detection or user sentiment)."
            },
            {
              title: "Ignoring bad data",
              desc: "Garbage In, Garbage Out. If you train AI with dirty or biased datasets, it will make terrible predictions."
            },
            {
              title: "Scaling models too early",
              desc: "Start with simple models first. Jumping straight to complex neural nets for simple data is overkill and costly."
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

      {/* Interactive Quiz */}
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
        <h2 className="text-2xl font-bold text-white">📝 Summary: 10 Key Takeaways</h2>
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
            <li>AI stands for systems mimicking human-like problem solving.</li>
            <li>Machine Learning uses dataset training rather than hardcoding static rules.</li>
            <li>Input sentences get chopped into tokens by a Tokenizer.</li>
            <li>Deep Learning relies on stacks of node grids called Neural Networks.</li>
            <li>Datasets act as training inputs; more clean data generally means higher accuracy.</li>
            <li>Pop culture analogies like Naruto clones help conceptualize parallel multi-agent processing.</li>
            <li>Narrow AI is built for single tasks (like spam filtering).</li>
            <li>AI outputs are probabilistic (possibilities), meaning they can occasionally hallucinate.</li>
            <li>Epochs represent training loops through your entire dataset.</li>
            <li>Modern AI models behave like highly advanced word-association predictors.</li>
          </ul>
        </div>
      </section>

      {/* XP Reward & Next Lesson */}
      <div className="p-8 rounded-3xl glass-panel text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/5 to-purple-500/5 pointer-events-none" />
        
        {!lessonFinished ? (
          <div className="space-y-4">
            <Award className="w-16 h-16 text-cyan-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold text-white">Lesson Completed!</h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto">
              You've read the contents, tested the playgrounds, and completed the check. Ready to claim your experience?
            </p>
            <button
              onClick={claimXP}
              className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-bold rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Claim +200 XP & Unlock Badge
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white">🏆 Badge Unlocked: AI Explorer</h3>
            <p className="text-emerald-400 font-semibold">+200 XP Awarded</p>
            <div className="pt-4 max-w-xs mx-auto">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">Next up:</div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center text-left">
                <div>
                  <h4 className="text-sm font-semibold text-white">Lesson 2: History of AI</h4>
                  <p className="text-xs text-slate-400">From Alan Turing to Deep Learning</p>
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
