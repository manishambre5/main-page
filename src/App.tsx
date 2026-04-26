import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Button } from "./components/ui/button";
import { Feed } from "./Feed";
import { Separator } from "./components/ui/separator";
import Disclaimer from "./components/Disclaimer";

export default function App() {

  const date = new Date();

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
    <Disclaimer />
    
    <div className="flex flex-col">

      <header className="w-full p-4 flex flex-col items-center justify-center gap-4">
        <h1 className="text-7xl font-heading text-foreground font-semibold tracking-tighter">Main Page</h1>
        <div className="text-sm tracking-tight text-secondary-foreground flex gap-2 items-center">
          <span>English Wikipedia Edition</span>
          <Separator orientation="vertical" />
          <span>{formattedDate}</span>
        </div>
      </header>

      <Separator />
      
      <Feed />
      
      <footer className="flex flex-col items-center justify-center w-full p-4 min-h-16 bg-foreground">
        <Button variant="secondary" asChild>
          <a href="https://github.com/manishambre5/main-page">
            source code<ArrowUpRightIcon data-icon="inline-end" />
          </a>
        </Button>
      </footer>
    </div>
    </>
  )
}
