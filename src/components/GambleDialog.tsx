
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const GambleDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer">Events</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-amber-950 border border-amber-700">
        <DialogHeader>
          <DialogTitle className="text-amber-300">BattleBots Events</DialogTitle>
          <DialogDescription className="text-amber-200/80">
            Visit the Events page to see upcoming robot battles!
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center p-6">
          <a href="/events" className="bg-amber-700 text-amber-100 hover:bg-amber-600 font-bold text-xl px-8 py-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
            Go to Events Page
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GambleDialog;
