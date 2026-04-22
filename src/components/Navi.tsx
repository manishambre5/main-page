import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"

export const Navi = () => {
  return (
    <nav className="p-2 flex justify-end w-full">
        <ToggleGroup variant="outline" type="single" defaultValue="newspaper">
            <ToggleGroupItem value="newspaper" aria-label="Toggle newspaper theme">
                Newspaper
            </ToggleGroupItem>
            <ToggleGroupItem value="social-media" aria-label="Toggle social media theme">
                Social Media
            </ToggleGroupItem>
        </ToggleGroup>
    </nav>
  )
}
