"use client";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { ArrowBigRight, History, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../convex/_generated/api";
import { Spinner } from "./spinner";
import { Button } from "./ui/button";

const ChatHistory = ({ params }: any) => {
  console.log("param :", params);

  const { isLoading, isAuthenticated } = useConvexAuth();
  const entries = useQuery(api.startconsultation.getUserHistory);

  const [selected, setSelected] = useState("");
  const router = useRouter();

  const convertMillisecondsToDate = (milliseconds: any) => {
    const date = new Date(milliseconds);

    return date.toLocaleDateString();
  };

  const startConsultation = useMutation(
    api.startconsultation.createConsultation
  );

  const handleHistory = (id: any) => {
    setSelected(id);
    router.push(`/chat/${id}`);
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isAuthenticated && !isLoading && (
        <div className="h-screen w-72 border-r flex justify-center items-center">
          
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <div className="flex fixed border-r h-screen flex-col items-center w-72 gap-5 mt-[73px]">
          <div className="w-full">
            <section className="flex mt-5 px-2 justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-secondary-foreground">History</h2>
                <History className="text-secondary-foreground" />
              </div>
              <Button
                variant={"ghost"}
                onClick={async (e) => {
                  e.preventDefault();
                  const chatId = await startConsultation({});
                  router.push(`/chat/${chatId}`);
                }}
                className={
                  "rounded-md text-primary bg-primary/25 transition-all hover:text-primary-foreground hover:bg-primary flex items-center justify-between border-secondary-foreground p-3 h-12"
                }
              >
                <Plus />
              </Button>
            </section>
          </div>
          {entries?.length == 0 ? (
            <div className=" h-full flex justify-center items-center">
              <span className="mb-10 font-semibold">No chats yet!</span>
            </div>
          ) : (
            <div className="w-full p-2 overflow-y-auto">
              {entries?.map((entry) => (
                <div key={entry._id}>
                  {entry._id == params ? (
                    <Button
                      onClick={() => handleHistory(entry._id)}
                      className={
                        "text-primary-foreground transition-all hover:text-primary-foreground hover:bg-primary flex items-center justify-between w-full border-secondary-foreground rounded-md p-2 h-12"
                      }
                      key={entry._id}
                    >
                      <span>{entry.name}</span>
                      <ArrowBigRight className="" />
                    </Button>
                  ) : (
                    <Button
                      variant={"ghost"}
                      onClick={() => handleHistory(entry._id)}
                      className={
                        "text-primary transition-all hover:text-primary-foreground hover:bg-primary flex items-center justify-between w-full border-secondary-foreground rounded-md p-2 h-12"
                      }
                      key={entry._id}
                    >
                      <span>{entry.name}</span>
                      <ArrowBigRight className="" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatHistory;
