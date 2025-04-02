
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RouletteParts from "./RouletteParts";

const GambleDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer">Gamble</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-battlebot-dark-blue-black border border-battlebot-bright-yellow">
        <DialogHeader>
          <DialogTitle className="text-battlebot-golden-yellow">Battle Parts Gamble</DialogTitle>
          <DialogDescription className="text-battlebot-light-text">
            Spin the wheel to win robot parts for your next battle!
          </DialogDescription>
        </DialogHeader>
        <RouletteParts onClose={() => document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click()} />
      </DialogContent>
    </Dialog>
  );
};

export default GambleDialog;
