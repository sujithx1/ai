import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Award, CheckCircle2, ChevronRight, RotateCcw, 
  ThermometerSnowflake, FlameKindling, Info
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export default function Lesson2({ onComplete }: { onComplete: (xp: number) => void }) {
  // Playground state: AI Winter Simulator
  const [funding, setFunding] = useState<number>(50);
  const [breakthroughs, setBreakthroughs] = useState<number>(50);
  const [hype, setHype] = useState<number>(50);
  const [simulationYear, setSimulationYear] = useState<number>(1950);
  const [simStatus, setSimStatus] = useState<string>('Dartmouth Boom 🚀');

  // Mini project state: Retro chatbot simulating ELIZA (1966)
  const [userInput, setUserInput] = useState<string>('');
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'eliza'; text: string }[]>([
    { sender: 'eliza', text: 'Hello, I am ELIZA. How are you feeling today?' }
  ]);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Completion state
  const [lessonFinished, setLessonFinished] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Who is widely considered the father of theoretical computer science and AI?",
      options: ["Bill Gates", "Alan Turing", "Steve Jobs", "Elon Musk"],
      answer: 1,
      explanation: "Alan Turing proposed the famous 'Turing Test' in 1950, asking if machines could think."
    },
    {
      id: 2,
      question: "What was the Dartmouth Workshop of 1956?",
      options: [
        "A coding competition for video games.",
        "The birthplace of the term 'Artificial Intelligence'.",
        "A hardware manufacturing event.",
        "The release conference for the first iPhone."
      ],
      answer: 1,
      explanation: "John McCarthy and other scientists gathered at Dartmouth College in 1956, where they officially coined the term 'Artificial Intelligence'."
    },
    {
      id: 3,
      question: "What caused the 'AI Winters'?",
      options: [
        "The computers literally froze in cold server rooms.",
        "Over-hyped promises followed by a lack of funding and computational limits.",
        "A virus that deleted all AI databases globally.",
        "The internet was shut down by governments."
      ],
      answer: 1,
      explanation: "AI Winters occurred when high expectations were not met by the hardware of the time, leading to funding cuts and research freezes."
    },
    {
      id: 4,
      question: "Which IBM computer defeated world chess champion Garry Kasparov in 1997?",
      options: ["Deep Blue", "Watson", "AlphaGo", "Siri"],
      answer: 0,
      explanation: "IBM's Deep Blue defeated Garry Kasparov in 1997, marking a milestone for search algorithms and brute-force computer capabilities."
    },
    {
      id: 5,
      question: "Why did Deep Learning become successful around 2012?",
      options: [
        "Programming languages got easier.",
        "The invention of the mouse and keyboard.",
        "Availability of massive internet data and high-powered GPUs.",
        "AI finally gained actual human consciousness."
      ],
      answer: 2,
      explanation: "High-performance GPUs (originally designed for video games) and massive datasets (like ImageNet) made training multi-layer neural networks practical."
    },
    {
      id: 6,
      question: "In our Attack on Titan analogy, what do the 'Walls' protect us from?",
      options: [
        "GPU over-heating",
        "Exceeding the context window limit",
        "Losing our XP score",
        "Spam emails"
      ],
      answer: 1,
      explanation: "Just like the walls keep Titans out, the context window limit keeps token count restricted so the model doesn't forget its initial conversation."
    },
    {
      id: 7,
      question: "What was ELIZA (1966)?",
      options: [
        "The first smartphone assistant.",
        "An early natural language processing computer program simulating a therapist.",
        "The supercomputer that beat chess grandmasters.",
        "A modern AI model created by OpenAI."
      ],
      answer: 1,
      explanation: "ELIZA was one of the earliest conversational programs, using simple pattern matching to mock a therapist."
    },
    {
      id: 8,
      question: "What does the 'Turing Test' measure?",
      options: [
        "How fast a computer can run calculations.",
        "A machine's ability to exhibit intelligent behavior equivalent to, or indistinguishable from, a human.",
        "If a computer has organic brain cells.",
        "The graphics capabilities of a modern GPU."
      ],
      answer: 1,
      explanation: "The Turing Test determines if a human conversation partner cannot tell if they are chatting with a human or a computer."
    },
    {
      id: 9,
      question: "Which company created AlphaGo, which beat Lee Sedol at Go in 2016?",
      options: ["Microsoft", "Google DeepMind", "Meta", "Apple"],
      answer: 1,
      explanation: "Google DeepMind built AlphaGo, which learned complex strategic patterns to beat the legendary Go champion."
    },
    {
      id: 10,
      question: "Which architecture, introduced in 2017, powers all modern LLMs like GPT-4?",
      options: ["Perceptron", "Transformer", "Decision Trees", "Recurrent Neural Nets (RNN)"],
      answer: 1,
      explanation: "The 'Transformer' architecture (from the paper 'Attention Is All You Need') paved the way for massive parallel text generation."
    }
  ];

  const handleSimulate = () => {
    // Determine status based on inputs
    const score = (funding * 0.4) + (breakthroughs * 0.4) + (hype * 0.2);
    if (score < 30) {
      setSimStatus('Deep AI Winter ❄️ (No funding, research dead)');
    } else if (score >= 30 && score < 55) {
      setSimStatus('Stagnant Era 🧊 (Low interest, minor incremental progress)');
    } else if (score >= 55 && score < 80) {
      setSimStatus('AI Spring 🌱 (Active funding, new neural research)');
    } else {
      setSimStatus('AI Super Boom 💥 (Hyped valuations, massive GPU scaling!)');
    }
    setSimulationYear(prev => (prev >= 2026 ? 1950 : prev + 10));
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    const userMsg = userInput.trim();
    const newLog = [...chatLog, { sender: 'user' as const, text: userMsg }];
    setChatLog(newLog);
    setUserInput('');

    // ELIZA rule logic
    setTimeout(() => {
      let reply = "Tell me more about that.";
      const lower = userMsg.toLowerCase();
      if (lower.includes('sad') || lower.includes('depressed') || lower.includes('unhappy')) {
        reply = "I am sorry to hear you are feeling that way. What makes you feel that way?";
      } else if (lower.includes('computer') || lower.includes('ai') || lower.includes('machine')) {
        reply = "Do computers worry you?";
      } else if (lower.includes('you')) {
        reply = "Why are you interested in me?";
      } else if (lower.includes('mother') || lower.includes('father') || lower.includes('family')) {
        reply = "Tell me more about your family. How do you feel about them?";
      }
      setChatLog(prev => [...prev, { sender: 'eliza' as const, text: reply }]);
    }, 600);
  };

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
    onComplete(200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      {/* Hero Header */}
      <div className="relative p-8 rounded-3xl overflow-hidden glass-panel">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> History • Lesson 2
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            ⏳ The History of AI – From Alan Turing to GPT-5
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl font-light">
            How did we get from giant calculators to machines that write code, paint portraits, and hold human-like conversations? Let's take a ride through time!
          </p>
        </div>
      </div>

      {/* Hook */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          🎬 The Hook
        </h3>
        <p className="text-slate-300 leading-relaxed">
          What if I told you the idea of AI wasn't born in Silicon Valley, but in a quiet English countryside in 1950, when a codebreaker asked: 
          <span className="text-cyan-300 italic font-semibold"> "Can machines think?"</span>
        </p>
      </div>

      {/* Learning Objectives */}
      <div className="p-6 rounded-2xl glass-panel space-y-3">
        <h3 className="text-white font-semibold text-lg flex items-center gap-2">
          🎯 Learning Objectives
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-300">
          <li className="flex items-center gap-2">⚡ Understand Alan Turing's contribution</li>
          <li className="flex items-center gap-2">❄️ Learn why AI failed twice (AI Winters)</li>
          <li className="flex items-center gap-2">🧠 Witness the Neural Network explosion</li>
          <li className="flex items-center gap-2">💬 Map the evolution of GPT & LLMs</li>
        </ul>
      </div>

      {/* What Was the World Like Before AI? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          📖 What Was the World Like Before AI?
        </h2>
        <div className="p-6 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            Computers were just super-fast, giant adding machines. 🧮
          </p>
          <p>
            If you wanted a computer to do something, you had to write down every single instruction step-by-step. If you forgot a semicolon, the whole system crashed. There was no concept of a computer "learning" from mistakes—it did exactly what it was told, and nothing more.
          </p>
        </div>
      </section>

      {/* Who Invented AI? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          🧠 Who Invented AI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <h4 className="text-white font-bold">Alan Turing (1950)</h4>
            <p className="text-xs text-slate-400">The Genius Codebreaker</p>
            <p className="text-sm text-slate-300">
              He invented the Turing Test. He claimed that if a human chatting with a computer couldn't tell it apart from another human, the machine was "thinking".
            </p>
          </div>
          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <h4 className="text-white font-bold">The Dartmouth Conference (1956)</h4>
            <p className="text-xs text-slate-400">The Naming Ceremony</p>
            <p className="text-sm text-slate-300">
              John McCarthy and friends hosted a workshop where they officially coined the term <strong className="text-cyan-400">"Artificial Intelligence"</strong>. They thought they could solve AI in a single summer! (Spoiler: they were wrong).
            </p>
          </div>
        </div>
      </section>

      {/* AI Timeline ASCII Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">📅 AI Timeline</h2>
        <div className="p-6 rounded-2xl bg-[#0d1117] border border-slate-800 font-mono text-xs overflow-x-auto text-emerald-400 leading-relaxed">
{`  [ 1950 ] Alan Turing proposes "Turing Test"
     │
  [ 1956 ] Dartmouth Workshop (Term "AI" is born)
     │
  [ 1974 ] First AI Winter (Hype bubbles pop, funding stops) ❄️
     │
  [ 1980 ] AI Renaissance (Expert Systems boom)
     │
  [ 1987 ] Second AI Winter (Expert Systems collapse) ❄️
     │
  [ 1997 ] IBM Deep Blue beats Kasparov at Chess ♟️
     │
  [ 2012 ] ImageNet Boom (GPUs + Deep Learning explosion) 🚀
     │
  [ 2017 ] Transformer architecture introduced (Attention Is All You Need)
     │
  [ 2022 ] ChatGPT released to the world 💬
     │
  [ Future ] AGI & Agentic Workflows`}
        </div>
      </section>

      {/* AI Winters */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          💥 AI Winters: Why AI Failed Twice
        </h2>
        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4 text-sm text-slate-300">
          <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex gap-3 text-rose-300">
            <Info className="w-5 h-5 flex-shrink-0" />
            <div>
              <strong className="block text-white">What is an AI Winter?</strong>
              A period of time where funding for AI research completely dried up because scientists promised too much, and the hardware couldn't back it up.
            </div>
          </div>
          <p>
            <strong>First Winter (1974–1980):</strong> Researchers realized spelling/grammar translation was way harder than expected. Computations were too slow.
          </p>
          <p>
            <strong>Second Winter (1987–1993):</strong> Specialized "Expert Systems" (early logic machines) became too expensive and hard to update manually. Personal computers (like Apple/IBM PCs) beat them in cost-efficiency.
          </p>
        </div>
      </section>

      {/* Pop Culture References */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          🎌 Anime & Movie Analogies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">👒</span>
              <div>
                <h4 className="text-white font-semibold">One Piece: Devil Fruits</h4>
                <p className="text-xs text-slate-400">The Power of Architectures</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">
              Just like eating a Devil Fruit instantly grants a pirate unique capabilities (like Luffy's rubber body), switching to the **Transformer architecture** in 2017 instantly gave neural networks the superpower to read whole sentences at once instead of one word at a time.
            </p>
          </div>
          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🕶️</span>
              <div>
                <h4 className="text-white font-semibold">The Matrix: Simulations</h4>
                <p className="text-xs text-slate-400">Pre-training Environments</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">
              Neo learns Kung Fu in seconds inside a computer simulation. Similarly, modern RL (Reinforcement Learning) models like AlphaGo train by playing millions of games against themselves in hyper-speed simulations before facing humans.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Playground: AI Winter Simulator */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🎮 Interactive: AI Winter Simulator
          </h2>
          <span className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20 font-mono">
            Simulate History
          </span>
        </div>
        
        <div className="p-6 rounded-2xl glass-panel space-y-6">
          <p className="text-sm text-slate-300">
            Tweak research funding, academic breakthroughs, and commercial hype. See if you trigger an AI Winter or an AI Boom!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase tracking-wider block">
                  Research Funding: {funding}%
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={funding}
                  onChange={(e) => setFunding(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase tracking-wider block">
                  Academic Breakthroughs: {breakthroughs}%
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={breakthroughs}
                  onChange={(e) => setBreakthroughs(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase tracking-wider block">
                  Commercial Hype: {hype}%
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={hype}
                  onChange={(e) => setHype(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <button
                onClick={handleSimulate}
                className="w-full py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold rounded-lg text-sm transition-all"
              >
                Forward 10 Years (Current: {simulationYear}s)
              </button>
            </div>

            <div className="flex flex-col justify-center items-center p-6 bg-slate-950/40 rounded-xl border border-slate-800 text-center space-y-4">
              <div className="text-xs text-slate-400 uppercase tracking-wider">Current State</div>
              <div className="text-xl font-bold text-white">{simStatus}</div>
              
              {simStatus.includes('Winter') || simStatus.includes('Stagnant') ? (
                <ThermometerSnowflake className="w-12 h-12 text-blue-400 animate-pulse" />
              ) : (
                <FlameKindling className="w-12 h-12 text-amber-500 animate-bounce" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Code Example: Simple Perceptron Math */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          💻 Code Example: How Early AI Learned
        </h2>
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <p className="text-sm text-slate-300">
            In 1958, Frank Rosenblatt created the <strong>Perceptron</strong> (the earliest neural node). Here is how a single node adjusts its weights when it makes a mistake:
          </p>

          <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0d1117]">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
              <span className="text-xs font-mono text-slate-400">perceptron.ts</span>
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20 font-semibold uppercase">
                Perceptron Rule
              </span>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`class Perceptron {
  private weights: number[];
  private bias: number;
  private learningRate: number = 0.1;

  constructor(inputCount: number) {
    // Start with random small weights
    this.weights = Array.from({ length: inputCount }, () => Math.random() * 2 - 1);
    this.bias = Math.random() * 2 - 1;
  }

  // Predict: Output 1 (Yes) or 0 (No)
  predict(inputs: number[]): number {
    const sum = inputs.reduce((acc, val, i) => acc + val * this.weights[i], this.bias);
    return sum >= 0 ? 1 : 0;
  }

  // Learn: Adjust weights based on error
  train(inputs: number[], target: number) {
    const prediction = this.predict(inputs);
    const error = target - prediction;

    if (error !== 0) {
      // Adjust weight: Weight = Weight + Error * Input * LearningRate
      this.weights = this.weights.map((w, i) => w + error * inputs[i] * this.learningRate);
      this.bias += error * this.learningRate;
    }
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Mini Project: Talk to ELIZA */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🚀 Mini Project: Build a Retro Chatbot (ELIZA - 1966)
          </h2>
          <span className="text-xs px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 font-mono">
            Interactive Chat
          </span>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <p className="text-sm text-slate-300">
            ELIZA didn't have neural networks or GPUs. It was created in 1966 using simple RegExp pattern-matching tricks! Try chatting with her below to see how convincing rules-based systems can be:
          </p>

          <div className="h-48 overflow-y-auto p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3 flex flex-col">
            {chatLog.map((chat, idx) => (
              <div 
                key={idx} 
                className={`max-w-[80%] rounded-lg p-2.5 text-xs ${
                  chat.sender === 'user' 
                    ? 'bg-purple-600/20 border border-purple-500/30 text-purple-300 self-end' 
                    : 'bg-cyan-600/20 border border-cyan-500/30 text-cyan-300 self-start'
                }`}
              >
                <strong>{chat.sender === 'user' ? 'You' : 'ELIZA'}: </strong>
                {chat.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tell ELIZA how you feel..."
              className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg text-xs transition-colors"
            >
              Send
            </button>
          </div>
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
              title: "Assuming 'Neural Networks' are a new concept",
              desc: "The mathematics for neural networks were proposed in the 1940s and 50s! We just didn't have the computer hardware to run them."
            },
            {
              title: "Confusing ELIZA with modern LLMs",
              desc: "ELIZA was rule-based and held no actual state or contextual memory. ChatGPT uses billions of parameters and understands deep context."
            },
            {
              title: "Thinking AI Winters can't happen again",
              desc: "If companies continue to burn billions of dollars on AI without clear business models, another funding slowdown could occur."
            },
            {
              title: "Believing IBM Deep Blue is 'Smart'",
              desc: "Deep Blue was an expert system utilizing brute force search tree calculation, not a general thinking engine."
            },
            {
              title: "Underserving the importance of GPUs",
              desc: "Without video gamers demanding high-performance graphic chips, modern Deep Learning wouldn't be possible today."
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
        <h2 className="text-2xl font-bold text-white">📝 Summary: 10 Key Takeaways</h2>
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
            <li>Alan Turing kicked off the theoretical concept of AI in 1950.</li>
            <li>Dartmouth Workshop in 1956 is where the term "Artificial Intelligence" was coined.</li>
            <li>ELIZA (1966) showed how simple rules could mimic conversational therapy.</li>
            <li>Over-hype and under-powered hardware triggered two AI Winters.</li>
            <li>IBM Deep Blue beat Garry Kasparov in 1997 using advanced chess logic heuristics.</li>
            <li>Deep Learning took off in 2012 thanks to huge datasets (ImageNet) and GPU chips.</li>
            <li>Google DeepMind AlphaGo beat Lee Sedol in 2016.</li>
            <li>The Transformer architecture in 2017 allowed parallel processing of text context.</li>
            <li>OpenAI's ChatGPT (2022) started the massive modern Large Language Model wave.</li>
            <li>AI's history is cyclical—periods of extreme hype are often corrected by winters or booms.</li>
          </ul>
        </div>
      </section>

      {/* XP Reward & Next Lesson */}
      <div className="p-8 rounded-3xl glass-panel text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/5 to-purple-500/5 pointer-events-none" />
        
        {!lessonFinished ? (
          <div className="space-y-4">
            <Award className="w-16 h-16 text-cyan-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold text-white">Lesson 2 Completed!</h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto">
              You have explored the history of computing intelligence. Ready to claim your experience points?
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
            <h3 className="text-2xl font-bold text-white">🏆 Badge Unlocked: History Buff</h3>
            <p className="text-emerald-400 font-semibold">+200 XP Awarded</p>
            <div className="pt-4 max-w-xs mx-auto">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">Next up:</div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center text-left">
                <div>
                  <h4 className="text-sm font-semibold text-white">Lesson 3: Types of AI</h4>
                  <p className="text-xs text-slate-400">Narrow AI vs General Intelligence</p>
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
