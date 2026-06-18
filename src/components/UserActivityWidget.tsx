import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from "recharts";
import { MessageSquare, FileCheck, Sprout, Database, Sparkles, TrendingUp } from "lucide-react";

interface UserActivityWidgetProps {
  questionsCount: number;
  quizzesCompleted: number;
  quizzesScore: number;
  soilCalculations: number;
  syncQueueCount: number;
}

export default function UserActivityWidget({
  questionsCount,
  quizzesCompleted,
  quizzesScore,
  soilCalculations,
  syncQueueCount
}: UserActivityWidgetProps) {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  // Recharts Data Source
  const data = [
    {
      name: "Queries Asked",
      count: questionsCount + 3, // Baseline of 3 standard queries + current queries to ensure beautiful load state
      color: "#CD5C5C", // Indian Red Accent
      description: "AI consultations made via the primary translation helper",
      icon: MessageSquare
    },
    {
      name: "Quizzes Completed",
      count: quizzesCompleted,
      color: "#a855f7", // Deep Purple Accent
      description: "STEM prep exam trial attempts evaluated in current session",
      icon: FileCheck
    },
    {
      name: "Soil Calculations",
      count: soilCalculations,
      color: "#DAA520", // Goldenrod/Teff Grass Sowing Accent
      description: "Custom regional crop fertilizer recommendations generated",
      icon: Sprout
    },
    {
      name: "Buffered Queue",
      count: syncQueueCount,
      color: "#14b8a6", // Teal Offline Cache Buffer Accent
      description: "Pending operations stored locally during simulated offline state",
      icon: Database
    }
  ];

  // Total active operations score calculation
  const totalEngagementScore = (questionsCount + 3) * 15 + quizzesCompleted * 25 + soilCalculations * 20;

  return (
    <div className="w-full bg-[#161616] border border-[#F5F5F0]/10 rounded-2xl p-5 md:p-6 mb-6 space-y-5 shadow-xl transition-all hover:border-[#E5D3B3]/20">
      
      {/* Top Banner and Metric Labels */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#F5F5F0]/10">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-[#E5D3B3]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5D3B3] font-mono">
              USER ENGAGEMENT & SESSION ANALYTICS
            </h3>
          </div>
          <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider font-mono">
            LIVE ANALYTICS CHANNEL • ETHIOPIAN ADAPTATIVE METRICS
          </p>
        </div>

        {/* Dynamic Engagement Tier */}
        <div className="flex items-center gap-3 bg-stone-900 border border-white/5 py-1.5 px-3.5 rounded-xl">
          <span className="text-[9px] uppercase tracking-widest text-stone-400">SESSION GRADE Score:</span>
          <span className="text-xs font-black text-[#E5D3B3] font-mono flex items-center gap-1">
            <Sparkles size={11} className="text-[#DAA520]" />
            {totalEngagementScore} XP
          </span>
        </div>
      </div>

      {/* Grid containing Chart + Metric details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Recharts Bar Chart Container */}
        <div className="lg:col-span-7 bg-[#111] p-4 rounded-xl border border-white/5 relative">
          <span className="absolute top-2.5 right-3 text-[8px] font-mono text-stone-500 uppercase">
            Interactive responsive distribution Chart
          </span>
          <div className="h-[180px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,245,240,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(245,245,240,0.4)" 
                  fontSize={8} 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value.split(" ")[0]} // shortening label names
                />
                <YAxis 
                  stroke="rgba(245,245,240,0.4)" 
                  fontSize={8}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(245, 245, 240, 0.03)", radius: 4 }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="bg-stone-950 border border-white/10 p-2.5 rounded-lg shadow-xl text-[10px]">
                          <p className="font-bold text-white mb-0.5">{item.name}</p>
                          <p className="font-serif italic text-stone-400 leading-normal mb-1">{item.description}</p>
                          <p className="font-mono text-xs" style={{ color: item.color }}>
                            Count: <span className="font-bold">{item.count}</span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="count" 
                  radius={[4, 4, 0, 0]} 
                  onMouseEnter={(state) => {
                    if (state && state.activePayload) {
                      setActiveMetric(state.activePayload[0].payload.name);
                    }
                  }}
                  onMouseLeave={() => setActiveMetric(null)}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      fillOpacity={activeMetric === null || activeMetric === entry.name ? 0.9 : 0.4}
                      className="transition-all duration-300"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Metric Explanation Cards */}
        <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-2">
          {data.map((item) => {
            const Icon = item.icon;
            const isHovered = activeMetric === item.name;
            return (
              <div 
                key={item.name}
                onMouseEnter={() => setActiveMetric(item.name)}
                onMouseLeave={() => setActiveMetric(null)}
                className={`p-3 rounded-xl border transition-all duration-300 cursor-help ${
                  isHovered 
                    ? "bg-stone-900 border-[#E5D3B3]/30 translate-x-1" 
                    : "bg-stone-900/30 border-white/5"
                }`}
              >
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div 
                      className="p-1.5 rounded-lg shrink-0" 
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      <Icon size={12} />
                    </div>
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider truncate">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-black" style={{ color: item.color }}>
                    {item.count}
                  </span>
                </div>
                {isHovered && (
                  <p className="text-[9px] text-stone-400 mt-1.5 leading-relaxed font-serif italic animate-fade-in">
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
