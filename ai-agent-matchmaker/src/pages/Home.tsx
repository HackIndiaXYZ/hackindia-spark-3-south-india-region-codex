import { motion } from 'motion/react';
import { Search, Sparkles, Zap, ArrowRight, Activity } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import AgentCard from '../components/AgentCard';
import chatgptLogo from '../assets/logos/chatgpt.svg';
import claudeLogo from '../assets/logos/claude.svg';
import geminiLogo from '../assets/logos/gemini.svg';
import copilotLogo from '../assets/logos/copilot.svg';
import midjourneyLogo from '../assets/logos/midjourney.svg';
import dalleLogo from '../assets/logos/dalle.svg';
import llamaLogo from '../assets/logos/llama.svg';
import perplexityLogo from '../assets/logos/perplexity.svg';

const trendingAgents = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Versatile AI for writing, coding, and general problem solving.',
    category: 'General AI',
    rating: 4.9,
    speed: 95,
    accuracy: 92,
    logo: chatgptLogo,
    logo_alt: 'ChatGPT Logo',
    color: '#10a37f',
    website: 'https://chat.openai.com',
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Advanced reasoning, long context analysis, and nuanced writing.',
    category: 'Analysis',
    rating: 4.8,
    speed: 90,
    accuracy: 96,
    logo: claudeLogo,
    logo_alt: 'Claude Logo',
    color: '#d97757',
    website: 'https://claude.ai',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Multimodal AI excelling in research, data processing, and coding.',
    category: 'Research',
    rating: 4.7,
    speed: 98,
    accuracy: 90,
    logo: geminiLogo,
    logo_alt: 'Gemini Logo',
    color: '#1a73e8',
    website: 'https://gemini.google.com',
  },
  {
    id: 'copilot',
    name: 'Copilot',
    description: 'AI-powered coding assistant for developers and programmers.',
    category: 'Coding',
    rating: 4.6,
    speed: 93,
    accuracy: 94,
    logo: copilotLogo,
    logo_alt: 'Copilot Logo',
    color: '#6a05ad',
    website: 'https://github.com/features/copilot',
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'Advanced AI for creating stunning artistic images and designs.',
    category: 'Image Generation',
    rating: 4.5,
    speed: 88,
    accuracy: 91,
    logo: midjourneyLogo,
    logo_alt: 'Midjourney Logo',
    color: '#ff69b4',
    website: 'https://www.midjourney.com',
  },
  {
    id: 'dalle',
    name: 'DALL-E',
    description: 'OpenAI\'s powerful image generation AI for creative visuals.',
    category: 'Image Generation',
    rating: 4.4,
    speed: 85,
    accuracy: 90,
    logo: dalleLogo,
    logo_alt: 'DALL-E Logo',
    color: '#008080',
    website: 'https://openai.com/dall-e-3',
  },
  {
    id: 'llama',
    name: 'Llama',
    description: 'Open-source language model with transparent and accessible AI.',
    category: 'Language Model',
    rating: 4.7,
    speed: 91,
    accuracy: 93,
    logo: llamaLogo,
    logo_alt: 'Llama Logo',
    color: '#2e8b57',
    website: 'https://ai.meta.com/llama/',
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: 'AI-powered search engine with accurate, cited information.',
    category: 'Search AI',
    rating: 4.6,
    speed: 96,
    accuracy: 89,
    logo: perplexityLogo,
    logo_alt: 'Perplexity Logo',
    color: '#ff6b35',
    website: 'https://www.perplexity.ai',
  },
];

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate(`/matchmaker?q=${encodeURIComponent(prompt)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-8 shadow-sm">
          <Sparkles size={16} />
          <span>The Future of AI Collaboration</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          Find the Best AI Agent <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500">
            for Your Problem
          </span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Describe your task and discover the most powerful AI tools instantly. Run them simultaneously and choose the best results.
        </p>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto mb-8 group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="block w-full pl-16 pr-48 py-5 text-lg bg-white/80 backdrop-blur-xl border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-xl shadow-slate-200/50 text-slate-800 placeholder:text-slate-400"
            placeholder="Describe your problem... (e.g., I want help writing a professional resume)"
          />
          <div className="absolute inset-y-2 right-2 flex gap-2">
            <button
              type="submit"
              disabled={!prompt.trim()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              Find Best AI
              <ArrowRight size={18} />
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
          <span>Or try:</span>
          <Link
            to="/battle"
            className="flex items-center gap-1.5 text-violet-600 hover:text-violet-700 font-medium bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-lg transition-colors border border-violet-100"
          >
            <Zap size={16} />
            Try AI Debate
          </Link>
        </div>
      </motion.div>

      {/* Trending Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-6xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Activity size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Trending AI Agents</h2>
          </div>
          <Link
            to="/universe"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <AgentCard {...agent} userProblem="" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
