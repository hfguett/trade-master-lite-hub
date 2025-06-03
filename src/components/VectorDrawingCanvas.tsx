
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Square, 
  Circle, 
  ArrowRight, 
  Type, 
  Move, 
  ZoomIn, 
  ZoomOut,
  Trash2,
  Save,
  Download,
  Undo,
  Redo
} from "lucide-react";

interface VectorElement {
  id: string;
  type: 'rectangle' | 'circle' | 'arrow' | 'text';
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  strokeWidth: number;
  text?: string;
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
}

interface CanvasState {
  elements: VectorElement[];
  zoom: number;
  offsetX: number;
  offsetY: number;
}

export const VectorDrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<'select' | 'rectangle' | 'circle' | 'arrow' | 'text'>('select');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentElement, setCurrentElement] = useState<VectorElement | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [color, setColor] = useState('#4f46e5');
  
  const [canvasState, setCanvasState] = useState<CanvasState>({
    elements: [],
    zoom: 1,
    offsetX: 0,
    offsetY: 0
  });

  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply zoom and offset
    ctx.save();
    ctx.scale(canvasState.zoom, canvasState.zoom);
    ctx.translate(canvasState.offsetX, canvasState.offsetY);

    // Draw grid
    drawGrid(ctx, canvas.width, canvas.height);

    // Draw elements
    canvasState.elements.forEach(element => {
      drawElement(ctx, element, element.id === selectedElement);
    });

    // Draw current element being created
    if (currentElement) {
      drawElement(ctx, currentElement, false);
    }

    ctx.restore();
  }, [canvasState, currentElement, selectedElement]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const gridSize = 20;
    ctx.strokeStyle = 'rgba(79, 70, 229, 0.1)';
    ctx.lineWidth = 1;

    for (let x = 0; x <= width / canvasState.zoom; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height / canvasState.zoom);
      ctx.stroke();
    }

    for (let y = 0; y <= height / canvasState.zoom; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width / canvasState.zoom, y);
      ctx.stroke();
    }
  };

  const drawElement = (ctx: CanvasRenderingContext2D, element: VectorElement, isSelected: boolean) => {
    ctx.strokeStyle = element.color;
    ctx.lineWidth = element.strokeWidth;
    
    if (isSelected) {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = element.strokeWidth + 2;
    }

    switch (element.type) {
      case 'rectangle':
        ctx.strokeRect(element.x, element.y, element.width, element.height);
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(element.x + element.width / 2, element.y + element.height / 2, 
                Math.min(element.width, element.height) / 2, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      case 'arrow':
        drawArrow(ctx, element.startX || element.x, element.startY || element.y, 
                  element.endX || (element.x + element.width), 
                  element.endY || (element.y + element.height));
        break;
      case 'text':
        ctx.font = `${element.strokeWidth * 4}px Arial`;
        ctx.fillStyle = element.color;
        ctx.fillText(element.text || 'Text', element.x, element.y);
        break;
    }

    // Draw selection handles
    if (isSelected) {
      drawSelectionHandles(ctx, element);
    }
  };

  const drawArrow = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) => {
    const headLength = 15;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    // Draw line
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    // Draw arrowhead
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), 
               toY - headLength * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), 
               toY - headLength * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  };

  const drawSelectionHandles = (ctx: CanvasRenderingContext2D, element: VectorElement) => {
    const handleSize = 8;
    ctx.fillStyle = '#f59e0b';
    
    // Corner handles
    const corners = [
      [element.x - handleSize/2, element.y - handleSize/2],
      [element.x + element.width - handleSize/2, element.y - handleSize/2],
      [element.x + element.width - handleSize/2, element.y + element.height - handleSize/2],
      [element.x - handleSize/2, element.y + element.height - handleSize/2]
    ];

    corners.forEach(([x, y]) => {
      ctx.fillRect(x, y, handleSize, handleSize);
    });
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / canvasState.zoom) - canvasState.offsetX;
    const y = ((e.clientY - rect.top) / canvasState.zoom) - canvasState.offsetY;
    
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);
    setDragStart(pos);

    if (tool === 'select') {
      const clickedElement = findElementAt(pos.x, pos.y);
      setSelectedElement(clickedElement?.id || null);
      setIsDragging(!!clickedElement);
    } else {
      setIsDrawing(true);
      const newElement: VectorElement = {
        id: Date.now().toString(),
        type: tool,
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        color,
        strokeWidth: 2,
        startX: pos.x,
        startY: pos.y,
        endX: pos.x,
        endY: pos.y,
      };
      setCurrentElement(newElement);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);

    if (isDrawing && currentElement && dragStart) {
      const updated = { ...currentElement };
      
      if (tool === 'arrow') {
        updated.endX = pos.x;
        updated.endY = pos.y;
        updated.width = pos.x - dragStart.x;
        updated.height = pos.y - dragStart.y;
      } else {
        updated.width = Math.abs(pos.x - dragStart.x);
        updated.height = Math.abs(pos.y - dragStart.y);
        updated.x = Math.min(dragStart.x, pos.x);
        updated.y = Math.min(dragStart.y, pos.y);
      }
      
      setCurrentElement(updated);
    }

    if (isDragging && selectedElement && dragStart) {
      const deltaX = pos.x - dragStart.x;
      const deltaY = pos.y - dragStart.y;
      
      setCanvasState(prev => ({
        ...prev,
        elements: prev.elements.map(el => 
          el.id === selectedElement 
            ? { ...el, x: el.x + deltaX, y: el.y + deltaY }
            : el
        )
      }));
      
      setDragStart(pos);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && currentElement) {
      if (currentElement.width > 5 || currentElement.height > 5) {
        setCanvasState(prev => ({
          ...prev,
          elements: [...prev.elements, currentElement]
        }));
      }
      setCurrentElement(null);
    }
    
    setIsDrawing(false);
    setIsDragging(false);
    setDragStart(null);
  };

  const findElementAt = (x: number, y: number): VectorElement | null => {
    for (let i = canvasState.elements.length - 1; i >= 0; i--) {
      const element = canvasState.elements[i];
      if (x >= element.x && x <= element.x + element.width &&
          y >= element.y && y <= element.y + element.height) {
        return element;
      }
    }
    return null;
  };

  const handleZoom = (delta: number) => {
    setCanvasState(prev => ({
      ...prev,
      zoom: Math.max(0.1, Math.min(5, prev.zoom + delta))
    }));
  };

  const deleteSelected = () => {
    if (selectedElement) {
      setCanvasState(prev => ({
        ...prev,
        elements: prev.elements.filter(el => el.id !== selectedElement)
      }));
      setSelectedElement(null);
    }
  };

  const clearCanvas = () => {
    setCanvasState(prev => ({ ...prev, elements: [] }));
    setSelectedElement(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 800;
    canvas.height = 600;
    redraw();
  }, [redraw]);

  const colors = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Vector Drawing Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tools" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="view">View</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tools" className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={tool === 'select' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTool('select')}
                  className={tool === 'select' ? 'bg-primary text-white' : 'border-primary/50 hover:border-primary'}
                >
                  <Move className="h-4 w-4 mr-2" />
                  Select
                </Button>
                <Button
                  variant={tool === 'rectangle' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTool('rectangle')}
                  className={tool === 'rectangle' ? 'bg-primary text-white' : 'border-primary/50 hover:border-primary'}
                >
                  <Square className="h-4 w-4 mr-2" />
                  Rectangle
                </Button>
                <Button
                  variant={tool === 'circle' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTool('circle')}
                  className={tool === 'circle' ? 'bg-primary text-white' : 'border-primary/50 hover:border-primary'}
                >
                  <Circle className="h-4 w-4 mr-2" />
                  Circle
                </Button>
                <Button
                  variant={tool === 'arrow' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTool('arrow')}
                  className={tool === 'arrow' ? 'bg-primary text-white' : 'border-primary/50 hover:border-primary'}
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Arrow
                </Button>
                <Button
                  variant={tool === 'text' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTool('text')}
                  className={tool === 'text' ? 'bg-primary text-white' : 'border-primary/50 hover:border-primary'}
                >
                  <Type className="h-4 w-4 mr-2" />
                  Text
                </Button>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-300">Colors:</span>
                {colors.map((c) => (
                  <button
                    key={c}
                    className={`w-8 h-8 rounded border-2 ${color === c ? 'border-primary' : 'border-slate-600'}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="view" className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleZoom(0.1)}
                  className="border-primary/50 hover:border-primary"
                >
                  <ZoomIn className="h-4 w-4 mr-2" />
                  Zoom In
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleZoom(-0.1)}
                  className="border-primary/50 hover:border-primary"
                >
                  <ZoomOut className="h-4 w-4 mr-2" />
                  Zoom Out
                </Button>
                <span className="text-sm text-slate-300">
                  Zoom: {Math.round(canvasState.zoom * 100)}%
                </span>
              </div>
            </TabsContent>

            <TabsContent value="actions" className="space-y-4">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={deleteSelected}
                  disabled={!selectedElement}
                  className="border-primary/50 hover:border-primary"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCanvas}
                  className="border-primary/50 hover:border-primary"
                >
                  Clear All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/50 hover:border-primary"
                >
                  <Undo className="h-4 w-4 mr-2" />
                  Undo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/50 hover:border-primary"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Vector Canvas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-primary/20 rounded-lg overflow-hidden bg-slate-900">
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="cursor-crosshair w-full"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>
          
          <div className="mt-4 text-sm text-slate-400">
            <p>• Use drag to create shapes from start to end point</p>
            <p>• Select tool to move and edit existing elements</p>
            <p>• Zoom in/out for precise editing</p>
            <p>• All drawings are vector-based for infinite scalability</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
