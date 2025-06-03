import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Lock,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";
import { BorderRotate } from "@/components/ui/animated-gradient-border";
import { Component as HyperspeedBackground } from "@/components/ui/hyperspeed";
import { Component as StackedCards } from "@/components/ui/stacked-activity-cards";

const Index = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Advanced Analytics",
      description: "Real-time market data, portfolio tracking, and performance analytics with AI-powered insights.",
      color: "from-primary/20 to-primary/10"
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI Trading Assistant",
      description: "Get personalized trade suggestions, market analysis, and risk management recommendations.",
      color: "from-primary/20 to-primary/10"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Secure & Private",
      description: "Bank-grade security with end-to-end encryption. Your data stays private and secure.",
      color: "from-primary/20 to-primary/10"
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Lightning Fast",
      description: "Sub-millisecond data feeds and instant order execution across multiple exchanges.",
      color: "from-primary/20 to-primary/10"
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Smart Alerts",
      description: "Custom price alerts, whale tracking, and market sentiment notifications.",
      color: "from-primary/20 to-primary/10"
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Multi-Chain Support",
      description: "Track and trade across Bitcoin, Ethereum, Solana, and 50+ other blockchains.",
      color: "from-primary/20 to-primary/10"
    }
  ];

  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Professional Trader",
      image: "/placeholder.svg",
      content: "This platform revolutionized my trading. The AI suggestions helped me increase my win rate by 40%.",
      rating: 5
    },
    {
      name: "Sarah Chen",
      role: "Crypto Investor",
      image: "/placeholder.svg", 
      content: "The whale tracking feature is incredible. I can spot large movements before they affect the market.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "DeFi Specialist",
      image: "/placeholder.svg",
      content: "Best portfolio management tool I've used. Real-time analytics and perfect execution every time.",
      rating: 5
    }
  ];

  const stats = [
    { label: "Active Traders", value: "50K+", icon: <Users className="h-6 w-6" /> },
    { label: "Trading Volume", value: "$2.1B", icon: <TrendingUp className="h-6 w-6" /> },
    { label: "Success Rate", value: "94%", icon: <Target className="h-6 w-6" /> },
    { label: "Uptime", value: "99.9%", icon: <Activity className="h-6 w-6" /> }
  ];

  const videos = [
    {
      title: "Getting Started with CryptoTrader Pro",
      duration: "3:45",
      thumbnail: "/placeholder.svg",
      description: "Learn the basics of setting up your account and making your first trade."
    },
    {
      title: "Advanced Portfolio Management",
      duration: "8:22",
      thumbnail: "/placeholder.svg",
      description: "Master portfolio optimization, risk management, and automated rebalancing."
    },
    {
      title: "AI Trading Strategies Explained",
      duration: "12:18",
      thumbnail: "/placeholder.svg",
      description: "Deep dive into how our AI analyzes markets and generates trading signals."
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      features: [
        "Basic portfolio tracking",
        "5 watchlist items",
        "Standard alerts",
        "Community access"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "$29",
      period: "per month",
      features: [
        "Advanced analytics",
        "Unlimited watchlists",
        "AI trade suggestions",
        "Real-time alerts",
        "Whale tracking",
        "Priority support"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      features: [
        "Everything in Professional",
        "API access",
        "Custom integrations",
        "Dedicated support",
        "Advanced risk management",
        "Multi-user accounts"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
    alert("Thank you for subscribing!");
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback:", feedback);
    setFeedback("");
    alert("Thank you for your feedback!");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hyperspeed Background */}
      <div className="absolute inset-0 z-0">
        <HyperspeedBackground />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-6 text-primary">
              TradingPro
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Advanced AI-powered trading platform with comprehensive analysis tools, 
              real-time market data, and intelligent insights.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                asChild
                className="bg-primary hover:bg-primary/90 text-slate-900 font-semibold px-8 py-3 text-lg"
              >
                <Link to="/dashboard">
                  Launch Dashboard
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-slate-900 px-8 py-3 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="glass-effect border-primary/20">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-100 mb-2">
                  Advanced Analytics
                </h3>
                <p className="text-slate-400">
                  Deep market analysis with AI-powered insights and predictive modeling
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-primary/20">
              <CardContent className="p-6 text-center">
                <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-100 mb-2">
                  AI Trading Signals
                </h3>
                <p className="text-slate-400">
                  Smart trading recommendations powered by machine learning algorithms
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-primary/20">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-100 mb-2">
                  Risk Management
                </h3>
                <p className="text-slate-400">
                  Comprehensive risk assessment and portfolio protection tools
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Activity Cards Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-primary text-center mb-8">
              Recent Trading Activity
            </h2>
            <StackedCards />
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="glass-effect border-primary/20 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Ready to Transform Your Trading?
                </h2>
                <p className="text-slate-300 mb-6">
                  Join thousands of traders using our AI-powered platform to make smarter decisions
                </p>
                <Button 
                  asChild
                  className="bg-primary hover:bg-primary/90 text-slate-900 font-semibold px-12 py-4 text-lg"
                >
                  <Link to="/dashboard">
                    Get Started Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
