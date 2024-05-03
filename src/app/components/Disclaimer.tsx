"use client";
import { useMutation } from "convex/react";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../convex/_generated/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

export function Disclaimer() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const startConsultation = useMutation(
    api.startconsultation.createConsultation
  );

  const handleStart = async (e: any) => {
    try {
      const chatId = await startConsultation({});
      setIsLoading(false);
      router.push(`/chat/${chatId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <AlertDialog>
          <div className="mx-5">
            <AlertDialogContent className="bg-secondary rounded-md w-5/6">
              <AlertDialogHeader>
                <AlertDialogDescription className="text-left">
                  Please Wait...
                </AlertDialogDescription>
              </AlertDialogHeader>
            </AlertDialogContent>
          </div>
        </AlertDialog>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="mt-5 text-primary-foreground border-2 bg-green-200" size={"lg"}>
              Get Started
            </Button>
          </AlertDialogTrigger>
          <div className="mx-5">
            <AlertDialogContent className="bg-secondary rounded-md w-5/6">
              <AlertDialogHeader>
                <section className="flex items-center gap-1">
                  <AlertDialogTitle className="text-yellow-500">
                    Disclaimer
                  </AlertDialogTitle>
                  <AlertTriangle className="text-yellow-500" />
                </section>
                <AlertDialogDescription className="text-left">
                 Click continue button
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction onClick={handleStart}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </div>
        </AlertDialog>
      )}
    </>
  );
}
