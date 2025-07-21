import SimpleChatbot from "../components/SimpleChatbot";

const ChatPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            AI Assistant Chat
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ask questions about our Glowify shop or simply chat with our AI 
            assistant. Quick and helpful answers guaranteed!
          </p>
        </div>

        <SimpleChatbot />

        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              What can the AI Assistant do?
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  💬 General Conversation
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Answer general questions</li>
                  <li>• Have friendly conversations</li>
                  <li>• Help with various topics</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  🛍️ Shop Support
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
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
