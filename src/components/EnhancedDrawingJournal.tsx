
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Pencil, 
  Eraser, 
  Square, 
  Circle, 
  ArrowRight,
  Type,
  Save,
  Download,
  Upload,
  Trash2,
  Palette,
  Undo,
  Redo,
  Image as ImageIcon,
  Layers,
  Move,
  RotateCcw
} from "lucide-react";

interface DrawingElement {
  id: string;
  type: 'rectangle' | 'circle' | 'arrow' | 'line' | 'text' | 'image';
  x: number;
  y: number;
  width?: number;
  height?: number;
  color: string;
  strokeWidth: number;
  text?: string;
  imageData?: string;
  layer: number;
}

export const EnhancedDrawingJournal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'select' | 'pen' | 'eraser' | 'rectangle' | 'circle' | 'arrow' | 'line' | 'text' | 'image'>('select');
  const [color, setColor] = useState('#10b981');
  const [brushSize, setBrushSize] = useState(2);
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const [drawings] = useState([
    {
      id: 1,
      title: "BTC Support/Resistance Analysis",
      date: "2024-01-15",
      description: "Key levels identified with screenshots",
      hasImage: true
    },
    {
      id: 2,
      title: "EUR/USD Pattern Recognition",
      date: "2024-01-14",
      description: "Head and shoulders pattern with annotations",
      hasImage: false
    }
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 500;
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (backgroundImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        redrawElements(ctx);
      };
      img.src = backgroundImage;
    } else {
      redrawElements(ctx);
    }
  }, [backgroundImage, elements]);

  const redrawElements = (ctx: CanvasRenderingContext2D) => {
    elements.sort((a, b) => a.layer - b.layer).forEach(element => {
      ctx.strokeStyle = element.color;
      ctx.lineWidth = element.strokeWidth;
      ctx.fillStyle = element.color;

      switch (element.type) {
        case 'rectangle':
          ctx.strokeRect(element.x, element.y, element.width || 100, element.height || 100);
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(element.x, element.y, (element.width || 50) / 2, 0, 2 * Math.PI);
          ctx.stroke();
          break;
        case 'arrow':
          drawArrow(ctx, element.x, element.y, element.x + (element.width || 100), element.y + (element.height || 0));
          break;
        case 'text':
          ctx.font = `${element.strokeWidth * 8}px Arial`;
          ctx.fillText(element.text || 'Text', element.x, element.y);
          break;
      }
    });
  };

  const drawArrow = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) => {
    const headlen = 10;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackgroundImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addElement = (type: DrawingElement['type'], x: number, y: number) => {
    const newElement: DrawingElement = {
      id: Date.now().toString(),
      type,
      x,
      y,
      color,
      strokeWidth: brushSize,
      layer: elements.length,
      width: type === 'rectangle' ? 100 : type === 'circle' ? 100 : 100,
      height: type === 'rectangle' ? 60 : type === 'circle' ? 100 : 20
    };
    setElements([...elements, newElement]);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool !== 'pen' && tool !== 'eraser' && tool !== 'select') {
      addElement(tool as DrawingElement['type'], x, y);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool !== 'pen' && tool !== 'eraser') return;

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
    setElements([]);
    setBackgroundImage(null);
  };

  const moveElementUp = (id: string) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, layer: el.layer + 1 } : el
    ));
  };

  const moveElementDown = (id: string) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, layer: Math.max(0, el.layer - 1) } : el
    ));
  };

  const deleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
  };

  const tools = [
    { id: 'select', label: 'Select', icon: <Move className="h-4 w-4" /> },
    { id: 'pen', label: 'Pen', icon: <Pencil className="h-4 w-4" /> },
    { id: 'eraser', label: 'Eraser', icon: <Eraser className="h-4 w-4" /> },
    { id: 'rectangle', label: 'Rectangle', icon: <Square className="h-4 w-4" /> },
    { id: 'circle', label: 'Circle', icon: <Circle className="h-4 w-4" /> },
    { id: 'arrow', label: 'Arrow', icon: <ArrowRight className="h-4 w-4" /> },
    { id: 'text', label: 'Text', icon: <Type className="h-4 w-4" /> },
    { id: 'image', label: 'Image', icon: <ImageIcon className="h-4 w-4" /> }
  ];

  const colors = ['#10b981', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6', '#ffffff', '#000000'];

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
        <CardHeader>
          <CardTitle className="gradient-text">Advanced Drawing Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tools" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="layers">Layers</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tools" className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tools.map((t) => (
                  <Button
                    key={t.id}
                    variant={tool === t.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setTool(t.id as any);
                      if (t.id === 'image') {
                        fileInputRef.current?.click();
                      }
                    }}
                    className={tool === t.id ? 'bg-mint text-dark-blue' : 'border-mint/50 hover-mint-border'}
                  >
                    {t.icon}
                    <span className="ml-2">{t.label}</span>
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-mint" />
                  {colors.map((c) => (
                    <button
                      key={c}
                      className={`w-6 h-6 rounded border-2 ${color === c ? 'border-mint' : 'border-slate-600'}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </div>
                
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
              </div>
            </TabsContent>

            <TabsContent value="layers" className="space-y-4">
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {elements.map((element) => (
                  <div key={element.id} className="flex items-center justify-between p-2 bg-dark-blue/30 rounded">
                    <span className="text-sm capitalize">{element.type} - Layer {element.layer}</span>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => moveElementUp(element.id)}>↑</Button>
                      <Button size="sm" variant="outline" onClick={() => moveElementDown(element.id)}>↓</Button>
                      <Button size="sm" variant="outline" onClick={() => deleteElement(element.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="flex gap-4">
                <Button variant="outline" onClick={clearCanvas} className="border-mint/50 hover-mint-border">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
                <Button variant="outline" className="border-mint/50 hover-mint-border">
                  <Undo className="h-4 w-4 mr-2" />
                  Undo
                </Button>
                <Button variant="outline" className="border-mint/50 hover-mint-border">
                  <Redo className="h-4 w-4 mr-2" />
                  Redo
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Enhanced Canvas */}
      <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
        <CardHeader>
          <CardTitle className="gradient-text">Interactive Canvas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-mint/20 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="cursor-crosshair w-full max-w-full bg-slate-900"
              style={{ maxHeight: '500px' }}
            />
          </div>
          
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Drawing Title</Label>
              <Input 
                id="title" 
                placeholder="e.g., BTC Analysis with Screenshots"
                className="bg-slate-700 border-slate-600"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <select className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-foreground">
                <option value="analysis">Technical Analysis</option>
                <option value="setup">Trade Setup</option>
                <option value="review">Trade Review</option>
                <option value="pattern">Pattern Recognition</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="description">Description & Notes</Label>
            <Textarea 
              id="description" 
              placeholder="Add your analysis notes, reasoning, and observations..."
              className="bg-slate-700 border-slate-600"
            />
          </div>
          
          <div className="mt-4 flex gap-4">
            <Button className="bg-mint hover:bg-mint/80 text-dark-blue">
              <Save className="h-4 w-4 mr-2" />
              Save Analysis
            </Button>
            <Button variant="outline" className="border-mint/50 hover-mint-border">
              <Download className="h-4 w-4 mr-2" />
              Export PNG
            </Button>
            <Button variant="outline" className="border-mint/50 hover-mint-border">
              <Upload className="h-4 w-4 mr-2" />
              Import Background
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Saved Drawings with Enhanced Info */}
      <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
        <CardHeader>
          <CardTitle className="gradient-text">Saved Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {drawings.map((drawing) => (
              <div key={drawing.id} className="p-4 bg-dark-blue/30 rounded-lg hover:bg-dark-blue/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-mint">{drawing.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">{drawing.description}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="border-mint/50 text-mint">
                        {drawing.date}
                      </Badge>
                      {drawing.hasImage && (
                        <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                          <ImageIcon className="h-3 w-3 mr-1" />
                          Has Image
                        </Badge>
                      )}
                    </div>
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
                <div className="h-24 bg-slate-800 rounded border border-mint/20 flex items-center justify-center">
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
