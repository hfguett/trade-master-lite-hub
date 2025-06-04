
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Globe, TrendingUp } from 'lucide-react';

interface MarketTime {
  name: string;
  timezone: string;
  open: string;
  close: string;
  isOpen: boolean;
  currentTime: string;
  nextSession: string;
  flagEmoji: string;
  city: string;
}

export const WorldClock: React.FC = () => {
  const [markets, setMarkets] = useState<MarketTime[]>([]);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      
      const marketData: MarketTime[] = [
        {
          name: 'New York Stock Exchange',
          city: 'New York',
          timezone: 'America/New_York',
          open: '09:30',
          close: '16:00',
          isOpen: false,
          currentTime: '',
          nextSession: '',
          flagEmoji: '🇺🇸'
        },
        {
          name: 'London Stock Exchange',
          city: 'London',
          timezone: 'Europe/London',
          open: '08:00',
          close: '16:30',
          isOpen: false,
          currentTime: '',
          nextSession: '',
          flagEmoji: '🇬🇧'
        },
        {
          name: 'Tokyo Stock Exchange',
          city: 'Tokyo',
          timezone: 'Asia/Tokyo',
          open: '09:00',
          close: '15:00',
          isOpen: false,
          currentTime: '',
          nextSession: '',
          flagEmoji: '🇯🇵'
        },
        {
          name: 'Hong Kong Exchange',
          city: 'Hong Kong',
          timezone: 'Asia/Hong_Kong',
          open: '09:30',
          close: '16:00',
          isOpen: false,
          currentTime: '',
          nextSession: '',
          flagEmoji: '🇭🇰'
        },
        {
          name: 'Sydney Stock Exchange',
          city: 'Sydney',
          timezone: 'Australia/Sydney',
          open: '10:00',
          close: '16:00',
          isOpen: false,
          currentTime: '',
          nextSession: '',
          flagEmoji: '🇦🇺'
        },
        {
          name: 'Frankfurt Stock Exchange',
          city: 'Frankfurt',
          timezone: 'Europe/Berlin',
          open: '09:00',
          close: '17:30',
          isOpen: false,
          currentTime: '',
          nextSession: '',
          flagEmoji: '🇩🇪'
        },
        {
          name: 'Crypto Markets',
          city: 'Global',
          timezone: 'UTC',
          open: '00:00',
          close: '23:59',
          isOpen: true,
          currentTime: '',
          nextSession: 'Always Open',
          flagEmoji: '₿'
        },
        {
          name: 'Forex Markets',
          city: 'Global',
          timezone: 'UTC',
          open: '00:00',
          close: '23:59',
          isOpen: true,
          currentTime: '',
          nextSession: 'Always Open',
          flagEmoji: '💱'
        }
      ];

      const updatedMarkets = marketData.map(market => {
        const marketTime = new Date(now.toLocaleString("en-US", { timeZone: market.timezone }));
        const currentHour = marketTime.getHours();
        const currentMinute = marketTime.getMinutes();
        const currentTimeString = marketTime.toLocaleTimeString('en-US', { 
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });

        let isOpen = market.name === 'Crypto Markets' || market.name === 'Forex Markets';
        let nextSession = market.nextSession;
        
        if (!isOpen) {
          const [openHour, openMinute] = market.open.split(':').map(Number);
          const [closeHour, closeMinute] = market.close.split(':').map(Number);
          
          const currentMinutes = currentHour * 60 + currentMinute;
          const openMinutes = openHour * 60 + openMinute;
          const closeMinutes = closeHour * 60 + closeMinute;
          
          // Check if it's a weekday (Monday = 1, Sunday = 0)
          const dayOfWeek = marketTime.getDay();
          const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
          
          isOpen = isWeekday && currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
          
          // Calculate next session
          if (!isOpen && isWeekday) {
            if (currentMinutes < openMinutes) {
              const minutesToOpen = openMinutes - currentMinutes;
              const hoursToOpen = Math.floor(minutesToOpen / 60);
              const minsToOpen = minutesToOpen % 60;
              nextSession = `Opens in ${hoursToOpen}h ${minsToOpen}m`;
            } else {
              nextSession = 'Opens tomorrow';
            }
          } else if (!isWeekday) {
            nextSession = 'Opens Monday';
          } else {
            const minutesToClose = closeMinutes - currentMinutes;
            const hoursToClose = Math.floor(minutesToClose / 60);
            const minsToClose = minutesToClose % 60;
            nextSession = `Closes in ${hoursToClose}h ${minsToClose}m`;
          }
        }

        return {
          ...market,
          isOpen,
          currentTime: currentTimeString,
          nextSession
        };
      });

      setMarkets(updatedMarkets);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  const openMarkets = markets.filter(m => m.isOpen);
  const closedMarkets = markets.filter(m => !m.isOpen);

  return (
    <Card className="glass-effect border-primary/20 hover:scale-105 transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Globe className="h-5 w-5" />
          Global Trading Sessions
          <Badge className="bg-green-500 text-white ml-auto">
            {openMarkets.length} Open
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Open Markets */}
        {openMarkets.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-sm font-semibold text-green-400">Currently Trading</span>
            </div>
            <div className="space-y-2">
              {openMarkets.map((market, index) => (
                <div 
                  key={market.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-all duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{market.flagEmoji}</span>
                    <div>
                      <p className="font-medium text-sm text-green-400">{market.city}</p>
                      <p className="text-xs text-green-300">{market.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-green-400">{market.currentTime}</p>
                    <Badge className="bg-green-500 text-white text-xs">
                      {market.nextSession}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Closed Markets */}
        {closedMarkets.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-400">Market Closed</span>
            </div>
            <div className="space-y-2">
              {closedMarkets.map((market, index) => (
                <div 
                  key={market.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg opacity-60">{market.flagEmoji}</span>
                    <div>
                      <p className="font-medium text-sm">{market.city}</p>
                      <p className="text-xs text-slate-400">
                        {market.open} - {market.close}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm">{market.currentTime}</p>
                    <Badge variant="secondary" className="text-xs">
                      {market.nextSession}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-primary/20">
          <p className="text-xs text-slate-400 text-center">
            Live market hours • Updates every second
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
