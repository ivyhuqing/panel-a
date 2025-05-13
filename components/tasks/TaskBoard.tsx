/* /components/tasks/TaskBoard.tsx */
import { useState } from "react";

export function TaskBoard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Upload new brochure", status: "Pending" },
    { id: 2, title: "Translate product sheet", status: "In Progress" },
    { id: 3, title: "Verify supplier form", status: "Done" },
  ]);

  const toggleStatus = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "Pending"
                  ? "In Progress"
                  : task.status === "In Progress"
                  ? "Done"
                  : "Pending",
            }
          : task
      )
    );
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Your Tasks</h2>
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center text-sm text-gray-700 border p-2 rounded hover:bg-gray-50"
          >
            <div>
              <p className="font-medium">{task.title}</p>
              <p className="text-xs text-gray-400">Status: {task.status}</p>
            </div>
            <button
              onClick={() => toggleStatus(task.id)}
              className="text-indigo-600 hover:underline text-xs"
            >
              Advance
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
