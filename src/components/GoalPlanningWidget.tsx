
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Calendar, Zap, RefreshCw, Sparkles } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  deadline: string;
  category: 'performance' | 'risk' | 'learning' | 'discipline';
}

interface GoalSuggestion {
  title: string;
  description: string;
  category: 'performance' | 'risk' | 'learning' | 'discipline';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeFrame: 'daily' | 'weekly' | 'monthly';
}

export const GoalPlanningWidget: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [suggestions, setSuggestions] = useState<GoalSuggestion[]>([]);
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [dailySuggestions, setDailySuggestions] = useState<GoalSuggestion[]>([]);

  const allGoalSuggestions: GoalSuggestion[] = [
    // Performance Goals
    {
      title: "Achieve 70% Win Rate",
      description: "Maintain a consistent win rate above 70% for 30 consecutive trades",
      category: "performance",
      difficulty: "intermediate",
      timeFrame: "monthly"
    },
    {
      title: "Daily Profit Target",
      description: "Earn $200 profit per trading day for one week",
      category: "performance",
      difficulty: "beginner",
      timeFrame: "daily"
    },
    {
      title: "Monthly 15% Returns",
      description: "Achieve 15% monthly returns while maintaining risk discipline",
      category: "performance",
      difficulty: "advanced",
      timeFrame: "monthly"
    },
    {
      title: "Scalping Master",
      description: "Complete 20 successful scalping trades in one session",
      category: "performance",
      difficulty: "advanced",
      timeFrame: "daily"
    },
    {
      title: "Swing Trading Success",
      description: "Hold 5 swing positions for 3+ days with 80% success rate",
      category: "performance",
      difficulty: "intermediate",
      timeFrame: "weekly"
    },

    // Risk Management Goals
    {
      title: "Risk Management Master",
      description: "Never risk more than 2% of portfolio on a single trade for 3 months",
      category: "risk",
      difficulty: "beginner",
      timeFrame: "monthly"
    },
    {
      title: "Stop Loss Discipline",
      description: "Honor every stop loss without moving it for 50 trades",
      category: "risk",
      difficulty: "intermediate",
      timeFrame: "weekly"
    },
    {
      title: "Portfolio Diversification",
      description: "Maintain balanced exposure across 5 different asset classes",
      category: "risk",
      difficulty: "intermediate",
      timeFrame: "monthly"
    },
    {
      title: "Maximum Drawdown Control",
      description: "Keep maximum daily drawdown under 5% for one month",
      category: "risk",
      difficulty: "intermediate",
      timeFrame: "daily"
    },
    {
      title: "Position Sizing Excellence",
      description: "Calculate proper position size for every trade based on volatility",
      category: "risk",
      difficulty: "beginner",
      timeFrame: "daily"
    },

    // Learning Goals
    {
      title: "Learn Technical Analysis",
      description: "Master 5 key technical indicators and use them consistently",
      category: "learning",
      difficulty: "beginner",
      timeFrame: "weekly"
    },
    {
      title: "Market Analysis Expert",
      description: "Analyze and predict market trends with 80% accuracy over 100 predictions",
      category: "learning",
      difficulty: "advanced",
      timeFrame: "monthly"
    },
    {
      title: "News Trading Strategy",
      description: "Develop and test a profitable news-based trading strategy",
      category: "learning",
      difficulty: "intermediate",
      timeFrame: "weekly"
    },
    {
      title: "Crypto Fundamentals",
      description: "Research and understand fundamentals of 10 different cryptocurrencies",
      category: "learning",
      difficulty: "beginner",
      timeFrame: "weekly"
    },
    {
      title: "Options Trading Basics",
      description: "Learn and execute 5 different options trading strategies",
      category: "learning",
      difficulty: "advanced",
      timeFrame: "monthly"
    },

    // Discipline Goals
    {
      title: "Daily Trading Journal",
      description: "Document every trade with detailed analysis for 90 days",
      category: "discipline",
      difficulty: "beginner",
      timeFrame: "daily"
    },
    {
      title: "Emotion Control Challenge",
      description: "Complete 50 trades without deviating from your trading plan",
      category: "discipline",
      difficulty: "intermediate",
      timeFrame: "weekly"
    },
    {
      title: "Morning Routine Master",
      description: "Complete market analysis routine before trading for 30 days",
      category: "discipline",
      difficulty: "beginner",
      timeFrame: "daily"
    },
    {
      title: "No FOMO Trading",
      description: "Avoid FOMO trades for 2 weeks straight",
      category: "discipline",
      difficulty: "intermediate",
      timeFrame: "daily"
    },
    {
      title: "Trading Schedule Adherence",
      description: "Stick to predetermined trading hours for one month",
      category: "discipline",
      difficulty: "beginner",
      timeFrame: "daily"
    },
    {
      title: "Screen Time Management",
      description: "Limit trading screen time to 6 hours per day for 2 weeks",
      category: "discipline",
      difficulty: "intermediate",
      timeFrame: "daily"
    },
    {
      title: "Weekend Trading Break",
      description: "Take complete breaks from trading every weekend for one month",
      category: "discipline",
      difficulty: "beginner",
      timeFrame: "weekly"
    }
  ];

  useEffect(() => {
    // Initialize with some sample goals
    const sampleGoals: Goal[] = [
      {
        id: '1',
        title: 'Daily Trading Journal',
        description: 'Document every trade for 30 days',
        progress: 18,
        target: 30,
        deadline: '2024-02-15',
        category: 'discipline'
      },
      {
        id: '2',
        title: 'Risk Management',
        description: 'Never risk more than 2% per trade',
        progress: 25,
        target: 50,
        deadline: '2024-03-01',
        category: 'risk'
      }
    ];
    
    setGoals(sampleGoals);
    setSuggestions(allGoalSuggestions);
    
    // Set daily suggestions (rotate every day)
    const today = new Date().getDay();
    const dailyGoals = allGoalSuggestions.filter(g => g.timeFrame === 'daily');
    const rotatedDailyGoals = [...dailyGoals.slice(today), ...dailyGoals.slice(0, today)];
    setDailySuggestions(rotatedDailyGoals.slice(0, 3));
  }, []);

  const getNextSuggestion = () => {
    setCurrentSuggestion((prev) => (prev + 1) % suggestions.length);
  };

  const addSuggestionAsGoal = (suggestion?: GoalSuggestion) => {
    const goalToAdd = suggestion || suggestions[currentSuggestion];
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: goalToAdd.title,
      description: goalToAdd.description,
      progress: 0,
      target: goalToAdd.difficulty === 'beginner' ? 30 : goalToAdd.difficulty === 'intermediate' ? 60 : 100,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: goalToAdd.category
    };
    
    setGoals(prev => [...prev, newGoal]);
    if (!suggestion) {
      getNextSuggestion();
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return 'bg-mint text-dark-blue';
      case 'risk': return 'bg-red-500/20 text-red-400';
      case 'learning': return 'bg-blue-500/20 text-blue-400';
      case 'discipline': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getTimeFrameIcon = (timeFrame: string) => {
    switch (timeFrame) {
      case 'daily': return '📅';
      case 'weekly': return '📊';
      case 'monthly': return '🎯';
      default: return '⏰';
    }
  };

  return (
    <div className="space-y-6">
      {/* Daily Goal Suggestions */}
      <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-mint">
            <Sparkles className="h-5 w-5" />
            Today's Goal Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dailySuggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="p-3 rounded-lg bg-dark-blue/30 border border-mint/20 hover:bg-dark-blue/50 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{getTimeFrameIcon(suggestion.timeFrame)}</span>
                      <h4 className="font-medium text-sm">{suggestion.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {suggestion.description}
                    </p>
                    <div className="flex gap-1">
                      <Badge className={`${getCategoryColor(suggestion.category)} text-xs`}>
                        {suggestion.category}
                      </Badge>
                      <Badge variant="outline" className={`${getDifficultyColor(suggestion.difficulty)} text-xs`}>
                        {suggestion.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  onClick={() => addSuggestionAsGoal(suggestion)}
                  className="w-full bg-mint hover:bg-mint/80 text-dark-blue text-xs h-8"
                >
                  Add Goal
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Goal Suggestions */}
      <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-mint">
            <Zap className="h-5 w-5" />
            Smart Goal Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {suggestions.length > 0 && (
            <div className="p-4 rounded-lg bg-dark-blue/30 border border-mint/20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{getTimeFrameIcon(suggestions[currentSuggestion].timeFrame)}</span>
                    <h3 className="font-semibold text-lg">{suggestions[currentSuggestion].title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {suggestions[currentSuggestion].description}
                  </p>
                  <div className="flex gap-2">
                    <Badge className={getCategoryColor(suggestions[currentSuggestion].category)}>
                      {suggestions[currentSuggestion].category}
                    </Badge>
                    <Badge variant="outline" className={getDifficultyColor(suggestions[currentSuggestion].difficulty)}>
                      {suggestions[currentSuggestion].difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-mint border-mint">
                      {suggestions[currentSuggestion].timeFrame}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => addSuggestionAsGoal()}
                  className="bg-mint hover:bg-mint/80 text-dark-blue"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Add Goal
                </Button>
                <Button 
                  variant="outline" 
                  onClick={getNextSuggestion}
                  className="border-mint/50 hover-mint-border"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Next Suggestion
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Goals */}
      <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-mint">
            <Target className="h-5 w-5" />
            Active Goals ({goals.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.map((goal, index) => (
            <div 
              key={goal.id}
              className="p-4 rounded-lg bg-dark-blue/30 hover:bg-dark-blue/50 transition-all duration-200 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{goal.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>
                  <Badge className={getCategoryColor(goal.category)}>
                    {goal.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm font-mono">
                    {goal.progress}/{goal.target}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round((goal.progress / goal.target) * 100)}%</span>
                </div>
                <Progress 
                  value={(goal.progress / goal.target) * 100}
                  className="h-2"
                />
              </div>
            </div>
          ))}
          
          {goals.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No active goals yet. Add a suggestion above to get started!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
