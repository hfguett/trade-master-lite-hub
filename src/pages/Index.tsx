
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RingProgress, BarProgress } from "@/components/ui/enhanced-progress";
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  Users, 
  Star, 
  Play, 
  ChevronRight,
  BarChart3,
  Target,
  Brain,
  Clock,
  Globe,
  Activity,
  ArrowRight,
  Sparkles,
  Lock,
  PieChart,
  LineChart,
  DollarSign,
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";
import { Component as StackedCards } from "@/components/ui/stacked-activity-cards";
import { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart as RechartsPie, Cell, BarChart as RechartsBar, Bar, Pie } from 'recharts';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [email, setEmail] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const chartSectionRef = useRef<HTMLDivElement>(null);

  // Sample data for charts
  const tradingData = [
    { name: 'Jan', profit: 4000, volume: 2400 },
    { name: 'Feb', profit: 3000, volume: 1398 },
    { name: 'Mar', profit: 2000, volume: 9800 },
    { name: 'Apr', profit: 2780, volume: 3908 },
    { name: 'May', profit: 1890, volume: 4800 },
    { name: 'Jun', profit: 2390, volume: 3800 },
    { name: 'Jul', profit: 3490, volume: 4300 },
  ];

  const portfolioData = [
    { name: 'BTC', value: 45, fill: '#06b6d4' },
    { name: 'ETH', value: 25, fill: '#3b82f6' },
    { name: 'SOL', value: 15, fill: '#8b5cf6' },
    { name: 'Others', value: 15, fill: '#06d6a0' },
  ];

  const performanceData = [
    { name: 'Week 1', value: 85 },
    { name: 'Week 2', value: 92 },
    { name: 'Week 3', value: 78 },
    { name: 'Week 4', value: 96 },
  ];

  useEffect(() => {
    // Hero animations
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          stagger: 0.2,
          ease: "power3.out"
        }
      );
    }

    // Parallax effect
    gsap.to(parallaxRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: parallaxRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Cards animation
    if (cardsRef.current) {
      gsap.fromTo(cardsRef.current.children,
        { opacity: 0, scale: 0.8, rotateY: 45 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Chart section animation
    if (chartSectionRef.current) {
      gsap.fromTo(chartSectionRef.current.children,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: chartSectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
    alert("Thank you for subscribing!");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Enhanced Background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent"></div>
      
      {/* Content overlay */}
      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <div ref={heroRef} className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <Badge className="mx-auto flex w-fit items-center gap-2 rounded-full border border-cyan-500/30 bg-slate-900/80 p-2 pl-4 shadow-lg backdrop-blur-sm mb-8 transition-all duration-500 hover:scale-110 hover:shadow-cyan-500/50 hover:border-cyan-400/60">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-inter">AI-Powered Trading Revolution</span>
              <div className="bg-cyan-500/20 group-hover:bg-cyan-500/30 size-6 overflow-hidden rounded-full duration-500">
                <ArrowRight className="m-auto size-3 text-cyan-400" />
              </div>
            </Badge>

            <h1 className="text-7xl font-bold mb-6 text-white leading-tight font-inter transition-all duration-700 hover:scale-105 hover:text-cyan-300">
              Trade Smarter with
              <span className="block text-cyan-400 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                AI Intelligence
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-inter transition-all duration-500 hover:text-slate-200">
              Professional-grade crypto trading platform with real-time analytics, AI-powered insights, 
              whale tracking, and advanced portfolio management tools. Join 50,000+ traders already using our platform.
            </p>
            
            <div className="flex gap-6 justify-center mb-16">
              <Button 
                asChild
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-12 py-4 text-lg rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-500 hover:scale-110 hover:rotate-1 font-inter"
              >
                <Link to="/dashboard">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Launch Dashboard
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-cyan-500/50 text-white hover:bg-cyan-500/10 px-12 py-4 text-lg rounded-xl backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:-rotate-1 font-inter"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Enhanced Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <div className="text-center group transition-all duration-500 hover:scale-125 hover:rotate-3">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-cyan-500/30">
                    <Activity className="h-8 w-8 text-cyan-400" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2 font-inter transition-all duration-300 group-hover:text-cyan-300">$2.1B</div>
                <div className="text-slate-400 font-inter transition-all duration-300 group-hover:text-slate-300">Trading Volume</div>
              </div>
              <div className="text-center group transition-all duration-500 hover:scale-125 hover:rotate-3">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/30">
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2 font-inter transition-all duration-300 group-hover:text-blue-300">50K+</div>
                <div className="text-slate-400 font-inter transition-all duration-300 group-hover:text-slate-300">Active Traders</div>
              </div>
              <div className="text-center group transition-all duration-500 hover:scale-125 hover:rotate-3">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/30">
                    <Shield className="h-8 w-8 text-purple-400" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2 font-inter transition-all duration-300 group-hover:text-purple-300">99.9%</div>
                <div className="text-slate-400 font-inter transition-all duration-300 group-hover:text-slate-300">Uptime</div>
              </div>
              <div className="text-center group transition-all duration-500 hover:scale-125 hover:rotate-3">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-br from-green-500/20 to-teal-600/20 rounded-2xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-green-500/30">
                    <Target className="h-8 w-8 text-green-400" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2 font-inter transition-all duration-300 group-hover:text-green-300">94%</div>
                <div className="text-slate-400 font-inter transition-all duration-300 group-hover:text-slate-300">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Performance Rings Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center text-white mb-12 font-inter transition-all duration-500 hover:scale-105 hover:text-cyan-300">
            Platform Performance
          </h2>
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <RingProgress 
                value={94} 
                size={180} 
                label="AI Accuracy"
                showValue={true}
              />
            </div>
            <div className="text-center">
              <RingProgress 
                value={37} 
                size={180} 
                label="User Satisfaction"
                showValue={true}
              />
            </div>
            <div className="text-center">
              <RingProgress 
                value={99} 
                size={180} 
                label="System Uptime"
                showValue={true}
              />
            </div>
            <div className="text-center">
              <RingProgress 
                value={15} 
                size={180} 
                label="Profit Rate"
                showValue={true}
              />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div ref={chartSectionRef} className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center text-white mb-16 font-inter transition-all duration-500 hover:scale-105 hover:text-cyan-300">
            Real-Time Analytics & Insights
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Trading Performance Chart */}
            <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm transition-all duration-500 hover:bg-slate-900/90 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-500/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 font-inter transition-all duration-300 hover:text-cyan-300">
                  <LineChart className="h-6 w-6 text-cyan-400" />
                  Trading Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={tradingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="profit" 
                      stroke="#06b6d4" 
                      fill="url(#colorGradient)" 
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Portfolio Distribution */}
            <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm transition-all duration-500 hover:bg-slate-900/90 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 font-inter transition-all duration-300 hover:text-blue-300">
                  <PieChart className="h-6 w-6 text-blue-400" />
                  Portfolio Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPie>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPie>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Bar Progress Indicators */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="space-y-6">
              <BarProgress value={94} label="AI Trading Signals" />
              <BarProgress value={37} label="Risk Management" />
              <BarProgress value={82} label="Portfolio Optimization" />
              <BarProgress value={15} label="Market Analysis" />
            </div>
            <div className="space-y-6">
              <BarProgress value={96} label="Execution Speed" />
              <BarProgress value={45} label="Data Accuracy" />
              <BarProgress value={28} label="User Experience" />
              <BarProgress value={85} label="Customer Support" />
            </div>
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div ref={cardsRef} className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center text-white mb-16 font-inter transition-all duration-500 hover:scale-105 hover:text-cyan-300">
            Powerful Trading Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm group transition-all duration-700 hover:bg-slate-800/90 hover:scale-110 hover:rotate-2 hover:shadow-2xl hover:shadow-cyan-500/30 hover:border-cyan-500/50">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl group-hover:scale-110 transition-transform duration-500 group-hover:shadow-xl group-hover:shadow-cyan-500/40">
                    <BarChart3 className="h-12 w-12 text-cyan-400 transition-all duration-300 group-hover:rotate-12" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 font-inter transition-all duration-300 group-hover:text-cyan-300">
                  Advanced Analytics
                </h3>
                <p className="text-slate-400 leading-relaxed font-inter transition-all duration-300 group-hover:text-slate-300">
                  Real-time market data, portfolio tracking, and performance analytics with AI-powered insights and predictive modeling.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm group transition-all duration-700 hover:bg-slate-800/90 hover:scale-110 hover:rotate-2 hover:shadow-2xl hover:shadow-blue-500/30 hover:border-blue-500/50">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl group-hover:scale-110 transition-transform duration-500 group-hover:shadow-xl group-hover:shadow-blue-500/40">
                    <Brain className="h-12 w-12 text-blue-400 transition-all duration-300 group-hover:rotate-12" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 font-inter transition-all duration-300 group-hover:text-blue-300">
                  AI Trading Assistant
                </h3>
                <p className="text-slate-400 leading-relaxed font-inter transition-all duration-300 group-hover:text-slate-300">
                  Get personalized trade suggestions, market analysis, and risk management recommendations powered by machine learning.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm group transition-all duration-700 hover:bg-slate-800/90 hover:scale-110 hover:rotate-2 hover:shadow-2xl hover:shadow-purple-500/30 hover:border-purple-500/50">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl group-hover:scale-110 transition-transform duration-500 group-hover:shadow-xl group-hover:shadow-purple-500/40">
                    <Shield className="h-12 w-12 text-purple-400 transition-all duration-300 group-hover:rotate-12" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 font-inter transition-all duration-300 group-hover:text-purple-300">
                  Secure & Private
                </h3>
                <p className="text-slate-400 leading-relaxed font-inter transition-all duration-300 group-hover:text-slate-300">
                  Bank-grade security with end-to-end encryption. Your data stays private and secure with multi-layer protection.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm group transition-all duration-700 hover:bg-slate-800/90 hover:scale-110 hover:rotate-2 hover:shadow-2xl hover:shadow-green-500/30 hover:border-green-500/50">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-green-500/20 to-teal-600/20 rounded-2xl group-hover:scale-110 transition-transform duration-500 group-hover:shadow-xl group-hover:shadow-green-500/40">
                    <Zap className="h-12 w-12 text-green-400 transition-all duration-300 group-hover:rotate-12" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 font-inter transition-all duration-300 group-hover:text-green-300">
                  Lightning Fast
                </h3>
                <p className="text-slate-400 leading-relaxed font-inter transition-all duration-300 group-hover:text-slate-300">
                  Sub-millisecond data feeds and instant order execution across multiple exchanges with 99.9% uptime guarantee.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm group transition-all duration-700 hover:bg-slate-800/90 hover:scale-110 hover:rotate-2 hover:shadow-2xl hover:shadow-yellow-500/30 hover:border-yellow-500/50">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-2xl group-hover:scale-110 transition-transform duration-500 group-hover:shadow-xl group-hover:shadow-yellow-500/40">
                    <Target className="h-12 w-12 text-yellow-400 transition-all duration-300 group-hover:rotate-12" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 font-inter transition-all duration-300 group-hover:text-yellow-300">
                  Smart Alerts
                </h3>
                <p className="text-slate-400 leading-relaxed font-inter transition-all duration-300 group-hover:text-slate-300">
                  Custom price alerts, whale tracking, market sentiment notifications, and automated trading signals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm group transition-all duration-700 hover:bg-slate-800/90 hover:scale-110 hover:rotate-2 hover:shadow-2xl hover:shadow-indigo-500/30 hover:border-indigo-500/50">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-indigo-500/20 to-blue-600/20 rounded-2xl group-hover:scale-110 transition-transform duration-500 group-hover:shadow-xl group-hover:shadow-indigo-500/40">
                    <Globe className="h-12 w-12 text-indigo-400 transition-all duration-300 group-hover:rotate-12" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 font-inter transition-all duration-300 group-hover:text-indigo-300">
                  Multi-Chain Support
                </h3>
                <p className="text-slate-400 leading-relaxed font-inter transition-all duration-300 group-hover:text-slate-300">
                  Track and trade across Bitcoin, Ethereum, Solana, and 50+ other blockchains with unified portfolio management.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activity Cards Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center text-white mb-12 font-inter transition-all duration-500 hover:scale-105 hover:text-cyan-300">
            Recent Trading Activity
          </h2>
          <div className="transition-all duration-500 hover:scale-105">
            <StackedCards />
          </div>
        </div>

        {/* Parallax Section */}
        <div className="relative h-screen overflow-hidden">
          <div ref={parallaxRef} className="absolute inset-0 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950">
            <div className="container mx-auto px-4 h-full flex items-center justify-center text-center">
              <div>
                <h2 className="text-6xl font-bold text-white mb-6 font-inter transition-all duration-700 hover:scale-105 hover:text-cyan-300">
                  Transform Your Trading
                </h2>
                <p className="text-2xl text-slate-300 mb-8 max-w-3xl font-inter transition-all duration-500 hover:text-slate-200">
                  Join thousands of traders using our AI-powered platform to make smarter decisions and maximize profits
                </p>
                <Button 
                  asChild
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-16 py-6 text-xl rounded-2xl shadow-2xl transition-all duration-500 hover:scale-125 hover:rotate-3 hover:shadow-cyan-500/50 font-inter"
                >
                  <Link to="/dashboard">
                    <Briefcase className="mr-2 h-6 w-6" />
                    Start Trading Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="container mx-auto px-4 py-20">
          <Card className="bg-slate-900/90 border-slate-700/50 backdrop-blur-sm max-w-4xl mx-auto transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-500/50">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-6 font-inter transition-all duration-300 hover:text-cyan-300">
                Stay Ahead of the Market
              </h2>
              <p className="text-xl text-slate-300 mb-8 font-inter transition-all duration-300 hover:text-slate-200">
                Get exclusive trading insights, market analysis, and platform updates delivered to your inbox
              </p>
              <form onSubmit={handleNewsletterSignup} className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 hover:border-cyan-500/50 font-inter"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-8 py-4 rounded-xl transition-all duration-500 hover:scale-110 hover:rotate-2 hover:shadow-xl hover:shadow-cyan-500/50 font-inter"
                >
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
