
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Upload, 
  Download, 
  Search, 
  Filter,
  Calendar,
  Tag,
  Edit,
  Trash2,
  Eye,
  Share
} from "lucide-react";

export const ScreenshotManager = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [screenshots] = useState([
    {
      id: 1,
      title: "BTC Entry Confirmation",
      description: "Long position at $43,250 with 2% risk",
      filename: "btc-entry-20240115.png",
      date: "2024-01-15T10:30:00",
      tags: ["btc", "entry", "long"],
      type: "entry"
    },
    {
      id: 2,
      title: "EUR/USD Exit Signal",
      description: "Take profit at resistance level",
      filename: "eurusd-exit-20240114.png",
      date: "2024-01-14T14:45:00",
      tags: ["eurusd", "exit", "profit"],
      type: "exit"
    },
    {
      id: 3,
      title: "Portfolio Overview",
      description: "End of day portfolio snapshot",
      filename: "portfolio-20240113.png",
      date: "2024-01-13T16:00:00",
      tags: ["portfolio", "snapshot"],
      type: "overview"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log("File selected:", file.name);
    }
  };

  const typeColors = {
    entry: "bg-green-500",
    exit: "bg-red-500",
    overview: "bg-blue-500",
    analysis: "bg-purple-500"
  };

  const filteredScreenshots = screenshots.filter(screenshot => {
    const matchesSearch = screenshot.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         screenshot.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || screenshot.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
        <CardHeader>
          <CardTitle className="gradient-text">Upload Screenshot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-mint/30 rounded-lg p-8 text-center hover:border-mint/50 transition-colors">
            <Camera className="h-12 w-12 text-mint mx-auto mb-4" />
            <p className="text-lg mb-2">Upload Trade Screenshots</p>
            <p className="text-sm text-slate-400 mb-4">
              Drag and drop images here, or click to browse
            </p>
            <Button 
              onClick={handleFileUpload}
              className="bg-mint hover:bg-mint/80 text-dark-blue"
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="screenshotTitle">Title</Label>
              <Input
                id="screenshotTitle"
                placeholder="e.g., BTC Entry Confirmation"
                className="bg-slate-700 border-slate-600"
              />
            </div>
            <div>
              <Label htmlFor="screenshotType">Type</Label>
              <select className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-foreground">
                <option value="entry">Entry</option>
                <option value="exit">Exit</option>
                <option value="analysis">Analysis</option>
                <option value="overview">Overview</option>
              </select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="screenshotDescription">Description</Label>
            <Textarea
              id="screenshotDescription"
              placeholder="Add details about this screenshot..."
              className="bg-slate-700 border-slate-600"
            />
          </div>
          
          <div>
            <Label htmlFor="screenshotTags">Tags</Label>
            <Input
              id="screenshotTags"
              placeholder="btc, entry, long, analysis"
              className="bg-slate-700 border-slate-600"
            />
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search screenshots..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600"
              />
            </div>
            <div className="flex gap-2">
              {["all", "entry", "exit", "analysis", "overview"].map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className={selectedType === type 
                    ? "bg-mint text-dark-blue" 
                    : "border-mint/50 hover-mint-border"
                  }
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Screenshots Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScreenshots.map((screenshot) => (
          <Card key={screenshot.id} className="glass-effect border-mint/20 hover-mint-border transition-all duration-300 hover:scale-105">
            <CardContent className="p-0">
              {/* Image Placeholder */}
              <div className="h-48 bg-slate-800 rounded-t-lg flex items-center justify-center border-b border-mint/20">
                <Camera className="h-12 w-12 text-slate-600" />
              </div>
              
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-mint">{screenshot.title}</h3>
                    <p className="text-sm text-slate-400">{screenshot.description}</p>
                  </div>
                  <Badge 
                    className={`${typeColors[screenshot.type as keyof typeof typeColors]} text-white`}
                  >
                    {screenshot.type}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {screenshot.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-mint/30 text-mint">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(screenshot.date).toLocaleDateString()}
                  </div>
                  <span className="font-mono">{screenshot.filename}</span>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 border-mint/50 hover-mint-border">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                    <Download className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                    <Share className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistics */}
      <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
        <CardHeader>
          <CardTitle className="gradient-text">Screenshot Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-mint">{screenshots.length}</p>
              <p className="text-sm text-slate-400">Total Screenshots</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-mint">
                {screenshots.filter(s => s.type === 'entry').length}
              </p>
              <p className="text-sm text-slate-400">Entry Confirmations</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-mint">
                {screenshots.filter(s => s.type === 'exit').length}
              </p>
              <p className="text-sm text-slate-400">Exit Confirmations</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-mint">
                {screenshots.filter(s => s.type === 'analysis').length}
              </p>
              <p className="text-sm text-slate-400">Analysis Screenshots</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
