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
            <Button className="mt-5 text-primary-foreground border bg-gray-600 hover:bg-gray-900" size={"lg"} onClick={handleStart}>
              Get Started
            </Button>
        </AlertDialog>
      )}
    </>
  );
}
