import SimpleChatbot from "../components/SimpleChatbot";

//Separate Chat-Seite
const ChatPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-4 sm:py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            AI Assistant Chat
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Ask questions about our Glowify shop or simply chat with our AI
            assistant. Quick and helpful answers guaranteed!
          </p>

          <div className="mt-4 mx-auto max-w-lg">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-blue-600">ℹ️</span>
                <strong>Demo Chatbot</strong>
              </div>
              <p className="text-xs">
                This is a simulated AI assistant with predefined responses.
                Created as a free alternative to ChatGPT API.
              </p>
            </div>
          </div>
        </div>

        <SimpleChatbot />

        <div className="mt-6 sm:mt-8 text-center px-2">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 max-w-4xl mx-auto">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              What can the AI Assistant do?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <h4 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">
                  💬 General Conversation
                </h4>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                  <li>• Answer general questions</li>
                  <li>• Have friendly conversations</li>
                  <li>• Help with various topics</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">
                  🛍️ Shop Support
                </h4>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                  <li>• Product recommendations</li>
                  <li>• Information about Glowify</li>
                  <li>• Help with navigation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
