import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Sprout, Mail, Lock, ArrowLeft, Shield, Users, CheckCircle } from "lucide-react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Use the correct backend URL
  const BACKEND_URL = "https://super-duper-parakeet-97wvvrjjrx5vf6wg-5000.app.github.dev";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        console.log('Attempting login with:', { email: formData.email });
        
        const res = await axios.post(`${BACKEND_URL}/api/user/login`, {
  email: formData.email,
  password: formData.password,
});

        console.log('Login response:', res.data);
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        // Registration
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          setLoading(false);
          return;
        }

        if (!formData.firstName || !formData.lastName) {
          alert("First name and last name are required!");
          setLoading(false);
          return;
        }

        console.log('Attempting registration with:', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email
        });

        const res = await axios.post(`${BACKEND_URL}/api/user/register`, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        });

        console.log('Registration response:', res.data);
        alert("Account created! Please log in.");
        setIsLogin(true);
        // Clear form
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
        });
      }
    } catch (error) {
      console.error('Request error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors?.[0]?.msg || 
                          error.message || 
                          "Something went wrong";
      alert(errorMessage);
    } finally {
      setLoading(false);
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
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-6">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>

              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Sprout className="h-6 w-6" />
                </div>
                <div><span className="text-xl font-bold text-foreground">GreenByte</span></div>
              </Link>

              <h2 className="text-3xl font-bold text-foreground">{isLogin ? "Welcome back" : "Create your account"}</h2>
              <p className="mt-2 text-muted-foreground">
                {isLogin ? "Login to your GreenByte dashboard" : "Join thousands of farmers using AI to optimize their crops"}
              </p>
            </div>

            {/* Form */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-center">{isLogin ? "Login" : "Register"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {!isLogin && (
                    <>
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          type="text" 
                          placeholder="John" 
                          value={formData.firstName} 
                          onChange={e => handleInputChange("firstName", e.target.value)} 
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          type="text" 
                          placeholder="Doe" 
                          value={formData.lastName} 
                          onChange={e => handleInputChange("lastName", e.target.value)} 
                          required
                        />
                      </div>
                    </>
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
                        onChange={e => handleInputChange("email", e.target.value)} 
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
                        onChange={e => handleInputChange("password", e.target.value)} 
                        required 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                          onChange={e => handleInputChange("confirmPassword", e.target.value)} 
                          required 
                        />
                      </div>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary-hover" 
                    size="lg" 
                    disabled={loading}
                  >
                    {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
                  </Button>
                </form>

                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                  </span>
                  <button 
                    onClick={() => setIsLogin(!isLogin)} 
                    className="text-sm text-primary hover:text-primary-hover font-medium"
                  >
                    {isLogin ? "Register" : "Login"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Side - Benefits */}
        <div className="hidden lg:block relative bg-gradient-to-br from-green-400 to-blue-500">
          <div className="absolute inset-0 bg-primary/90" />
          <div className="relative flex flex-col justify-center h-full px-12 text-white">
            <div className="max-w-md">
              <h3 className="text-3xl font-bold mb-6">Transform Your Farming with AI</h3>
              <p className="text-lg opacity-90 mb-8">
                Join thousands of farmers using GreenByte to increase yields, reduce costs, and build sustainable farming operations.
              </p>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-yellow-300">50K+</div>
                  <div className="text-sm opacity-80">Active Farmers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-300">10%</div>
                  <div className="text-sm opacity-80">Avg. Yield Increase</div>
                </div>
              </div>

              <div className="mt-8 flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm">Secure & Private</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-yellow-300" />
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