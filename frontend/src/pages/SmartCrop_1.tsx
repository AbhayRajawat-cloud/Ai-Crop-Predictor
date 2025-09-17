import { useState } from "react";
import { Layout } from "@/components/Layout_2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Layers, Leaf, ChevronRight } from "lucide-react";

const SmartCropRecommendation = () => {
  const [formData, setFormData] = useState({
    soil: "",
    lastCrop: "",
    water: "",
    season: "",
    region: "",
    intercrop: "",
  });

  const [suggestion, setSuggestion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call / AI logic
    setTimeout(() => {
      const mockSuggestion = {
        recommendedCrop: "Maize",
        alternatives: ["Soybean", "Pigeon Pea", "Groundnut"],
        confidence: Math.floor(Math.random() * 20) + 80,
        intercropping: formData.intercrop
          ? `Recommended intercrop: ${formData.intercrop} for soil health & yield boost.`
          : "Consider adding legumes as intercrops for nitrogen fixation.",
        insights: [
          "Loamy soil is optimal for cereals and legumes.",
          "Water availability suggests medium irrigation crops.",
          "Season favors maize and pulses.",
        ],
      };
      setSuggestion(mockSuggestion);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="space-y-6 animate-harvest">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary">
            <TrendingUp className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">🌱 Smart Crop Recommendation</h1>
            <p className="text-muted-foreground">
              Get AI-powered guidance on best crops and intercrops for your farm
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                Farm Input Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Soil */}
                <div>
                  <Label>Soil Type</Label>
                  <Select onValueChange={(val) => handleInputChange("soil", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="loamy">Loamy</SelectItem>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="sandy">Sandy</SelectItem>
                      <SelectItem value="black">Black Soil</SelectItem>
                      <SelectItem value="silt">Silt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Last Crop */}
                <div>
                  <Label>Last Crop Grown</Label>
                  <Select onValueChange={(val) => handleInputChange("lastCrop", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose last crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="maize">Maize</SelectItem>
                      <SelectItem value="soybean">Soybean</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="sugarcane">Sugarcane</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Water */}
                <div>
                  <Label>Water Availability</Label>
                  <Select onValueChange={(val) => handleInputChange("water", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select water level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Season */}
                <div>
                  <Label>Season</Label>
                  <Select onValueChange={(val) => handleInputChange("season", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rabi">Rabi</SelectItem>
                      <SelectItem value="kharif">Kharif</SelectItem>
                      <SelectItem value="zaid">Zaid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Region */}
                <div>
                  <Label>Region/Location</Label>
                  <Input
                    type="text"
                    placeholder="Enter your region"
                    value={formData.region}
                    onChange={(e) => handleInputChange("region", e.target.value)}
                  />
                </div>

                {/* Intercropping */}
                <div>
                  <Label>Preferred Intercrop</Label>
                  <Select onValueChange={(val) => handleInputChange("intercrop", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select intercrop (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pulses">Pulses</SelectItem>
                      <SelectItem value="millets">Millets</SelectItem>
                      <SelectItem value="groundnut">Groundnut</SelectItem>
                      <SelectItem value="sunflower">Sunflower</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit */}
                <Button 
                  type="submit" 
                  className="w-full gradient-primary transition-bounce"
                  disabled={isLoading}
                >
                  {isLoading ? "Analyzing..." : "Get Suggestions"}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Output */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              {!suggestion ? (
                <div className="text-center py-12">
                  <Leaf className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Fill out the form to get crop suggestions</p>
                </div>
              ) : (
                <div className="space-y-6 animate-grow">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      Recommended Crop: {suggestion.recommendedCrop}
                    </div>
                    <Badge className="mt-2 bg-success text-success-foreground">
                      {suggestion.confidence}% Confidence
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Alternative Crops</h4>
                    <div className="flex flex-wrap gap-2">
                      {suggestion.alternatives.map((alt: string, i: number) => (
                        <Badge key={i} variant="secondary">{alt}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Intercropping Advice</h4>
                    <p className="text-sm text-muted-foreground">{suggestion.intercropping}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Insights</h4>
                    <ul className="space-y-2">
                      {suggestion.insights.map((tip: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{tip}</span>
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

export default SmartCropRecommendation;
