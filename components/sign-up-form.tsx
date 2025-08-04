"use client";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import React, { ChangeEvent, useState, useTransition } from "react";
import { SiGoogle } from "react-icons/si";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isGoogleLoading, startGoogleTransition] = useTransition();
  const [isEmailPending, startEmailTransition] = useTransition();

  const router = useRouter();

  //this is for name, email & password sign up
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleLogin = () => {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000/user-profile",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Login with Google successful, redirecting...");
            router.push("/user-profile");
          },
          onError: (error) => {
            toast.error("Internal server error");
            console.error(error);
          },
        },
      });
    });
  };
  const handleEmailSignUp = () => {
    startEmailTransition(async () => {
      await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Sign up successful, redirecting...");
          },
          onError: (error) => {
            toast.error("Internal server error");
            console.error(error);
          },
        },
      });
    });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign Up for an account</CardTitle>
          <CardDescription>
            Enter your name, email & password below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  id="name"
                  type="name"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  id="password"
                  type="password"
                  required
                />
              </div>
              <div className="flex flex-col gap-6">
                <Button disabled={isEmailPending} onClick={handleEmailSignUp}>
                  <>
                    {isEmailPending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <span>Sign Up</span>
                    )}
                  </>
                </Button>
                <Button
                  variant={"secondary"}
                  disabled={isGoogleLoading}
                  onClick={handleGoogleLogin}
                >
                  <>
                    {isGoogleLoading ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <SiGoogle className="size-4" />
                    )}
                    <span>Continue with Google</span>
                  </>
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
