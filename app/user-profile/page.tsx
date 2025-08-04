"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function UserProfile() {
  const [isLoggedOut, startLogOutTransition] = useTransition();
  const {
    data: session,
    isPending, //loading state //refetch the session
  } = authClient.useSession();

  const router = useRouter();

  const handleLogOut = () => {
    startLogOutTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success(`${session?.user.name} logged out successfully`);
            router.push("/");
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
      <h1>User Profile</h1>
      {isPending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <p>Fetching user profile...</p>
        </>
      ) : (
        <p>{session?.user.name}</p>
      )}

      <Button disabled={isLoggedOut} onClick={handleLogOut}>
        {isLoggedOut ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <p>Logging out...</p>
          </>
        ) : (
          <p>Log Out</p>
        )}
      </Button>
    </div>
  );
}
