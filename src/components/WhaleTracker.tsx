import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Fish, 
  ExternalLink, 
  Copy, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Clock,
  Wallet
} from 'lucide-react';

interface WalletData {
  address: string;
  name: string;
  balance: number;
  tokens: { [key: string]: number };
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  timestamp: Date;
  type: 'transfer' | 'trade' | 'mint' | 'burn';
  amount: number;
  token: string;
  from: string;
  to: string;
}

export const WhaleTracker = () => {
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [newWalletAddress, setNewWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load wallets from local storage or default state
    const storedWallets = localStorage.getItem('whaleWallets');
    if (storedWallets) {
      setWallets(JSON.parse(storedWallets));
    } else {
      setWallets([
        {
          address: '6w96Jq7m8wY96PspGfEwzhF9HqGjeVPx4Qe6Tj9Y1CzW',
          name: 'Example Whale 1',
          balance: 123456789,
          tokens: {
            SOL: 12345,
            USDC: 67890,
            BONK: 123456789
          },
          transactions: [
            {
              id: 'tx1',
              timestamp: new Date(Date.now() - 1000 * 60 * 5),
              type: 'transfer',
              amount: 1000,
              token: 'SOL',
              from: 'walletA',
              to: 'walletB'
            },
            {
              id: 'tx2',
              timestamp: new Date(Date.now() - 1000 * 60 * 15),
              type: 'trade',
              amount: 50000,
              token: 'USDC',
              from: 'walletC',
              to: 'walletD'
            }
          ]
        }
      ]);
    }
  }, []);

  useEffect(() => {
    // Save wallets to local storage whenever it changes
    localStorage.setItem('whaleWallets', JSON.stringify(wallets));
  }, [wallets]);

  const addWallet = async () => {
    setIsLoading(true);
    setError(null);

    // Basic address validation
    if (!newWalletAddress.trim()) {
      setError('Please enter a valid Solana wallet address.');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate fetching wallet data from Solana blockchain
      const walletData: WalletData = {
        address: newWalletAddress,
        name: `Wallet ${wallets.length + 2}`,
        balance: Math.floor(Math.random() * 10000),
        tokens: {
          SOL: Math.floor(Math.random() * 5000),
          USDC: Math.floor(Math.random() * 100000),
          BONK: Math.floor(Math.random() * 10000000)
        },
        transactions: [
          {
            id: `tx${Date.now()}`,
            timestamp: new Date(),
            type: 'transfer',
            amount: Math.floor(Math.random() * 1000),
            token: 'SOL',
            from: 'userWallet',
            to: newWalletAddress
          }
        ]
      };

      setWallets(prev => [...prev, walletData]);
      setNewWalletAddress('');
    } catch (err: any) {
      setError(`Failed to fetch wallet data: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const removeWallet = (address: string) => {
    setWallets(prev => prev.filter(wallet => wallet.address !== address));
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    alert('Wallet address copied to clipboard!');
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="gradient-text flex items-center gap-2">
              <Fish className="h-5 w-5" />
              Solana Whale Tracker
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              type="text"
              placeholder="Enter Solana wallet address..."
              value={newWalletAddress}
              onChange={(e) => setNewWalletAddress(e.target.value)}
              className="bg-slate-700 border-slate-600"
            />
            <Button 
              onClick={addWallet} 
              disabled={isLoading}
              className="bg-mint hover:bg-mint/80 text-dark-blue"
            >
              {isLoading ? 'Adding...' : <Plus className="h-4 w-4 mr-2" />}
              Track Wallet
            </Button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallets.map((wallet) => (
          <Card key={wallet.address} className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-mint">{wallet.name}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeWallet(wallet.address)}
                  className="h-8 w-8 p-0 hover:bg-red-500/20 text-red-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trash-2"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-mint" />
                  <span className="text-sm text-slate-400">Address:</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyAddress(wallet.address)}
                  className="h-8 w-8 p-0 hover:bg-mint/20"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-slate-500 break-all">{wallet.address}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-mint" />
                  <span className="text-sm text-slate-400">Balance:</span>
                </div>
                <span className="text-sm text-foreground">{formatNumber(wallet.balance)} SOL</span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-300">Top Tokens:</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(wallet.tokens).slice(0, 3).map(([token, amount]) => (
                    <Badge key={token} variant="secondary" className="text-xs border-mint/30 text-mint">
                      {token}: {formatNumber(amount)}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Recent Transactions:
                </h4>
                <ul className="space-y-1">
                  {wallet.transactions.slice(0, 3).map((tx) => (
                    <li key={tx.id} className="text-xs text-slate-400 flex items-center justify-between">
                      <span>{tx.type}</span>
                      <span>{formatNumber(tx.amount)} {tx.token}</span>
                      <span className="text-slate-500">{tx.timestamp.toLocaleTimeString()}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="link" className="w-full justify-start text-sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View More Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
