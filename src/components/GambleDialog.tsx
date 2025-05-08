
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RouletteContainer from "./roulette/RouletteContainer";

const GambleDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer">Gamble</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-amber-950 border border-amber-700">
        <DialogHeader>
          <DialogTitle className="text-amber-300">Battle Parts Gamble</DialogTitle>
          <DialogDescription className="text-amber-200/80">
            Spin the wheel to win robot parts for your next battle!
          </DialogDescription>
        </DialogHeader>
        <RouletteContainer />
      </DialogContent>
    </Dialog>
  );
};

export default GambleDialog;
