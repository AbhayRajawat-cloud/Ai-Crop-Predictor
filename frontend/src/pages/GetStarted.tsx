import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  CheckCircle,
  ArrowRight,
  Users,
  Zap,
  Shield,
  BarChart3,
  Leaf,
  Cloud,
  Smartphone,
  HeadphonesIcon,
  Star,
  Play,
  Download
} from "lucide-react";

const GetStarted = () => {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [formData, setFormData] = useState({
    farmName: "",
    email: "",
    phone: "",
    location: "",
    cropType: "",
    farmSize: "",
    experience: ""
  });

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "Free",
      period: "",
      description: "Perfect for small farms getting started with AI agriculture",
      features: [
        "Basic yield predictions",
        "7-day weather forecast", 
        "Monthly reports",
        "Email support",
        "Up to 20 hectares"
      ],
      popular: false,
      cta: "Get Started"
    },
    {
      id: "pro",
      name: "Professional",
      price: "$49",
      period: "/month",
      description: "Advanced features for serious farmers",
      features: [
        "Advanced AI predictions",
        "14-day weather forecast",
        "Real-time monitoring",
        "Priority support",
        "Up to 200 hectares",
        "Soil health analysis",
        "Pest control alerts",
        "Mobile app access"
      ],
      popular: true,
      cta: "Get Started"
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Complete solution for large-scale operations",
      features: [
        "Custom AI model training",
        "Unlimited farm size",
        "Real-time satellite data",
        "Dedicated support manager",
        "API access",
        "Multi-farm management",
        "Custom integrations",
        "On-site training"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Sign Up",
      description: "Create your account and tell us about your farm",
      icon: Users
    },
    {
      number: 2,
      title: "Setup",
      description: "Configure your farm profile and crop preferences",
      icon: Leaf
    },
    {
      number: 3,
      title: "Connect",
      description: "Integrate with weather data and soil sensors",
      icon: Cloud
    },
    {
      number: 4,
      title: "Optimize",
      description: "Start receiving AI-powered recommendations",
      icon: BarChart3
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Get Started with AgriPredict
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90">
              Transform your farming operation in just 4 simple steps. 
              Join thousands of farmers who are already seeing results.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* How It Works */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get up and running with AgriPredict in minutes, not hours.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {steps.map((step, index) => (
              <Card key={step.number} className="relative shadow-soft hover:shadow-medium transition-smooth">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                  <step.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                )}
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-primary hover:bg-primary-hover">
              <Play className="h-4 w-4 mr-2" />
              Watch Demo Video
            </Button>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Plan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing designed to grow with your farm. Choose the plan that fits your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative shadow-medium hover:shadow-strong transition-smooth ${
                  plan.popular ? 'ring-2 ring-primary scale-105' : ''
                } ${selectedPlan === plan.id ? 'ring-2 ring-accent' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary-hover' 
                        : 'bg-secondary hover:bg-secondary-hover'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Registration Form */}
        <section className="mb-16">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-center">Tell Us About Your Farm</CardTitle>
                <p className="text-center text-muted-foreground">
                  Help us customize AgriPredict for your specific needs
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="farmName">Farm Name</Label>
                    <Input 
                      id="farmName"
                      placeholder="Green Valley Farm"
                      value={formData.farmName}
                      onChange={(e) => handleInputChange('farmName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="farmer@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Farm Location</Label>
                    <Input 
                      id="location"
                      placeholder="City, State/Country"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cropType">Primary Crop Type</Label>
                    <Input 
                      id="cropType"
                      placeholder="Corn, Wheat, Soybeans, etc."
                      value={formData.cropType}
                      onChange={(e) => handleInputChange('cropType', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="farmSize">Farm Size (acres)</Label>
                    <Input 
                      id="farmSize"
                      placeholder="250"
                      value={formData.farmSize}
                      onChange={(e) => handleInputChange('farmSize', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="experience">Farming Experience & Goals</Label>
                  <Textarea 
                    id="experience"
                    placeholder="Tell us about your farming background and what you hope to achieve with AgriPredict..."
                    rows={4}
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                  />
                </div>

                <Button className="w-full bg-primary hover:bg-primary-hover" size="lg">
                  Create Account & Get Started
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Support Section */}
        <section className="mb-16">
          <Card className="shadow-medium bg-muted/30">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <HeadphonesIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Get help whenever you need it from our agricultural experts
                  </p>
                </div>
                <div>
                  <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Mobile App</h3>
                  <p className="text-sm text-muted-foreground">
                    Access your farm data anywhere with our iOS and Android apps
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
                <div>
                  <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Data Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Your farm data is encrypted and secure with industry-leading protection
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Testimonial */}
        <section>
          <Card className="shadow-medium bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-current text-accent" />
                ))}
              </div>
              <blockquote className="text-xl italic mb-4">
                "AgriPredict helped me increase my corn yield by 18% in just the first season. 
                The weather predictions and soil recommendations were spot-on."
              </blockquote>
              <div className="font-semibold">James Mitchell</div>
              <div className="text-primary-foreground/80">Iowa, USA - Corn Farmer</div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default GetStarted;