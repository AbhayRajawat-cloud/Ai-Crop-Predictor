import { Layout } from "@/components/Layout_2";
import { ComingSoonPage } from "@/components/ComingSoonPage";
import { Droplets } from "lucide-react";

const Irrigation = () => {
  return (
    <Layout>
      <ComingSoonPage 
        icon={Droplets}
        title="Irrigation Optimization"
        description="Smart water management system that optimizes irrigation schedules based on weather, soil conditions, and crop requirements."
        features={[
          "Automated irrigation scheduling",
          "Water usage optimization",
          "Soil moisture monitoring",
          "Weather-based adjustments",
          "Water conservation analytics"
        ]}
      />
    </Layout>
  );
};

export default Irrigation;