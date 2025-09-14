import { Layout } from "@/components/Layout_2";
import { ComingSoonPage } from "@/components/ComingSoonPage";
import { BarChart3 } from "lucide-react";

const Performance = () => {
  return (
    <Layout>
      <ComingSoonPage 
        icon={BarChart3}
        title="Performance Analytics"
        description="Comprehensive farm performance metrics and analytics dashboard with insights to maximize productivity and profitability."
        features={[
          "Crop yield analytics",
          "Financial performance tracking",
          "Resource efficiency metrics",
          "Seasonal comparison reports",
          "ROI optimization recommendations"
        ]}
      />
    </Layout>
  );
};

export default Performance;