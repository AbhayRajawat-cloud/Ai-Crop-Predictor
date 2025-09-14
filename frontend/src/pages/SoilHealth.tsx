import { Layout } from "@/components/Layout_2";
import { ComingSoonPage } from "@/components/ComingSoonPage";
import { Leaf } from "lucide-react";

const SoilHealth = () => {
  return (
    <Layout>
      <ComingSoonPage 
        icon={Leaf}
        title="Soil Health Analytics"
        description="Comprehensive soil analysis and health monitoring using advanced sensors and AI-powered insights for optimal crop growth."
        features={[
          "Real-time soil composition analysis",
          "pH and nutrient level monitoring",
          "Soil moisture tracking",
          "Erosion risk assessment",
          "Personalized soil improvement recommendations"
        ]}
      />
    </Layout>
  );
};

export default SoilHealth;