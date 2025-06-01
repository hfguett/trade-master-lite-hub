
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Camera, 
  Trophy, 
  TrendingUp, 
  Target, 
  Star,
  Calendar,
  PieChart,
  BarChart3,
  Settings,
  Edit3
} from 'lucide-react';

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    bio: "Professional trader specializing in crypto and forex markets. 5+ years experience.",
    location: "New York, USA",
    timezone: "EST",
    joinDate: "2019-03-15",
    avatar: "/placeholder.svg"
  });

  const tradingStats = {
    totalTrades: 1247,
    winRate: 68.2,
    totalPnL: 24847.32,
    bestTrade: 8950.50,
    worstTrade: -2340.00,
    avgHoldTime: "2h 15m",
    streak: 12,
    rank: "Diamond"
  };

  const achievements = [
    { name: "First Profit", description: "Made your first profitable trade", unlocked: true, date: "2019-03-20" },
    { name: "Profit Streak", description: "10 consecutive profitable trades", unlocked: true, date: "2023-08-15" },
    { name: "Risk Master", description: "Never exceeded 2% risk for 100 trades", unlocked: true, date: "2023-11-02" },
    { name: "Monthly Goal", description: "Achieved monthly profit target", unlocked: true, date: "2024-01-01" },
    { name: "Whale Tracker", description: "Spotted a whale movement that led to profit", unlocked: false, progress: 75 },
    { name: "Journal Master", description: "Documented 365 consecutive trading days", unlocked: false, progress: 245 }
  ];

  const recentActivity = [
    { type: "trade", action: "Closed profitable BTC/USDT position", profit: "+$1,250", time: "2 hours ago" },
    { type: "goal", action: "Completed monthly trading goal", achievement: "Monthly Target", time: "1 day ago" },
    { type: "journal", action: "Added detailed trade analysis", time: "2 days ago" },
    { type: "screenshot", action: "Uploaded trade confirmation", time: "3 days ago" }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'trade': return <TrendingUp className="h-4 w-4 text-mint" />;
      case 'goal': return <Target className="h-4 w-4 text-blue-400" />;
      case 'journal': return <Edit3 className="h-4 w-4 text-purple-400" />;
      case 'screenshot': return <Camera className="h-4 w-4 text-orange-400" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Diamond': return 'text-cyan-400';
      case 'Platinum': return 'text-gray-300';
      case 'Gold': return 'text-yellow-400';
      case 'Silver': return 'text-gray-400';
      default: return 'text-bronze-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold gradient-text mb-2">Profile</h2>
          <p className="text-muted-foreground">Manage your trading profile and view your performance</p>
        </div>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          className="bg-mint hover:bg-mint/80 text-dark-blue"
        >
          <Edit3 className="h-4 w-4 mr-2" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-mint">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="text-2xl bg-mint text-dark-blue">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="text-center space-y-2">
                <div className="flex items-center gap-2 justify-center">
                  <h3 className="text-xl font-bold">{profile.name}</h3>
                  <Badge className={`${getRankColor(tradingStats.rank)} border-current`} variant="outline">
                    {tradingStats.rank}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{profile.bio}</p>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="bg-slate-800 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="bg-slate-800 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Input 
                    id="bio" 
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    className="bg-slate-800 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    className="bg-slate-800 border-slate-600"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-mono">{profile.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span>{profile.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timezone</span>
                  <span>{profile.timezone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span>{new Date(profile.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Trading Stats */}
        <Card className="lg:col-span-2 glass-effect border-mint/20 hover-mint-border transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-mint">
              <BarChart3 className="h-5 w-5" />
              Trading Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-dark-blue/30 rounded-lg">
                <div className="text-2xl font-bold gradient-text">{tradingStats.totalTrades}</div>
                <div className="text-sm text-muted-foreground">Total Trades</div>
              </div>
              <div className="text-center p-4 bg-dark-blue/30 rounded-lg">
                <div className="text-2xl font-bold text-mint">{tradingStats.winRate}%</div>
                <div className="text-sm text-muted-foreground">Win Rate</div>
              </div>
              <div className="text-center p-4 bg-dark-blue/30 rounded-lg">
                <div className="text-2xl font-bold gradient-text">${tradingStats.totalPnL.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total P&L</div>
              </div>
              <div className="text-center p-4 bg-dark-blue/30 rounded-lg">
                <div className="text-2xl font-bold text-mint">{tradingStats.streak}</div>
                <div className="text-sm text-muted-foreground">Current Streak</div>
              </div>
              <div className="text-center p-4 bg-dark-blue/30 rounded-lg">
                <div className="text-lg font-bold text-mint">${tradingStats.bestTrade.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Best Trade</div>
              </div>
              <div className="text-center p-4 bg-dark-blue/30 rounded-lg">
                <div className="text-lg font-bold text-red-400">${tradingStats.worstTrade.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Worst Trade</div>
              </div>
              <div className="text-center p-4 bg-dark-blue/30 rounded-lg">
                <div className="text-lg font-bold gradient-text">{tradingStats.avgHoldTime}</div>
                <div className="text-sm text-muted-foreground">Avg Hold Time</div>
              </div>
              <div className="text-center p-4 bg-dark-blue/30 rounded-lg">
                <div className="text-lg font-bold gradient-text">{tradingStats.rank}</div>
                <div className="text-sm text-muted-foreground">Trader Rank</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList className="bg-slate-800">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-6">
          <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-mint">
                <Trophy className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      achievement.unlocked 
                        ? 'bg-mint/10 border-mint/30 hover:bg-mint/20' 
                        : 'bg-dark-blue/30 border-slate-600 hover:bg-dark-blue/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded ${achievement.unlocked ? 'bg-mint text-dark-blue' : 'bg-slate-700 text-slate-400'}`}>
                          <Trophy className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{achievement.name}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                      {achievement.unlocked ? (
                        <Badge className="bg-mint text-dark-blue">Unlocked</Badge>
                      ) : (
                        <Badge variant="outline">{achievement.progress}%</Badge>
                      )}
                    </div>
                    {achievement.unlocked && achievement.date && (
                      <p className="text-xs text-muted-foreground">
                        Unlocked on {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-mint">
                <Calendar className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-4 p-3 bg-dark-blue/30 rounded-lg hover:bg-dark-blue/50 transition-all duration-300"
                  >
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                    {activity.profit && (
                      <Badge className="bg-mint text-dark-blue">{activity.profit}</Badge>
                    )}
                    {activity.achievement && (
                      <Badge variant="outline" className="border-mint text-mint">{activity.achievement}</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-mint">
                <Settings className="h-5 w-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8 text-muted-foreground">
                <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Profile settings will be available in the next update.</p>
                <p className="text-sm mt-2">This will include privacy settings, notification preferences, and more.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
