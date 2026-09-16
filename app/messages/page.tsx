"use client";

import { useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import ConversationList from "@/components/messages/ConversationList";
import ChatWindow from "@/components/messages/ChatWindow";

import { conversations as initialConversations } from "@/data/messages";
import { Conversation } from "@/types/message";

export default function MessagesPage() {
  const [conversations, setConversations] =
    useState(initialConversations);

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!selectedConversation || !message.trim()) {
      return;
    }

    const newMessage = {
      id: Date.now(),
      sender: "Raihan Kabir",
      text: message.trim(),
      timestamp: "Just now",
      isOwn: true,
    };

    setConversations((currentConversations) =>
      currentConversations.map((conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,
              lastMessage: newMessage.text,
              lastMessageTime: "Just now",
              messages: [
                ...conversation.messages,
                newMessage,
              ],
            }
          : conversation
      )
    );

    setSelectedConversation((currentConversation) =>
      currentConversation
        ? {
            ...currentConversation,
            lastMessage: newMessage.text,
            lastMessageTime: "Just now",
            messages: [
              ...currentConversation.messages,
              newMessage,
            ],
          }
        : currentConversation
    );

    setMessage("");
  };

  const handleSelectConversation = (
    conversation: Conversation
  ) => {
    const updatedConversation = {
      ...conversation,
      unreadCount: 0,
    };

    setSelectedConversation(updatedConversation);

    setConversations((currentConversations) =>
      currentConversations.map((item) =>
        item.id === conversation.id
          ? updatedConversation
          : item
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />
        <MobileNav />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Messages
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Communicate with your team and manage conversations.
            </p>
          </div>

          {/* Messages Container */}
          <div className="mt-6 h-[calc(100vh-220px)] min-h-[550px] overflow-hidden rounded-xl border bg-white shadow-sm">
            <div className="grid h-full grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)]">
              {/* Conversation List */}
              <div className="min-h-0 border-b lg:border-b-0 lg:border-r">
                <ConversationList
                  conversations={conversations}
                  selectedConversationId={
                    selectedConversation?.id ?? null
                  }
                  onSelectConversation={
                    handleSelectConversation
                  }
                />
              </div>

              {/* Chat Window */}
              <div className="min-h-0">
                <ChatWindow
                  conversation={selectedConversation}
                  message={message}
                  onMessageChange={setMessage}
                  onSendMessage={handleSendMessage}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}