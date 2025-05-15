import React, { useState } from 'react';

export const Table = ({ data, columns, customTitle }) => {
  const [numEntries, setNumEntries] = useState(20);
  const printTable = () => {
    const newWindow = window.open('', '_blank');
    const tableHTML = document.querySelector('.table-to-print').outerHTML;
    newWindow.document.write(document.querySelector('.table-to-print').outerHTML);
    newWindow.document.write(`<html><head><title>Print ${customTitle}</title></head><body>`);
    newWindow.document.write(`
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #e9fff7;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid #000;
        padding: 10px;
        text-align: left;
      }
    </style>
  </head><body>`);
    newWindow.document.write(`<h1>${customTitle}</h1>`); // Add a title
    newWindow.document.write(tableHTML);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
  
    // You can add a delay here to ensure all content is loaded before printing
    setTimeout(() => {
      newWindow.print();
    }, 2000);
  };

  const showMore = () => {
    setNumEntries(prevNumEntries => Math.min(prevNumEntries + 20, data.length));
  };

  return (
    <div className="overflow-x-auto">
    <div className='flex justify-end my-4'>
    <button onClick={printTable} className="mb-2 bg-primary px-4 py-3 text-white rounded-md shadow-md">Print Table</button>
    </div>
      <table className="w-full table-auto table-to-print">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-mono font-semibold"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-gray-50">
          {data.slice(0, numEntries).map((item) => (
            <tr
              key={item.id}
              className="hover:bg-secondary hover:shadow-md"
            >
              {columns.map((column) => (
                <td
                  key={`${item.id}-${column.key}`}
                  className="px-3 md:px-6 py-2 md:py-4 text-sm text-gray-500"
                >
                  {item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {numEntries < data.length && ( // Only show the "Show More" button if there are more entries to display
        <button onClick={showMore} className="mt-2 bg-primary px-4 py-3 text-white rounded-md shadow-md">Show More</button>
      )}
    </div>
  );
};