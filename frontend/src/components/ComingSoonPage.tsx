import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Bell, ChevronRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ComingSoonPageProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export const ComingSoonPage = ({ icon: Icon, title, description, features }: ComingSoonPageProps) => {
  return (
    <div className="space-y-6 animate-harvest">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-muted relative">
          <Icon className="w-6 h-6 text-muted-foreground" />
          <Lock className="w-3 h-3 absolute -top-1 -right-1 bg-background border border-border rounded-full p-0.5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-primary">{title}</h1>
          <Badge variant="outline" className="bg-muted">Coming Soon</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Feature Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{description}</p>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Planned Features:</h4>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Get Notified
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Be the first to know when this feature becomes available. We'll send you an email as soon as it's ready.
            </p>
            
            <div className="space-y-3">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Expected Release</p>
                <p className="text-sm text-muted-foreground">Q2 2024</p>
              </div>
              
              <Button className="w-full gradient-primary">
                <Bell className="w-4 h-4 mr-2" />
                Notify Me When Ready
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};