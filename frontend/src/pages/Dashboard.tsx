import { Layout } from "@/components/Layout_2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  User,
  MapPin,
  Square,
  Wheat,
  TrendingUp,
  Cloud,
  Leaf,
  Bug,
  Droplets,
  BarChart3,
  Lock,
} from "lucide-react";

const Dashboard = () => {
  const farmerData = {
    name: "John Farmer",
    email: "john.farmer@example.com",
    farmSize: "150 hectares",
    primaryCrop: "Wheat",
    location: "Iowa, USA",
    yearProgress: 65,
  };

  const comingSoonFeatures = [
    {
      title: "Weather Intelligence",
      icon: Cloud,
      description: "Real-time weather monitoring and forecasts",
      status: "Coming Soon",
    },
    {
      title: "Soil Health Analytics",
      icon: Leaf,
      description: "Advanced soil composition analysis",
      status: "Coming Soon",
    },
    {
      title: "Pest & Disease Control",
      icon: Bug,
      description: "AI-powered pest identification and treatment",
      status: "Coming Soon",
    },
    {
      title: "Irrigation Optimization",
      icon: Droplets,
      description: "Smart water management system",
      status: "Coming Soon",
    },
    {
      title: "Performance Analytics",
      icon: BarChart3,
      description: "Comprehensive farm performance metrics",
      status: "Coming Soon",
    },
  ];

  return (
    <Layout>
      <div className="space-y-6 animate-harvest">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">Welcome back, {farmerData.name}!</h1>
          <Badge variant="outline" className="bg-success text-success-foreground">
            Premium Account
          </Badge>
        </div>

        {/* Farmer Profile Card */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Farmer Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{farmerData.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Square className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Farm Size</p>
                  <p className="font-medium">{farmerData.farmSize}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Wheat className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Primary Crop</p>
                  <p className="font-medium">{farmerData.primaryCrop}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{farmerData.location}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Growing Season Progress</p>
                <p className="text-sm text-muted-foreground">{farmerData.yearProgress}%</p>
              </div>
              <Progress value={farmerData.yearProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Active Feature */}
        <Card className="shadow-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              AI Yield Prediction
              <Badge className="bg-success text-success-foreground">Active</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Get accurate crop yield predictions using advanced AI algorithms. Input your farm data to receive personalized insights.
            </p>
            <a
              href="/yield-prediction"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-glow transition-bounce"
            >
              Start Prediction
              <TrendingUp className="w-4 h-4" />
            </a>
          </CardContent>
        </Card>

        {/* Coming Soon Features */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">Coming Soon Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoonFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-card opacity-75 relative">
                  <div className="absolute top-4 right-4">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon className="w-5 h-5 text-primary" />
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{feature.description}</p>
                    <Badge variant="outline" className="bg-muted">
                      {feature.status}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;