/* /components/feedback/FeedbackPanel.tsx */
import { useState } from "react";

const initialMessages = [
  { id: 1, sender: "Alice", content: "Can I get a manual for the printer?" },
  { id: 2, sender: "Bob", content: "How do I reset my device password?" },
];

export function FeedbackPanel() {
  const [messages, setMessages] = useState(initialMessages);
  const [reply, setReply] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleReply = () => {
    if (selectedId && reply.trim()) {
      alert(`Reply sent to message #${selectedId}: ${reply}`);
      setReply("");
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Incoming Messages</h2>
        <ul className="space-y-2">
          {messages.map((msg) => (
            <li
              key={msg.id}
              onClick={() => setSelectedId(msg.id)}
              className={`p-3 rounded border cursor-pointer ${
                selectedId === msg.id ? "bg-indigo-50 border-indigo-300" : "hover:bg-gray-50"
              }`}
            >
              <p className="font-medium text-sm">From: {msg.sender}</p>
              <p className="text-gray-600 text-sm">{msg.content}</p>
            </li>
          ))}
        </ul>
      </div>

      {selectedId && (
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-1">Reply to Message #{selectedId}</h3>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="w-full border-gray-300 rounded p-2 text-sm"
            rows={3}
          />
          <button
            onClick={handleReply}
            className="mt-2 bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700"
          >
            Send Reply
          </button>
        </div>
      )}
    </div>
  );
}
