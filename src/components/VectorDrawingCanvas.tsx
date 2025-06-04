
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Pencil, 
  Eraser, 
  Square, 
  Circle, 
  Minus,
  Save,
  Download,
  Trash2,
  Palette,
  Undo,
  Redo,
  Type,
  ArrowRight,
  Grid,
  Layers
} from "lucide-react";

export const VectorDrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser' | 'line' | 'rectangle' | 'circle' | 'text' | 'arrow'>('pen');
  const [color, setColor] = useState('#10b981');
  const [brushSize, setBrushSize] = useState(3);
  const [shapes, setShapes] = useState<any[]>([]);
  const [currentPath, setCurrentPath] = useState<{x: number, y: number}[]>([]);

  const tools = [
    { id: 'pen', label: 'Pen', icon: <Pencil className="h-4 w-4" /> },
    { id: 'eraser', label: 'Eraser', icon: <Eraser className="h-4 w-4" /> },
    { id: 'line', label: 'Line', icon: <Minus className="h-4 w-4" /> },
    { id: 'rectangle', label: 'Rectangle', icon: <Square className="h-4 w-4" /> },
    { id: 'circle', label: 'Circle', icon: <Circle className="h-4 w-4" /> },
    { id: 'arrow', label: 'Arrow', icon: <ArrowRight className="h-4 w-4" /> },
    { id: 'text', label: 'Text', icon: <Type className="h-4 w-4" /> }
  ];

  const [savedDrawings] = useState([
    {
      id: 1,
      title: "BTC Support/Resistance Analysis",
      date: "2024-01-15",
      description: "Key levels identified for tomorrow's session",
      type: "Technical Analysis"
    },
    {
      id: 2,
      title: "EUR/USD Pattern Recognition",
      date: "2024-01-14", 
      description: "Head and shoulders pattern forming",
      type: "Chart Pattern"
    },
    {
      id: 3,
      title: "Trading Strategy Flow",
      date: "2024-01-13",
      description: "Decision tree for entry/exit signals",
      type: "Process Diagram"
    }
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1000;
    canvas.height = 600;
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'pen') {
      setCurrentPath([{x, y}]);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool !== 'pen') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setCurrentPath(prev => [...prev, {x, y}]);

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = color;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing && tool === 'pen' && currentPath.length > 0) {
      setShapes(prev => [...prev, {
        type: 'path',
        points: currentPath,
        color,
        width: brushSize
      }]);
    }
    setIsDrawing(false);
    setCurrentPath([]);
  };

  const addShape = (shapeType: string, e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newShape = {
      type: shapeType,
      x,
      y,
      width: 100,
      height: 100,
      color,
      strokeWidth: brushSize
    };

    setShapes(prev => [...prev, newShape]);
    renderCanvas();
  };

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and redraw background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Redraw shapes
    shapes.forEach(shape => {
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = shape.strokeWidth || shape.width;

      if (shape.type === 'rectangle') {
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === 'circle') {
        ctx.beginPath();
        ctx.arc(shape.x + shape.width/2, shape.y + shape.height/2, shape.width/2, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (shape.type === 'path') {
        ctx.beginPath();
        shape.points.forEach((point: {x: number, y: number}, index: number) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      }
    });
  };

  const clearCanvas = () => {
    setShapes([]);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const colors = ['#10b981', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6', '#ffffff'];

  return (
    <div className="space-y-6">
      {/* Unified Drawing & Diagram Tools */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Vector Drawing & Diagram Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            {/* Drawing Tools */}
            <div className="flex gap-2">
              {tools.map((toolItem) => (
                <Button
                  key={toolItem.id}
                  variant={tool === toolItem.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTool(toolItem.id as any)}
                  className={tool === toolItem.id ? 'bg-primary text-white' : 'border-primary/50 hover:border-primary text-primary'}
                  title={toolItem.label}
                >
                  {toolItem.icon}
                </Button>
              ))}
            </div>

            {/* Colors */}
            <div className="flex gap-2 items-center border-l border-primary/20 pl-4">
              <Palette className="h-4 w-4 text-primary" />
              {colors.map((c) => (
                <button
                  key={c}
                  className={`w-6 h-6 rounded border-2 hover:scale-110 transition-transform ${
                    color === c ? 'border-primary' : 'border-slate-600'
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>

            {/* Brush Size */}
            <div className="flex items-center gap-2 border-l border-primary/20 pl-4">
              <Label className="text-primary">Size:</Label>
              <Input
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-sm text-primary">{brushSize}px</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 border-l border-primary/20 pl-4">
              <Button variant="outline" size="sm" className="border-primary/50 hover:border-primary text-primary">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-primary/50 hover:border-primary text-primary">
                <Redo className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearCanvas}
                className="border-primary/50 hover:border-primary text-primary"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-primary/50 hover:border-primary text-primary"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drawing Canvas */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Vector Canvas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-primary/20 rounded-lg overflow-hidden bg-slate-900">
            <canvas
              ref={canvasRef}
              onMouseDown={(e) => {
                if (['rectangle', 'circle', 'arrow'].includes(tool)) {
                  addShape(tool, e);
                } else {
                  startDrawing(e);
                }
              }}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="cursor-crosshair w-full"
              style={{ maxHeight: '600px' }}
            />
          </div>
          
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-primary">Drawing Title</Label>
              <Input 
                id="title" 
                placeholder="e.g., EUR/USD Support Analysis"
                className="bg-slate-700 border-slate-600 text-primary"
              />
            </div>
            <div>
              <Label htmlFor="category" className="text-primary">Category</Label>
              <select className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-primary">
                <option value="technical">Technical Analysis</option>
                <option value="pattern">Chart Pattern</option>
                <option value="diagram">Process Diagram</option>
                <option value="strategy">Strategy Flow</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="description" className="text-primary">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Add notes about your analysis or diagram..."
              className="bg-slate-700 border-slate-600 text-primary"
            />
          </div>
          
          <Button className="mt-4 bg-primary hover:bg-primary/80 text-white">
            <Save className="h-4 w-4 mr-2" />
            Save Drawing
          </Button>
        </CardContent>
      </Card>

      {/* Saved Drawings & Diagrams */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Saved Drawings & Diagrams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedDrawings.map((drawing) => (
              <div key={drawing.id} className="p-4 glass-effect rounded-lg hover:scale-105 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-primary">{drawing.title}</h3>
                    <p className="text-sm text-slate-300">{drawing.description}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="border-primary/50 text-primary">
                        {drawing.type}
                      </Badge>
                      <Badge variant="outline" className="border-primary/50 text-primary">
                        {drawing.date}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-primary/50 hover:border-primary text-primary">
                      <Grid className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-primary/50 hover:border-primary text-primary">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="h-20 bg-slate-800 rounded border border-primary/20 flex items-center justify-center">
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
