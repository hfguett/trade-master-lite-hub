
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, TrendingUp, AlertTriangle, Info } from 'lucide-react';

interface EconomicEvent {
  id: string;
  time: string;
  currency: string;
  event: string;
  impact: 'low' | 'medium' | 'high';
  forecast: string;
  previous: string;
  actual?: string;
  isToday: boolean;
}

export const EconomicCalendar: React.FC = () => {
  const [events, setEvents] = useState<EconomicEvent[]>([]);
  const [selectedDay, setSelectedDay] = useState('today');

  useEffect(() => {
    // Simulate economic events data
    const mockEvents: EconomicEvent[] = [
      {
        id: '1',
        time: '08:30',
        currency: 'USD',
        event: 'Non-Farm Payrolls',
        impact: 'high',
        forecast: '200K',
        previous: '187K',
        isToday: true
      },
      {
        id: '2',
        time: '10:00',
        currency: 'USD',
        event: 'Unemployment Rate',
        impact: 'high',
        forecast: '3.7%',
        previous: '3.7%',
        isToday: true
      },
      {
        id: '3',
        time: '14:00',
        currency: 'EUR',
        event: 'ECB Interest Rate Decision',
        impact: 'high',
        forecast: '4.50%',
        previous: '4.50%',
        isToday: true
      },
      {
        id: '4',
        time: '15:30',
        currency: 'GBP',
        event: 'BoE Governor Speech',
        impact: 'medium',
        forecast: '-',
        previous: '-',
        isToday: false
      },
      {
        id: '5',
        time: '22:00',
        currency: 'JPY',
        event: 'BoJ Meeting Minutes',
        impact: 'medium',
        forecast: '-',
        previous: '-',
        isToday: false
      },
      {
        id: '6',
        time: '09:00',
        currency: 'CHF',
        event: 'SNB Chairman Speech',
        impact: 'low',
        forecast: '-',
        previous: '-',
        isToday: false
      }
    ];

    setEvents(mockEvents);
  }, []);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high': return <AlertTriangle className="h-3 w-3" />;
      case 'medium': return <TrendingUp className="h-3 w-3" />;
      case 'low': return <Info className="h-3 w-3" />;
      default: return <Info className="h-3 w-3" />;
    }
  };

  const filteredEvents = selectedDay === 'today' 
    ? events.filter(event => event.isToday)
    : events.filter(event => !event.isToday);

  return (
    <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-mint">
            <Calendar className="h-5 w-5" />
            Economic Calendar
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={selectedDay === 'today' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDay('today')}
              className={selectedDay === 'today' ? 'bg-mint text-dark-blue' : 'border-mint/50 hover-mint-border'}
            >
              Today
            </Button>
            <Button
              variant={selectedDay === 'tomorrow' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDay('tomorrow')}
              className={selectedDay === 'tomorrow' ? 'bg-mint text-dark-blue' : 'border-mint/50 hover-mint-border'}
            >
              Tomorrow
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div 
              key={event.id}
              className="p-4 rounded-lg bg-dark-blue/30 hover:bg-dark-blue/50 transition-all duration-200 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-sm font-mono">
                      <Clock className="h-3 w-3 text-mint" />
                      {event.time}
                    </div>
                    <Badge variant="outline" className="text-xs mt-1 border-mint/50">
                      {event.currency}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{event.event}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getImpactColor(event.impact)}`}
                    >
                      {getImpactIcon(event.impact)}
                      <span className="ml-1">{event.impact} impact</span>
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Forecast:</span>
                  <span className="ml-2 font-mono">{event.forecast}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Previous:</span>
                  <span className="ml-2 font-mono">{event.previous}</span>
                </div>
              </div>
              
              {event.actual && (
                <div className="mt-2 pt-2 border-t border-mint/20">
                  <span className="text-muted-foreground text-xs">Actual:</span>
                  <span className="ml-2 font-mono text-xs text-mint">{event.actual}</span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No events scheduled for {selectedDay}</p>
          </div>
        )}
        
        <div className="pt-4 border-t border-mint/20">
          <p className="text-xs text-muted-foreground text-center">
            Data provided by free economic calendar APIs
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
