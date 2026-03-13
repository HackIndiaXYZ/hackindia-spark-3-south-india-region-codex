import { motion } from 'motion/react';
import { Star, Zap, Target, Play, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

interface AgentCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  speed: number;
  accuracy: number;
  logo: string;
  logo_alt: string;
  color: string;
  website?: string;
  userProblem?: string;
}

export default function AgentCard({
  id,
  name,
  description,
  category,
  rating,
  speed,
  accuracy,
  logo,
  logo_alt,
  color,
  website,
  userProblem,
}: AgentCardProps) {
  const handleVisitWebsite = (e: React.MouseEvent) => {
    if (website) {
      e.preventDefault();
      e.stopPropagation();
      
      let url = website;
      
      if (userProblem?.trim()) {
        const encodedQuery = encodeURIComponent(userProblem);
        
        // Use service-specific URL patterns for better auto-submission
        if (website.includes('chat.openai.com')) {
          url = `https://chat.openai.com/?message=${encodedQuery}`;
        } else if (website.includes('claude.ai')) {
          url = `https://claude.ai/new?prompt=${encodedQuery}`;
        } else if (website.includes('gemini.google.com')) {
          url = `https://gemini.google.com/app?prompt=${encodedQuery}`;
        }
      }
      
      // Open in new tab with focus
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      
      // Add user instruction tooltip
      if (newWindow) {
        newWindow.blur();
        window.focus();
        
        // Show user instruction
        setTimeout(() => {
          alert(`🤖 Chat opened with your question!\n\nYour question "${userProblem}" has been pre-filled.\n\nJust press Enter or click Send to start the AI response!`);
        }, 500);
      }
    }
  };
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative group bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-slate-200/50 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-blue-200/50"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${color}, transparent)` }}
      />
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border border-white/50 overflow-hidden"
            style={{ backgroundColor: `${color}15` }}
          >
            <img 
              src={logo} 
              alt={logo_alt}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                // Fallback to text if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span style="color: ${color}; font-size: 1.5rem; font-weight: bold;">${name.substring(0, 2).toUpperCase()}</span>`;
                }
              }}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">{name}</h3>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {category}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-lg border border-amber-100">
          <Star size={14} className="fill-amber-500" />
          <span className="text-sm font-bold">{rating}</span>
        </div>
      </div>

      <p className="text-slate-600 text-sm mb-6 line-clamp-2">{description}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <div className="flex items-center gap-2 text-slate-500 mb-1">
            <Zap size={14} />
            <span className="text-xs font-medium uppercase tracking-wider">Speed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${speed}%`, backgroundColor: color }}
              />
            </div>
            <span className="text-xs font-bold text-slate-700">{speed}</span>
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <div className="flex items-center gap-2 text-slate-500 mb-1">
            <Target size={14} />
            <span className="text-xs font-medium uppercase tracking-wider">Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${accuracy}%`, backgroundColor: color }}
              />
            </div>
            <span className="text-xs font-bold text-slate-700">{accuracy}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleVisitWebsite}
          className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-white transition-all shadow-md hover:shadow-lg"
          style={{ backgroundColor: color }}
          title={`Visit ${name} website`}
        >
          <ExternalLink size={16} />
          Visit {name}
        </button>
        <Link
          to={`/matchmaker?agent=${id}`}
          className="py-3 px-4 rounded-xl flex items-center justify-center font-semibold text-white transition-all shadow-md hover:shadow-lg"
          style={{ backgroundColor: color }}
          title={`Use ${name} in matchmaker`}
        >
          <Play size={16} fill="currentColor" />
        </Link>
      </div>
    </motion.div>
  );
}
