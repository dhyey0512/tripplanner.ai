"use client";
import {Button} from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

const GeneratePlanButton = () => {
  const {openSignInPopupOrDirect, isAuthenticated} = useAuth();
  return (
    <Button
      aria-label="generate plan"
      onClick={openSignInPopupOrDirect}
      variant="default"
      className="bg-yellow-500 text-white
                 hover:bg-yellow-700
                  text-sm
                  font-semibold rounded-3xl"
    >
      {isAuthenticated ? "Go to Dashboard" : "Try Now - 1 Free Credits"}
    </Button>
  );
};

export default GeneratePlanButton;
