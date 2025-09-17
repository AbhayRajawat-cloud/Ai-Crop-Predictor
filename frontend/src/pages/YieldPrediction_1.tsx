import { useState } from "react";
import { Layout } from "@/components/Layout_2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap, ChevronRight } from "lucide-react";

const YieldPrediction = () => {
  const [formData, setFormData] = useState({
    crop: "",
    farmArea: "",
    rainfall: "",
    temperature: "",
    fertilizer: "",
  });
  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockPrediction = {
        yield: Math.floor(Math.random() * 5000) + 3000,
        confidence: Math.floor(Math.random() * 20) + 80,
        recommendations: [
          "Consider increasing nitrogen fertilizer by 10%",
          "Monitor soil moisture levels regularly",
          "Weather conditions are favorable for high yield",
        ],
      };
      setPrediction(mockPrediction);
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Layout>
      <div className="space-y-6 animate-harvest">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary">
            <TrendingUp className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">AI Yield Prediction</h1>
            <p className="text-muted-foreground">Get accurate crop yield predictions powered by AI</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Farm Data Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="crop">Select Crop</Label>
                  <Select onValueChange={(value) => handleInputChange("crop", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="corn">Corn</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="soybeans">Soybeans</SelectItem>
                      <SelectItem value="barley">Barley</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmArea">Farm Area</Label>
                  <div className="relative">
                    <Input
                      id="farmArea"
                      type="number"
                      placeholder="150"
                      value={formData.farmArea}
                      onChange={(e) => handleInputChange("farmArea", e.target.value)}
                      className="pr-20"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      acres
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rainfall">Average Rainfall</Label>
                  <div className="relative">
                    <Input
                      id="rainfall"
                      type="number"
                      placeholder="800"
                      value={formData.rainfall}
                      onChange={(e) => handleInputChange("rainfall", e.target.value)}
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      mm
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperature">Average Temperature</Label>
                  <div className="relative">
                    <Input
                      id="temperature"
                      type="number"
                      placeholder="22"
                      value={formData.temperature}
                      onChange={(e) => handleInputChange("temperature", e.target.value)}
                      className="pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      °C
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fertilizer">Fertilizer Type</Label>
                  <Select onValueChange={(value) => handleInputChange("fertilizer", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fertilizer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="organic">Organic</SelectItem>
                      <SelectItem value="npk">NPK (10-10-10)</SelectItem>
                      <SelectItem value="urea">Urea</SelectItem>
                      <SelectItem value="compound">Compound Fertilizer</SelectItem>
                      <SelectItem value="none">No Fertilizer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full gradient-primary transition-bounce"
                  disabled={isLoading || !formData.crop || !formData.farmArea}
                >
                  {isLoading ? "Analyzing..." : "Predict Yield"}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Prediction Results</CardTitle>
            </CardHeader>
            <CardContent>
              {!prediction ? (
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Fill out the form to get your yield prediction</p>
                </div>
              ) : (
                <div className="space-y-6 animate-grow">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {prediction.yield.toLocaleString()} kg
                    </div>
                    <p className="text-muted-foreground">Predicted Yield</p>
                    <Badge className="mt-2 bg-success text-success-foreground">
                      {prediction.confidence}% Confidence
                    </Badge>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-3">AI Recommendations</h4>
                    <ul className="space-y-2">
                      {prediction.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default YieldPrediction;