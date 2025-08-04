import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 ">
      <h1 className="text-4xl font-bold">Homepage</h1>
      <Button>
        <Link href={"/login"}>Get started</Link>
      </Button>
    </div>
  );
}
