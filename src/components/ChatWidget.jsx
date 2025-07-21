import React, { useState } from "react";
import { BsChatDots, BsX } from "react-icons/bs";
import SimpleChatbot from "./SimpleChatbot";
import "../styles/chatWidget.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(
    localStorage.getItem("chatWidgetOpened") === "true"
  );

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!hasBeenOpened && !isOpen) {
      setHasBeenOpened(true);
      localStorage.setItem("chatWidgetOpened", "true");
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={toggleChat}
            className="chat-button-hover bg-gradient-to-r from-[#e8b09e] to-[#D59C8C] text-white p-4 rounded-full shadow-lg group relative"
            aria-label="Open AI Chat"
            style={{
              background:
                "linear-gradient(50deg, #326287 25%, #D59C8C 85%, #E8B09E 100%)",
              transition: "background 0.5s ease-in-out",
            }}
          >
            <BsChatDots size={24} />
            <span
              className={`notification-badge absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center ${
                hasBeenOpened ? "hidden" : ""
              }`}
            >
              !
            </span>

            <div className="chat-tooltip absolute bottom-16 right-0 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap">
              AI Assistant Chat
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
            </div>
          </button>
        )}
      </div>

      {/* Chat Widget Overlay */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50">
          <div className="chat-widget-enter bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#e8b09e] to-[#D59C8C] text-white p-3 rounded-t-lg flex justify-between items-center">
              <div>
                <h3 className="font-bold flex items-center gap-2 text-sm">
                  🤖 Glowify AI Assistant
                </h3>
                <p className="text-white text-xs">How can I help you?</p>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:bg-[#D59C8C] hover:bg-opacity-20 rounded-full p-1 transition-colors"
                aria-label="Close Chat"
              >
                <BsX size={20} />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-hidden">
              <SimpleChatbot isWidget={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
