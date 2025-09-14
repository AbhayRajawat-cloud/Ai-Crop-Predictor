import { useState } from "react";
import { Layout } from "@/components/Layout_2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Search, BookOpen, MessageSquare } from "lucide-react";

const HelpDesk = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqData = [
    {
      id: "1",
      category: "Getting Started",
      question: "How do I start using GreenByte?",
      answer: "Getting started with GreenByte is easy! After logging in, complete your farmer profile with your farm details, then explore our AI Yield Prediction feature. You can input your crop data to get personalized yield predictions."
    },
    {
      id: "2",
      category: "AI Predictions",
      question: "How accurate are the AI yield predictions?",
      answer: "Our AI models achieve 85-95% accuracy rates, trained on extensive agricultural data including weather patterns, soil conditions, and historical yield data. The confidence level is displayed with each prediction."
    },
    {
      id: "3",
      category: "Data Input",
      question: "What data do I need for yield predictions?",
      answer: "You'll need: crop type, farm area (hectares), average rainfall (mm), average temperature (°C), and fertilizer type. The more accurate your data, the better the prediction."
    },
    {
      id: "4",
      category: "Account",
      question: "How do I update my farm profile?",
      answer: "Go to your Dashboard where you can view and edit your farmer profile including farm size, primary crop type, and location details."
    },
    {
      id: "5",
      category: "Features",
      question: "When will the coming soon features be available?",
      answer: "We're actively developing Weather Intelligence, Soil Health Analytics, and other features. Weather Intelligence is expected in Q2 2024, with other features following quarterly."
    },
    {
      id: "6",
      category: "Technical",
      question: "What devices can I use GreenByte on?",
      answer: "GreenByte is fully responsive and works on desktop computers, tablets, and smartphones. We recommend using a modern web browser for the best experience."
    },
    {
      id: "7",
      category: "Data Privacy",
      question: "Is my farm data secure?",
      answer: "Yes, we use enterprise-grade encryption and security measures to protect your data. Your farm information is never shared with third parties without your explicit consent."
    },
    {
      id: "8",
      category: "Support",
      question: "How can I get help if I have issues?",
      answer: "You can contact our support team through the Contact Us page, use the chat assistant, or browse this help section. We typically respond within 24 hours."
    }
  ];

  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(faqData.map(faq => faq.category))];

  return (
    <Layout>
      <div className="space-y-6 animate-harvest">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary">
            <HelpCircle className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">Help Desk</h1>
            <p className="text-muted-foreground">Find answers to common questions</p>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth">
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {filteredFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left hover:no-underline">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="mt-1 text-xs">
                            {faq.category}
                          </Badge>
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-2">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {filteredFAQs.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Help */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Quick Help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">New to GreenByte?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Start with our AI Yield Prediction feature to get familiar with the platform.
                  </p>
                  <a href="/yield-prediction" className="text-sm text-primary hover:underline">
                    Try Yield Prediction →
                  </a>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Need Personal Help?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our agricultural experts are ready to assist you.
                  </p>
                  <a href="/contact" className="text-sm text-primary hover:underline">
                    Contact Support →
                  </a>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Feature Requests</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Have ideas for new features? We'd love to hear from you.
                  </p>
                  <a href="/contact" className="text-sm text-primary hover:underline">
                    Share Your Ideas →
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpDesk;