import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const DISCLAIMER_COOKIE:string = "adult-content-disclaimer-accepted";

const Disclaimer = () => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
      const acceptDisclaimer = localStorage.getItem(DISCLAIMER_COOKIE);
      if (!acceptDisclaimer) setOpen(true);
    }, []);

    const acceptDisclaimer = () => {
      localStorage.setItem(DISCLAIMER_COOKIE, "true");
      setOpen(false);
    }

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
              <Button type="button" onClick={acceptDisclaimer}>I'm an adult, continue.</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default Disclaimer