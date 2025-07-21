import React, { useState, useEffect, useRef } from "react";
import { pipeline } from "@xenova/transformers";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I am your AI assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generator, setGenerator] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const initializeModel = async () => {
      try {
        setIsInitializing(true);
        console.log("Loading AI model...");

        const pipe = await pipeline("text-generation", "Xenova/distilgpt2", {
          device: "cpu",
          dtype: "fp32",
        });

        setGenerator(pipe);
        console.log("AI model loaded successfully!");
      } catch (error) {
        console.error("Error loading model:", error);

        try {
          const pipe = await pipeline("text-generation", "Xenova/gpt2", {
            device: "cpu",
            dtype: "fp32",
          });
          setGenerator(pipe);
          console.log("Fallback model loaded successfully!");
        } catch (fallbackError) {
          console.error("Error loading fallback model:", fallbackError);

          setGenerator("simple");
        }
      } finally {
        setIsInitializing(false);
      }
    };

    initializeModel();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateResponse = async (userMessage) => {
    if (!generator) {
      return "Sorry, the AI model is not ready yet. Please try again in a moment.";
    }

    try {
      const lowerMessage = userMessage.toLowerCase();

      if (
        lowerMessage.includes("hello") ||
        lowerMessage.includes("hi") ||
        lowerMessage.includes("hey") ||
        lowerMessage.includes("hallo")
      ) {
        return "Hello! Nice to see you here. How can I help you at Glowify?";
      }

      if (
        lowerMessage.includes("product") ||
        lowerMessage.includes("item") ||
        lowerMessage.includes("produkt") ||
        lowerMessage.includes("artikel")
      ) {
        return "I'd be happy to help you with our products! We have a large selection of high-quality branded items. Feel free to check out our product page.";
      }

      if (
        lowerMessage.includes("price") ||
        lowerMessage.includes("cost") ||
        lowerMessage.includes("preis") ||
        lowerMessage.includes("kosten")
      ) {
        return "Our prices are very competitive! You can find all current prices directly on the products. Is there a specific product you're interested in?";
      }

      if (
        lowerMessage.includes("delivery") ||
        lowerMessage.includes("shipping") ||
        lowerMessage.includes("lieferung") ||
        lowerMessage.includes("versand")
      ) {
        return "We offer fast and reliable shipping. The exact delivery times depend on your location. You'll see all available shipping options in checkout.";
      }

      if (
        lowerMessage.includes("help") ||
        lowerMessage.includes("support") ||
        lowerMessage.includes("hilfe")
      ) {
        return "I'm happy to help you! You can ask questions here or visit our various sections like Products, Cart or Dashboard. What exactly can I do for you?";
      }

      if (lowerMessage.includes("glowify")) {
        return "Glowify is your premium online shop for high-quality branded products. We offer a curated selection of fashion, accessories and lifestyle products from top brands like Nike, Gucci, Chanel and Rolex.";
      }

      if (
        lowerMessage.includes("how are you") ||
        lowerMessage.includes("wie geht")
      ) {
        return "I'm doing well, thank you for asking! I'm here to help you with all questions about Glowify.";
      }

      if (lowerMessage.includes("nike")) {
        return "Nike is one of our top brands! We carry current Nike products in various categories. Feel free to check out our Nike collection.";
      }

      if (lowerMessage.includes("gucci")) {
        return "Gucci stands for luxury and style! Our Gucci products represent Italian craftsmanship and timeless design.";
      }

      if (lowerMessage.includes("chanel")) {
        return "Chanel embodies French elegance and is an icon of the fashion world. Discover our exclusive Chanel selection.";
      }

      if (lowerMessage.includes("rolex")) {
        return "Rolex is the epitome of precision and luxury in watches. Our Rolex collection offers timeless elegance for every occasion.";
      }

      if (generator !== "simple" && typeof generator === "object") {
        try {
          const context = `You are a friendly AI assistant for the online shop "Glowify". Glowify sells high-quality branded products like Nike, Gucci, Chanel and Rolex. Answer briefly, friendly and helpfully in English.

Question: ${userMessage}
Answer:`;

          const result = await generator(context, {
            max_new_tokens: 50,
            temperature: 0.7,
            do_sample: true,
            pad_token_id: generator.tokenizer.eos_token_id,
          });

          let response = result[0].generated_text.replace(context, "").trim();

          response = response.split("\n")[0];
          response = response.replace(/^Answer:\s*/, "");

          if (
            response.length > 10 &&
            !response.includes("Question:") &&
            !response.includes("Context:")
          ) {
            return response;
          }
        } catch (error) {
          console.log("Fallback to predefined answers:", error);
        }
      }

      const fallbackResponses = [
        "That's an interesting question! I'd be happy to help you further. Can you give me more details?",
        "Thank you for your message. How can I support you at Glowify?",
        "I can understand that. Let me help you with that. What exactly would you like to know?",
        "Interesting! Tell me more about it, then I can help you better.",
        "I'd be happy to answer your question! Can you be a bit more specific?",
        "For more information, feel free to visit our website or ask me another question!",
        "That sounds exciting! How can I help you with this topic?",
      ];

      return fallbackResponses[
        Math.floor(Math.random() * fallbackResponses.length)
      ];
    } catch (error) {
      console.error("Error generating response:", error);
      return "Sorry, I couldn't generate a response. Please try again or ask another question.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    const newUserMessage = {
      id: Date.now(),
      text: userMessage,
      sender: "user",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const botResponse = await generateResponse(userMessage);
      const newBotMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
      };

      setMessages((prev) => [...prev, newBotMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, there was an error processing your message.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div
        className="bg-gradient-to-r bg-[#D59C8C] text-white p-4"
        style={{
          background:
            "linear-gradient(50deg, #326287 25%, #D59C8C 85%, #E8B09E 100%)",
          transition: "background 0.5s ease-in-out",
        }}
      >
        <h2 className="text-xl font-bold flex items-center gap-2">
          🤖 Glowify AI Assistant
          {isInitializing && (
            <span className="text-sm font-normal">(Loading Model...)</span>
          )}
        </h2>
        <p className="text-orange-100 text-sm">
          Powered by Transformers.js - Your data stays local!
        </p>
      </div>

      {/* Chat Area */}
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-gradient-to-r from-[#e8b09e] to-[#D59C8C] text-white"
                  : "bg-white text-gray-800 shadow-md border border-gray-300"
              }`}
            >
              <p
                className={`text-sm ${
                  message.sender === "user" ? "text-white" : "text-[#326287]"
                }`}
              >
                {message.text}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 shadow-md border max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isInitializing ? "Model is loading..." : "Write your message..."
            }
            disabled={isLoading || isInitializing}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2
             focus:ring-[#e8b09e] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || isInitializing || !inputMessage.trim()}
            className="text-white px-6 py-2 rounded-lg hover:bg-[#e8b09e] focus:outline-none focus:ring-2
             focus:ring-[#e8b09e] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            style={{
              background:
                "linear-gradient(50deg, #326287 25%, #D59C8C 85%, #E8B09E 100%)",
              transition: "background 0.5s ease-in-out",
            }}
          >
            {isLoading ? "..." : "Send"}
          </button>
        </div>

        {isInitializing && (
          <p className="text-sm text-gray-600 mt-2">
            ⏳ The AI model is loading... This may take a moment on the first
            load.
          </p>
        )}
      </div>

      {/* Info Area */}
      <div className="bg-gray-100 p-3 text-xs text-gray-600">
        <p className="flex items-center gap-2">
          🔒 <strong>Privacy:</strong> All calculations happen locally in your
          browser. 🌐 <strong>Offline:</strong> Works without internet
          connection after first load.
        </p>
      </div>
    </div>
  );
};

export default ChatBot;
