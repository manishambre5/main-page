import { Feed } from "./feed";

export default function App() {

  return (
    <div className="flex flex-col gap-2">
      <header className="w-full p-4 min-h-32 flex flex-col items-center justify-center">
        <h1 className="text-7xl">main_page</h1>
      </header>
      <main className="flex items-center justify-center size-full">
        <Feed />
      </main>
      <footer className="flex flex-col items-center justify-center w-full p-4 min-h-32">footer</footer>
    </div>
  )
}
