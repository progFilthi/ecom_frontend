import Link from "next/link";
import { ThemeToggle } from "../Themetoggle";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between py-2 px-4">
      <Link href={"/"} className="cursor-pointer">
        Ecom-Filthi
      </Link>
      <div className="gap-4 flex">
        <ThemeToggle />
      </div>
    </div>
  );
}
