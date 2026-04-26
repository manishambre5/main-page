import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";

const Disclaimer = () => {
    const [open, setOpen] = useState(true);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Disclaimer</DialogTitle>
            <DialogDescription>
              Since the content and images shown is from the Wikipedia main page, you might see NSFW content. Please only continue if you're an adult.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <Button type="button" onClick={() => setOpen(false)}>I'm an adult, continue.</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default Disclaimer