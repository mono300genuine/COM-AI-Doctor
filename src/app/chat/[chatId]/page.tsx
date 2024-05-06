"use client";
import { useAction, useConvexAuth, useQuery } from "convex/react";
import {
  Bot,
  Loader2,
  SendHorizontal,
  UserCircle2
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import AnimateWord from "../../components/AnimateWord";
import ChatHistory from "../../components/chatHistory";
import { EditDialog } from "../../components/editDialog";
import { Input } from "../../components/ui/input";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

const Chat = (props: { params: { chatId: Id<"consultations"> } }) => {
  const [message, setMessage] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const consultationId = props.params.chatId;

  const { isAuthenticated } = useConvexAuth();
  const contentRef = useRef(null);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const { messages, input, handleInputChange, handleSubmit } = useChat();
  // console.log(messages);
  const startConversation = useAction(api.chat.handlePlayerAction);
  const consultation = useQuery(api.startconsultation.getConsultation, {
    consultationId: consultationId,
  });

  console.log("cons: ", consultation?.name);
  const entries = useQuery(api.chat.getAllEntries, {
    chatId: consultationId,
  });

  // const [isloading, setIsLoading] = useState(false);
  // console.log(isloading);

  const handleMsgSubmit = async (e: any) => {
    if (message.length == 0) {
      return;
    }
    e.preventDefault();
    setIsLoading(true);
    console.log("submitting message");

    try {
      await startConversation({ message, consultationId });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    setMessage("");
  };
  console.log(isLoading);

  return (
    <>
      {entries?.length == 0 ? (
        <div className="flex w-full h-screen justify-center items-center gap-3 flex-col">
          <AnimateWord text="Will be with you shortly..." />
          <Loader2 className="animate-spin h-10 w-10 text-primary" />
        </div>
      ) : (
        <div className="flex relative min-h-screen w-full px-4 lg:px-0">
          <div className="lg:w-1/4 hidden md:hidden lg:flex">
            <ChatHistory params={consultationId} />
          </div>

          <div className="lg:w-1/2 w-full relative mt-20 flex flex-col justify-center items-center">
            <div className="flex flex-col  items-center overflow-y-auto scrollbar-hide justify-center gap-5">
              <div className="flex">
                <img src="/1.jpg" alt="" className="h-64 rounded-full ring-2"/>
              </div>
              <div className="flex flex-col gap-1 mb-24">
                <div className="flex flex-col justify-center items-center gap-1 mb-4">
                  <span className="text-primary text-center text-base">
                    How are you feeling today?
                  </span>
                  <span className="text-secondary-foreground text-center mb-1 text-sm">
                    The more accurate your responses, the easier I&apos;ll be
                    able to help you.
                  </span>
                  {isAuthenticated && (
                    <EditDialog
                      consultationName={consultation?.name!}
                      consultationId={consultationId}
                    />
                  )}
                </div>
                <div
                  ref={contentRef}
                  className="flex flex-col overflow-y-auto gap-2"
                >
                  {entries?.map((entry) => {
                    return (
                      <div
                        className="flex flex-col gap-2 md:p-0"
                        key={entry._id}
                      >
                        {entry.input && (
                          <div className="bg-[#e3ebf3] space-y-2 rounded-md p-2">
                            <section className="flex items-center gap-1">
                              <h2 className="font-semibold">User</h2>
                              <UserCircle2 />
                            </section>

                            <p className="text-secondary-foreground">
                              {entry.input}
                            </p>
                          </div>
                        )}
                        {entry.response && (
                          <div className="bg-secondary p-2 space-y-2 rounded-md">
                            <section className="flex items-center gap-1">
                              {" "}
                              <h2 className="font-semibold">Com Doctor AI</h2>
                              <Bot />
                            </section>

                            <p className="text-secondary-foreground">
                              {entry.response}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {isLoading && (
                    <div className="flex bg-secondary rounded-md p-2 flex-col">
                      <section className="flex items-center gap-1">
                        {" "}
                        <h2 className="font-semibold">Com Doctor AI</h2>
                        <Bot />
                      </section>
                      <div className="flex">
                        <span className="circle animate-loader"></span>
                        <span className="circle animate-loader animation-delay-200"></span>
                        <span className="circle animate-loader animation-delay-400"></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <form
              onSubmit={handleMsgSubmit}
              className="flex fixed z-10 bottom-4 px-4 items-center justify-center w-full"
            >
              {/* <Mic className="mr-2 h-12 w-12 text-gray-400 hover:bg-primary/10 rounded-full transition-all p-2" /> */}
              <Input
                disabled={isLoading}
                placeholder="How are you feeling?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="lg:w-1/2 shadow-md shadow-primary/20 bg-secondary"
              />
              <button disabled={isLoading}>
                <SendHorizontal
                  className={
                    isLoading
                      ? "ml-2 h-12 w-12 text-secondary rounded-full transition-all p-2"
                      : "ml-2 h-12 w-12 text-primary hover:bg-primary/10 rounded-full transition-all p-2"
                  }
                />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
