
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Globe } from 'lucide-react';

interface MarketTime {
  name: string;
  timezone: string;
  open: string;
  close: string;
  isOpen: boolean;
  currentTime: string;
}

export const WorldClock: React.FC = () => {
  const [markets, setMarkets] = useState<MarketTime[]>([]);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      
      const marketData: MarketTime[] = [
        {
          name: 'New York (NYSE)',
          timezone: 'America/New_York',
          open: '09:30',
          close: '16:00',
          isOpen: false,
          currentTime: ''
        },
        {
          name: 'London (LSE)',
          timezone: 'Europe/London',
          open: '08:00',
          close: '16:30',
          isOpen: false,
          currentTime: ''
        },
        {
          name: 'Tokyo (TSE)',
          timezone: 'Asia/Tokyo',
          open: '09:00',
          close: '15:00',
          isOpen: false,
          currentTime: ''
        },
        {
          name: 'Sydney (ASX)',
          timezone: 'Australia/Sydney',
          open: '10:00',
          close: '16:00',
          isOpen: false,
          currentTime: ''
        },
        {
          name: 'Crypto (24/7)',
          timezone: 'UTC',
          open: '00:00',
          close: '23:59',
          isOpen: true,
          currentTime: ''
        }
      ];

      const updatedMarkets = marketData.map(market => {
        const marketTime = new Date(now.toLocaleString("en-US", { timeZone: market.timezone }));
        const currentHour = marketTime.getHours();
        const currentMinute = marketTime.getMinutes();
        const currentTimeString = marketTime.toLocaleTimeString('en-US', { 
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        });

        let isOpen = market.name === 'Crypto (24/7)';
        
        if (market.name !== 'Crypto (24/7)') {
          const [openHour, openMinute] = market.open.split(':').map(Number);
          const [closeHour, closeMinute] = market.close.split(':').map(Number);
          
          const currentMinutes = currentHour * 60 + currentMinute;
          const openMinutes = openHour * 60 + openMinute;
          const closeMinutes = closeHour * 60 + closeMinute;
          
          // Check if it's a weekday (Monday = 1, Sunday = 0)
          const dayOfWeek = marketTime.getDay();
          const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
          
          isOpen = isWeekday && currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
        }

        return {
          ...market,
          isOpen,
          currentTime: currentTimeString
        };
      });

      setMarkets(updatedMarkets);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-mint">
          <Globe className="h-5 w-5" />
          Global Markets
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {markets.map((market, index) => (
          <div 
            key={market.name}
            className="flex items-center justify-between p-3 rounded-lg bg-dark-blue/30 hover:bg-dark-blue/50 transition-all duration-200"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-mint" />
              <div>
                <p className="font-medium text-sm">{market.name}</p>
                <p className="text-xs text-muted-foreground">
                  {market.open} - {market.close}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm">{market.currentTime}</p>
              <Badge 
                variant={market.isOpen ? "default" : "secondary"}
                className={market.isOpen ? "bg-mint text-dark-blue" : ""}
              >
                {market.isOpen ? "OPEN" : "CLOSED"}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
