"use client";

import {
  ArrowLeft,
  MoreVertical,
  Send,
} from "lucide-react";
import { Conversation } from "@/types/message";

interface ChatWindowProps {
  conversation: Conversation | null;
  message: string;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onBack: () => void;
}

export default function ChatWindow({
  conversation,
  message,
  onMessageChange,
  onSendMessage,
  onBack,
}: ChatWindowProps) {
  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center px-6 text-center">
        <div>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <Send size={22} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-gray-900">
            Select a conversation
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Choose a conversation from the list to start chatting.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b px-4 py-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile Back Button */}
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 lg:hidden"
            aria-label="Back to conversations"
          >
            <ArrowLeft size={19} />
          </button>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
            {conversation.avatar}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-gray-900">
              {conversation.name}
            </h2>

            <p className="mt-0.5 truncate text-xs text-gray-500">
              {conversation.role}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          aria-label="More options"
        >
          <MoreVertical size={19} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4 sm:p-5">
        {conversation.messages.map((item) => (
          <div
            key={item.id}
            className={`flex ${
              item.isOwn
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] ${
                item.isOwn ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  item.isOwn
                    ? "rounded-br-md bg-gray-900 text-white"
                    : "rounded-bl-md border bg-white text-gray-700"
                }`}
              >
                {item.text}
              </div>

              <p
                className={`mt-1 text-[11px] text-gray-400 ${
                  item.isOwn ? "text-right" : "text-left"
                }`}
              >
                {item.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t bg-white p-3 sm:p-4">
        <form
          onSubmit={(event) => {
            event.preventDefault();

            if (!message.trim()) return;

            onSendMessage();
          }}
          className="flex items-center gap-2 sm:gap-3"
        >
          <input
            type="text"
            value={message}
            onChange={(event) =>
              onMessageChange(event.target.value)
            }
            placeholder="Write a message..."
            className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100 sm:px-4"
          />

          <button
            type="submit"
            disabled={!message.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send message"
          >
            <Send size={17} />
          </button>
        </form>
      </div>
    </div>
  );
}