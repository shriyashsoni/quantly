"use client";

import { useId, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  ChartColumn,
  ChevronDown,
  CircleDollarSign,
  Download,
  FileText,
  Flame,
  GitCompareArrows,
  LayoutDashboard,
  LineChart,
  ListFilter,
  MessageSquareMore,
  MoonStar,
  Plus,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const navItems = ["Markets", "Screens", "Watchlist", "Portfolio", "AI Research", "Tools"];

const marketPulse = [
  { label: "NIFTY 50", value: "25,420.35", change: "+0.72%" },
  { label: "SENSEX", value: "83,240.21", change: "+0.61%" },
  { label: "NIFTY BANK", value: "57,830.20", change: "+0.91%" },
  { label: "INDIA VIX", value: "13.42", change: "-2.1%" },
];

const gainers = [
  { stock: "XYZ", price: "₹824", change: "+8.4%" },
  { stock: "ABC", price: "₹421", change: "+6.2%" },
  { stock: "DEF", price: "₹1,220", change: "+5.8%" },
];

const losers = [
  { stock: "PQR", price: "₹612", change: "-4.1%" },
  { stock: "LMN", price: "₹318", change: "-3.7%" },
  { stock: "UVW", price: "₹2,110", change: "-2.9%" },
];

const searchHints = ["ROCE > 20", "PE below 25", "Revenue growth > 15%", "Low debt companies", "Banking and IT"];

const watchlist = [
  { symbol: "RELIANCE", price: "₹2,941", change: "+1.42%", pe: "24.8", roe: "10.4%" },
  { symbol: "TCS", price: "₹3,822", change: "-0.32%", pe: "27.1", roe: "48.2%" },
  { symbol: "INFY", price: "₹1,621", change: "+0.84%", pe: "24.4", roe: "31.7%" },
  { symbol: "HDFC BANK", price: "₹1,982", change: "+1.12%", pe: "20.1", roe: "16.2%" },
];

const financialRows = [
  { label: "Sales", FY22: "792K", FY23: "921K", FY24: "972K", FY25: "1.03T", FY26: "1.12T" },
  { label: "Expenses", FY22: "701K", FY23: "812K", FY24: "858K", FY25: "902K", FY26: "970K" },
  { label: "OPM", FY22: "11%", FY23: "12%", FY24: "12%", FY25: "13%", FY26: "13%" },
  { label: "Net Profit", FY22: "67K", FY23: "74K", FY24: "79K", FY25: "81K", FY26: "92K" },
  { label: "EPS", FY22: "98.2", FY23: "108.3", FY24: "115.2", FY25: "118.7", FY26: "134.2" },
];

const peerRows = [
  { metric: "Market Cap", tcs: "₹14L Cr", infosys: "₹6.7L Cr", hcl: "₹5.1L Cr", wipro: "₹2.6L Cr" },
  { metric: "PE", tcs: "28", infosys: "24", hcl: "25", wipro: "21" },
  { metric: "ROE", tcs: "48%", infosys: "31%", hcl: "25%", wipro: "17%" },
  { metric: "ROCE", tcs: "55%", infosys: "38%", hcl: "30%", wipro: "21%" },
  { metric: "Sales Growth", tcs: "12%", infosys: "14%", hcl: "16%", wipro: "8%" },
];

const newsFeed = [
  { title: "Quarterly Results", time: "2h ago", detail: "Margins expanded as operating leverage improved." },
  { title: "Board approves ₹2,000 Cr capex", time: "5h ago", detail: "Capacity expansion planned for the next 4 quarters." },
  { title: "Insider purchased shares", time: "Yesterday", detail: "Management increased exposure during a market dip." },
  { title: "Credit rating upgraded", time: "Yesterday", detail: "Improved balance-sheet quality and debt servicing metrics." },
];

const screenFilters = [
  { label: "Market Cap", value: "> ₹10,000 Cr" },
  { label: "ROCE", value: "> 20%" },
  { label: "ROE", value: "> 15%" },
  { label: "Debt / Equity", value: "< 0.5" },
  { label: "Sales Growth 5Y", value: "> 15%" },
  { label: "Profit Growth 5Y", value: "> 15%" },
  { label: "PE Ratio", value: "< 35" },
];

const screenResults = [
  { company: "ABC", price: "₹821", marketCap: "₹42K Cr", pe: 24, roe: "21%", roce: "25%", growth: "18%" },
  { company: "XYZ", price: "₹412", marketCap: "₹31K Cr", pe: 19, roe: "24%", roce: "28%", growth: "22%" },
  { company: "QWE", price: "₹1,120", marketCap: "₹15K Cr", pe: 17, roe: "19%", roce: "22%", growth: "16%" },
];

const priceSeries = [
  { label: "1M", value: 2810 },
  { label: "2M", value: 2860 },
  { label: "3M", value: 2940 },
  { label: "4M", value: 2890 },
  { label: "5M", value: 3015 },
  { label: "6M", value: 2941 },
];

const financialChartData = [
  { year: "FY22", revenue: 62, ebitda: 11, roce: 18, fcf: 9, debt: 42, eps: 17 },
  { year: "FY23", revenue: 66, ebitda: 12, roce: 20, fcf: 14, debt: 39, eps: 20 },
  { year: "FY24", revenue: 69, ebitda: 13, roce: 21, fcf: 18, debt: 35, eps: 23 },
  { year: "FY25", revenue: 73, ebitda: 14, roce: 23, fcf: 22, debt: 31, eps: 24 },
  { year: "FY26", revenue: 79, ebitda: 15, roce: 24, fcf: 28, debt: 28, eps: 27 },
];

const portfolioSplit = [
  { label: "IT", value: 28, color: "#4dd8ff" },
  { label: "Banking", value: 24, color: "#34d399" },
  { label: "Energy", value: 18, color: "#fbbf24" },
  { label: "Pharma", value: 12, color: "#fb7185" },
  { label: "Consumer", value: 10, color: "#8b95a5" },
  { label: "Others", value: 8, color: "#64748b" },
];

const discoveryCards = [
  {
    title: "High Growth",
    description: "Revenue Growth > 20% · Profit Growth > 20%",
    accent: "from-cyan-500/20 to-cyan-500/5",
  },
  {
    title: "Quality Businesses",
    description: "ROCE > 20% · ROE > 15% · Debt/Equity < 0.5",
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    title: "Value Stocks",
    description: "PE < Industry PE · PB < 3",
    accent: "from-amber-500/20 to-amber-500/5",
  },
  {
    title: "Dividend Stocks",
    description: "Dividend Yield > 3%",
    accent: "from-rose-500/20 to-rose-500/5",
  },
  {
    title: "Momentum",
    description: "Near 52-week high · Price above 200 DMA",
    accent: "from-indigo-500/20 to-indigo-500/5",
  },
  {
    title: "Buffett Style",
    description: "High ROCE · Low Debt · Consistent earnings",
    accent: "from-slate-500/20 to-slate-500/5",
  },
];

const companySnapshots = [
  { title: "Quality Score", value: "82/100", tone: "text-emerald-400" },
  { title: "Growth Score", value: "88/100", tone: "text-cyan-300" },
  { title: "Valuation Score", value: "69/100", tone: "text-amber-300" },
  { title: "Balance Sheet", value: "84/100", tone: "text-sky-300" },
];

function changeClass(change: string) {
  return change.startsWith("-") ? "text-rose-400" : "text-emerald-400";
}

function SectionHeader({ kicker, title, description }: { kicker: string; title: string; description: string }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/70">{kicker}</p>
      <h2 className="display-font max-w-4xl text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{description}</p>
    </div>
  );
}

function MetricCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-[24px] border border-white/8 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white text-tabular">{value}</p>
      <p className={`mt-1 text-sm font-medium text-tabular ${changeClass(delta)}`}>{delta}</p>
    </div>
  );
}

function MiniAreaChart({ data, color }: { data: { label: string; value: number }[]; color: string }) {
  const uid = useId();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.4} />
            <stop offset="95%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 6" stroke="rgba(148,163,184,0.12)" vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
        <Tooltip contentStyle={{ background: "#0d1117", border: "1px solid #202936", borderRadius: 12, color: "#f5f7fa" }} />
        <Area type="monotone" dataKey="value" stroke={color} fill={`url(#${uid})`} strokeWidth={3} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function SparkBarChart({ data, color, dataKey }: { data: Record<string, number | string>[]; color: string; dataKey: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="4 6" stroke="rgba(148,163,184,0.12)" vertical={false} />
        <XAxis dataKey={Object.keys(data[0] ?? {})[0]} tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
        <Tooltip contentStyle={{ background: "#0d1117", border: "1px solid #202936", borderRadius: 12, color: "#f5f7fa" }} />
        <Bar dataKey={dataKey} radius={[10, 10, 0, 0]} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function Home() {
  const [query, setQuery] = useState("Reliance");
  const [selectedWindow, setSelectedWindow] = useState("1Y");
  const [selectedTab, setSelectedTab] = useState("OVERVIEW");

  const searchResults = [
    { name: "Reliance Industries", symbol: "NSE: RELIANCE", price: "₹2,941", change: "+1.42%" },
    { name: "Reliance Power", symbol: "NSE: RPOWER", price: "₹52.20", change: "+3.12%" },
    { name: "Reliance Infra", symbol: "NSE: RELINFRA", price: "₹284.55", change: "+4.80%" },
  ];

  const tabs = ["OVERVIEW", "QUARTERLY", "PROFIT & LOSS", "BALANCE SHEET", "CASH FLOW", "RATIOS", "SHAREHOLDING", "PEERS"];

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.14]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(77,216,255,0.18),_transparent_55%)]" />

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-4 py-4 sm:px-6 lg:px-8">
        <header className="glass sticky top-3 z-40 rounded-[28px] px-4 py-3 shadow-2xl shadow-black/30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                <Radar className="h-5 w-5" />
              </div>
              <div>
                <p className="display-font text-lg font-semibold tracking-[0.18em] text-white">QUANTLY</p>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">AI stock intelligence</p>
              </div>
            </div>

            <div className="hidden flex-1 items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 lg:flex">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                placeholder="Search company, ticker, sector or metric"
              />
              <kbd className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-400">⌘K</kbd>
            </div>

            <nav className="ml-auto hidden items-center gap-1 xl:flex">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-2xl px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  {item}
                </a>
              ))}
            </nav>

            <button className="hidden rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white sm:inline-flex">
              <Bell className="h-4 w-4" />
            </button>
            <button className="hidden rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white sm:inline-flex">
              <MoonStar className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/60 hover:bg-cyan-400/15">
              <span>Profile</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </header>

        <section className="grid items-stretch gap-6 xl:grid-cols-[1.35fr_0.85fr]">
          <div className="glass relative overflow-hidden rounded-[32px] border border-cyan-400/20 p-6 sm:p-8 lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(77,216,255,0.12),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(52,211,153,0.09),_transparent_25%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 self-start rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
                  <Flame className="h-4 w-4" />
                  AI-powered fundamental research
                </div>
                <div className="max-w-3xl">
                  <h1 className="display-font text-4xl font-semibold leading-[1.02] text-white sm:text-5xl xl:text-6xl">
                    Invest with data, not noise.
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                    Screen thousands of Indian stocks, inspect financials, compare peers, read filings and ask AI for an instant business summary.
                  </p>
                </div>

                <div className="glass flex flex-col gap-3 rounded-[28px] p-4 sm:flex-row sm:items-center">
                  <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
                    <Search className="h-5 w-5 text-cyan-300" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      className="w-full bg-transparent text-base text-white placeholder:text-slate-500 focus:outline-none"
                      placeholder="Search company, stock or metric..."
                    />
                  </div>
                  <button className="rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                    Explore Stocks
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
                    Build a Screen
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 text-sm text-slate-300">
                  {searchHints.map((item) => (
                    <button
                      key={item}
                      onClick={() => setQuery(item)}
                      className="rounded-full border border-white/8 bg-white/5 px-4 py-2 transition hover:border-cyan-400/30 hover:bg-cyan-400/10"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 rounded-[28px] border border-white/8 bg-black/25 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Market Pulse</p>
                    <p className="text-lg font-semibold text-white">Live snapshot</p>
                  </div>
                  <Target className="h-5 w-5 text-cyan-300" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {marketPulse.map((item) => (
                    <MetricCard key={item.label} label={item.label} value={item.value} delta={item.change} />
                  ))}
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Advances</span>
                    <span className="text-emerald-400 text-tabular">1,842</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
                    <span>Declines</span>
                    <span className="text-rose-400 text-tabular">1,214</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="glass rounded-[28px] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/70">Quick Search</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">AI-native discovery</h2>
                </div>
                <Sparkles className="h-5 w-5 text-cyan-300" />
              </div>
              <div className="mt-5 rounded-3xl border border-white/8 bg-black/25 p-4">
                <div className="text-sm text-slate-400">Query</div>
                <div className="mt-2 flex items-center gap-3 text-white">
                  <Search className="h-4 w-4 text-cyan-300" />
                  <span>{query || "Reliance"}</span>
                </div>
                <div className="mt-4 space-y-3">
                  {searchResults.map((item) => (
                    <button
                      key={item.symbol}
                      className="flex w-full items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-left transition hover:border-cyan-400/30 hover:bg-cyan-400/10"
                    >
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-sm text-slate-400">{item.symbol}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white text-tabular">{item.price}</p>
                        <p className="text-sm text-emerald-400 text-tabular">{item.change}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass rounded-[28px] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/70">Watchlist</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Core portfolio</h2>
                </div>
                <Star className="h-5 w-5 text-amber-300" />
              </div>
              <div className="mt-5 space-y-3">
                {watchlist.map((item) => (
                  <div key={item.symbol} className="grid grid-cols-[1.3fr_0.8fr_0.8fr_0.6fr] gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-300">
                    <span className="font-medium text-white">{item.symbol}</span>
                    <span className="text-tabular">{item.price}</span>
                    <span className={`text-tabular ${changeClass(item.change)}`}>{item.change}</span>
                    <span className="text-tabular">PE {item.pe}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="markets" className="glass rounded-[32px] p-6 sm:p-8">
          <SectionHeader
            kicker="Market Overview"
            title="A dashboard built for fast scanning and deep reading."
            description="The interface keeps the familiar Screener workflow, but presents it with richer hierarchy, more contrast, and a stronger analytical feel."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[28px] border border-white/8 bg-black/25 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Reliance Industries</p>
                  <h3 className="text-2xl font-semibold text-white text-tabular">₹2,941.20</h3>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-300 text-tabular">
                  +41.20 (+1.42%)
                </div>
              </div>

              <div className="mt-6 h-72 rounded-[24px] border border-white/8 bg-gradient-to-b from-white/5 to-black/20 p-3">
                <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-slate-500">
                  <span>Price chart</span>
                  <div className="flex flex-wrap gap-2 text-[11px] tracking-normal text-slate-300">
                    {["1D", "1W", "1M", "6M", "1Y", "5Y", "MAX"].map((window) => (
                      <button
                        key={window}
                        onClick={() => setSelectedWindow(window)}
                        className={`rounded-full px-3 py-1 transition ${selectedWindow === window ? "bg-cyan-400 text-slate-950" : "bg-white/5 hover:bg-white/10"}`}
                      >
                        {window}
                      </button>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height="88%">
                  <RechartsLineChart data={priceSeries}>
                    <CartesianGrid strokeDasharray="4 6" stroke="rgba(148,163,184,0.12)" vertical={false} />
                    <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "#0d1117", border: "1px solid #202936", borderRadius: 12, color: "#f5f7fa" }} />
                    <Line type="monotone" dataKey="value" stroke="#4dd8ff" strokeWidth={3} dot={false} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/8 bg-black/25 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">Top Gainers</h3>
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="mt-4 space-y-3">
                  {gainers.map((item) => (
                    <div key={item.stock} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                      <div>
                        <p className="font-medium text-white">{item.stock}</p>
                        <p className="text-sm text-slate-400">{item.price}</p>
                      </div>
                      <span className="font-semibold text-emerald-400 text-tabular">{item.change}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/8 bg-black/25 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">Top Losers</h3>
                  <TrendingDown className="h-4 w-4 text-rose-400" />
                </div>
                <div className="mt-4 space-y-3">
                  {losers.map((item) => (
                    <div key={item.stock} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                      <div>
                        <p className="font-medium text-white">{item.stock}</p>
                        <p className="text-sm text-slate-400">{item.price}</p>
                      </div>
                      <span className="font-semibold text-rose-400 text-tabular">{item.change}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div id="screens" className="glass rounded-[32px] p-6 sm:p-8">
            <SectionHeader
              kicker="Stock Screener"
              title="Build screens in seconds."
              description="Begin with filters, then refine with saved screens, editable columns, and query-style rules for advanced users."
            />

            <div className="mt-6 grid gap-4">
              <div className="rounded-[28px] border border-white/8 bg-black/25 p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <button className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                    <Plus className="h-4 w-4" />
                    Add Filter
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                    <ListFilter className="h-4 w-4" />
                    Customize Columns
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {screenFilters.map((filter) => (
                    <div key={filter.label} className="flex items-center gap-3 rounded-full border border-white/8 bg-white/5 px-4 py-2 text-sm">
                      <span className="text-slate-300">{filter.label}</span>
                      <span className="rounded-full bg-black/30 px-3 py-1 font-medium text-cyan-300">{filter.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/8 bg-black/25 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">Screen results</h3>
                  <span className="text-sm text-slate-400">3 matches</span>
                </div>
                <div className="mt-4 overflow-hidden rounded-2xl border border-white/8">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-slate-300">
                      <tr>
                        {[
                          "Company",
                          "Price",
                          "Market Cap",
                          "PE",
                          "ROE",
                          "ROCE",
                          "Growth",
                        ].map((heading) => (
                          <th key={heading} className="px-4 py-3 font-medium">{heading}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {screenResults.map((row) => (
                        <tr key={row.company} className="border-t border-white/8 bg-black/20 text-slate-200">
                          <td className="px-4 py-3 font-medium text-white">{row.company}</td>
                          <td className="px-4 py-3 text-tabular">{row.price}</td>
                          <td className="px-4 py-3 text-tabular">{row.marketCap}</td>
                          <td className="px-4 py-3 text-tabular">{row.pe}</td>
                          <td className="px-4 py-3 text-tabular">{row.roe}</td>
                          <td className="px-4 py-3 text-tabular">{row.roce}</td>
                          <td className="px-4 py-3 text-emerald-400 text-tabular">{row.growth}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="glass rounded-[32px] p-6">
              <SectionHeader
                kicker="AI Stock Summary"
                title="Readable, clearly labeled analysis"
                description="The AI layer explains quality, growth and risk with clear labels so users know exactly what is synthesized and what is raw data."
              />
              <div className="mt-6 rounded-[28px] border border-cyan-400/15 bg-cyan-400/8 p-5">
                <div className="flex items-center gap-3 text-cyan-200">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-[0.24em]">AI-generated analysis</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-200">
                  Reliance shows diversified revenue streams across energy, telecom and retail. Momentum is healthy, cash generation is solid, and leverage remains manageable.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {companySnapshots.map((snapshot) => (
                    <div key={snapshot.title} className="rounded-2xl border border-white/8 bg-black/20 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{snapshot.title}</p>
                      <p className={`mt-2 text-2xl font-semibold text-tabular ${snapshot.tone}`}>{snapshot.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/8 p-4">
                    <p className="font-semibold text-emerald-300">Strong business</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">Revenue growth is broad-based and operating metrics are stable.</p>
                  </div>
                  <div className="rounded-2xl border border-amber-400/20 bg-amber-400/8 p-4">
                    <p className="font-semibold text-amber-300">Watch valuation</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">Current multiples are above the historical band and need context.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-[32px] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/70">AI Research Assistant</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Ask questions against the company data</h3>
                </div>
                <MessageSquareMore className="h-5 w-5 text-cyan-300" />
              </div>
              <div className="mt-5 space-y-3 rounded-[28px] border border-white/8 bg-black/20 p-4">
                {[
                  "Why did margins fall last quarter?",
                  "Compare this with peers on ROCE.",
                  "Is valuation expensive versus history?",
                ].map((prompt) => (
                  <button key={prompt} className="w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/10">
                    {prompt}
                  </button>
                ))}
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <input className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none" placeholder="Ask AI about RELIANCE..." />
                  <button className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">Ask AI</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="glass rounded-[32px] p-6 sm:p-8">
          <SectionHeader
            kicker="Company Deep Dive"
            title="Turn tables into visual analysis."
            description="Use compact charts, financial tabs and peer comparisons to move from raw numbers to an actual decision workflow."
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedTab === tab ? "bg-cyan-400 text-slate-950" : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[28px] border border-white/8 bg-black/25 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Reliance Industries Ltd</p>
                  <h3 className="text-2xl font-semibold text-white text-tabular">₹2,941.20</h3>
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-emerald-300 text-tabular">
                  <ArrowUpRight className="h-4 w-4" />
                  +1.42%
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  { label: "Market Cap", value: "₹19.9L Cr" },
                  { label: "PE Ratio", value: "24.8" },
                  { label: "ROCE", value: "9.7%" },
                  { label: "ROE", value: "10.4%" },
                  { label: "Debt/Equity", value: "0.42" },
                  { label: "Dividend Yield", value: "0.34%" },
                ].map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{metric.label}</p>
                    <p className="mt-3 text-xl font-semibold text-white text-tabular">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[24px] border border-white/8 bg-white/5 p-4">
                <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                  <span>Selected tab</span>
                  <span>{selectedTab}</span>
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/8">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-slate-300">
                      <tr>
                        <th className="px-4 py-3 font-medium">Metric</th>
                        {['FY22', 'FY23', 'FY24', 'FY25', 'FY26'].map((year) => (
                          <th key={year} className="px-4 py-3 font-medium">{year}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {financialRows.map((row) => (
                        <tr key={row.label} className="border-t border-white/8 bg-black/20">
                          <td className="px-4 py-3 font-medium text-white">{row.label}</td>
                          <td className="px-4 py-3 text-tabular">{row.FY22}</td>
                          <td className="px-4 py-3 text-tabular">{row.FY23}</td>
                          <td className="px-4 py-3 text-tabular">{row.FY24}</td>
                          <td className="px-4 py-3 text-tabular">{row.FY25}</td>
                          <td className="px-4 py-3 text-tabular">{row.FY26}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/8 bg-black/25 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">Latest company updates</h3>
                <FileText className="h-4 w-4 text-cyan-300" />
              </div>
              <div className="mt-4 space-y-3">
                {newsFeed.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-medium text-white">{item.title}</p>
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.time}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="glass rounded-[32px] p-6">
            <div className="flex items-center gap-3">
              <LineChart className="h-5 w-5 text-cyan-300" />
              <h3 className="text-lg font-semibold text-white">Revenue Growth</h3>
            </div>
            <div className="mt-5 h-56 rounded-[24px] border border-white/8 bg-black/20 p-3">
              <MiniAreaChart data={financialChartData.map((item) => ({ label: item.year, value: item.revenue }))} color="#4dd8ff" />
            </div>
          </div>
          <div className="glass rounded-[32px] p-6">
            <div className="flex items-center gap-3">
              <ChartColumn className="h-5 w-5 text-emerald-300" />
              <h3 className="text-lg font-semibold text-white">EBITDA Margin</h3>
            </div>
            <div className="mt-5 h-56 rounded-[24px] border border-white/8 bg-black/20 p-3">
              <SparkBarChart data={financialChartData.map((item) => ({ year: item.year, value: item.ebitda }))} color="#34d399" dataKey="value" />
            </div>
          </div>
          <div className="glass rounded-[32px] p-6">
            <div className="flex items-center gap-3">
              <WalletCards className="h-5 w-5 text-amber-300" />
              <h3 className="text-lg font-semibold text-white">Free Cash Flow</h3>
            </div>
            <div className="mt-5 h-56 rounded-[24px] border border-white/8 bg-black/20 p-3">
              <SparkBarChart data={financialChartData.map((item) => ({ year: item.year, value: item.fcf }))} color="#fbbf24" dataKey="value" />
            </div>
          </div>
          <div className="glass rounded-[32px] p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-sky-300" />
              <h3 className="text-lg font-semibold text-white">ROCE</h3>
            </div>
            <div className="mt-5 h-56 rounded-[24px] border border-white/8 bg-black/20 p-3">
              <MiniAreaChart data={financialChartData.map((item) => ({ label: item.year, value: item.roce }))} color="#7dd3fc" />
            </div>
          </div>
          <div className="glass rounded-[32px] p-6">
            <div className="flex items-center gap-3">
              <BriefcaseBusiness className="h-5 w-5 text-rose-300" />
              <h3 className="text-lg font-semibold text-white">Debt</h3>
            </div>
            <div className="mt-5 h-56 rounded-[24px] border border-white/8 bg-black/20 p-3">
              <SparkBarChart data={financialChartData.map((item) => ({ year: item.year, value: item.debt }))} color="#fb7185" dataKey="value" />
            </div>
          </div>
          <div className="glass rounded-[32px] p-6">
            <div className="flex items-center gap-3">
              <CircleDollarSign className="h-5 w-5 text-cyan-300" />
              <h3 className="text-lg font-semibold text-white">EPS</h3>
            </div>
            <div className="mt-5 h-56 rounded-[24px] border border-white/8 bg-black/20 p-3">
              <MiniAreaChart data={financialChartData.map((item) => ({ label: item.year, value: item.eps }))} color="#4dd8ff" />
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div id="watchlist" className="glass rounded-[32px] p-6 sm:p-8">
            <SectionHeader
              kicker="Watchlist"
              title="Track your core portfolio in one view."
              description="Watch price moves, valuation changes, alerts and news without leaving the dashboard."
            />
            <div className="mt-6 overflow-hidden rounded-[24px] border border-white/8">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-slate-300">
                  <tr>
                    {['Company', 'Price', 'Today', 'PE', 'ROE'].map((heading) => (
                      <th key={heading} className="px-4 py-3 font-medium">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {watchlist.map((item) => (
                    <tr key={item.symbol} className="border-t border-white/8 bg-black/20">
                      <td className="px-4 py-3 font-medium text-white">{item.symbol}</td>
                      <td className="px-4 py-3 text-tabular">{item.price}</td>
                      <td className={`px-4 py-3 text-tabular ${changeClass(item.change)}`}>{item.change}</td>
                      <td className="px-4 py-3 text-tabular">{item.pe}</td>
                      <td className="px-4 py-3 text-tabular">{item.roe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div id="portfolio" className="glass rounded-[32px] p-6 sm:p-8">
            <SectionHeader
              kicker="Portfolio"
              title="Know what you own and how it behaves."
              description="See allocation, concentration, quality and risk so portfolio review becomes actionable instead of decorative."
            />
            <div className="mt-6 rounded-[28px] border border-white/8 bg-black/20 p-5">
              <p className="text-sm text-slate-400">Portfolio value</p>
              <p className="mt-2 text-4xl font-semibold text-white text-tabular">₹18,42,820</p>
              <p className="mt-2 text-emerald-400 text-tabular">+₹42,810 · +2.38%</p>
              <div className="mt-6 space-y-3">
                {portfolioSplit.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="w-24 text-sm text-slate-300">{item.label}</span>
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/8">
                      <div className="h-full rounded-full" style={{ width: `${item.value}%`, background: item.color }} />
                    </div>
                    <span className="w-10 text-right text-sm text-slate-300 text-tabular">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Diversification", "82/100"],
                ["Quality", "88/100"],
                ["Valuation", "71/100"],
                ["Risk", "29/100"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{label}</p>
                  <p className="mt-2 text-xl font-semibold text-white text-tabular">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="compare" className="glass rounded-[32px] p-6 sm:p-8">
          <SectionHeader
            kicker="Peer Comparison"
            title="Compare companies side by side."
            description="Use one clean table for valuation, quality and growth rather than opening separate tabs for each business."
          />
          <div className="mt-6 overflow-hidden rounded-[24px] border border-white/8">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-slate-300">
                <tr>
                  <th className="px-4 py-3 font-medium">Metric</th>
                  <th className="px-4 py-3 font-medium">TCS</th>
                  <th className="px-4 py-3 font-medium">Infosys</th>
                  <th className="px-4 py-3 font-medium">HCLTech</th>
                  <th className="px-4 py-3 font-medium">Wipro</th>
                </tr>
              </thead>
              <tbody>
                {peerRows.map((row) => (
                  <tr key={row.metric} className="border-t border-white/8 bg-black/20">
                    <td className="px-4 py-3 font-medium text-white">{row.metric}</td>
                    <td className="px-4 py-3 text-tabular">{row.tcs}</td>
                    <td className="px-4 py-3 text-tabular">{row.infosys}</td>
                    <td className="px-4 py-3 text-tabular">{row.hcl}</td>
                    <td className="px-4 py-3 text-tabular">{row.wipro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="tools" className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="glass rounded-[32px] p-6 sm:p-8">
            <SectionHeader
              kicker="Tools"
              title="Build a utility layer around investing."
              description="DCF, reverse DCF, CAGR, margin and portfolio calculators sit alongside screening so users stay inside one product."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["DCF", CircleDollarSign],
                ["Reverse DCF", GitCompareArrows],
                ["CAGR Calculator", TrendingUp],
                ["Margin Calculator", LineChart],
                ["ROE / ROCE", ShieldCheck],
                ["Portfolio Split", LayoutDashboard],
              ].map(([label, Icon]) => (
                <div key={label as string} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                  <div className="flex items-center gap-3 text-white">
                    <Icon className="h-4 w-4 text-cyan-300" />
                    <span className="font-medium">{label as string}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-[32px] p-6 sm:p-8">
            <SectionHeader
              kicker="Discovery"
              title="Pre-built screens for fast browsing."
              description="A discovery page for growth, value, momentum and quality screens gives the product a reason to exist before the user becomes advanced."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {discoveryCards.map((card) => (
                <div key={card.title} className={`rounded-[28px] border border-white/8 bg-gradient-to-br ${card.accent} p-5`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{card.title}</h3>
                    <ArrowRight className="h-4 w-4 text-cyan-300" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="financials" className="glass rounded-[32px] p-6 sm:p-8">
          <SectionHeader
            kicker="Financials"
            title="Visualize the business instead of scanning flat numbers."
            description="Charts for revenue, margins, cash flow, debt, ROCE and EPS make the company page feel closer to an analyst workflow than a static table dump."
          />
          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            <div className="rounded-[28px] border border-white/8 bg-black/25 p-5">
              <div className="flex items-center gap-3">
                <LineChart className="h-5 w-5 text-cyan-300" />
                <h3 className="text-lg font-semibold text-white">Revenue Growth</h3>
              </div>
              <div className="mt-5 h-56 rounded-[24px] border border-white/8 bg-black/20 p-3">
                <MiniAreaChart data={financialChartData.map((item) => ({ label: item.year, value: item.revenue }))} color="#4dd8ff" />
              </div>
            </div>
            <div className="rounded-[28px] border border-white/8 bg-black/25 p-5">
              <div className="flex items-center gap-3">
                <ChartColumn className="h-5 w-5 text-emerald-300" />
                <h3 className="text-lg font-semibold text-white">EBITDA Margin</h3>
              </div>
              <div className="mt-5 h-56 rounded-[24px] border border-white/8 bg-black/20 p-3">
                <SparkBarChart data={financialChartData.map((item) => ({ year: item.year, value: item.ebitda }))} color="#34d399" dataKey="value" />
              </div>
            </div>
            <div className="rounded-[28px] border border-white/8 bg-black/25 p-5">
              <div className="flex items-center gap-3">
                <WalletCards className="h-5 w-5 text-amber-300" />
                <h3 className="text-lg font-semibold text-white">Free Cash Flow</h3>
              </div>
              <div className="mt-5 h-56 rounded-[24px] border border-white/8 bg-black/20 p-3">
                <SparkBarChart data={financialChartData.map((item) => ({ year: item.year, value: item.fcf }))} color="#fbbf24" dataKey="value" />
              </div>
            </div>
            <div className="rounded-[28px] border border-white/8 bg-black/25 p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-sky-300" />
                <h3 className="text-lg font-semibold text-white">ROCE</h3>
              </div>
              <div className="mt-5 h-56 rounded-[24px] border border-white/8 bg-black/20 p-3">
                <MiniAreaChart data={financialChartData.map((item) => ({ label: item.year, value: item.roce }))} color="#7dd3fc" />
              </div>
            </div>
            <div className="rounded-[28px] border border-white/8 bg-black/25 p-5">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness className="h-5 w-5 text-rose-300" />
                <h3 className="text-lg font-semibold text-white">Debt</h3>
              </div>
              <div className="mt-5 h-56 rounded-[24px] border border-white/8 bg-black/20 p-3">
                <SparkBarChart data={financialChartData.map((item) => ({ year: item.year, value: item.debt }))} color="#fb7185" dataKey="value" />
              </div>
            </div>
            <div className="rounded-[28px] border border-white/8 bg-black/25 p-5">
              <div className="flex items-center gap-3">
                <CircleDollarSign className="h-5 w-5 text-cyan-300" />
                <h3 className="text-lg font-semibold text-white">EPS</h3>
              </div>
              <div className="mt-5 h-56 rounded-[24px] border border-white/8 bg-black/20 p-3">
                <MiniAreaChart data={financialChartData.map((item) => ({ label: item.year, value: item.eps }))} color="#4dd8ff" />
              </div>
            </div>
          </div>
        </section>

        <section id="ai-research" className="glass rounded-[32px] p-6 sm:p-8">
          <SectionHeader
            kicker="AI Research"
            title="Interpretation is the differentiator."
            description="Data alone is not enough. AI should summarize the business, flag risks and explain the changes using the same underlying numbers shown on the page."
          />
          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            {[
              {
                title: "Business snapshot",
                description: "Summarize the business in plain language and keep the answer tied to the actual financial periods.",
              },
              {
                title: "Risk monitor",
                description: "Highlight debt, cyclicality, competition and regulatory exposure before the user reaches the conclusion.",
              },
              {
                title: "Valuation context",
                description: "Compare current multiples to history, peers and growth assumptions in one pass.",
              },
            ].map((card) => (
              <div key={card.title} className="rounded-[28px] border border-white/8 bg-black/20 p-5">
                <p className="text-lg font-semibold text-white">{card.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="glass rounded-[32px] p-6 sm:p-8">
            <SectionHeader
              kicker="News + Filings"
              title="Feed the decision engine."
              description="Announcements, filings, insider activity and rating changes belong in the research workflow, not in a separate product silo."
            />
            <div className="mt-6 space-y-3">
              {newsFeed.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-white">{item.title}</p>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.time}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-[32px] p-6 sm:p-8">
            <SectionHeader
              kicker="Mobile"
              title="Use a bottom navigation pattern instead of shrinking desktop chrome."
              description="The mobile layout keeps navigation reachable and preserves the product's data density without forcing tiny desktop patterns onto a phone."
            />
            <div className="mt-6 rounded-[28px] border border-white/8 bg-black/25 p-4">
              <div className="mx-auto flex max-w-sm flex-col gap-4 rounded-[28px] border border-white/8 bg-[#0b1018] p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span className="display-font text-lg font-semibold tracking-[0.18em] text-white">QUANTLY</span>
                  <div className="flex items-center gap-3">
                    <Bell className="h-4 w-4" />
                    <LayoutDashboard className="h-4 w-4" />
                  </div>
                </div>
                <div className="rounded-[24px] border border-white/8 bg-white/5 p-4 text-sm text-slate-300">Search stocks...</div>
                <div className="rounded-[24px] border border-white/8 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Market Pulse</p>
                  <p className="mt-2 text-2xl font-semibold text-white text-tabular">NIFTY 50</p>
                  <p className="text-emerald-400 text-tabular">25,420  +0.72%</p>
                </div>
                <div className="rounded-[24px] border border-white/8 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Watchlist</p>
                  <div className="mt-3 space-y-2 text-sm text-slate-200">
                    <div className="flex justify-between"><span>RELIANCE</span><span className="text-emerald-400">+1.42%</span></div>
                    <div className="flex justify-between"><span>TCS</span><span className="text-rose-400">-0.32%</span></div>
                    <div className="flex justify-between"><span>INFY</span><span className="text-emerald-400">+0.84%</span></div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 rounded-[24px] border border-white/8 bg-black/20 p-3 text-[11px] uppercase tracking-[0.2em] text-slate-300">
                  <span className="rounded-full bg-cyan-400 px-2 py-2 text-center text-slate-950">Home</span>
                  <span className="rounded-full bg-white/5 px-2 py-2 text-center">Stocks</span>
                  <span className="rounded-full bg-white/5 px-2 py-2 text-center">Screen</span>
                  <span className="rounded-full bg-white/5 px-2 py-2 text-center">AI</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="mb-6 rounded-[28px] border border-white/8 bg-black/25 px-6 py-6 text-sm text-slate-400 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-white">Quantly</p>
              <p className="mt-1">Premium stock research and screening experience for Indian investors.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-white/8 px-4 py-2">Screens</span>
              <span className="rounded-full border border-white/8 px-4 py-2">Watchlists</span>
              <span className="rounded-full border border-white/8 px-4 py-2">AI Research</span>
              <span className="rounded-full border border-white/8 px-4 py-2">Portfolio</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
