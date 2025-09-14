import { Layout } from "@/components/Layout_2";
import { ComingSoonPage } from "@/components/ComingSoonPage";
import { Cloud } from "lucide-react";

const WeatherIntelligence = () => {
  return (
    <Layout>
      <ComingSoonPage 
        icon={Cloud}
        title="Weather Intelligence"
        description="Real-time weather monitoring, forecasts, and agricultural weather alerts powered by advanced meteorological AI."
        features={[
          "7-day detailed weather forecasts",
          "Severe weather alerts",
          "Microclimate analysis",
          "Optimal planting/harvesting windows",
          "Historical weather data trends"
        ]}
      />
    </Layout>
  );
};

export default WeatherIntelligence;