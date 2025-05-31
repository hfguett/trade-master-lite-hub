
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
  Upload,
  Trash2,
  Palette,
  Undo,
  Redo
} from "lucide-react";

export const DrawingJournal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser' | 'line' | 'rectangle' | 'circle'>('pen');
  const [color, setColor] = useState('#10b981');
  const [brushSize, setBrushSize] = useState(2);
  const [drawings, setDrawings] = useState([
    {
      id: 1,
      title: "BTC Support/Resistance Analysis",
      date: "2024-01-15",
      description: "Key levels identified for tomorrow's session"
    },
    {
      id: 2,
      title: "EUR/USD Pattern Recognition",
      date: "2024-01-14",
      description: "Head and shoulders pattern forming"
    }
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 500;
    
    // Set default styles
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = tool === 'eraser' ? '#1f2937' : color;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `trade-analysis-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const colors = ['#10b981', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6', '#ffffff'];

  return (
    <div className="space-y-6">
      {/* Drawing Tools */}
      <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
        <CardHeader>
          <CardTitle className="gradient-text">Drawing Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            {/* Tools */}
            <div className="flex gap-2">
              <Button
                variant={tool === 'pen' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTool('pen')}
                className={tool === 'pen' ? 'bg-mint text-dark-blue' : 'border-mint/50 hover-mint-border'}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant={tool === 'eraser' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTool('eraser')}
                className={tool === 'eraser' ? 'bg-mint text-dark-blue' : 'border-mint/50 hover-mint-border'}
              >
                <Eraser className="h-4 w-4" />
              </Button>
              <Button
                variant={tool === 'line' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTool('line')}
                className={tool === 'line' ? 'bg-mint text-dark-blue' : 'border-mint/50 hover-mint-border'}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button
                variant={tool === 'rectangle' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTool('rectangle')}
                className={tool === 'rectangle' ? 'bg-mint text-dark-blue' : 'border-mint/50 hover-mint-border'}
              >
                <Square className="h-4 w-4" />
              </Button>
              <Button
                variant={tool === 'circle' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTool('circle')}
                className={tool === 'circle' ? 'bg-mint text-dark-blue' : 'border-mint/50 hover-mint-border'}
              >
                <Circle className="h-4 w-4" />
              </Button>
            </div>

            {/* Colors */}
            <div className="flex gap-2 items-center">
              <Palette className="h-4 w-4 text-mint" />
              {colors.map((c) => (
                <button
                  key={c}
                  className={`w-6 h-6 rounded border-2 ${
                    color === c ? 'border-mint' : 'border-slate-600'
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>

            {/* Brush Size */}
            <div className="flex items-center gap-2">
              <Label>Size:</Label>
              <Input
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-sm text-mint">{brushSize}px</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                <Redo className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearCanvas}
                className="border-mint/50 hover-mint-border"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={saveDrawing}
                className="border-mint/50 hover-mint-border"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drawing Canvas */}
      <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
        <CardHeader>
          <CardTitle className="gradient-text">Trade Analysis Canvas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-mint/20 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="cursor-crosshair w-full max-w-full"
              style={{ maxHeight: '500px' }}
            />
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="title">Drawing Title</Label>
              <Input 
                id="title" 
                placeholder="e.g., EUR/USD Support Analysis"
                className="bg-slate-700 border-slate-600"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Add notes about your analysis..."
                className="bg-slate-700 border-slate-600"
              />
            </div>
            <Button className="bg-mint hover:bg-mint/80 text-dark-blue">
              <Save className="h-4 w-4 mr-2" />
              Save Drawing
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Saved Drawings */}
      <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
        <CardHeader>
          <CardTitle className="gradient-text">Saved Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {drawings.map((drawing) => (
              <div key={drawing.id} className="p-4 bg-dark-blue/30 rounded-lg hover:bg-dark-blue/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-mint">{drawing.title}</h3>
                    <p className="text-sm text-slate-400">{drawing.description}</p>
                    <Badge variant="outline" className="mt-2 border-mint/50 text-mint">
                      {drawing.date}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                      <Upload className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
