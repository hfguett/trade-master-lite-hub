
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Filter, 
  BookOpen, 
  Calendar, 
  Tag,
  Edit,
  Trash2,
  Save,
  Star,
  Clock
} from "lucide-react";

export const NotesManager = () => {
  const [notes] = useState([
    {
      id: 1,
      title: "Market Analysis - January 15",
      content: "Strong bullish momentum in tech stocks. NASDAQ showing clear breakout pattern...",
      type: "analysis",
      tags: ["market", "bullish", "tech"],
      date: "2024-01-15T10:30:00",
      starred: true
    },
    {
      id: 2,
      title: "Trading Rules Reminder",
      content: "1. Never risk more than 2% per trade\n2. Always set stop losses\n3. Take profits at predetermined levels...",
      type: "rules",
      tags: ["rules", "risk-management"],
      date: "2024-01-14T09:15:00",
      starred: false
    },
    {
      id: 3,
      title: "Weekly Trading Plan",
      content: "Focus on EUR/USD and GBP/JPY this week. Watch for NFP data on Friday...",
      type: "plan",
      tags: ["weekly", "plan", "forex"],
      date: "2024-01-13T16:20:00",
      starred: true
    }
  ]);

  const [selectedNote, setSelectedNote] = useState(notes[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const noteTypes = [
    { value: "all", label: "All Notes", color: "bg-mint" },
    { value: "analysis", label: "Analysis", color: "bg-blue-500" },
    { value: "rules", label: "Rules", color: "bg-purple-500" },
    { value: "plan", label: "Plans", color: "bg-orange-500" },
    { value: "idea", label: "Ideas", color: "bg-green-500" }
  ];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || note.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Notes List */}
        <Card className="lg:col-span-1 glass-effect border-mint/20 hover-mint-border transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="gradient-text">Notes</CardTitle>
              <Button size="sm" className="bg-mint hover:bg-mint/80 text-dark-blue">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {noteTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={selectedType === type.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type.value)}
                    className={selectedType === type.value 
                      ? "bg-mint text-dark-blue" 
                      : "border-mint/50 hover-mint-border text-xs"
                    }
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedNote.id === note.id 
                    ? 'bg-mint/20 border border-mint/50' 
                    : 'bg-dark-blue/30 hover:bg-dark-blue/50 border border-transparent'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm text-mint truncate">{note.title}</h3>
                  {note.starred && <Star className="h-3 w-3 text-yellow-400 fill-current" />}
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 mb-2">{note.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {note.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-mint/30 text-mint">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-xs text-slate-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(note.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Note Editor */}
        <Card className="lg:col-span-2 glass-effect border-mint/20 hover-mint-border transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="gradient-text">
                {selectedNote ? 'Edit Note' : 'New Note'}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                  <Star className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="noteTitle">Title</Label>
              <Input
                id="noteTitle"
                value={selectedNote?.title || ''}
                placeholder="Enter note title..."
                className="bg-slate-700 border-slate-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type</Label>
                <select className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-foreground">
                  <option value="analysis">Analysis</option>
                  <option value="rules">Rules</option>
                  <option value="plan">Plan</option>
                  <option value="idea">Idea</option>
                </select>
              </div>
              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="market, bullish, tech"
                  className="bg-slate-700 border-slate-600"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={selectedNote?.content || ''}
                placeholder="Start writing your note..."
                className="bg-slate-700 border-slate-600 min-h-[400px] font-mono"
              />
            </div>

            <div className="flex gap-4">
              <Button className="bg-mint hover:bg-mint/80 text-dark-blue">
                <Save className="h-4 w-4 mr-2" />
                Save Note
              </Button>
              <Button variant="outline" className="border-mint/50 hover-mint-border">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Templates */}
      <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
        <CardHeader>
          <CardTitle className="gradient-text">Quick Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col border-mint/50 hover-mint-border"
            >
              <BookOpen className="h-6 w-6 mb-2 text-mint" />
              <span>Daily Analysis</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col border-mint/50 hover-mint-border"
            >
              <Calendar className="h-6 w-6 mb-2 text-mint" />
              <span>Weekly Plan</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col border-mint/50 hover-mint-border"
            >
              <Tag className="h-6 w-6 mb-2 text-mint" />
              <span>Trade Idea</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
