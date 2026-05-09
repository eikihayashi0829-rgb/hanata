"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { Camera, ImageIcon, Phone, Send } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/Button";
import { mockChats, mockJobs, type ChatMessage } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const params = useParams<{ id: string }>();
  const jobId = params.id;
  const job = mockJobs.find((j) => j.id === jobId) ?? mockJobs[0];
  const initial = mockChats[jobId] ?? mockChats["job-001"];
  const [messages, setMessages] = useState<ChatMessage[]>(initial);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages((m) => [
      ...m,
      {
        id: `m-${Date.now()}`,
        sender: "manager",
        text,
        time,
      },
    ]);
    setText("");
    // Simulate contractor reply
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `m-${Date.now()}-c`,
          sender: "contractor",
          text: "承知しました。引き続き対応いたします。",
          time,
        },
      ]);
    }, 1400);
  }

  const contractor = job.quotes[0];

  return (
    <AppShell
      role="manager"
      title={contractor?.name ?? "チャット"}
      back={`/manager/jobs/${jobId}`}
      rightSlot={
        <button className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100">
          <Phone className="h-5 w-5" />
        </button>
      }
      containerClassName="!py-0 !px-0 max-w-3xl flex flex-col"
    >
      <div className="flex h-[calc(100vh-3.5rem)] flex-col">
        {/* Job summary banner */}
        <div className="border-b border-slate-200 bg-white px-4 py-2.5">
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-md bg-brand-50 px-2 py-0.5 font-medium text-brand-700">
              案件
            </span>
            <span className="truncate font-medium text-slate-700">
              {job.title}
            </span>
            <span className="text-slate-400">·</span>
            <span className="truncate text-slate-500">{job.propertyName}</span>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto bg-[#f3f5fa] px-4 py-5"
        >
          {messages.map((m) => (
            <MessageRow key={m.id} m={m} />
          ))}
        </div>

        {/* Composer */}
        <form
          onSubmit={handleSend}
          className="border-t border-slate-200 bg-white px-3 py-2.5"
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
            >
              <Camera className="h-5 w-5" />
            </button>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="メッセージを入力"
              className="h-10 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none"
            />
            <Button
              type="submit"
              size="sm"
              className="h-10 w-10 rounded-full p-0"
              disabled={!text.trim()}
              aria-label="送信"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}

function MessageRow({ m }: { m: ChatMessage }) {
  if (m.sender === "system") {
    return (
      <div className="flex justify-center">
        <div className="rounded-full bg-slate-200/80 px-3 py-1 text-[11px] text-slate-600">
          {m.text}
        </div>
      </div>
    );
  }

  const isMine = m.sender === "manager";
  return (
    <div className={cn("flex items-end gap-2", isMine && "flex-row-reverse")}>
      {!isMine && (
        <div className="h-7 w-7 flex-shrink-0 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-[10px] font-bold text-white grid place-items-center">
          佐
        </div>
      )}
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-3.5 py-2 text-[14px] shadow-sm",
          isMine
            ? "bg-brand-700 text-white rounded-br-md"
            : "bg-white text-slate-900 rounded-bl-md",
        )}
      >
        {m.attachment && (
          <div
            className={cn(
              "mb-2 flex aspect-[4/3] items-center justify-center rounded-xl",
              isMine
                ? "bg-brand-800/60 text-brand-100"
                : "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400",
            )}
          >
            <div className="text-center">
              <ImageIcon className="mx-auto h-8 w-8" />
              <div className="mt-1 text-[10px] font-medium">
                {m.attachment.label}
              </div>
            </div>
          </div>
        )}
        <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
      </div>
      <div className="text-[10px] text-slate-400">{m.time}</div>
    </div>
  );
}
