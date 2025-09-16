import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RotateCw, Layers, TrendingUp, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function SmartCropForm() {
  const [form, setForm] = useState({
    soil: "",
    lastCrop: "",
    water: "",
    season: "",
    region: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient py-16 text-white text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          🌱 Smart Crop Recommendation
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
          Get AI-powered guidance on what to grow next season, and explore intercropping options to boost yield.
        </p>
      </section>

      {/* Input Form */}
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              Farmer Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Soil Type */}
            <div>
              <Label>Soil Type</Label>
              <Select onValueChange={(val) => handleChange("soil", val)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loamy">Loamy</SelectItem>
                  <SelectItem value="clay">Clay</SelectItem>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="silt">Silt</SelectItem>
                  <SelectItem value="black">Black Soil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Last Crop */}
            <div>
              <Label>Last Crop Grown</Label>
              <Input
                type="text"
                placeholder="e.g., Wheat, Maize"
                value={form.lastCrop}
                onChange={(e) => handleChange("lastCrop", e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Water Availability */}
            <div>
              <Label>Water Availability</Label>
              <Select onValueChange={(val) => handleChange("water", val)}>
                <SelectTrigger className="mt-1">
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
              <Label>Current/Upcoming Season</Label>
              <Select onValueChange={(val) => handleChange("season", val)}>
                <SelectTrigger className="mt-1">
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
                placeholder="Enter your region or district"
                value={form.region}
                onChange={(e) => handleChange("region", e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <TrendingUp className="h-4 w-4 mr-2" />
                Get Basic Crop Suggestions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Premium Features Section */}
        <Card className="shadow-medium border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Layers className="h-5 w-5" />
              Advanced Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Unlock advanced AI-powered recommendations like{" "}
              <strong>intercropping strategies, yield predictions, and GenAI insights</strong> 
              tailored to your farm conditions.
            </p>
            <Link to="/login">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <Lock className="h-4 w-4 mr-2" />
                Login to Use Advanced Features
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
