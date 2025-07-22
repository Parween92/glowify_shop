import { useState, useEffect, useRef } from "react";

const SimpleChatbot = ({ isWidget = false }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Glowify AI Assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey") ||
      lowerMessage.includes("good morning") ||
      lowerMessage.includes("good day") ||
      lowerMessage.includes("hallo") ||
      lowerMessage.includes("guten tag")
    ) {
      const greetings = [
        "Hello! Welcome to Glowify! 😊 I'm here to help you with everything about our shop.",
        "Hi! Great to see you here! How can I assist you at Glowify today?",
        "Good day! I'm your personal Glowify assistant. What can I do for you?",
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    if (
      lowerMessage.includes("product") ||
      lowerMessage.includes("item") ||
      lowerMessage.includes("what do you sell") ||
      lowerMessage.includes("what products") ||
      lowerMessage.includes("produkt") ||
      lowerMessage.includes("artikel")
    ) {
      return "At Glowify you'll find exclusive premium brands! 🛍️ We carry Nike for sports & lifestyle, Gucci for luxury accessories, Chanel for timeless elegance, and Rolex for exquisite watches. Check out our product page!";
    }

    if (
      lowerMessage.includes("price") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("expensive") ||
      lowerMessage.includes("cheap") ||
      lowerMessage.includes("preis") ||
      lowerMessage.includes("kosten")
    ) {
      return "Our prices are very fair for the quality! 💰 You'll find all current prices directly on the products. We also have regular great offers - feel free to check them out! Is there a specific product you're interested in?";
    }

    if (
      lowerMessage.includes("delivery") ||
      lowerMessage.includes("shipping") ||
      lowerMessage.includes("when will it arrive") ||
      lowerMessage.includes("lieferung") ||
      lowerMessage.includes("versand")
    ) {
      return "We offer fast and reliable shipping! 🚚 Delivery times vary by location and product. In checkout you'll see all available shipping options with exact times. Express shipping is also available!";
    }

    if (
      lowerMessage.includes("help") ||
      lowerMessage.includes("support") ||
      lowerMessage.includes("problem") ||
      lowerMessage.includes("question") ||
      lowerMessage.includes("hilfe") ||
      lowerMessage.includes("frage")
    ) {
      return "I'm happy to help you! 🤝 You can ask any questions here or explore our sections: Products, Cart, Dashboard, or Checkout. What exactly can I help you with?";
    }

    if (
      lowerMessage.includes("glowify") ||
      lowerMessage.includes("shop") ||
      lowerMessage.includes("store") ||
      lowerMessage.includes("about you") ||
      lowerMessage.includes("about us")
    ) {
      return "Glowify is your exclusive online shop for premium brands! ✨ We curate only the best products from Nike, Gucci, Chanel, and Rolex. Quality, style, and authenticity are our focus.";
    }

    if (
      lowerMessage.includes("how are you") ||
      lowerMessage.includes("how's it going") ||
      lowerMessage.includes("all good") ||
      lowerMessage.includes("wie geht")
    ) {
      return "I'm doing great, thanks! 😊 I'm ready to help you with anything. How are you doing? How can I make your Glowify shopping experience better?";
    }

    if (
      lowerMessage.includes("nike") ||
      lowerMessage.includes("sport") ||
      lowerMessage.includes("sneaker")
    ) {
      return "Nike is fantastic! 👟 We have the latest Nike collections: sneakers, sportswear, and accessories. Especially popular are the Air Max and Jordan models. Shall I show you our Nike highlights?";
    }

    if (
      lowerMessage.includes("gucci") ||
      lowerMessage.includes("luxury") ||
      lowerMessage.includes("handbag") ||
      lowerMessage.includes("luxus")
    ) {
      return "Gucci embodies Italian luxury! 👜 Our Gucci collection includes iconic handbags, sneakers, and accessories. The Marmont line and Ace sneakers are true classics. What Gucci products interest you?";
    }

    if (
      lowerMessage.includes("chanel") ||
      lowerMessage.includes("perfume") ||
      lowerMessage.includes("elegance") ||
      lowerMessage.includes("parfum")
    ) {
      return "Chanel is pure elegance! 💄 From the legendary No. 5 perfume to the classic Flap Bag - Chanel stands for timeless beauty. Our Chanel products are hand-picked and authentic. Are you interested in perfume or accessories?";
    }

    if (
      lowerMessage.includes("rolex") ||
      lowerMessage.includes("watch") ||
      lowerMessage.includes("watches") ||
      lowerMessage.includes("uhr")
    ) {
      return "Rolex - the crown of watchmaking! ⌚ Datejust, Submariner, Daytona - we carry the most coveted models. Every Rolex with us is authentic and comes with warranty. Which Rolex style appeals to you?";
    }

    if (
      lowerMessage.includes("payment") ||
      lowerMessage.includes("pay") ||
      lowerMessage.includes("credit card") ||
      lowerMessage.includes("bezahlung") ||
      lowerMessage.includes("zahlung")
    ) {
      return "Payment is very easy with us! 💳 We accept all major credit cards, PayPal, and other secure payment methods. All transactions are SSL-encrypted and absolutely secure.";
    }

    if (
      lowerMessage.includes("return") ||
      lowerMessage.includes("refund") ||
      lowerMessage.includes("exchange") ||
      lowerMessage.includes("back") ||
      lowerMessage.includes("retoure") ||
      lowerMessage.includes("rückgabe")
    ) {
      return "No problem with returns! 🔄 We have a flexible 30-day return policy. Products just need to be in original condition. Return shipping is free for you - customer satisfaction comes first!";
    }

    if (
      lowerMessage.includes("size") ||
      lowerMessage.includes("fit") ||
      lowerMessage.includes("sizing chart") ||
      lowerMessage.includes("größe")
    ) {
      return "Sizes are important! 📏 Every product has a detailed sizing chart. If you're unsure, you can order multiple sizes and return the others for free. Our service team is also happy to help!";
    }

    if (
      lowerMessage.includes("discount") ||
      lowerMessage.includes("offer") ||
      lowerMessage.includes("sale") ||
      lowerMessage.includes("percent") ||
      lowerMessage.includes("cheaper") ||
      lowerMessage.includes("rabatt") ||
      lowerMessage.includes("angebot")
    ) {
      return "Great offers are waiting for you! 🏷️ We regularly have exclusive sales and discount campaigns. Newsletter subscribers get notified first about new deals. Don't miss our seasonal highlights!";
    }

    if (
      lowerMessage.includes("newsletter") ||
      lowerMessage.includes("news") ||
      lowerMessage.includes("updates") ||
      lowerMessage.includes("informed")
    ) {
      return "Stay always up-to-date! 📧 Our newsletter informs you about new collections, exclusive offers, and fashion trends. Plus: 10% welcome discount for new customers! Registration takes only 30 seconds.";
    }

    if (
      lowerMessage.includes("contact") ||
      lowerMessage.includes("phone") ||
      lowerMessage.includes("email") ||
      lowerMessage.includes("reach") ||
      lowerMessage.includes("kontakt")
    ) {
      return "We're always here for you! 📞 Use this chat for quick help, or check our contact section. Our service team is available Mon-Fri 9am-6pm and Sat 10am-4pm.";
    }

    if (
      lowerMessage.includes("opening hours") ||
      lowerMessage.includes("open") ||
      lowerMessage.includes("hours") ||
      lowerMessage.includes("24/7") ||
      lowerMessage.includes("öffnungszeit")
    ) {
      return "We're here for you! 🕐 As an online shop, you can shop 24/7 - even at night and weekends! Our chat support and service team are available during regular business hours.";
    }

    if (
      lowerMessage.includes("thank") ||
      lowerMessage.includes("thanks") ||
      lowerMessage.includes("thank you") ||
      lowerMessage.includes("danke")
    ) {
      return "You're very welcome! 😊 I'm thrilled I could help. If any more questions come up, I'm always here for you. Enjoy your shopping!";
    }

    if (
      lowerMessage.includes("bye") ||
      lowerMessage.includes("goodbye") ||
      lowerMessage.includes("see you") ||
      lowerMessage.includes("ciao") ||
      lowerMessage.includes("tschüss")
    ) {
      return "Goodbye! 👋 It was my pleasure to help you. Feel free to visit us again - I'm always here when you have questions. Have a great day!";
    }

    if (
      lowerMessage.includes("review") ||
      lowerMessage.includes("rating") ||
      lowerMessage.includes("feedback") ||
      lowerMessage.includes("opinion") ||
      lowerMessage.includes("bewertung")
    ) {
      return "Your feedback is important to us! ⭐ You can rate products after purchase and share your experiences. This helps other customers and us to get even better. How has your experience been so far?";
    }

    if (
      lowerMessage.includes("authentic") ||
      lowerMessage.includes("real") ||
      lowerMessage.includes("original") ||
      lowerMessage.includes("fake") ||
      lowerMessage.includes("echt")
    ) {
      return "Authenticity guaranteed! ✅ All our products are 100% original and come directly from manufacturers. Every item is checked before shipping. You won't find fake products at Glowify!";
    }

    if (
      lowerMessage.includes("why") ||
      lowerMessage.includes("how come") ||
      lowerMessage.includes("warum")
    ) {
      return 'That\'s a very good question! 🤔 Can you give me a bit more context? The more specific your question, the better I can help you. What does your "why" refer to?';
    }

    if (
      lowerMessage.includes("when") ||
      lowerMessage.includes("time") ||
      lowerMessage.includes("date") ||
      lowerMessage.includes("wann")
    ) {
      return "I'm happy to answer time-related questions! ⏰ Are you asking about delivery times, opening hours, sale dates, or something else? Let me know what your question refers to!";
    }

    if (
      lowerMessage.includes("where") ||
      lowerMessage.includes("location") ||
      lowerMessage.includes("wo")
    ) {
      return "As a premium online shop, we're everywhere for you! 🌍 Our warehouse is in Germany, but we ship throughout Europe. Do you have questions about shipping to your country or our location?";
    }

    if (
      lowerMessage.includes("how much") ||
      lowerMessage.includes("how many") ||
      lowerMessage.includes("wieviel")
    ) {
      return "I'm happy to help with pricing questions! 💶 All current prices can be found directly on the products. Do you have a specific product or category in mind? Then I can help you more specifically!";
    }

    const smartFallbacks = [
      "That sounds interesting! 🤔 Tell me more - I'm happy to help. What exactly would you like to know about Glowify?",
      "Great question! 💡 To help you optimally, could you be a bit more specific? Is it about products, ordering, or service?",
      "I'm happy to support you with that! 🤝 The more details you give me, the better I can help you. What exactly is it about?",
      "I can understand that well! 😊 Let me see how I can best help you. Can you give me a bit more context?",
      "Interesting question! 🌟 I'm here to help you. What's on your mind during your Glowify visit?",
      "Great that you're asking! 👍 I know Glowify inside and out. What would you like to learn more about?",
      "That's an important topic! 💼 To give you the best answer - could you be a bit more precise?",
    ];

    return smartFallbacks[Math.floor(Math.random() * smartFallbacks.length)];
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

    setTimeout(() => {
      try {
        const botResponse = generateResponse(userMessage);
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
    }, 800 + Math.random() * 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className={`${
        isWidget ? "h-full flex flex-col" : "max-w-4xl mx-auto"
      } bg-white rounded-lg shadow-lg overflow-hidden`}
    >
      {!isWidget && (
        <div
          className="bg-gradient-to-r bg-[#D59C8C] text-white p-4"
          style={{
            background:
              "linear-gradient(50deg, #326287 25%, #D59C8C 85%, #E8B09E 100%)",
            transition: "background 0.5s ease-in-out",
          }}
        >
          <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
            🤖 Glowify AI Assistant
          </h2>
          <p className="text-orange-100 text-xs sm:text-sm">
            Your personal shopping assistant - Always here for you!
          </p>
        </div>
      )}

      {/* Chat*/}
      <div
        className={`${
          isWidget ? "flex-1" : "h-80 sm:h-96"
        } chat-messages overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50`}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[280px] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 rounded-lg ${
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
            <div
              className="bg-white text-gray-800 shadow-md border max-w-[280px] sm:max-w-xs 
            lg:max-w-md px-3 sm:px-4 py-2 rounded-lg"
            >
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
      <div className="p-2 sm:p-3 border-t border-gray-300 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message..."
            disabled={isLoading}
            className="flex-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-2 text-xs 
            sm:text-sm focus:outline-none focus:ring-2
             focus:ring-[#e8b09e] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-[#e8b09e] focus:ring-[#e8b09e]
             disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm font-medium"
            style={{
              background:
                "linear-gradient(50deg, #326287 25%, #D59C8C 85%, #E8B09E 100%)",
              transition: "background 0.5s ease-in-out",
            }}
          >
            {isLoading ? "..." : "➤"}
          </button>
        </div>
      </div>

      {/* Info Area  */}
      {!isWidget && (
        <div className="bg-gray-100 p-2 sm:p-3 text-xs text-gray-600">
          <p className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 text-center sm:text-left">
            <span className="flex items-center gap-1">
              🚀 <strong>Fast & Reliable:</strong> Instant answers to your
              questions.
            </span>
            <span className="flex items-center gap-1">
              💎 <strong>Glowify Expert:</strong> Specialized in our premium
              brands.
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SimpleChatbot;
