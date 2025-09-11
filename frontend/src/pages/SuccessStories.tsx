import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  MapPin, 
  Calendar,
  Quote,
  Star,
  Users,
  Leaf,
  BarChart3
} from "lucide-react";

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "Maria Santos",
      location: "São Paulo, Brazil",
      crop: "Soybeans",
      improvement: "+22%",
      metric: "Yield Increase",
      year: "2024",
      story: "Using AgriPredict's soil health monitoring and irrigation optimization, I increased my soybean yield by 22% while reducing water usage by 15%. The AI recommendations helped me identify the perfect planting windows and fertilizer schedules.",
      avatar: "MS",
      benefits: ["22% higher yields", "15% less water usage", "30% cost reduction in fertilizers"]
    },
    {
      id: 2,
      name: "James Mitchell",
      location: "Iowa, USA",
      crop: "Corn",
      improvement: "+18%",
      metric: "Profit Increase",
      year: "2024",
      story: "The weather prediction accuracy was incredible. AgriPredict warned me about a potential drought 3 weeks in advance, allowing me to adjust my irrigation strategy and save my entire corn crop. This technology paid for itself in the first season.",
      avatar: "JM",
      benefits: ["Early drought warning", "Saved entire crop", "18% profit increase"]
    },
    {
      id: 3,
      name: "Priya Sharma",
      location: "Punjab, India",
      crop: "Rice",
      improvement: "+25%",
      metric: "Yield Improvement",
      year: "2023",
      story: "As a small-scale farmer, I was skeptical about AI technology. But AgriPredict's simple interface and accurate predictions transformed my rice farming. The pest control recommendations alone saved me thousands in crop losses.",
      avatar: "PS",
      benefits: ["25% yield boost", "Prevented major pest losses", "Simple to use interface"]
    },
    {
      id: 4,
      name: "David Thompson",
      location: "Victoria, Australia",
      crop: "Wheat",
      improvement: "+16%",
      metric: "Resource Efficiency",
      year: "2024",
      story: "The precision agriculture insights helped me optimize my fertilizer application. Not only did I increase my wheat yield by 16%, but I also reduced my environmental footprint significantly. It's farming for the future.",
      avatar: "DT",
      benefits: ["16% yield increase", "Reduced environmental impact", "Optimized fertilizer use"]
    }
  ];

  const stats = [
    { icon: Users, number: "50,000+", label: "Happy Farmers" },
    { icon: TrendingUp, number: "15%", label: "Average Yield Increase" },
    { icon: Leaf, number: "25%", label: "Resource Savings" },
    { icon: BarChart3, number: "98%", label: "Prediction Accuracy" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Success Stories
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90">
              Real farmers, real results. Discover how AgriPredict is transforming 
              agriculture around the world, one farm at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Farmer Testimonials</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear directly from farmers who have transformed their operations with AgriPredict's AI-powered insights.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {stories.map((story, index) => (
              <Card key={story.id} className="shadow-soft hover:shadow-medium transition-smooth">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      {story.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-foreground">{story.name}</h3>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current text-accent" />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{story.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{story.year}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      <Leaf className="h-3 w-3 mr-1" />
                      {story.crop}
                    </Badge>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{story.improvement}</div>
                        <div className="text-xs text-muted-foreground">{story.metric}</div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <Quote className="h-6 w-6 text-muted-foreground/30 absolute -top-2 -left-1" />
                    <p className="text-muted-foreground italic pl-6 mb-6 leading-relaxed">
                      {story.story}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">Key Benefits:</h4>
                    <ul className="space-y-1">
                      {story.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-success" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Video Testimonials</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch our farmers share their experiences in their own words.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="shadow-soft overflow-hidden">
                <div className="aspect-video bg-muted/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Video testimonial coming soon</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground">Farmer Interview #{item}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Real stories from our farming community
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Be Our Next Success Story</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already seeing remarkable results with AgriPredict. 
            Start your journey to smarter, more profitable farming today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/get-started">Begin Your Journey</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;