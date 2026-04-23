import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Button } from "./components/ui/button";
import { Feed } from "./Feed";
import { LayoutControl } from "./components/LayoutControlNav";
import { Separator } from "./components/ui/separator";

export default function App() {

  const date = new Date();

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-2">
      <header className="w-full p-2 flex flex-col items-center justify-center gap-2">
        <LayoutControl />
        <h1 className="text-6xl font-mono text-foreground">main_page</h1>
        <div className="text-sm tracking-tight text-secondary-foreground flex gap-2 items-center">
          <span>English Wikipedia Edition</span>
          <Separator orientation="vertical" />
          <span>{formattedDate}</span>
        </div>
        <Separator />
      </header>
      <main>
        <Feed />
      </main>
      <footer className="flex flex-col items-center justify-center w-full p-4 min-h-32 bg-foreground">
        <Button variant="secondary" asChild>
          <a href="https://github.com/manishambre5/main-page">
            source code<ArrowUpRightIcon data-icon="inline-end" />
          </a>
        </Button>
      </footer>
    </div>
  )
}
