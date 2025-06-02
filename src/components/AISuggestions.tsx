
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Brain, 
  RefreshCw, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Lightbulb,
  Clock,
  Star
} from "lucide-react";

interface Suggestion {
  id: string;
  type: 'trade' | 'goal' | 'journal' | 'market';
  title: string;
  content: string;
  confidence: number;
  timestamp: Date;
  category: string;
}

export const AISuggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: '1',
      type: 'trade',
      title: 'BTC Breakout Setup',
      content: 'Bitcoin is approaching the $43,500 resistance level with increasing volume. Consider a long position if it breaks above with confirmation.',
      confidence: 85,
      timestamp: new Date(),
      category: 'Technical Analysis'
    },
    {
      id: '2',
      type: 'goal',
      title: 'Weekly Risk Management',
      content: 'Based on your recent trades, consider reducing position sizes by 25% this week to maintain your 2% risk per trade rule.',
      confidence: 92,
      timestamp: new Date(),
      category: 'Risk Management'
    },
    {
      id: '3',
      type: 'journal',
      title: 'Emotion Tracking',
      content: 'Your last 3 trades showed FOMO patterns. Document your emotional state before entering positions this week.',
      confidence: 78,
      timestamp: new Date(),
      category: 'Psychology'
    }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  const generateSuggestions = async () => {
    setIsGenerating(true);
    
    // Simulate AI API call
    setTimeout(() => {
      const newSuggestion: Suggestion = {
        id: Date.now().toString(),
        type: 'trade',
        title: 'AI Generated Setup',
        content: 'Based on current market conditions and your trading history, consider monitoring ETH/USD for a potential reversal at the $2,450 support level.',
        confidence: Math.floor(Math.random() * 30) + 70,
        timestamp: new Date(),
        category: 'AI Analysis'
      };
      
      setSuggestions(prev => [newSuggestion, ...prev.slice(0, 4)]);
      setIsGenerating(false);
    }, 2000);
  };

  const generateCustomSuggestion = async () => {
    if (!customPrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing custom prompt
    setTimeout(() => {
      const newSuggestion: Suggestion = {
        id: Date.now().toString(),
        type: 'trade',
        title: 'Custom AI Analysis',
        content: `Based on your prompt: "${customPrompt.slice(0, 50)}..." - The AI suggests monitoring key support/resistance levels and volume confirmation before entering positions.`,
        confidence: Math.floor(Math.random() * 20) + 75,
        timestamp: new Date(),
        category: 'Custom Analysis'
      };
      
      setSuggestions(prev => [newSuggestion, ...prev.slice(0, 4)]);
      setCustomPrompt('');
      setIsGenerating(false);
    }, 2000);
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'trade': return <TrendingUp className="h-4 w-4" />;
      case 'goal': return <Target className="h-4 w-4" />;
      case 'journal': return <BookOpen className="h-4 w-4" />;
      case 'market': return <Brain className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400 border-green-400';
    if (confidence >= 75) return 'text-mint border-mint';
    if (confidence >= 60) return 'text-yellow-400 border-yellow-400';
    return 'text-red-400 border-red-400';
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="gradient-text flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Trading Assistant
            </CardTitle>
            <Button 
              onClick={generateSuggestions}
              disabled={isGenerating}
              className="bg-mint hover:bg-mint/80 text-dark-blue"
            >
              {isGenerating ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Generate
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Custom Analysis Prompt</label>
            <Textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Ask AI for specific trading advice, market analysis, or strategy suggestions..."
              className="bg-slate-700 border-slate-600"
            />
            <Button 
              onClick={generateCustomSuggestion}
              disabled={isGenerating || !customPrompt.trim()}
              variant="outline"
              className="border-mint/50 hover-mint-border"
            >
              <Brain className="h-4 w-4 mr-2" />
              Analyze
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {suggestions.map((suggestion) => (
          <Card key={suggestion.id} className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="text-mint">
                    {getSuggestionIcon(suggestion.type)}
                  </div>
                  <h3 className="font-semibold text-foreground">{suggestion.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`${getConfidenceColor(suggestion.confidence)} text-xs`}
                  >
                    {suggestion.confidence}% confidence
                  </Badge>
                  <Badge variant="outline" className="text-xs capitalize border-mint/50 text-mint">
                    {suggestion.type}
                  </Badge>
                </div>
              </div>
              
              <p className="text-slate-300 text-sm mb-3">{suggestion.content}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="h-3 w-3" />
                  {suggestion.timestamp.toLocaleTimeString()}
                  <span>•</span>
                  <span>{suggestion.category}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-mint/50 hover-mint-border">
                    <Star className="h-3 w-3" />
                  </Button>
                  <Button size="sm" className="bg-mint hover:bg-mint/80 text-dark-blue">
                    Apply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
