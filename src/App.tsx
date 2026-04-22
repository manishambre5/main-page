import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Button } from "./components/ui/button";
import { Feed } from "./Feed";
import { Navi } from "./components/Navi";

export default function App() {

  return (
    <div className="flex flex-col gap-2">
      <header className="w-full p-4 min-h-32 flex flex-col items-center justify-center gap-4">
        <h1 className="text-6xl font-mono text-muted-foreground">main_page</h1>
        <Navi />
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
