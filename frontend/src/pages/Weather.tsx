import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Droplets, Wind, Gauge, Eye } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient py-20 text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Weather Forecast
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
            Advanced weather analytics and forecasting designed specifically for
            agricultural needs.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Card className="shadow-lg border border-border/50 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter city..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => fetchWeatherByCity(location)}
                  className="bg-primary hover:bg-primary/90 rounded-lg"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Update
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleDetectLocation}
                  className="rounded-lg"
                >
                  Use My Location
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Weather */}
      <div className="mx-auto max-w-3xl px-4">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {weatherData && (
          <Card className="shadow-xl mb-8 bg-background/70 backdrop-blur rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>
                  {weatherData.name}, {weatherData.sys.country}
                </span>
                <Badge variant="secondary">Live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                    alt="Weather Icon"
                    className="h-16 w-16"
                  />
                  <div>
                    <div className="text-4xl font-bold text-foreground">
                      {weatherData.main.temp}°C
                    </div>
                    <div className="text-muted-foreground capitalize">
                      {weatherData.weather[0].description}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-sky-500" />
                  <div>
                    <div className="text-sm text-muted-foreground">Humidity</div>
                    <div className="font-semibold">
                      {weatherData.main.humidity}%
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Wind className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Wind</div>
                    <div className="font-semibold">
                      {weatherData.wind.speed} m/s
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Pressure</div>
                    <div className="font-semibold">
                      {weatherData.main.pressure} hPa
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Cloudiness
                    </div>
                    <div className="font-semibold">
                      {weatherData.clouds.all}%
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Forecast Section */}
        {forecastData.length > 0 && (
          <Card className="shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle>5-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                {forecastData.map((day, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-muted/40 text-center transition hover:scale-105 hover:shadow-md"
                  >
                    <div className="font-medium">{day.date}</div>
                    <img
                      src={`https://openweathermap.org/img/w/${day.weather.icon}.png`}
                      alt="Weather Icon"
                      className="mx-auto h-12 w-12"
                    />
                    <div className="text-lg font-semibold">{day.avg}°C</div>
                    <div className="text-sm text-muted-foreground">
                      Min: {day.min}° / Max: {day.max}°
                    </div>
                    <div className="text-sm text-muted-foreground capitalize mt-1">
                      {day.weather.description}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Weather Intelligence CTA */}
      <section className="bg-primary/10 py-16 mt-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">
            Unlock Weather Intelligence
          </h2>
          <p className="text-muted-foreground mb-6">
            To access advanced weather insights and smart agricultural
            recommendations, please log in.
          </p>
          <Button asChild size="lg" className="rounded-xl bg-primary hover:bg-primary/90">
            <Link to="/login">Login to Continue</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
