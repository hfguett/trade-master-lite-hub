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
    <div className="min-h-screen bg-darker-blue cyber-grid">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Powerful Features</h2>
            <p className="text-xl text-primary/80 max-w-2xl mx-auto">
              Everything you need to trade cryptocurrencies like a professional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <BorderRotate 
                key={index}
                className="p-8 transition-all duration-300 hover:scale-105"
                animationMode="rotate-on-hover"
                animationSpeed={3}
                gradientColors={{
                  primary: '#0f172a',
                  secondary: '#06b6d4',
                  accent: '#67e8f9'
                }}
                backgroundColor="#1e293b"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </BorderRotate>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-darkest-blue/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Learn & Master</h2>
            <p className="text-xl text-primary/80 max-w-2xl mx-auto">
              Watch tutorials and master advanced trading strategies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <BorderRotate
                key={index}
                className="transition-all duration-300 hover:scale-105"
                animationMode="stop-rotate-on-hover"
                animationSpeed={4}
              >
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center hover:bg-black/40 transition-all cursor-pointer">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-slate-900 ml-1" />
                    </div>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-darkest-blue/80 text-primary border border-primary/30">
                    {video.duration}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-primary mb-2">{video.title}</h3>
                  <p className="text-slate-300 text-sm">{video.description}</p>
                </div>
              </BorderRotate>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">What Traders Say</h2>
            <p className="text-xl text-primary/80 max-w-2xl mx-auto">
              Join thousands of successful traders who trust our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <BorderRotate
                key={index}
                className="p-8 transition-all duration-300"
                animationMode="auto-rotate"
                animationSpeed={6}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-primary fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-primary/20"
                  />
                  <div>
                    <div className="font-semibold text-primary">{testimonial.name}</div>
                    <div className="text-slate-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </BorderRotate>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-darkest-blue/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Choose Your Plan</h2>
            <p className="text-xl text-primary/80 max-w-2xl mx-auto">
              Start free and upgrade as you grow your trading portfolio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <BorderRotate
                key={index}
                className={`transition-all duration-300 hover:scale-105 relative ${
                  plan.popular ? 'border-primary ring-2 ring-primary/20' : ''
                }`}
                animationMode={plan.popular ? "auto-rotate" : "rotate-on-hover"}
                animationSpeed={plan.popular ? 3 : 5}
                borderWidth={plan.popular ? 3 : 2}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-slate-900 px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <div className="p-8 relative">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-primary">{plan.price}</span>
                      {plan.period && <span className="text-slate-400 ml-2">{plan.period}</span>}
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-slate-300">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button className={`w-full ${plan.popular ? 'bg-primary text-slate-900 hover:bg-primary/90' : 'border border-primary/50 text-primary hover:bg-primary hover:text-slate-900'} transition-all duration-300`}>
                    {plan.cta}
                  </Button>
                </div>
              </BorderRotate>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Feedback */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary">Email</div>
                    <div className="text-primary/70">support@cryptotrader.pro</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary">Phone</div>
                    <div className="text-primary/70">+1 (555) 123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary">Office</div>
                    <div className="text-primary/70">San Francisco, CA</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Form */}
            <BorderRotate 
              className="transition-all duration-300"
              animationMode="rotate-on-hover"
              animationSpeed={4}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-4">Send Feedback</h3>
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <Textarea
                    placeholder="Share your thoughts or suggestions..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="bg-slate-800 border-primary/30 text-slate-100 min-h-32"
                    required
                  />
                  <Button type="submit" className="bg-primary text-slate-900 hover:bg-primary/90 w-full transition-all duration-300">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Feedback
                  </Button>
                </form>
              </div>
            </BorderRotate>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-darkest-blue/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Stay Updated</h2>
          <p className="text-xl text-primary/80 mb-8 max-w-2xl mx-auto">
            Get the latest market insights, trading tips, and platform updates
          </p>
          <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-darkest-blue border-mint/30 text-mint flex-1"
              required
            />
            <Button type="submit" className="mint-button border-2 border-mint">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/20 bg-darkest-blue/80 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-glow rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-darkest-blue" />
                </div>
                <span className="text-xl font-bold text-primary">CryptoTrader Pro</span>
              </div>
              <p className="text-primary/70">
                Professional crypto trading platform with AI-powered insights.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-primary mb-4">Platform</h3>
              <ul className="space-y-2 text-primary/70">
                <li><a href="#" className="hover:text-primary transition-colors">Trading</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Portfolio</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-primary mb-4">Resources</h3>
              <ul className="space-y-2 text-primary/70">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-primary mb-4">Legal</h3>
              <ul className="space-y-2 text-primary/70">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary/20 mt-12 pt-8 text-center text-primary/70">
            <p>&copy; 2024 CryptoTrader Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
