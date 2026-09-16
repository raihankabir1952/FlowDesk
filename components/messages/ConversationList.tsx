"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Conversation } from "@/types/message";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: number | null;
  onSelectConversation: (conversation: Conversation) => void;
}

export default function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: ConversationListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return conversations;
    }

    return conversations.filter((conversation) => {
      return (
        conversation.name.toLowerCase().includes(search) ||
        conversation.role.toLowerCase().includes(search) ||
        conversation.lastMessage.toLowerCase().includes(search)
      );
    });
  }, [conversations, searchTerm]);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b p-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Messages
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Stay connected with your team.
        </p>

        {/* Search */}
        <div className="relative mt-4">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search conversations..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => {
            const isSelected =
              conversation.id === selectedConversationId;

            return (
              <button
                key={conversation.id}
                type="button"
                onClick={() =>
                  onSelectConversation(conversation)
                }
                className={`flex w-full items-start gap-3 border-b px-4 py-4 text-left transition ${
                  isSelected
                    ? "bg-gray-100"
                    : "hover:bg-gray-50"
                }`}
              >
                {/* Avatar */}
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
                  {conversation.avatar}

                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-sm font-semibold text-gray-900">
                      {conversation.name}
                    </h3>

                    <span className="shrink-0 text-xs text-gray-400">
                      {conversation.lastMessageTime}
                    </span>
                  </div>

                  <p className="mt-0.5 text-xs text-gray-500">
                    {conversation.role}
                  </p>

                  <div className="mt-1 flex items-center justify-between gap-2">
                    <p className="truncate text-sm text-gray-500">
                      {conversation.lastMessage}
                    </p>

                    {conversation.unreadCount > 0 && (
                      <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-gray-900 px-1.5 text-[10px] font-semibold text-white">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <div>
              <p className="text-sm font-medium text-gray-900">
                No conversations found
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Try searching with a different name.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}