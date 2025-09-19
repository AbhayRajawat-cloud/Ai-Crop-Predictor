import React, { useState } from 'react'; // Updated React import
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
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
  Globe,
  Layers,
  ChevronRight,
  Award,
  Clock
} from "lucide-react";

const Index = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: Brain,
      title: "AI Yield Prediction",
      description: "Advanced machine learning models analyze historical data to predict crop yields with 98% accuracy.",
      stats: "98% accuracy",
      color: "emerald",
      features: ["Historical data analysis", "ML algorithms", "Real-time predictions"]
    },
    {
      icon: Cloud,
      title: "Weather Intelligence",
      description: "Real-time weather monitoring and 5-day forecasts tailored for agricultural decision-making.",
      stats: "5-day forecast",
      color: "blue",
      features: ["Real-time monitoring", "Agricultural focus", "Decision support"]
    },
    {
      icon: Layers,
      title: "Smart Crop Recommendation",
      description: "AI-powered insights recommend the most profitable crops and intercropping patterns for your field.",
      stats: "Smart insights",
      color: "purple",
      features: ["Profitability analysis", "Intercropping patterns", "Field-specific advice"]
    },
    {
      icon: Leaf,
      title: "Soil Health Analytics",
      description: "Monitor soil conditions and receive recommendations for optimal nutrient management.",
      stats: "Real-time monitoring",
      color: "green",
      features: ["Soil monitoring", "Nutrient management", "Health recommendations"]
    },
    {
      icon: Shield,
      title: "Pest & Disease Control",
      description: "Early detection systems help prevent crop losses with timely intervention strategies.",
      stats: "Early detection",
      color: "orange",
      features: ["Early warning system", "Prevention strategies", "Timely interventions"]
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Comprehensive dashboards track farm performance and identify improvement opportunities.",
      stats: "Full insights",
      color: "teal",
      features: ["Performance tracking", "Analytics dashboard", "Improvement insights"]
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

  const getColorClasses = (color: string) => {
    const colors: Record<string, any> = {
      emerald: {
        bg: "bg-emerald-50 hover:bg-emerald-100",
        border: "border-emerald-200 hover:border-emerald-300",
        icon: "text-emerald-600",
        accent: "text-emerald-700",
        button: "bg-emerald-600 hover:bg-emerald-700"
      },
      blue: {
        bg: "bg-blue-50 hover:bg-blue-100",
        border: "border-blue-200 hover:border-blue-300",
        icon: "text-blue-600",
        accent: "text-blue-700",
        button: "bg-blue-600 hover:bg-blue-700"
      },
      purple: {
        bg: "bg-purple-50 hover:bg-purple-100",
        border: "border-purple-200 hover:border-purple-300",
        icon: "text-purple-600",
        accent: "text-purple-700",
        button: "bg-purple-600 hover:bg-purple-700"
      },
      green: {
        bg: "bg-green-50 hover:bg-green-100",
        border: "border-green-200 hover:border-green-300",
        icon: "text-green-600",
        accent: "text-green-700",
        button: "bg-green-600 hover:bg-green-700"
      },
      orange: {
        bg: "bg-orange-50 hover:bg-orange-100",
        border: "border-orange-200 hover:border-orange-300",
        icon: "text-orange-600",
        accent: "text-orange-700",
        button: "bg-orange-600 hover:bg-orange-700"
      },
      teal: {
        bg: "bg-teal-50 hover:bg-teal-100",
        border: "border-teal-200 hover:border-teal-300",
        icon: "text-teal-600",
        accent: "text-teal-700",
        button: "bg-teal-600 hover:bg-teal-700"
      }
    };
    return colors[color];
  };

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

      {/* Enhanced Features Section */}
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
            {features.map((feature, index) => {
              // Map feature titles to their routes (keeping your existing routes)
              const routes: Record<string, string> = {
                "AI Yield Prediction": "/YieldPrediction",
                "Weather Intelligence": "/Weather",
                "Smart Crop Recommendation": "/SmartCrop",
                "Get Started": "/GetStarted",
              };

              const colors = getColorClasses(feature.color);
              const isHovered = hoveredCard === index;
              const IconComponent = feature.icon;

              return (
                <div
                  key={index}
                  className={`
                    relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ease-in-out
                    transform hover:scale-105 hover:shadow-xl cursor-pointer group
                    ${colors?.bg || "bg-gray-50 hover:bg-gray-100"}
                    ${colors?.border || "border-gray-200 hover:border-gray-300"}
                    ${isHovered ? 'shadow-2xl' : 'shadow-lg'}
                  `}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <Card className="border-0 bg-transparent shadow-none h-full">
                    <CardContent className="p-8 text-center relative">
                      {/* Icon and Stats Row */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`
                          mx-auto h-16 w-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110
                          ${colors?.bg || "bg-primary/10"}
                        `}>
                          <IconComponent className={`h-8 w-8 ${colors?.icon || "text-primary"}`} />
                        </div>
                        <div className={`
                          flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium
                          ${colors?.bg || "bg-primary/10"} ${colors?.accent || "text-primary"}
                          border ${colors?.border || "border-primary/20"}
                        `}>
                          <TrendingUp className="w-3 h-3" />
                          <span>{feature.stats}</span>
                        </div>
                      </div>

                      {/* Title with Link */}
                      {routes[feature.title] ? (
                        <Link
                          to={routes[feature.title]}
                          className="text-xl font-semibold text-foreground mb-4 block hover:text-accent transition-colors group-hover:text-primary"
                        >
                          {feature.title}
                        </Link>
                      ) : (
                        <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                      )}

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {feature.description}
                      </p>

                      {/* Features List */}
                      <div className={`
                        space-y-2 mb-6 transition-all duration-300 
                        ${isHovered ? 'opacity-100 max-h-32' : 'opacity-70 max-h-24 overflow-hidden'}
                      `}>
                        {feature.features.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm justify-center">
                            <div className={`w-1.5 h-1.5 rounded-full ${colors?.button || "bg-primary"}`} />
                            <span className="text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Button for routes */}
                      {routes[feature.title] && (
                        <Button 
                          className={`
                            w-full font-medium py-3 px-4 rounded-xl
                            flex items-center justify-center space-x-2
                            transition-all duration-300 transform
                            group-hover:shadow-lg hover:translate-y-[-2px]
                            ${colors?.button || "bg-primary hover:bg-primary/90"} text-white
                          `}
                          asChild
                        >
                          <Link to={routes[feature.title]}>
                            <span>Explore {feature.title}</span>
                            <ChevronRight className={`
                              w-4 h-4 transition-transform duration-300
                              ${isHovered ? 'translate-x-1' : ''}
                            `} />
                          </Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>

                  {/* Hover indicator */}
                  <div className={`
                    absolute top-0 right-0 w-20 h-20 
                    bg-gradient-to-br from-primary/10 to-accent/10 opacity-10
                    transform rotate-45 translate-x-10 -translate-y-10
                    transition-all duration-300 group-hover:scale-150
                  `} />
                </div>
              );
            })}
          </div>

          {/* Additional Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Award, label: "Success Rate", value: "98%", color: "text-emerald-600" },
              { icon: Clock, label: "Response Time", value: "< 2min", color: "text-blue-600" },
              { icon: TrendingUp, label: "Yield Improvement", value: "+35%", color: "text-purple-600" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How It Works */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-muted/50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-success/10 text-success border-success/20 animate-pulse">
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
              { 
                step: "1", 
                title: "Connect Your Farm", 
                description: "Upload your farm details and historical data",
                color: "bg-emerald-500",
                shadowColor: "shadow-emerald-500/25"
              },
              { 
                step: "2", 
                title: "AI Analysis", 
                description: "Our AI analyzes your data and local conditions",
                color: "bg-blue-500",
                shadowColor: "shadow-blue-500/25"
              },
              { 
                step: "3", 
                title: "Get Recommendations", 
                description: "Receive personalized farming recommendations",
                color: "bg-purple-500",
                shadowColor: "shadow-purple-500/25"
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative group">
                {/* Card container */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-white/20">
                  {/* Animated step circle */}
                  <div className={`
                    mx-auto mb-6 h-20 w-20 rounded-full ${item.color} text-white 
                    flex items-center justify-center text-2xl font-bold
                    ${item.shadowColor} shadow-2xl
                    transition-all duration-500 group-hover:scale-110 group-hover:rotate-12
                    relative overflow-hidden
                  `}>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10">{item.step}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
                
                {/* Animated arrow */}
                {index < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="relative">
                      <ArrowRight className="h-8 w-8 text-muted-foreground/50 transition-all duration-500 group-hover:text-primary group-hover:translate-x-2" />
                      <div className="absolute inset-0 bg-primary/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 blur-sm"></div>
                    </div>
                  </div>
                )}
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
          
          {/* Progress line for mobile */}
          <div className="md:hidden mt-12 flex justify-center">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-1 bg-emerald-500 rounded"></div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="w-8 h-1 bg-blue-500 rounded"></div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="w-8 h-1 bg-purple-500 rounded"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-20 w-60 h-60 bg-accent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 left-16 w-48 h-48 bg-primary rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 animate-bounce">
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
            {testimonials.map((testimonial, index) => {
              const cardColors = [
                { 
                  bg: "from-emerald-50/80 to-green-100/40", 
                  border: "border-emerald-200/50",
                  accent: "text-emerald-600",
                  shadow: "shadow-emerald-500/10"
                },
                { 
                  bg: "from-blue-50/80 to-indigo-100/40", 
                  border: "border-blue-200/50",
                  accent: "text-blue-600",
                  shadow: "shadow-blue-500/10"
                },
                { 
                  bg: "from-purple-50/80 to-violet-100/40", 
                  border: "border-purple-200/50",
                  accent: "text-purple-600",
                  shadow: "shadow-purple-500/10"
                }
              ];
              
              const colorScheme = cardColors[index] || cardColors[0];
              
              return (
                <div key={index} className="group h-full">
                  <Card className={`
                    bg-gradient-to-br ${colorScheme.bg} backdrop-blur-sm
                    border-2 ${colorScheme.border} ${colorScheme.shadow}
                    shadow-lg hover:shadow-2xl transition-all duration-500 
                    hover:scale-105 hover:-translate-y-2 h-full
                    relative overflow-hidden
                  `}>
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    <CardContent className="p-8 relative z-10 h-full flex flex-col">
                      {/* Enhanced star rating */}
                      <div className="flex mb-6 justify-center">
                        <div className="flex space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`
                                h-6 w-6 fill-current text-accent transition-all duration-300 
                                group-hover:scale-110 group-hover:rotate-12
                              `}
                              style={{ animationDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Quote with enhanced styling */}
                      <div className="relative mb-8 flex-grow">
                        <div className="absolute -top-2 -left-2 text-6xl text-accent/20 font-serif">"</div>
                        <blockquote className="text-muted-foreground italic leading-relaxed text-center relative z-10 group-hover:text-foreground/90 transition-colors duration-300">
                          {testimonial.quote}
                        </blockquote>
                        <div className="absolute -bottom-4 -right-2 text-6xl text-accent/20 font-serif rotate-180">"</div>
                      </div>
                      
                      {/* Author info with avatar placeholder */}
                      <div className="text-center border-t border-white/20 pt-6">
                        <div className={`
                          w-12 h-12 rounded-full ${colorScheme.bg.replace('from-', 'bg-').replace('/80', '').replace(' to-green-100/40', '').replace(' to-indigo-100/40', '').replace(' to-violet-100/40', '')}
                          mx-auto mb-3 flex items-center justify-center text-xl font-bold ${colorScheme.accent}
                          group-hover:scale-110 transition-transform duration-300
                        `}>
                          {testimonial.name.charAt(0)}
                        </div>
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center justify-center mt-1">
                          <div className={`w-2 h-2 rounded-full ${colorScheme.accent.replace('text-', 'bg-')} mr-2`}></div>
                          {testimonial.location}
                        </div>
                      </div>
                    </CardContent>
                    
                    {/* Decorative corner */}
                    <div className={`
                      absolute top-0 right-0 w-20 h-20 ${colorScheme.bg} opacity-30
                      transform rotate-45 translate-x-10 -translate-y-10
                      group-hover:scale-150 transition-transform duration-500
                    `}></div>
                  </Card>
                </div>
              );
            })}
          </div>
          
          {/* Enhanced CTA button */}
          <div className="text-center mt-16">
            <div className="inline-block relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-25 group-hover:opacity-50 transition-opacity duration-500"></div>
              <Button 
                variant="outline" 
                className="relative bg-white/80 backdrop-blur-sm border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl px-8 py-3" 
                asChild
              >
                <Link to="/success-stories" className="flex items-center space-x-2">
                  <span>View All Success Stories</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Floating testimonial count */}
          <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-primary/20">
            <div className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">50,000+ Happy Farmers</span>
            </div>
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