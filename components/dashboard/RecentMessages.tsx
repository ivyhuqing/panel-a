/* /components/dashboard/RecentMessages.tsx */
export function RecentMessages() {
    const messages = [
      { id: 1, sender: "Alice", preview: "Could you explain how to..." },
      { id: 2, sender: "Bob", preview: "I encountered an issue with..." },
    ];
  
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Recent Feedback</h2>
        <ul className="space-y-2">
          {messages.map((msg) => (
            <li key={msg.id} className="text-sm text-gray-700">
              <span className="font-medium">{msg.sender}:</span> {msg.preview}
            </li>
          ))}
        </ul>
      </div>
    );
  }