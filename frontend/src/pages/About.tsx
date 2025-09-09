import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Target, 
  Users, 
  Globe, 
  Zap,
  Leaf,
  BarChart3,
  Shield,
  Award
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Precision Agriculture",
      description: "Leveraging cutting-edge AI and machine learning to provide precise, data-driven recommendations for optimal crop management."
    },
    {
      icon: Users,
      title: "Farmer-Centric",
      description: "Designed by farmers, for farmers. Our solutions are built to address real agricultural challenges with practical, actionable insights."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Working towards sustainable agriculture worldwide, helping farmers increase yields while protecting our planet's resources."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Continuously evolving our AI models and integrating the latest agricultural research to stay at the forefront of farming technology."
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Farmers" },
    { number: "15%", label: "Average Yield Increase" },
    { number: "25+", label: "Countries Served" },
    { number: "98%", label: "Prediction Accuracy" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              About AgriPredict
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90">
              Revolutionizing agriculture through artificial intelligence and data science, 
              empowering farmers to make smarter decisions for sustainable farming.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At AgriPredict, we believe that every farmer deserves access to the same advanced 
                technology used by large agricultural corporations. Our mission is to democratize 
                agricultural intelligence, making cutting-edge AI accessible to small and 
                medium-scale farmers worldwide.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Through our platform, we're not just predicting crop yields – we're cultivating 
                a more sustainable, efficient, and profitable future for agriculture.
              </p>
              <Button className="bg-primary hover:bg-primary-hover" asChild>
                <Link to="/get-started">Get Started Today</Link>
              </Button>
            </div>
            <div className="relative">
              <Card className="shadow-medium">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Sustainable Impact</h3>
                      <p className="text-sm text-muted-foreground">Growing responsibly for future generations</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                        <span className="text-2xl font-bold text-primary">{stat.number}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and define our commitment to agricultural innovation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-smooth">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our multidisciplinary team combines deep agricultural knowledge with cutting-edge technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Data Scientists</h3>
                    <p className="text-sm text-muted-foreground">AI & ML Experts</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Our data science team develops and maintains the machine learning models that power 
                  our prediction algorithms, ensuring accuracy and reliability.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Agronomists</h3>
                    <p className="text-sm text-muted-foreground">Agricultural Specialists</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Licensed agronomists and crop specialists ensure our recommendations are 
                  scientifically sound and practically applicable in real farming conditions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Tech Engineers</h3>
                    <p className="text-sm text-muted-foreground">Platform Development</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Our engineering team builds scalable, secure, and user-friendly platforms 
                  that make advanced agricultural insights accessible to farmers everywhere.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-primary-foreground/10 flex items-center justify-center">
              <Award className="h-8 w-8 text-accent" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using AgriPredict to increase their yields, 
            reduce costs, and build more sustainable farming operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/get-started">Get Started Now</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/success-stories">View Success Stories</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;