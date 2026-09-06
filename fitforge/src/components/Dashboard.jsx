import React from "react";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Flame, TrendingUp, Timer, Trophy } from "lucide-react";

const WEEKLY_LOAD = [
  { week: "W1", minutes: 140 },
  { week: "W2", minutes: 165 },
  { week: "W3", minutes: 150 },
  { week: "W4", minutes: 190 },
  { week: "W5", minutes: 175 },
  { week: "W6", minutes: 210 },
  { week: "W7", minutes: 225 },
  { week: "W8", minutes: 240 },
];

const SESSIONS_BY_TYPE = [
  { type: "Strength", sessions: 18 },
  { type: "HIIT", sessions: 9 },
  { type: "Cardio", sessions: 14 },
  { type: "Mobility", sessions: 11 },
  { type: "Recovery", sessions: 7 },
];

const STAT_CARDS = [
  { icon: Flame, value: "26-day", label: "Current streak" },
  { icon: TrendingUp, value: "+18%", label: "Volume vs. last month" },
  { icon: Timer, value: "38 min", label: "Average session" },
  { icon: Trophy, value: "Top 9%", label: "Community ranking" },
];

function CustomTooltip({ active, payload, label, suffix = "" }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-carbon border border-carbon-border rounded-lg px-3 py-2 text-xs">
      <p className="text-bone-muted">{label}</p>
      <p className="text-bone font-medium">
        {payload[0].value}
        {suffix}
      </p>
    </div>
  );
}

export default function Dashboard() {
  return (
    <section id="dashboard" className="py-20 md:py-28 px-6 md:px-10 bg-carbon-light/40">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-bone">Your progress, explained</h2>
          <p className="text-bone-muted mt-2 max-w-md">
            A sample of the dashboard every member sees, updated after each
            logged session.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {STAT_CARDS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-carbon-light border border-carbon-border rounded-2xl p-5">
              <Icon size={18} className="text-ember mb-4" />
              <p className="font-display text-2xl font-bold text-bone">{value}</p>
              <p className="text-sm text-bone-muted mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 bg-carbon-light border border-carbon-border rounded-2xl p-6">
            <p className="text-sm font-medium text-bone mb-1">Weekly training minutes</p>
            <p className="text-xs text-bone-muted mb-4">Last 8 weeks</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={WEEKLY_LOAD} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27241F" vertical={false} />
                  <XAxis dataKey="week" stroke="#736C61" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#736C61" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip suffix=" min" />} cursor={{ stroke: "#332F28" }} />
                  <Line
                    type="monotone"
                    dataKey="minutes"
                    stroke="#FF5A36"
                    strokeWidth={2.5}
                    dot={{ fill: "#FF5A36", r: 3.5 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-2 bg-carbon-light border border-carbon-border rounded-2xl p-6">
            <p className="text-sm font-medium text-bone mb-1">Sessions by type</p>
            <p className="text-xs text-bone-muted mb-4">This training block</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SESSIONS_BY_TYPE} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27241F" vertical={false} />
                  <XAxis dataKey="type" stroke="#736C61" fontSize={11} tickLine={false} axisLine={false} interval={0} angle={-20} textAnchor="end" height={50} />
                  <YAxis stroke="#736C61" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip suffix=" sessions" />} cursor={{ fill: "rgba(255,90,54,0.08)" }} />
                  <Bar dataKey="sessions" fill="#C9A227" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
