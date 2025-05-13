import React from "react";

interface TableProps {
  headers: string[];
  rows: (string | number)[][];
}

export const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <table className="min-w-full border text-sm text-left">
      <thead className="bg-gray-100 border-b">
        <tr>{headers.map((h, i) => <th key={i} className="p-2">{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b hover:bg-gray-50">
            {row.map((cell, j) => <td key={j} className="p-2">{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
