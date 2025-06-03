
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
import { Component as HyperspeedBackground } from "@/components/ui/hyperspeed";
import { Component as StackedCards } from "@/components/ui/stacked-activity-cards";
import { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart as RechartsPie, Cell, BarChart as RechartsBar, Bar } from 'recharts';
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
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* Hyperspeed Background */}
      <div className="absolute inset-0 z-0">
        <HyperspeedBackground />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <div ref={heroRef} className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <Badge className="mx-auto flex w-fit items-center gap-2 rounded-full border border-cyan-500/30 bg-slate-900/80 p-2 pl-4 shadow-lg backdrop-blur-sm mb-8">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm">AI-Powered Trading Revolution</span>
              <div className="bg-cyan-500/20 group-hover:bg-cyan-500/30 size-6 overflow-hidden rounded-full duration-500">
                <ArrowRight className="m-auto size-3 text-cyan-400" />
              </div>
            </Badge>

            <h1 className="text-7xl font-bold mb-6 text-white leading-tight">
              Trade Smarter with
              <span className="block text-cyan-400 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                AI Intelligence
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Professional-grade crypto trading platform with real-time analytics, AI-powered insights, 
              whale tracking, and advanced portfolio management tools. Join 50,000+ traders already using our platform.
            </p>
            
            <div className="flex gap-6 justify-center mb-16">
              <Button 
                asChild
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-12 py-4 text-lg rounded-xl shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-300"
              >
                <Link to="/dashboard">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Launch Dashboard
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-cyan-500/50 text-white hover:bg-cyan-500/10 px-12 py-4 text-lg rounded-xl backdrop-blur-sm hover:scale-105 transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl">
                    <Activity className="h-8 w-8 text-cyan-400" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">$2.1B</div>
                <div className="text-slate-400">Trading Volume</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl">
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">50K+</div>
                <div className="text-slate-400">Active Traders</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl">
                    <Shield className="h-8 w-8 text-purple-400" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                <div className="text-slate-400">Uptime</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-br from-green-500/20 to-teal-600/20 rounded-2xl">
                    <Target className="h-8 w-8 text-green-400" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">94%</div>
                <div className="text-slate-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Rings Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Platform Performance
          </h2>
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <RingProgress 
                value={94} 
                size={120} 
                color="#06b6d4" 
                label="AI Accuracy"
                showValue={true}
              />
            </div>
            <div className="text-center">
              <RingProgress 
                value={87} 
                size={120} 
                color="#3b82f6" 
                label="User Satisfaction"
                showValue={true}
              />
            </div>
            <div className="text-center">
              <RingProgress 
                value={99} 
                size={120} 
                color="#8b5cf6" 
                label="System Uptime"
                showValue={true}
              />
            </div>
            <div className="text-center">
              <RingProgress 
                value={76} 
                size={120} 
                color="#06d6a0" 
                label="Profit Rate"
                showValue={true}
              />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div ref={chartSectionRef} className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Real-Time Analytics & Insights
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Trading Performance Chart */}
            <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/90 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
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
            <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/90 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PieChart className="h-6 w-6 text-blue-400" />
                  Portfolio Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPie>
                    <RechartsPie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </RechartsPie>
                    <Tooltip />
                  </RechartsPie>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Bar Progress Indicators */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="space-y-6">
              <BarProgress value={94} label="AI Trading Signals" color="#06b6d4" />
              <BarProgress value={87} label="Risk Management" color="#3b82f6" />
              <BarProgress value={92} label="Portfolio Optimization" color="#8b5cf6" />
              <BarProgress value={89} label="Market Analysis" color="#06d6a0" />
            </div>
            <div className="space-y-6">
              <BarProgress value={96} label="Execution Speed" color="#f59e0b" />
              <BarProgress value={91} label="Data Accuracy" color="#ef4444" />
              <BarProgress value={88} label="User Experience" color="#10b981" />
              <BarProgress value={85} label="Customer Support" color="#8b5cf6" />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div ref={cardsRef} className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Powerful Trading Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm group hover:bg-slate-800/90 transition-all duration-500 hover:scale-110 hover:rotate-1">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="h-12 w-12 text-cyan-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Advanced Analytics
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Real-time market data, portfolio tracking, and performance analytics with AI-powered insights and predictive modeling.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm group hover:bg-slate-800/90 transition-all duration-500 hover:scale-110 hover:rotate-1">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-12 w-12 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  AI Trading Assistant
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Get personalized trade suggestions, market analysis, and risk management recommendations powered by machine learning.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm group hover:bg-slate-800/90 transition-all duration-500 hover:scale-110 hover:rotate-1">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-12 w-12 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Secure & Private
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Bank-grade security with end-to-end encryption. Your data stays private and secure with multi-layer protection.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm group hover:bg-slate-800/90 transition-all duration-500 hover:scale-110 hover:rotate-1">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-green-500/20 to-teal-600/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-12 w-12 text-green-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Lightning Fast
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Sub-millisecond data feeds and instant order execution across multiple exchanges with 99.9% uptime guarantee.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm group hover:bg-slate-800/90 transition-all duration-500 hover:scale-110 hover:rotate-1">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-12 w-12 text-yellow-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Smart Alerts
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Custom price alerts, whale tracking, market sentiment notifications, and automated trading signals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm group hover:bg-slate-800/90 transition-all duration-500 hover:scale-110 hover:rotate-1">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-indigo-500/20 to-blue-600/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-12 w-12 text-indigo-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Multi-Chain Support
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Track and trade across Bitcoin, Ethereum, Solana, and 50+ other blockchains with unified portfolio management.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activity Cards Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Recent Trading Activity
          </h2>
          <StackedCards />
        </div>

        {/* Parallax Section */}
        <div className="relative h-screen overflow-hidden">
          <div ref={parallaxRef} className="absolute inset-0 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950">
            <div className="container mx-auto px-4 h-full flex items-center justify-center text-center">
              <div>
                <h2 className="text-6xl font-bold text-white mb-6">
                  Transform Your Trading
                </h2>
                <p className="text-2xl text-slate-300 mb-8 max-w-3xl">
                  Join thousands of traders using our AI-powered platform to make smarter decisions and maximize profits
                </p>
                <Button 
                  asChild
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-16 py-6 text-xl rounded-2xl shadow-2xl hover:scale-110 transition-all duration-300"
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
          <Card className="bg-slate-900/90 border-slate-700/50 backdrop-blur-sm max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Stay Ahead of the Market
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Get exclusive trading insights, market analysis, and platform updates delivered to your inbox
              </p>
              <form onSubmit={handleNewsletterSignup} className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300"
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
