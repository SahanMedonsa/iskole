import React from 'react';

type Column = {
  key: string;
  label: string;
};

type TableProps = {
  columns: Column[];
  data: Record<string, any>[];
};

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-card-bg border border-border rounded-lg">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 text-left bg-background text-secondary-text border-b border-border font-semibold"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-hover transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 border-b border-border">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table; 