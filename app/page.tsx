"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import React, { useTransition } from "react";
import { SiGoogle } from "react-icons/si";
import { toast } from "sonner";

export default function Homepage() {
  const [isGoogleLoading, startGoogleTransition] = useTransition();

  const handleGoogleLogin = () => {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Login with Google successful, redirecting...");
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
    <div>
      <Button disabled={isGoogleLoading} onClick={handleGoogleLogin}>
        <>
          {isGoogleLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <SiGoogle className="size-4" />
          )}
          <span>Login with Google</span>
        </>
      </Button>
    </div>
  );
}
