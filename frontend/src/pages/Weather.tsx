import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Search, 
  Droplets, 
  Wind, 
  Gauge, 
  Eye, 
  Thermometer,
  CloudRain,
  Sun,
  Navigation,
  Loader,
  AlertTriangle,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

// ✅ Types
interface ForecastItem {
  temps: number[];
  min: number;
  max: number;
  weather: {
    icon: string;
    description: string;
  };
}

interface GroupedForecast {
  date: string;
  avg: string;
  min: string;
  max: string;
  weather: {
    icon: string;
    description: string;
  };
}

export default function Weather() {
  const [location, setLocation] = useState("Delhi");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<GroupedForecast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ✅ Utility: group forecast into daily summaries
  function groupForecastByDay(list: any[]): GroupedForecast[] {
    const days: Record<string, ForecastItem> = {};

    list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      if (!days[date]) {
        days[date] = {
          temps: [],
          min: item.main.temp_min,
          max: item.main.temp_max,
          weather: {
            icon: item.weather[0].icon,
            description: item.weather[0].description,
          },
        };
      }

      days[date].temps.push(item.main.temp);
      days[date].min = Math.min(days[date].min, item.main.temp_min);
      days[date].max = Math.max(days[date].max, item.main.temp_max);
    });

    return Object.entries(days)
      .map(([date, info]) => ({
        date,
        avg: (
          info.temps.reduce((a, b) => a + b, 0) / info.temps.length
        ).toFixed(1),
        min: info.min.toFixed(1),
        max: info.max.toFixed(1),
        weather: info.weather,
      }))
      .slice(0, 5); // ✅ only 5 days
  }

  // ✅ Fetch current weather by city
  async function fetchWeatherByCity(city: string) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod !== 200) throw new Error(data.message || "Failed to fetch");
      setWeatherData(data);
      fetchForecastByCity(city); // also fetch forecast
    } catch (err: any) {
      setError(err.message);
      setWeatherData(null);
      setForecastData([]);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Fetch current weather by coordinates
  async function fetchWeatherByCoords(lat: number, lon: number) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod !== 200) throw new Error(data.message || "Failed to fetch");
      setWeatherData(data);
      setLocation(data.name);
      fetchForecastByCoords(lat, lon); // also fetch forecast
    } catch (err: any) {
      setError(err.message);
      setWeatherData(null);
      setForecastData([]);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Fetch 5-day forecast by city
  async function fetchForecastByCity(city: string) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod !== "200") throw new Error(data.message || "Failed to fetch");
      const grouped = groupForecastByDay(data.list);
      setForecastData(grouped);
    } catch {
      setForecastData([]);
    }
  }

  // ✅ Fetch 5-day forecast by coords
  async function fetchForecastByCoords(lat: number, lon: number) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod !== "200") throw new Error(data.message || "Failed to fetch");
      const grouped = groupForecastByDay(data.list);
      setForecastData(grouped);
    } catch {
      setForecastData([]);
    }
  }

  // ✅ Geolocation
  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        () => setError("Unable to access location")
      );
    } else {
      setError("Geolocation not supported");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-80 h-80 bg-cyan-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-sky-400 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Enhanced Hero Section */}
      <section className="hero-gradient py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/90 via-sky-600/80 to-cyan-600/90"></div>
          <div className="absolute top-10 right-20 opacity-20">
            <Sun className="w-32 h-32 text-yellow-200 animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          <div className="absolute bottom-10 left-16 opacity-20">
            <CloudRain className="w-24 h-24 text-blue-200 animate-bounce" />
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
            <CloudRain className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6">
            Weather Intelligence
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-white/90 leading-relaxed">
            Advanced weather analytics and forecasting designed specifically for
            agricultural needs. Real-time data to optimize your farming decisions.
          </p>
          
          {/* Weather stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Thermometer, label: "Precision Monitoring", value: "Real-time" },
              { icon: Droplets, label: "Rainfall Tracking", value: "14-day Forecast" },
              { icon: Wind, label: "Wind Analysis", value: "Agricultural Focus" }
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

      {/* Enhanced Search Section */}
      <div className="mx-auto max-w-4xl px-4 py-12 relative z-10">
        <Card className="shadow-2xl border border-white/20 rounded-3xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col space-y-6">
              {/* Location Input Row */}
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-700 mb-3 block flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>Search Location</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Enter city name..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && fetchWeatherByCity(location)}
                      className="pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/70 text-lg"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => fetchWeatherByCity(location)}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 rounded-2xl px-6 py-4 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    {loading ? (
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <Search className="h-5 w-5 mr-2" />
                    )}
                    {loading ? "Searching..." : "Update"}
                  </Button>
                </div>
              </div>

              {/* Quick Location Access */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl border border-blue-200/50">
                <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Quick Access</div>
                    <div className="text-xs text-gray-600">Get weather for your current location instantly</div>
                  </div>
                </div>
                <Button
                  onClick={handleDetectLocation}
                  disabled={loading}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl px-6 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Use My Location</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Content Area */}
      <div className="mx-auto max-w-6xl px-4 relative z-10">
        {/* Loading State */}
        {loading && (
          <Card className="shadow-xl rounded-3xl bg-white/80 backdrop-blur-sm border border-white/20 mb-8">
            <CardContent className="p-12 text-center">
              <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-lg text-gray-600">Fetching weather data...</p>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="shadow-xl rounded-3xl bg-red-50/80 backdrop-blur-sm border border-red-200 mb-8">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 text-red-700">
                <AlertTriangle className="w-6 h-6" />
                <p className="text-lg font-medium">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Current Weather */}
        {weatherData && (
          <Card className="shadow-2xl mb-12 bg-gradient-to-br from-white/90 to-blue-50/80 backdrop-blur-sm rounded-3xl border border-white/20">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-900">
                    {weatherData.name}, {weatherData.sys.country}
                  </span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Live Data
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-8">
              {/* Main Weather Display */}
              <div className="flex items-center justify-between mb-8 p-6 bg-gradient-to-r from-blue-500/10 to-sky-500/10 rounded-2xl border border-blue-200/50">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-white/50 rounded-2xl flex items-center justify-center shadow-lg">
                      <img
                        src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                        alt="Weather Icon"
                        className="h-20 w-20 drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-6xl font-bold text-blue-600 mb-2">
                      {weatherData.main.temp}°C
                    </div>
                    <div className="text-xl text-gray-600 capitalize font-medium">
                      {weatherData.weather[0].description}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Feels like {weatherData.main.feels_like}°C
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  <div className="text-lg font-semibold text-gray-700">
                    H: {weatherData.main.temp_max}°C
                  </div>
                  <div className="text-lg font-semibold text-gray-700">
                    L: {weatherData.main.temp_min}°C
                  </div>
                </div>
              </div>

              {/* Weather Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { 
                    icon: Droplets, 
                    label: "Humidity", 
                    value: `${weatherData.main.humidity}%`, 
                    color: "text-blue-600",
                    bg: "bg-blue-50"
                  },
                  { 
                    icon: Wind, 
                    label: "Wind Speed", 
                    value: `${weatherData.wind.speed} m/s`, 
                    color: "text-green-600",
                    bg: "bg-green-50"
                  },
                  { 
                    icon: Gauge, 
                    label: "Pressure", 
                    value: `${weatherData.main.pressure} hPa`, 
                    color: "text-purple-600",
                    bg: "bg-purple-50"
                  },
                  { 
                    icon: Eye, 
                    label: "Visibility", 
                    value: `${weatherData.clouds.all}%`, 
                    color: "text-orange-600",
                    bg: "bg-orange-50"
                  }
                ].map((item, index) => (
                  <div key={index} className={`${item.bg} rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center border border-gray-200`}>
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">{item.label}</div>
                    <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Forecast Section */}
        {forecastData.length > 0 && (
          <Card className="shadow-2xl rounded-3xl bg-white/90 backdrop-blur-sm border border-white/20">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                <Calendar className="w-7 h-7 text-blue-600" />
                <span>5-Day Forecast</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {forecastData.map((day, idx) => {
                  const isToday = idx === 0;
                  return (
                    <div
                      key={idx}
                      className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${
                        isToday 
                          ? 'bg-gradient-to-br from-blue-500 to-sky-600 text-white border-blue-400 shadow-lg' 
                          : 'bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-sky-50 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className={`text-center ${isToday ? 'text-white' : 'text-gray-700'}`}>
                        <div className={`font-semibold mb-3 ${isToday ? 'text-white' : 'text-gray-900'}`}>
                          {isToday ? 'Today' : day.date}
                        </div>
                        
                        <div className="mb-4 flex justify-center">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                            isToday ? 'bg-white/20 backdrop-blur-sm' : 'bg-white shadow-md'
                          }`}>
                            <img
                              src={`https://openweathermap.org/img/w/${day.weather.icon}.png`}
                              alt="Weather Icon"
                              className="h-12 w-12"
                            />
                          </div>
                        </div>
                        
                        <div className={`text-2xl font-bold mb-2 ${isToday ? 'text-white' : 'text-gray-900'}`}>
                          {day.avg}°C
                        </div>
                        
                        <div className={`text-sm mb-3 ${isToday ? 'text-blue-100' : 'text-gray-500'}`}>
                          {day.min}° / {day.max}°
                        </div>
                        
                        <div className={`text-sm capitalize leading-tight ${isToday ? 'text-blue-100' : 'text-gray-600'}`}>
                          {day.weather.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Enhanced CTA Section */}
      <section className="bg-gradient-to-r from-blue-600/10 via-sky-600/10 to-cyan-600/10 py-20 mt-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5"></div>
        
        <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-600 rounded-2xl mb-8 shadow-lg">
            <Sun className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Unlock Advanced Weather Intelligence
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Access premium weather insights, agricultural recommendations, and smart farming analytics. 
            Get personalized forecasts tailored to your specific crops and location.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center space-x-2 text-gray-600">
              <Droplets className="w-5 h-5 text-blue-500" />
              <span>Precision irrigation timing</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Wind className="w-5 h-5 text-green-500" />
              <span>Pest & disease alerts</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Thermometer className="w-5 h-5 text-orange-500" />
              <span>Harvest optimization</span>
            </div>
          </div>
          
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-600 rounded-2xl blur-lg opacity-25"></div>
            <Button asChild size="lg" className="relative rounded-2xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 px-8 py-4 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <Link to="/login" className="flex items-center space-x-2">
                <span>Login to Continue</span>
                <Navigation className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}