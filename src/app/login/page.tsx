"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Section from "../components/ui/Section";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { pageTransition } from "../animations/variants";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };
    let isValid = true;

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll just pretend any login works
      setLoginSuccess(true);
      
      // Store login state in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ email: formData.email }));
      
      // Redirect after a short delay to show success message
      setTimeout(() => {
        router.push("/");
      }, 1000);
      
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({
        ...errors,
        password: "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.main
      className="flex min-h-screen flex-col items-center justify-start pt-8 pb-24"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Section
        title="Login"
        subtitle="Sign in to your account to access all features"
        titleVariant="h1"
      >
        <div className="w-full max-w-md mx-auto mt-8">
          <Card className="p-6">
            {loginSuccess ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-serif font-medium mb-2">Login Successful!</h3>
                <p className="text-[rgb(var(--muted-foreground))] mb-4">
                  Redirecting you to the dashboard...
                </p>
                <motion.div
                  className="w-full h-1 bg-[rgb(var(--muted))] rounded-full overflow-hidden"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1 }}
                >
                  <div className="h-full bg-[rgb(var(--primary))]"></div>
                </motion.div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md border ${
                      errors.email ? "border-[rgb(var(--destructive))]" : "border-[rgb(var(--border))]"
                    } bg-[rgb(var(--background))] text-[rgb(var(--foreground))]`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-[rgb(var(--destructive))]">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md border ${
                      errors.password ? "border-[rgb(var(--destructive))]" : "border-[rgb(var(--border))]"
                    } bg-[rgb(var(--background))] text-[rgb(var(--foreground))]`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-[rgb(var(--destructive))]">{errors.password}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-[rgb(var(--border))] text-[rgb(var(--primary))]"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      href="#"
                      className="text-[rgb(var(--primary))] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                  className="relative py-2.5"
                >
                  {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </Button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="#"
                      className="text-[rgb(var(--primary))] hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </Card>
          
          <div className="mt-8 text-center text-sm text-[rgb(var(--muted-foreground))]">
            <p>This is a demo login page. No actual authentication occurs.</p>
            <p>Any email/password combination will work.</p>
          </div>
        </div>
      </Section>
    </motion.main>
  );
} 