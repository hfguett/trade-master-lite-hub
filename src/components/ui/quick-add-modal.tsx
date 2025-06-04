
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, TrendingUp, TrendingDown, Target, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('trade');
  const [formData, setFormData] = useState({
    symbol: '',
    type: 'LONG',
    entry: '',
    size: '',
    stopLoss: '',
    takeProfit: '',
    notes: ''
  });
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!formData.symbol || !formData.entry) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save to your state management or backend
    toast({
      title: "Success",
      description: `${activeTab === 'trade' ? 'Trade' : 'Alert'} added successfully`,
      variant: "default",
    });

    // Reset form
    setFormData({
      symbol: '',
      type: 'LONG',
      entry: '',
      size: '',
      stopLoss: '',
      takeProfit: '',
      notes: ''
    });
    onClose();
  };

  const quickActions = [
    { id: 'trade', label: 'Add Trade', icon: TrendingUp },
    { id: 'alert', label: 'Price Alert', icon: Bell },
    { id: 'goal', label: 'Set Goal', icon: Target },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">Quick Add</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 mb-4">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant={activeTab === action.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(action.id)}
              className={activeTab === action.id ? 
                'bg-green-600 text-white' : 
                'border-slate-600 text-white hover:bg-slate-700'
              }
            >
              <action.icon className="h-4 w-4 mr-2" />
              {action.label}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {activeTab === 'trade' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="symbol" className="text-white">Symbol *</Label>
                  <Input
                    id="symbol"
                    placeholder="BTC/USDT"
                    value={formData.symbol}
                    onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="type" className="text-white">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LONG">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-400" />
                          LONG
                        </div>
                      </SelectItem>
                      <SelectItem value="SHORT">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="h-4 w-4 text-red-400" />
                          SHORT
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="entry" className="text-white">Entry Price *</Label>
                  <Input
                    id="entry"
                    type="number"
                    placeholder="43250"
                    value={formData.entry}
                    onChange={(e) => setFormData({...formData, entry: e.target.value})}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="size" className="text-white">Position Size</Label>
                  <Input
                    id="size"
                    type="number"
                    placeholder="0.1"
                    value={formData.size}
                    onChange={(e) => setFormData({...formData, size: e.target.value})}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stopLoss" className="text-white">Stop Loss</Label>
                  <Input
                    id="stopLoss"
                    type="number"
                    placeholder="42000"
                    value={formData.stopLoss}
                    onChange={(e) => setFormData({...formData, stopLoss: e.target.value})}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="takeProfit" className="text-white">Take Profit</Label>
                  <Input
                    id="takeProfit"
                    type="number"
                    placeholder="45000"
                    value={formData.takeProfit}
                    onChange={(e) => setFormData({...formData, takeProfit: e.target.value})}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'alert' && (
            <>
              <div>
                <Label htmlFor="alertSymbol" className="text-white">Symbol *</Label>
                <Input
                  id="alertSymbol"
                  placeholder="BTC/USDT"
                  value={formData.symbol}
                  onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="alertPrice" className="text-white">Alert Price *</Label>
                <Input
                  id="alertPrice"
                  type="number"
                  placeholder="45000"
                  value={formData.entry}
                  onChange={(e) => setFormData({...formData, entry: e.target.value})}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </>
          )}

          {activeTab === 'goal' && (
            <>
              <div>
                <Label htmlFor="goalType" className="text-white">Goal Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="Select goal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PROFIT">Monthly Profit Target</SelectItem>
                    <SelectItem value="TRADES">Number of Trades</SelectItem>
                    <SelectItem value="WINRATE">Win Rate Target</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="goalTarget" className="text-white">Target Value *</Label>
                <Input
                  id="goalTarget"
                  type="number"
                  placeholder="10000"
                  value={formData.entry}
                  onChange={(e) => setFormData({...formData, entry: e.target.value})}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="notes" className="text-white">Notes</Label>
            <Input
              id="notes"
              placeholder="Add notes..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="bg-slate-800 border-slate-600 text-white"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              onClick={onClose} 
              variant="outline" 
              className="flex-1 border-slate-600 text-white hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              Add {activeTab === 'trade' ? 'Trade' : activeTab === 'alert' ? 'Alert' : 'Goal'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
