
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Target, Calendar, Trophy, Clock, CheckCircle } from "lucide-react";

export const GoalTracker = () => {
  const [goals] = useState([
    {
      id: 1,
      title: "Maintain 2:1 Risk-Reward Ratio",
      description: "Keep average risk-reward ratio above 2:1 for all trades",
      category: "risk-management",
      target: 2.0,
      current: 1.8,
      unit: "ratio",
      deadline: "2024-02-29",
      status: "active"
    },
    {
      id: 2,
      title: "Maximum 5 Trades Per Week",
      description: "Limit trading frequency to avoid overtrading",
      category: "discipline",
      target: 5,
      current: 3,
      unit: "trades",
      deadline: "2024-01-21",
      status: "active"
    },
    {
      id: 3,
      title: "Achieve 70% Win Rate",
      description: "Improve trade selection and timing",
      category: "performance",
      target: 70,
      current: 68.2,
      unit: "percentage",
      deadline: "2024-03-31",
      status: "active"
    },
    {
      id: 4,
      title: "Learn Elliott Wave Theory",
      description: "Complete Elliott Wave analysis course",
      category: "education",
      target: 100,
      current: 45,
      unit: "percentage",
      deadline: "2024-02-15",
      status: "active"
    }
  ]);

  const [calendar] = useState([
    {
      date: "2024-01-16",
      events: [
        { time: "09:30", title: "Market Open", type: "market" },
        { time: "14:30", title: "FOMC Minutes", type: "economic" },
        { time: "16:00", title: "Review Daily Goals", type: "personal" }
      ]
    },
    {
      date: "2024-01-17",
      events: [
        { time: "08:00", title: "Weekly Trading Plan", type: "personal" },
        { time: "13:00", title: "CPI Data Release", type: "economic" },
        { time: "21:00", title: "Asian Market Open", type: "market" }
      ]
    }
  ]);

  const achievements = [
    {
      title: "First Profitable Week",
      description: "Completed your first profitable trading week",
      date: "2024-01-08",
      icon: <Trophy className="h-6 w-6 text-yellow-500" />
    },
    {
      title: "10 Winning Trades",
      description: "Achieved 10 consecutive winning trades",
      date: "2024-01-12",
      icon: <Target className="h-6 w-6 text-emerald-500" />
    },
    {
      title: "Risk Management Master",
      description: "Maintained 2:1 R:R ratio for 20 trades",
      date: "2024-01-14",
      icon: <CheckCircle className="h-6 w-6 text-blue-500" />
    }
  ];

  const getProgressColor = (current: number, target: number, unit: string) => {
    const percentage = unit === "ratio" ? (current / target) * 100 : (current / target) * 100;
    if (percentage >= 90) return "bg-emerald-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-blue-500";
  };

  const getProgressPercentage = (current: number, target: number, unit: string) => {
    if (unit === "ratio") return Math.min((current / target) * 100, 100);
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="goals" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-slate-800">
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="add-goal">Add Goal</TabsTrigger>
          </TabsList>
          
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-2" />
            Quick Goal
          </Button>
        </div>

        <TabsContent value="goals" className="space-y-6">
          {/* Goal Progress Rings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {goals.map((goal) => (
              <Card key={goal.id} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-700"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-emerald-500"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray={`${getProgressPercentage(goal.current, goal.target, goal.unit)}, 100`}
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold">
                          {Math.round(getProgressPercentage(goal.current, goal.target, goal.unit))}%
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{goal.title}</h3>
                    <div className="text-xs text-slate-400">
                      {goal.current} / {goal.target} {goal.unit}
                    </div>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {goal.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Goals List */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle>Goal Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {goals.map((goal) => (
                  <div key={goal.id} className="p-4 bg-slate-900/50 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{goal.title}</h3>
                        <p className="text-sm text-slate-400 mb-2">{goal.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-400">
                          <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                          <Badge variant="outline" className="text-xs">
                            {goal.category}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-slate-600">
                        Edit
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{goal.current} / {goal.target} {goal.unit}</span>
                      </div>
                      <Progress 
                        value={getProgressPercentage(goal.current, goal.target, goal.unit)} 
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle>Trading Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {calendar.map((day, index) => (
                  <div key={index}>
                    <h3 className="font-semibold mb-3 text-emerald-400">
                      {new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h3>
                    <div className="space-y-3">
                      {day.events.map((event, eventIndex) => (
                        <div key={eventIndex} className="flex items-center space-x-4 p-3 bg-slate-900/50 rounded-lg">
                          <div className="text-center min-w-[60px]">
                            <p className="font-mono text-sm">{event.time}</p>
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{event.title}</p>
                            <Badge 
                              variant={
                                event.type === 'market' ? 'default' :
                                event.type === 'economic' ? 'destructive' : 'secondary'
                              }
                              className="text-xs mt-1"
                            >
                              {event.type}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-slate-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="p-4 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-slate-400">{achievement.description}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Earned on {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-goal" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle>Create New Goal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="goal-title">Goal Title</Label>
                    <Input id="goal-title" placeholder="e.g., Achieve 3:1 Risk-Reward Ratio" className="bg-slate-700 border-slate-600" />
                  </div>
                  <div>
                    <Label htmlFor="goal-category">Category</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="risk-management">Risk Management</SelectItem>
                        <SelectItem value="discipline">Discipline</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="goal-target">Target Value</Label>
                      <Input id="goal-target" type="number" step="0.1" className="bg-slate-700 border-slate-600" />
                    </div>
                    <div>
                      <Label htmlFor="goal-unit">Unit</Label>
                      <Select>
                        <SelectTrigger className="bg-slate-700 border-slate-600">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="ratio">Ratio</SelectItem>
                          <SelectItem value="trades">Trades</SelectItem>
                          <SelectItem value="dollars">Dollars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="goal-deadline">Deadline</Label>
                    <Input id="goal-deadline" type="date" className="bg-slate-700 border-slate-600" />
                  </div>
                  <div>
                    <Label htmlFor="goal-description">Description</Label>
                    <Textarea 
                      id="goal-description" 
                      placeholder="Describe your goal and why it's important..."
                      className="bg-slate-700 border-slate-600 min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Target className="h-4 w-4 mr-2" />
                  Create Goal
                </Button>
                <Button variant="outline" className="border-slate-600">
                  Clear Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
