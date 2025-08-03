import { ThemeToggle } from "../Themetoggle";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between py-2 px-4">
      <h1>Navbar</h1>
      <div className="gap-4 flex">
        <ThemeToggle />
      </div>
    </div>
  );
}
