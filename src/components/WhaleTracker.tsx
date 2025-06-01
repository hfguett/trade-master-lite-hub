
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Whale, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  RefreshCw, 
  AlertTriangle,
  Eye,
  Filter
} from 'lucide-react';

interface WhaleTransaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  amount: number;
  token: string;
  usdValue: number;
  timestamp: Date;
  type: 'buy' | 'sell' | 'transfer';
  exchange?: string;
}

interface WhaleWallet {
  address: string;
  balance: number;
  usdValue: number;
  tokens: { symbol: string; amount: number; value: number }[];
  lastActivity: Date;
  reputation: number;
  isTracked: boolean;
}

export const WhaleTracker = () => {
  const [whaleTransactions, setWhaleTransactions] = useState<WhaleTransaction[]>([]);
  const [whaleWallets, setWhaleWallets] = useState<WhaleWallet[]>([]);
  const [searchAddress, setSearchAddress] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [minTransactionValue, setMinTransactionValue] = useState(100000);

  // Mock data for demonstration
  useEffect(() => {
    const mockTransactions: WhaleTransaction[] = [
      {
        id: '1',
        hash: '4k2j3h4k2j3h4k2j3h4k2j3h4k2j3h4k2j3h4k2j3h4k2j3h4k2j3h4k2j3h4k',
        from: '7xKD...9mP2',
        to: 'Raydium',
        amount: 50000,
        token: 'SOL',
        usdValue: 2500000,
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        type: 'buy',
        exchange: 'Raydium'
      },
      {
        id: '2',
        hash: '5l3k4j5l3k4j5l3k4j5l3k4j5l3k4j5l3k4j5l3k4j5l3k4j5l3k4j5l3k4j5l',
        from: 'Jupiter',
        to: '9mN8...7kL4',
        amount: 1200000,
        token: 'USDC',
        usdValue: 1200000,
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        type: 'sell',
        exchange: 'Jupiter'
      },
      {
        id: '3',
        hash: '6n4l5k6n4l5k6n4l5k6n4l5k6n4l5k6n4l5k6n4l5k6n4l5k6n4l5k6n4l5k6n',
        from: '3jK9...8nM5',
        to: '8pL2...6kJ7',
        amount: 25000,
        token: 'SOL',
        usdValue: 1250000,
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        type: 'transfer'
      }
    ];

    const mockWallets: WhaleWallet[] = [
      {
        address: '7xKD...9mP2',
        balance: 125000,
        usdValue: 6250000,
        tokens: [
          { symbol: 'SOL', amount: 100000, value: 5000000 },
          { symbol: 'USDC', amount: 1250000, value: 1250000 }
        ],
        lastActivity: new Date(Date.now() - 1000 * 60 * 15),
        reputation: 95,
        isTracked: true
      },
      {
        address: '9mN8...7kL4',
        balance: 89000,
        usdValue: 4450000,
        tokens: [
          { symbol: 'SOL', amount: 75000, value: 3750000 },
          { symbol: 'RAY', amount: 50000, value: 700000 }
        ],
        lastActivity: new Date(Date.now() - 1000 * 60 * 30),
        reputation: 88,
        isTracked: false
      }
    ];

    setWhaleTransactions(mockTransactions);
    setWhaleWallets(mockWallets);
  }, []);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'buy': return <TrendingUp className="h-4 w-4 text-mint" />;
      case 'sell': return <TrendingDown className="h-4 w-4 text-red-400" />;
      default: return <Eye className="h-4 w-4 text-blue-400" />;
    }
  };

  const toggleWalletTracking = (address: string) => {
    setWhaleWallets(prev => prev.map(wallet => 
      wallet.address === address 
        ? { ...wallet, isTracked: !wallet.isTracked }
        : wallet
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold gradient-text mb-2">Whale Tracker</h2>
          <p className="text-muted-foreground">Monitor large transactions and whale wallets on Solana</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search wallet address..." 
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-600 w-64" 
            />
          </div>
          <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="bg-slate-800">
          <TabsTrigger value="transactions">Live Transactions</TabsTrigger>
          <TabsTrigger value="wallets">Whale Wallets</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Filters</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-6">
          <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-mint">
                  <Whale className="h-5 w-5" />
                  Large Transactions (${minTransactionValue.toLocaleString()}+)
                </CardTitle>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min value (USD)"
                    value={minTransactionValue}
                    onChange={(e) => setMinTransactionValue(Number(e.target.value))}
                    className="w-32 bg-slate-800 border-slate-600"
                  />
                  <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {whaleTransactions.map((tx, index) => (
                  <div 
                    key={tx.id}
                    className="p-4 bg-dark-blue/30 rounded-lg hover:bg-dark-blue/50 transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getTransactionIcon(tx.type)}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{formatAddress(tx.from)}</span>
                            <span className="text-slate-400">→</span>
                            <span className="font-semibold">{formatAddress(tx.to)}</span>
                            {tx.exchange && (
                              <Badge variant="outline" className="text-xs">
                                {tx.exchange}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground font-mono">
                            {tx.hash.slice(0, 20)}...
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold font-mono">
                          {tx.amount.toLocaleString()} {tx.token}
                        </p>
                        <p className="text-sm text-mint font-mono">
                          ${tx.usdValue.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatTimeAgo(tx.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallets" className="space-y-6">
          <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-mint">
                <Eye className="h-5 w-5" />
                Whale Wallets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {whaleWallets.map((wallet, index) => (
                  <div 
                    key={wallet.address}
                    className="p-4 bg-dark-blue/30 rounded-lg hover:bg-dark-blue/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold font-mono">{formatAddress(wallet.address)}</span>
                            <Badge 
                              variant={wallet.reputation > 90 ? "default" : "secondary"}
                              className={wallet.reputation > 90 ? "bg-mint text-dark-blue" : ""}
                            >
                              Rep: {wallet.reputation}%
                            </Badge>
                            {wallet.isTracked && (
                              <Badge variant="outline" className="text-mint border-mint">
                                Tracked
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Last activity: {formatTimeAgo(wallet.lastActivity)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg gradient-text">
                          ${wallet.usdValue.toLocaleString()}
                        </p>
                        <Button
                          variant={wallet.isTracked ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleWalletTracking(wallet.address)}
                          className={wallet.isTracked ? "bg-mint text-dark-blue" : "border-mint/50 hover-mint-border"}
                        >
                          {wallet.isTracked ? 'Untrack' : 'Track'}
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {wallet.tokens.map((token, tokenIndex) => (
                        <div key={tokenIndex} className="text-center p-2 bg-slate-900/50 rounded">
                          <p className="text-xs text-slate-400">{token.symbol}</p>
                          <p className="font-mono text-sm">{token.amount.toLocaleString()}</p>
                          <p className="text-xs text-mint">${token.value.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-mint">
                <AlertTriangle className="h-5 w-5" />
                Whale Alert Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Minimum Transaction Value (USD)</label>
                  <Input
                    type="number"
                    value={minTransactionValue}
                    onChange={(e) => setMinTransactionValue(Number(e.target.value))}
                    className="bg-slate-800 border-slate-600"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Alert Timeframe</label>
                  <div className="flex gap-2">
                    {['1h', '4h', '24h', '7d'].map((tf) => (
                      <Button
                        key={tf}
                        variant={selectedTimeframe === tf ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTimeframe(tf)}
                        className={selectedTimeframe === tf ? "bg-mint text-dark-blue" : "border-mint/50 hover-mint-border"}
                      >
                        {tf}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <h4 className="font-semibold mb-3">Active Alerts</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded">
                    <span className="text-sm">Large SOL transactions (&gt; $1M)</span>
                    <Badge variant="outline" className="text-mint border-mint">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded">
                    <span className="text-sm">New whale wallet detected</span>
                    <Badge variant="outline" className="text-mint border-mint">Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
