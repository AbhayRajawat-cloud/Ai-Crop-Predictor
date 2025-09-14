import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const commonQuestions = [
    "How do I predict crop yield?",
    "What weather data do I need?",
    "How to interpret soil health data?",
    "When should I irrigate my crops?",
    "How to identify pest diseases?",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="w-80 mb-4 shadow-card animate-harvest">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-primary">GreenByte Assistant</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Common questions:
            </p>
            {commonQuestions.map((question, index) => (
              <button
                key={index}
                className="w-full text-left p-2 text-sm rounded-lg hover:bg-muted transition-smooth"
                onClick={() => {
                  // In a real app, this would open a chat or FAQ
                  console.log("Question clicked:", question);
                }}
              >
                {question}
              </button>
            ))}
            <Button className="w-full gradient-primary" size="sm">
              Start Chat
            </Button>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full gradient-primary shadow-glow animate-float"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  );
};