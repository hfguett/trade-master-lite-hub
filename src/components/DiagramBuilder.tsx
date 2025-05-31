
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Square, 
  Circle, 
  Triangle, 
  ArrowRight, 
  ArrowDown,
  Type,
  Save,
  Download,
  Upload,
  Trash2,
  Copy,
  Layers,
  Grid
} from "lucide-react";

export const DiagramBuilder = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<'select' | 'rectangle' | 'circle' | 'arrow' | 'text'>('select');
  const [diagrams] = useState([
    {
      id: 1,
      title: "Trading Strategy Flow",
      description: "Decision tree for entry/exit signals",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Risk Management Process",
      description: "Step-by-step risk assessment flow",
      date: "2024-01-14"
    }
  ]);

  const tools = [
    { id: 'select', label: 'Select', icon: <Grid className="h-4 w-4" /> },
    { id: 'rectangle', label: 'Rectangle', icon: <Square className="h-4 w-4" /> },
    { id: 'circle', label: 'Circle', icon: <Circle className="h-4 w-4" /> },
    { id: 'arrow', label: 'Arrow', icon: <ArrowRight className="h-4 w-4" /> },
    { id: 'text', label: 'Text', icon: <Type className="h-4 w-4" /> }
  ];

  const templates = [
    { 
      name: "Trading Flow", 
      description: "Entry → Analysis → Exit process",
      icon: <ArrowRight className="h-6 w-6" />
    },
    { 
      name: "Risk Matrix", 
      description: "Risk vs Reward grid",
      icon: <Grid className="h-6 w-6" />
    },
    { 
      name: "Portfolio Tree", 
      description: "Asset allocation breakdown",
      icon: <Layers className="h-6 w-6" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Tools Panel */}
      <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
        <CardHeader>
          <CardTitle className="gradient-text">Diagram Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            {/* Shape Tools */}
            <div className="flex gap-2">
              {tools.map((tool) => (
                <Button
                  key={tool.id}
                  variant={selectedTool === tool.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTool(tool.id as any)}
                  className={selectedTool === tool.id 
                    ? 'bg-mint text-dark-blue' 
                    : 'border-mint/50 hover-mint-border'
                  }
                  title={tool.label}
                >
                  {tool.icon}
                </Button>
              ))}
            </div>

            {/* Style Controls */}
            <div className="flex items-center gap-4 border-l border-mint/20 pl-4">
              <div className="flex items-center gap-2">
                <Label className="text-sm">Fill:</Label>
                <div className="flex gap-1">
                  {['#10b981', '#3b82f6', '#ef4444', '#f59e0b'].map((color) => (
                    <button
                      key={color}
                      className="w-6 h-6 rounded border border-slate-600"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Label className="text-sm">Stroke:</Label>
                <Input
                  type="range"
                  min="1"
                  max="5"
                  className="w-16"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 border-l border-mint/20 pl-4">
              <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                <Save className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Canvas Area */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Templates Sidebar */}
        <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
          <CardHeader>
            <CardTitle className="gradient-text text-lg">Templates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {templates.map((template, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full h-auto p-4 flex-col items-start border-mint/50 hover-mint-border"
              >
                <div className="flex items-center w-full mb-2">
                  <div className="text-mint mr-2">{template.icon}</div>
                  <span className="font-semibold text-sm">{template.name}</span>
                </div>
                <p className="text-xs text-slate-400 text-left">{template.description}</p>
              </Button>
            ))}
            
            <Button className="w-full bg-mint hover:bg-mint/80 text-dark-blue">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
          </CardContent>
        </Card>

        {/* Main Canvas */}
        <Card className="lg:col-span-3 glass-effect border-mint/20 hover-mint-border transition-all duration-300">
          <CardHeader>
            <CardTitle className="gradient-text">Diagram Canvas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border border-mint/20 rounded-lg bg-slate-900 p-4 min-h-[500px] relative">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#10b981" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              {/* Sample Diagram Elements */}
              <div className="relative h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-8">
                    <div className="w-24 h-16 bg-mint/20 border-2 border-mint rounded-lg flex items-center justify-center">
                      <span className="text-mint font-semibold text-sm">Entry Signal</span>
                    </div>
                    <ArrowRight className="h-6 w-6 text-mint" />
                    <div className="w-24 h-16 bg-blue-500/20 border-2 border-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-blue-400 font-semibold text-sm">Analysis</span>
                    </div>
                    <ArrowRight className="h-6 w-6 text-mint" />
                    <div className="w-24 h-16 bg-orange-500/20 border-2 border-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-orange-400 font-semibold text-sm">Exit</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm">Click tools above to start building your diagram</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="diagramTitle">Diagram Title</Label>
                  <Input 
                    id="diagramTitle" 
                    placeholder="e.g., Trading Decision Flow"
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="diagramCategory">Category</Label>
                  <select className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-foreground">
                    <option value="strategy">Strategy</option>
                    <option value="process">Process</option>
                    <option value="analysis">Analysis</option>
                    <option value="planning">Planning</option>
                  </select>
                </div>
              </div>
              
              <Button className="bg-mint hover:bg-mint/80 text-dark-blue">
                <Save className="h-4 w-4 mr-2" />
                Save Diagram
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saved Diagrams */}
      <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
        <CardHeader>
          <CardTitle className="gradient-text">Saved Diagrams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {diagrams.map((diagram) => (
              <div key={diagram.id} className="p-4 bg-dark-blue/30 rounded-lg hover:bg-dark-blue/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-mint">{diagram.title}</h3>
                    <p className="text-sm text-slate-400">{diagram.description}</p>
                    <p className="text-xs text-slate-500 mt-2">{diagram.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                      <Upload className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="h-20 bg-slate-800 rounded border border-mint/20 flex items-center justify-center">
                  <Layers className="h-8 w-8 text-slate-600" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
