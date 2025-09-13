import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
//import heroImage from "@/assets/hero-agriculture.jpg";
const heroImage = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
import { 
  BarChart3,
  Cloud,
  Leaf,
  Shield,
  Zap,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Brain,
  Smartphone,
  Globe
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Yield Prediction",
      description: "Advanced machine learning models analyze historical data to predict crop yields with 98% accuracy."
    },
    {
      icon: Cloud,
      title: "Weather Intelligence",
      description: "Real-time weather monitoring and 14-day forecasts tailored for agricultural decision-making."
    },
    {
      icon: Leaf,
      title: "Soil Health Analytics",
      description: "Monitor soil conditions and receive recommendations for optimal nutrient management."
    },
    {
      icon: Shield,
      title: "Pest & Disease Control",
      description: "Early detection systems help prevent crop losses with timely intervention strategies."
    },
    {
      icon: TrendingUp,
      title: "Irrigation Optimization",
      description: "Smart irrigation recommendations based on soil moisture, weather, and crop requirements."
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Comprehensive dashboards track farm performance and identify improvement opportunities."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Active Farmers" },
    { number: "10%", label: "Average Yield Increase" },
    { number: "28", label: "Indian States Covered" },
    { number: "98%", label: "Prediction Accuracy" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Punjab, India",
      quote: "AgriPredict helped me increase my wheat yield by 22% while reducing water usage by 15%. Perfect for Indian farming conditions.",
      rating: 5
    },
    {
      name: "Rajesh Kumar", 
      location: "Haryana, India",
      quote: "The weather predictions saved my entire rice crop during monsoon season. This technology is a game-changer for Indian farmers.",
      rating: 5
    },
    {
      name: "Anjali Patel",
      location: "Gujarat, India", 
      quote: "Simple to use in Hindi and English. The pest control recommendations for cotton farming saved me thousands of rupees.",
      rating: 5
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Modern agricultural technology with AI-powered farming"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
              AI-Powered Agriculture
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
              Predict. Optimize.{" "}
              <span className="text-accent">Harvest More.</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your farming across India with AI-driven insights that predict crop yields, optimize resources, 
              and increase productivity by up to 10%. Join 50,000+ farmers already using AgriPredict across Indian states.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground font-semibold px-8" asChild>
                <Link to="/get-started">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-black hover:bg-white/10 px-8" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Comprehensive Platform
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4 sm:text-4xl">
              Everything You Need for Smart Farming
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides end-to-end agricultural intelligence, 
              from planting decisions to harvest optimization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-smooth float-animation">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-success/10 text-success border-success/20">
              Simple Process
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4 sm:text-4xl">
              Get Started in Minutes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our streamlined onboarding process gets you up and running quickly, 
              with personalized recommendations from day one.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Connect Your Farm", description: "Upload your farm details and historical data" },
              { step: "2", title: "AI Analysis", description: "Our AI analyzes your data and local conditions" },
              { step: "3", title: "Get Recommendations", description: "Receive personalized farming recommendations" }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute -right-4 top-8 h-8 w-8 text-muted-foreground/50" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Farmer Success Stories
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4 sm:text-4xl">
              Trusted by Farmers Worldwide
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how AgriPredict is helping farmers increase yields and build sustainable operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-smooth">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-accent" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground italic mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link to="/success-stories">
                View All Success Stories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 sm:text-4xl">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of Indian farmers who are already seeing remarkable results. 
              Start your journey today and discover the power of AI-driven agriculture tailored for India.
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-white/80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>Available in Hindi & English</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-accent" />
                <span>24/7 support included</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
