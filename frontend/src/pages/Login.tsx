import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Sprout,
  Mail,
  Lock,
  ArrowLeft,
  Shield,
  Users,
  CheckCircle,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    farmName: "",
    acceptTerms: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 🔑 For now, just navigate directly
    if (isLogin) {
      // Simulate login
      navigate("/dashboard");
    } else {
      // Simulate account creation
      navigate("/dashboard");
    }
  };

  const benefits = [
    "AI-powered yield predictions",
    "Weather Intelligence",
    "Real-time weather monitoring",
    "Soil health analytics",
    "Pest control recommendations",
    "Irrigation optimization",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Form */}
        <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            {/* Header */}
            <div className="mb-8">
              <Link
                to="/"
                className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-smooth mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>

              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Sprout className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xl font-bold text-foreground">
                    GreenByte
                  </span>
                </div>
              </Link>

              <h2 className="text-3xl font-bold text-foreground">
                {isLogin ? "Welcome back" : "Create your account"}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {isLogin
                  ? "Sign in to your GreenByte dashboard"
                  : "Join thousands of farmers using AI to optimize their crops"}
              </p>
            </div>

            {/* Form */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-center">
                  {isLogin ? "Sign In" : "Sign Up"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {!isLogin && (
                    <div>
                      <Label htmlFor="farmName">Farm Name</Label>
                      <Input
                        id="farmName"
                        type="text"
                        placeholder="Green Valley Farm"
                        value={formData.farmName}
                        onChange={(e) =>
                          handleInputChange("farmName", e.target.value)
                        }
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="farmer@example.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="pl-10"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange(
                              "confirmPassword",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover"
                    size="lg"
                  >
                    {isLogin ? "Sign In" : "Create Account"}
                  </Button>
                </form>

                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    {isLogin
                      ? "Don't have an account? "
                      : "Already have an account? "}
                  </span>
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-primary hover:text-primary-hover font-medium"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Side - Benefits */}
        <div className="hidden lg:block relative earth-gradient">
          <div className="absolute inset-0 bg-primary/90" />
          <div className="relative flex flex-col justify-center h-full px-12 text-white">
            <div className="max-w-md">
              <h3 className="text-3xl font-bold mb-6">
                Transform Your Farming with AI
              </h3>
              <p className="text-lg text-primary-foreground/90 mb-8">
                Join thousands of farmers who are already using GreenByte to
                increase yields, reduce costs, and build sustainable farming
                operations.
              </p>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-accent">50K+</div>
                  <div className="text-sm text-primary-foreground/80">
                    Active Farmers
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">10%</div>
                  <div className="text-sm text-primary-foreground/80">
                    Avg. Yield Increase
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4 text-accent" />
                  <span className="text-sm">Secure & Private</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-accent" />
                  <span className="text-sm">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
