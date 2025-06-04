
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Globe } from "lucide-react";

interface MarketSession {
  name: string;
  timezone: string;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
  nextChange: string;
  color: string;
}

export const WorldClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getMarketStatus = (openHour: number, closeHour: number, timezone: string): { isOpen: boolean; nextChange: string } => {
    const now = new Date();
    const marketTime = new Date(now.toLocaleString("en-US", { timeZone: timezone }));
    const currentHour = marketTime.getHours();
    
    let isOpen = false;
    let nextChangeHour = openHour;
    
    if (closeHour > openHour) {
      // Same day market (e.g., 9 AM to 4 PM)
      isOpen = currentHour >= openHour && currentHour < closeHour;
      nextChangeHour = isOpen ? closeHour : openHour;
    } else {
      // Overnight market (e.g., 5 PM to 4 AM next day)
      isOpen = currentHour >= openHour || currentHour < closeHour;
      if (currentHour >= openHour) {
        nextChangeHour = closeHour;
      } else if (currentHour < closeHour) {
        nextChangeHour = closeHour;
      } else {
        nextChangeHour = openHour;
      }
    }
    
    const nextChange = new Date(marketTime);
    nextChange.setHours(nextChangeHour, 0, 0, 0);
    
    if (nextChangeHour <= currentHour && closeHour > openHour) {
      nextChange.setDate(nextChange.getDate() + 1);
    }
    
    const timeDiff = nextChange.getTime() - marketTime.getTime();
    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return {
      isOpen,
      nextChange: `${hoursLeft}h ${minutesLeft}m`
    };
  };

  const markets: MarketSession[] = [
    {
      name: "New York",
      timezone: "America/New_York",
      openTime: "09:30",
      closeTime: "16:00",
      ...getMarketStatus(9, 16, "America/New_York"),
      color: "#3b82f6"
    },
    {
      name: "London",
      timezone: "Europe/London",
      openTime: "08:00",
      closeTime: "16:30",
      ...getMarketStatus(8, 16, "Europe/London"),
      color: "#10b981"
    },
    {
      name: "Tokyo",
      timezone: "Asia/Tokyo",
      openTime: "09:00",
      closeTime: "15:00",
      ...getMarketStatus(9, 15, "Asia/Tokyo"),
      color: "#f59e0b"
    },
    {
      name: "Sydney",
      timezone: "Australia/Sydney",
      openTime: "10:00",
      closeTime: "16:00",
      ...getMarketStatus(10, 16, "Australia/Sydney"),
      color: "#ef4444"
    },
    {
      name: "Hong Kong",
      timezone: "Asia/Hong_Kong",
      openTime: "09:30",
      closeTime: "16:00",
      ...getMarketStatus(9, 16, "Asia/Hong_Kong"),
      color: "#8b5cf6"
    },
    {
      name: "Frankfurt",
      timezone: "Europe/Berlin",
      openTime: "09:00",
      closeTime: "17:30",
      ...getMarketStatus(9, 17, "Europe/Berlin"),
      color: "#06b6d4"
    }
  ];

  const formatTime = (timezone: string) => {
    return currentTime.toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const openMarkets = markets.filter(m => m.isOpen).length;

  return (
    <Card className="glass-effect border-primary/20 hover:scale-105 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Global Markets Clock
          <Badge variant="outline" className="ml-auto border-green-400 text-green-400">
            {openMarkets} Markets Open
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {markets.map((market, index) => (
            <div key={index} className="flex items-center justify-between p-3 glass-effect rounded-lg hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ 
                    backgroundColor: market.color,
                    boxShadow: market.isOpen ? `0 0 8px ${market.color}` : 'none'
                  }}
                ></div>
                <div>
                  <p className="font-semibold text-white">{market.name}</p>
                  <p className="text-xs text-white/70">{market.openTime} - {market.closeTime}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-mono text-white font-bold">{formatTime(market.timezone)}</p>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={market.isOpen ? "default" : "secondary"}
                    className={market.isOpen ? "bg-green-600 text-white" : "bg-red-600 text-white"}
                  >
                    {market.isOpen ? "OPEN" : "CLOSED"}
                  </Badge>
                  <span className="text-xs text-white/70">{market.nextChange}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 glass-effect rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">UTC Time</span>
            </div>
            <span className="font-mono text-white font-bold">
              {currentTime.toLocaleTimeString("en-US", {
                timeZone: "UTC",
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="text-center p-2 glass-effect rounded">
            <p className="text-xs text-white/70">Forex</p>
            <p className="text-sm font-bold text-green-400">24/5</p>
          </div>
          <div className="text-center p-2 glass-effect rounded">
            <p className="text-xs text-white/70">Crypto</p>
            <p className="text-sm font-bold text-blue-400">24/7</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
