
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  Target, 
  Shield,
  Zap,
  Globe,
  Star,
  Check,
  ArrowRight,
  Play
} from "lucide-react";
import { Link } from "react-router-dom";
import { TradingChart } from "@/components/ui/TradingChart";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        ".hero-title",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
      );

      gsap.fromTo(
        ".hero-subtitle",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(
        ".hero-cta",
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, delay: 0.6, ease: "back.out(1.7)" }
      );

      // Features animation on scroll
      gsap.fromTo(
        ".feature-card",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".features-section",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats animation
      gsap.fromTo(
        ".stat-item",
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating animation for dashboard preview
      gsap.to(".dashboard-preview", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const mockPortfolioData = [
    { name: 'Jan', value: 10000 },
    { name: 'Feb', value: 12500 },
    { name: 'Mar', value: 18000 },
    { name: 'Apr', value: 22000 },
    { name: 'May', value: 28000 },
  ];

  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-mint" />,
      title: "Smart Trading Journal",
      description: "Track every trade with detailed analytics, screenshots, and performance insights to improve your strategy.",
      highlight: "AI-Powered Analysis"
    },
    {
      icon: <PieChart className="h-8 w-8 text-mint" />,
      title: "Portfolio Management",
      description: "Real-time portfolio tracking with advanced analytics, risk assessment, and diversification insights.",
      highlight: "Real-Time Updates"
    },
    {
      icon: <Globe className="h-8 w-8 text-mint" />,
      title: "Market Intelligence",
      description: "Live market data, economic calendar, and news feed to stay ahead of market movements.",
      highlight: "Global Markets"
    },
    {
      icon: <Target className="h-8 w-8 text-mint" />,
      title: "Goal Planning",
      description: "Set SMART trading goals, track progress, and get AI-powered suggestions for improvement.",
      highlight: "SMART Goals"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Day Trader",
      content: "TradeMaster Lite transformed my trading. The journal feature helped me identify my mistakes and improve my win rate by 40%.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Crypto Trader",
      content: "The portfolio tracking is incredible. I can see all my positions across different exchanges in one place.",
      rating: 5
    },
    {
      name: "Emily Thompson",
      role: "Swing Trader",
      content: "The goal planning feature keeps me disciplined. I've achieved my best monthly returns since using this platform.",
      rating: 5
    }
  ];

  const pricing = [
    {
      name: "Free Trader",
      price: "$0",
      period: "forever",
      description: "Perfect for beginners",
      features: [
        "Trading journal (unlimited trades)",
        "Basic portfolio tracking",
        "Market data & news",
        "Goal setting & tracking",
        "Community support"
      ],
      popular: false
    },
    {
      name: "Rookie Trader",
      price: "$29",
      period: "month",
      description: "For serious traders",
      features: [
        "Everything in Free",
        "Advanced analytics",
        "Multiple exchange connections",
        "Priority support",
        "Advanced reporting",
        "Custom indicators"
      ],
      popular: true
    },
    {
      name: "Pro Trader",
      price: "$79",
      period: "month",
      description: "For professional traders",
      features: [
        "Everything in Rookie",
        "Custom dashboards",
        "API access",
        "White-label options",
        "1-on-1 coaching session",
        "Priority features"
      ],
      popular: false
    }
  ];

  return (
    <div ref={heroRef} className="min-h-screen bg-dark-blue text-foreground">
      {/* Navigation */}
      <nav className="border-b border-mint/20 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-mint rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-dark-blue" />
              </div>
              <span className="text-xl font-bold gradient-text">TradeMaster Lite</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-mint transition-colors">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-mint transition-colors">Pricing</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-mint transition-colors">Reviews</a>
              <Link to="/dashboard">
                <Button className="bg-mint hover:bg-mint/80 text-dark-blue transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-mint/25">
                  Launch App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-mint/20 text-mint border-mint/50 animate-pulse-slow">
                <Zap className="h-3 w-3 mr-1" />
                Now with AI-Powered Insights
              </Badge>
              
              <h1 className="hero-title text-5xl lg:text-7xl font-bold mb-6">
                Master Your Trades with <span className="gradient-text">Ease</span>
              </h1>
              
              <p className="hero-subtitle text-xl text-muted-foreground mb-8 leading-relaxed">
                Track, plan, and grow your trading portfolio with TradeMaster Lite. 
                The ultimate platform for retail traders who want professional-grade tools without the complexity.
              </p>
              
              <div className="hero-cta flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="bg-mint hover:bg-mint/80 text-dark-blue text-lg px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-mint/25">
                    Start Trading for Free
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-mint/50 hover-mint-border text-lg px-8 py-4 transition-all duration-300 hover:scale-105">
                  <Play className="h-5 w-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-mint" />
                  <span>Free forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-mint" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-mint" />
                  <span>Start in 30 seconds</span>
                </div>
              </div>
            </div>
            
            <div className="dashboard-preview relative">
              <Card className="glass-effect border-mint/20 hover:border-mint/40 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="gradient-text">Live Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <TradingChart 
                    type="area" 
                    data={mockPortfolioData} 
                    height={300}
                    animate={true}
                  />
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-mint">+28.5%</div>
                      <div className="text-sm text-muted-foreground">Total Return</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-mint">72.3%</div>
                      <div className="text-sm text-muted-foreground">Win Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-mint">$28K</div>
                      <div className="text-sm text-muted-foreground">Portfolio</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="stats-section py-16 px-4 sm:px-6 lg:px-8 bg-vibrant-blue/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="stat-item text-center">
              <div className="text-4xl font-bold text-mint mb-2">50K+</div>
              <div className="text-muted-foreground">Active Traders</div>
            </div>
            <div className="stat-item text-center">
              <div className="text-4xl font-bold text-mint mb-2">2.3M+</div>
              <div className="text-muted-foreground">Trades Logged</div>
            </div>
            <div className="stat-item text-center">
              <div className="text-4xl font-bold text-mint mb-2">$127M+</div>
              <div className="text-muted-foreground">Portfolio Value</div>
            </div>
            <div className="stat-item text-center">
              <div className="text-4xl font-bold text-mint mb-2">98.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="features-section py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-mint/20 text-mint border-mint/50">
              <Shield className="h-3 w-3 mr-1" />
              Professional Tools
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
              Everything You Need to Trade Like a Pro
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From journal tracking to portfolio management, we've got all the tools you need to elevate your trading game.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card glass-effect border-mint/20 hover-mint-border transition-all duration-500 hover:scale-105 group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-mint/20 group-hover:bg-mint/30 transition-colors">
                      {feature.icon}
                    </div>
                    <Badge variant="outline" className="border-mint/50 text-mint">
                      {feature.highlight}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl gradient-text">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-vibrant-blue/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Trusted by Thousands of Traders</h2>
            <p className="text-xl text-muted-foreground">
              See what our community has to say about their trading journey
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-effect border-mint/20 hover-mint-border transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-mint text-mint" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold text-mint">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">
              Start free and scale as you grow. No hidden fees, cancel anytime.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <Card key={index} className={`glass-effect transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-mint ring-2 ring-mint/50' 
                  : 'border-mint/20 hover-mint-border'
              }`}>
                {plan.popular && (
                  <div className="bg-mint text-dark-blue text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="gradient-text">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-mint">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-mint" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full transition-all duration-300 hover:scale-105 ${
                      plan.popular 
                        ? 'bg-mint hover:bg-mint/80 text-dark-blue' 
                        : 'border-mint/50 hover-mint-border'
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.price === '$0' ? 'Start Free' : 'Start Trial'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-mint/20 to-vibrant-blue/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of traders who've already elevated their game with TradeMaster Lite.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-mint hover:bg-mint/80 text-dark-blue text-lg px-8 py-4 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-mint/25">
              Start Your Trading Journey
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-mint/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-mint rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-dark-blue" />
                </div>
                <span className="text-xl font-bold gradient-text">TradeMaster Lite</span>
              </div>
              <p className="text-muted-foreground">
                The ultimate trading platform for retail traders who want professional-grade tools.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-mint">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-mint transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-mint transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-mint transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-mint transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-mint">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-mint transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-mint transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-mint transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-mint transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-mint">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-mint transition-colors">About</a></li>
                <li><a href="#" className="hover:text-mint transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-mint transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-mint transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-mint/20 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 TradeMaster Lite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
