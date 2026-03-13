import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Swords, Send, ThumbsUp, MessageCircle } from 'lucide-react';

const agents = [
  { id: 'chatgpt', name: 'ChatGPT', logo: '🤖', color: '#10a37f' },
  { id: 'claude', name: 'Claude', logo: '🧠', color: '#d97757' },
  { id: 'gemini', name: 'Gemini', logo: '✨', color: '#1a73e8' },
  { id: 'copilot', name: 'GitHub Copilot', logo: '💻', color: '#3b82f6' },
  { id: 'perplexity', name: 'Perplexity', logo: '🔍', color: '#ff6b35' },
  { id: 'midjourney', name: 'Midjourney', logo: '🎨', color: '#ff69b4' },
  { id: 'dalle', name: 'DALL-E 3', logo: '🖼️', color: '#008080' },
  { id: 'llama', name: 'Llama 3', logo: '🦙', color: '#8b5cf6' },
  { id: 'notionai', name: 'Notion AI', logo: '📝', color: '#000000' },
  { id: 'jasper', name: 'Jasper', logo: '✍️', color: '#f59e0b' },
  { id: 'huggingface', name: 'Hugging Face', logo: '🤗', color: '#ffd700' },
  { id: 'zapierai', name: 'Zapier AI', logo: '⚡', color: '#ff4f00' },
];

export default function Battle() {
  const [topic, setTopic] = useState('');
  const [stage, setStage] = useState<'input' | 'round1' | 'round2' | 'round3' | 'voting'>('input');
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [hasVoted, setHasVoted] = useState(false);

  const handleAgentSelect = (agentId: string) => {
    if (selectedAgents.includes(agentId)) {
      setSelectedAgents(selectedAgents.filter(id => id !== agentId));
    } else if (selectedAgents.length < 2) {
      setSelectedAgents([...selectedAgents, agentId]);
    }
  };

  const startDebate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || selectedAgents.length !== 2) return;
    
    // Initialize votes for selected agents
    const initialVotes: Record<string, number> = {};
    selectedAgents.forEach(id => {
      initialVotes[id] = 0;
    });
    setVotes(initialVotes);
    
    setStage('round1');
    setTimeout(() => setStage('round2'), 3000);
    setTimeout(() => setStage('round3'), 6000);
    setTimeout(() => setStage('voting'), 9000);
  };

  const handleVote = (id: string) => {
    if (hasVoted) return;
    setVotes((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    setHasVoted(true);
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-lg mb-6">
          <Swords size={32} />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">AI Debate Arena</h1>
        <p className="text-lg text-slate-600">Watch the top AI models argue, debate, and find the truth.</p>
      </div>

      {stage === 'input' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          {/* Agent Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl p-8"
          >
            <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">
              Select 2 AI Agents for Debate
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {agents.map((agent) => {
                const isSelected = selectedAgents.includes(agent.id);
                return (
                  <button
                    key={agent.id}
                    onClick={() => handleAgentSelect(agent.id)}
                    className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50 shadow-lg shadow-rose-500/30'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                    } ${selectedAgents.length >= 2 && !isSelected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={selectedAgents.length >= 2 && !isSelected}
                  >
                    <div className="text-3xl mb-2">{agent.logo}</div>
                    <div className="text-xs font-bold text-slate-700">{agent.name}</div>
                    {isSelected && (
                      <div className="mt-2 text-xs font-semibold text-rose-600">✓ Selected</div>
                    )}
                  </button>
                );
              })}
            </div>
            {selectedAgents.length === 0 && (
              <p className="mt-4 text-sm text-slate-500 text-center">Select 2 agents to start the debate</p>
            )}
            {selectedAgents.length === 1 && (
              <p className="mt-4 text-sm text-slate-500 text-center">Select 1 more agent to start the debate</p>
            )}
            {selectedAgents.length === 2 && (
              <p className="mt-4 text-sm text-emerald-600 font-semibold text-center">
                ✓ Both agents selected! Ready to debate.
              </p>
            )}
          </motion.div>

          {/* Topic Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl p-8 max-w-2xl mx-auto"
          >
            <form onSubmit={startDebate}>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                Debate Topic
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full pl-6 pr-16 py-4 text-lg bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all text-slate-800"
                  placeholder="e.g., Is AI going to replace software engineers?"
                />
                <button
                  type="submit"
                  disabled={!topic.trim() || selectedAgents.length !== 2}
                  className="absolute inset-y-2 right-2 px-4 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-300 text-white rounded-xl transition-colors flex items-center justify-center"
                >
                  <Send size={20} />
                </button>
              </div>
              {selectedAgents.length !== 2 && (
                <p className="mt-2 text-xs text-rose-500">Please select exactly 2 AI agents</p>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}

      <AnimatePresence>
        {stage !== 'input' && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-xl border border-slate-200 shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden"
          >
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MessageCircle size={24} className="text-rose-500" />
                Topic: {topic}
              </h2>
              <div className="flex gap-4">
                {selectedAgents.map((agentId) => {
                  const agent = agents.find(a => a.id === agentId);
                  if (!agent) return null;
                  return (
                    <div key={agent.id} className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                      <span className="text-xl">{agent.logo}</span>
                      <span className="font-semibold text-sm">{agent.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-8 space-y-8 bg-slate-50/50 min-h-[400px]">
              {/* Round 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="flex justify-center">
                  <span className="bg-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Round 1: Opening Statements
                  </span>
                </div>
                {selectedAgents.map((agentId, index) => {
                  const agent = agents.find(a => a.id === agentId);
                  if (!agent) return null;
                  const isLeft = index === 0;
                  return (
                    <div key={agent.id} className={`flex gap-4 ${!isLeft ? 'flex-row-reverse' : ''}`}>
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 border"
                        style={{ 
                          backgroundColor: `${agent.color}15`, 
                          borderColor: `${agent.color}40` 
                        }}
                      >
                        {agent.logo}
                      </div>
                      <div className={`bg-white border border-slate-200 p-4 rounded-2xl shadow-sm ${
                        isLeft ? 'rounded-tl-sm' : 'rounded-tr-sm'
                      }`}>
                        <p className="text-slate-700">
                          {agent.name} presents their opening argument about {topic}. This AI brings its unique perspective and capabilities to address the core issues at hand.
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Round 2 */}
              {(stage === 'round2' || stage === 'round3' || stage === 'voting') && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="flex justify-center">
                    <span className="bg-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      Round 2: Rebuttal
                    </span>
                  </div>
                  {selectedAgents.map((agentId, index) => {
                    const agent = agents.find(a => a.id === agentId);
                    if (!agent) return null;
                    const isLeft = index === 0;
                    return (
                      <div key={agent.id} className={`flex gap-4 ${isLeft ? '' : 'flex-row-reverse'}`}>
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 border"
                          style={{ 
                            backgroundColor: `${agent.color}15`, 
                            borderColor: `${agent.color}40` 
                          }}
                        >
                          {agent.logo}
                        </div>
                        <div className={`bg-white border border-slate-200 p-4 rounded-2xl shadow-sm ${
                          isLeft ? 'rounded-tl-sm' : 'rounded-tr-sm'
                        }`}>
                          <p className="text-slate-700">
                            {agent.name} counters with additional evidence and reasoning, challenging their opponent's position while strengthening their own argument about {topic}.
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {/* Round 3 */}
              {(stage === 'round3' || stage === 'voting') && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="flex justify-center">
                    <span className="bg-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      Round 3: Final Conclusion
                    </span>
                  </div>
                  {selectedAgents.map((agentId, index) => {
                    const agent = agents.find(a => a.id === agentId);
                    if (!agent) return null;
                    const isLeft = index === 0;
                    return (
                      <div key={agent.id} className={`flex gap-4 ${!isLeft ? '' : 'flex-row-reverse'}`}>
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 border"
                          style={{ 
                            backgroundColor: `${agent.color}15`, 
                            borderColor: `${agent.color}40` 
                          }}
                        >
                          {agent.logo}
                        </div>
                        <div className={`bg-white border border-slate-200 p-4 rounded-2xl shadow-sm ${
                          isLeft ? 'rounded-tl-sm' : 'rounded-tr-sm'
                        }`}>
                          <p className="text-slate-700">
                            {agent.name} delivers their final statement, summarizing key points and offering a comprehensive perspective on {topic} based on their unique capabilities and analysis.
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </div>

            {/* Voting */}
            {stage === 'voting' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-100 p-8 border-t border-slate-200 text-center"
              >
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Who won the debate?</h3>
                <div className="flex justify-center gap-6">
                  {selectedAgents.map((agentId) => {
                    const agent = agents.find(a => a.id === agentId);
                    if (!agent) return null;
                    return (
                      <button
                        key={agent.id}
                        onClick={() => handleVote(agent.id)}
                        disabled={hasVoted}
                        className={`flex flex-col items-center gap-3 p-6 rounded-2xl transition-all border-2 ${
                          hasVoted
                            ? 'bg-white border-slate-200 opacity-80'
                            : 'bg-white border-slate-200 hover:border-rose-400 hover:shadow-lg hover:-translate-y-1'
                        }`}
                      >
                        <div className="text-4xl">{agent.logo}</div>
                        <span className="font-bold text-slate-800">{agent.name}</span>
                        <div className="flex items-center gap-2 text-rose-500 font-semibold bg-rose-50 px-4 py-2 rounded-xl">
                          <ThumbsUp size={18} />
                          Vote
                        </div>
                        {hasVoted && (
                          <span className="text-sm text-slate-500 font-medium mt-2">
                            {votes[agent.id] || 0} votes
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {hasVoted && (
                  <p className="mt-6 text-emerald-600 font-bold flex items-center justify-center gap-2">
                    <ThumbsUp size={20} /> Thanks for voting!
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
