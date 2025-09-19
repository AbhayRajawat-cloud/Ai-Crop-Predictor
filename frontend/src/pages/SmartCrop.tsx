import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { 
  RotateCw, 
  Layers, 
  TrendingUp, 
  Lock, 
  Sprout,
  Droplets,
  MapPin,
  Calendar,
  Mountain,
  Sparkles,
  ChevronRight,
  Target,
  Brain
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SmartCropForm() {
  const [form, setForm] = useState({
    soil: "",
    lastCrop: "",
    water: "",
    season: "",
    region: "",
  });
  const [locationLoading, setLocationLoading] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Get user's current location
  const getCurrentLocation = () => {
    setLocationLoading(true);
    
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Use reverse geocoding to get location name
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=d1845658f92b31c64bd94f06f7188c9c`
          );
          const data = await response.json();
          
          if (data && data.length > 0) {
            const location = data[0];
            const locationString = `${location.name}${location.state ? ', ' + location.state : ''}${location.country ? ', ' + location.country : ''}`;
            handleChange("region", locationString);
          } else {
            // Fallback: just use coordinates
            handleChange("region", `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          }
        } catch (error) {
          console.error("Error getting location name:", error);
          // Fallback: use coordinates
          handleChange("region", `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        let errorMessage = "Unable to get location. ";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Please allow location access and try again.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage += "Location request timed out.";
            break;
          default:
            errorMessage += "An unknown error occurred.";
            break;
        }
        alert(errorMessage);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const getFieldIcon = (fieldName: string) => {
    const icons = {
      soil: Mountain,
      lastCrop: Sprout,
      water: Droplets,
      season: Calendar,
      region: MapPin
    };
    return icons[fieldName as keyof typeof icons] || Sprout;
  };

  const isFormValid = form.soil && form.water && form.season && form.region;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-80 h-80 bg-emerald-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-lime-400 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Enhanced Hero Section */}
      <section className="hero-gradient py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-600/90 via-emerald-600/80 to-lime-600/90"></div>
          <div className="absolute top-10 right-20 opacity-20">
            <Sprout className="w-32 h-32 text-green-200 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute bottom-10 left-16 opacity-20">
            <Target className="w-24 h-24 text-emerald-200 animate-pulse" />
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6">
            Smart Crop Recommendation
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-white/90 leading-relaxed">
            Get AI-powered guidance on what to grow next season, and explore intercropping 
            options to boost yield and maximize your farm's potential.
          </p>
          
          {/* Feature highlights */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Brain, label: "AI Analysis", value: "Smart Recommendations" },
              { icon: TrendingUp, label: "Yield Optimization", value: "Maximum Profit" },
              { icon: Layers, label: "Intercropping", value: "Advanced Patterns" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <stat.icon className="w-8 h-8 text-white mx-auto mb-2" />
                <div className="text-lg font-semibold text-white">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Input Form */}
      <div className="max-w-5xl mx-auto p-6 space-y-8 relative z-10">
        <Card className="shadow-2xl border border-white/20 rounded-3xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Layers className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Farm Assessment</h2>
                  <p className="text-sm text-gray-600">Tell us about your farming conditions</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Step 1 of 1</div>
                <div className="text-xs text-green-600 font-medium">Basic Analysis</div>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Soil Type */}
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-700 flex items-center space-x-2">
                  <Mountain className="w-5 h-5 text-amber-600" />
                  <span>Soil Type</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(val) => handleChange("soil", val)}>
                  <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-green-500 bg-white/70">
                    <SelectValue placeholder="Choose your soil type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="loamy">Loamy Soil (Best for most crops)</SelectItem>
                    <SelectItem value="clay">Clay Soil (High water retention)</SelectItem>
                    <SelectItem value="sandy">Sandy Soil (Good drainage)</SelectItem>
                    <SelectItem value="silt">Silt Soil (Rich in nutrients)</SelectItem>
                    <SelectItem value="black">Black Soil (Cotton region)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Different crops thrive in different soil conditions</p>
              </div>

              {/* Water Availability */}
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-700 flex items-center space-x-2">
                  <Droplets className="w-5 h-5 text-blue-600" />
                  <span>Water Availability</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(val) => handleChange("water", val)}>
                  <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/70">
                    <SelectValue placeholder="Select water availability" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="low">Low (Rain-fed farming)</SelectItem>
                    <SelectItem value="medium">Medium (Limited irrigation)</SelectItem>
                    <SelectItem value="high">High (Abundant water supply)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Water availability affects crop selection significantly</p>
              </div>

              {/* Last Crop */}
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-700 flex items-center space-x-2">
                  <Sprout className="w-5 h-5 text-green-600" />
                  <span>Last Crop Grown</span>
                </Label>
                <Input
                  type="text"
                  placeholder="e.g., Wheat, Rice, Maize, Cotton"
                  value={form.lastCrop}
                  onChange={(e) => handleChange("lastCrop", e.target.value)}
                  className="h-12 rounded-xl border-2 border-gray-200 focus:border-green-500 bg-white/70 pl-4"
                />
                <p className="text-xs text-gray-500">Helps determine crop rotation recommendations</p>
              </div>

              {/* Season */}
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-700 flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span>Current/Upcoming Season</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(val) => handleChange("season", val)}>
                  <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-500 bg-white/70">
                    <SelectValue placeholder="Select planting season" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="rabi">Rabi (Winter crops: Oct-Apr)</SelectItem>
                    <SelectItem value="kharif">Kharif (Monsoon crops: Jun-Oct)</SelectItem>
                    <SelectItem value="zaid">Zaid (Summer crops: Mar-Jun)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Season determines which crops can be grown</p>
              </div>
            </div>

            {/* Region - Full Width with Location Detection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-gray-700 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <span>Region/Location</span>
                <span className="text-red-500">*</span>
              </Label>
              
              {/* Input with button row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  placeholder="Enter your region, district, or state (e.g., Punjab, Maharashtra)"
                  value={form.region}
                  onChange={(e) => handleChange("region", e.target.value)}
                  className="flex-1 h-12 rounded-xl border-2 border-gray-200 focus:border-indigo-500 bg-white/70 pl-4"
                />
                <Button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={locationLoading}
                  variant="outline"
                  className="h-12 px-6 rounded-xl border-2 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2 whitespace-nowrap"
                >
                  {locationLoading ? (
                    <RotateCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <MapPin className="w-4 h-4" />
                  )}
                  <span>Use My Location</span>
                </Button>
              </div>
              
              <p className="text-xs text-gray-500">
                Location helps provide region-specific crop recommendations. Click "Use My Location" to auto-detect your current location.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button 
                className={`w-full h-14 rounded-2xl text-lg font-semibold transition-all duration-300 ${
                  isFormValid 
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl hover:scale-105" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!isFormValid}
              >
                <TrendingUp className="h-5 w-5 mr-3" />
                Get Basic Crop Suggestions
                <ChevronRight className="h-5 w-5 ml-3" />
              </Button>
              {!isFormValid && (
                <p className="text-sm text-red-500 mt-2 text-center">
                  Please fill in all required fields (marked with *)
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Premium Features Section */}
        <Card className="shadow-2xl border-2 border-green-200 rounded-3xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-800">Premium AI Features</h2>
                  <p className="text-sm text-green-600">Unlock advanced agricultural intelligence</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-xl">
                <span className="text-white font-bold text-sm">PREMIUM</span>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6 pb-8">
            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Layers,
                  title: "Intercropping Strategies",
                  description: "Maximize land use with companion planting recommendations",
                  color: "text-blue-600"
                },
                {
                  icon: TrendingUp,
                  title: "Yield Predictions",
                  description: "AI-powered forecasts of expected crop yields and profits",
                  color: "text-green-600"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <feature.icon className={`w-8 h-8 ${feature.color} mb-4`} />
                  <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-gray-700 leading-relaxed mb-6">
                Unlock advanced AI-powered recommendations including{" "}
                <strong className="text-green-700">intercropping strategies</strong> and{" "}
                <strong className="text-blue-700">precise yield predictions</strong>{" "}
                tailored specifically to your farm conditions and goals.
              </p>
              
              <div className="relative inline-block w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur-lg opacity-25"></div>
                <Link to="/login" className="block">
                  <Button className="relative w-full h-14 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <Lock className="h-5 w-5 mr-3" />
                    Login to Use Advanced Features
                    <ChevronRight className="h-5 w-5 ml-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}