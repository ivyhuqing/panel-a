/* /components/dashboard/DashboardCard.tsx */
export function DashboardCard({ title, value }: { title: string; value: string }) {
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    );
  }
  
  /* /components/dashboard/RecentTasks.tsx */
  export function RecentTasks() {
    const tasks = [
      { id: 1, title: "Upload new brochure", status: "Pending" },
      { id: 2, title: "Translate product sheet", status: "In Progress" },
    ];
  
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Recent Tasks</h2>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between text-sm text-gray-700">
              <span>{task.title}</span>
              <span className="text-gray-400">{task.status}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }