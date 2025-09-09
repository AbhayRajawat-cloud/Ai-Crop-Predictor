import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  Gauge,
  MapPin,
  Search,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const Weather = () => {
  const [location, setLocation] = useState("Ludhiana, Punjab");
  
  // Mock weather data
  const currentWeather = {
    location: "Ludhiana, Punjab",
    temperature: 24,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    visibility: 10,
    uvIndex: 6,
    icon: Sun
  };

  const forecast = [
    { day: "Today", high: 26, low: 18, condition: "Sunny", precipitation: 0, icon: Sun },
    { day: "Tomorrow", high: 28, low: 20, condition: "Partly Cloudy", precipitation: 10, icon: Cloud },
    { day: "Wed", high: 25, low: 17, condition: "Light Rain", precipitation: 65, icon: CloudRain },
    { day: "Thu", high: 23, low: 15, condition: "Rainy", precipitation: 85, icon: CloudRain },
    { day: "Fri", high: 27, low: 19, condition: "Sunny", precipitation: 0, icon: Sun },
    { day: "Sat", high: 29, low: 21, condition: "Sunny", precipitation: 0, icon: Sun },
    { day: "Sun", high: 31, low: 23, condition: "Hot", precipitation: 0, icon: Sun }
  ];

  const alerts = [
    {
      type: "warning",
      title: "Heavy Rain Expected",
      message: "60-80mm of rainfall expected Wednesday-Thursday. Consider irrigation adjustments.",
      time: "2 hours ago"
    },
    {
      type: "info",
      title: "Optimal Planting Conditions",
      message: "Soil moisture and temperature ideal for corn planting this weekend.",
      time: "1 day ago"
    }
  ];

  const farmingInsights = [
    {
      icon: Droplets,
      title: "Irrigation Recommendation",
      status: "Reduce by 40%",
      description: "Upcoming rainfall will provide sufficient moisture for the next 4 days.",
      priority: "high"
    },
    {
      icon: Wind,
      title: "Spray Conditions",
      status: "Good",
      description: "Low wind speeds ideal for pesticide application today and tomorrow.",
      priority: "medium"
    },
    {
      icon: Thermometer,
      title: "Growth Conditions",
      status: "Optimal",
      description: "Temperature range perfect for crop development this week.",
      priority: "low"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Weather Intelligence
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90">
              Advanced weather analytics and forecasting designed specifically for agricultural needs.
              Make informed decisions with precision weather data.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="mb-8">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="text" 
                      placeholder="Enter farm location..." 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary-hover">
                  <Search className="h-4 w-4 mr-2" />
                  Update Location
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="shadow-medium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{currentWeather.location}</span>
                  </CardTitle>
                  <Badge variant="secondary">Live</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center">
                      <currentWeather.icon className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-foreground">{currentWeather.temperature}°C</div>
                      <div className="text-muted-foreground">{currentWeather.condition}</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-sky" />
                    <div>
                      <div className="text-sm text-muted-foreground">Humidity</div>
                      <div className="font-semibold">{currentWeather.humidity}%</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wind className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Wind</div>
                      <div className="font-semibold">{currentWeather.windSpeed} km/h</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Gauge className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Pressure</div>
                      <div className="font-semibold">{currentWeather.pressure} mb</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Visibility</div>
                      <div className="font-semibold">{currentWeather.visibility} km</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weather Alerts */}
          <div>
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <span>Weather Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <div key={index} className={`p-3 rounded-lg border-l-4 ${
                      alert.type === 'warning' 
                        ? 'bg-warning/10 border-warning' 
                        : 'bg-sky/10 border-sky'
                    }`}>
                      <div className="flex items-start space-x-2">
                        <div className={`h-2 w-2 rounded-full mt-2 ${
                          alert.type === 'warning' ? 'bg-warning' : 'bg-sky'
                        }`} />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{alert.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                          <p className="text-xs text-muted-foreground/80 mt-1">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <Card className="shadow-medium mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>7-Day Forecast</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {forecast.map((day, index) => (
                <div key={index} className="text-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth">
                  <div className="font-semibold text-sm mb-2">{day.day}</div>
                  <div className="h-8 w-8 mx-auto mb-2 rounded-full bg-accent/10 flex items-center justify-center">
                    <day.icon className="h-4 w-4 text-accent" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-semibold">{day.high}°</div>
                    <div className="text-xs text-muted-foreground">{day.low}°</div>
                    <div className="text-xs text-sky">{day.precipitation}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Farming Insights */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span>Agricultural Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {farmingInsights.map((insight, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      insight.priority === 'high' ? 'bg-warning/10' :
                      insight.priority === 'medium' ? 'bg-sky/10' : 'bg-success/10'
                    }`}>
                      <insight.icon className={`h-5 w-5 ${
                        insight.priority === 'high' ? 'text-warning' :
                        insight.priority === 'medium' ? 'text-sky' : 'text-success'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{insight.title}</h3>
                      <Badge variant="secondary" className="text-xs">{insight.status}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Weather;