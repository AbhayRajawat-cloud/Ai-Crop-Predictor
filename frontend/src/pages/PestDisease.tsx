import { Layout } from "@/components/Layout_2";
import { ComingSoonPage } from "@/components/ComingSoonPage";
import { Bug } from "lucide-react";

const PestDisease = () => {
  return (
    <Layout>
      <ComingSoonPage 
        icon={Bug}
        title="Pest & Disease Control"
        description="AI-powered pest identification and disease detection system with smart treatment recommendations for healthy crops."
        features={[
          "Image-based pest identification",
          "Disease pattern recognition",
          "Early warning system",
          "Organic treatment suggestions",
          "Integrated pest management plans"
        ]}
      />
    </Layout>
  );
};

export default PestDisease;