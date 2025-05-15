import React, { useEffect, useState } from "react";
import { Table } from "../../../components/shared/Table";
import { Header } from "../../../components/shared/Header";
import { Button } from "../../../components/shared/Button";
import { Modal } from "../../../components/shared/Modal";
import * as XLSX from "xlsx"; 
import { useUserStore } from "../../../store/userStore";

const columns = [
  { key: "id", label: "S/N" },
  { key: "userId", label: "ID" },
  { key: "score", label: "Score" },
  { key: "questions", label: "Total Questions" },
  { key: "date", label: "Date" },
];

export const Result = () => {
  const { results } = useUserStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [format, setFormat] = useState("");
  const [displayedResults, setDisplayedResults] = useState(results);

  const handleExportFormat = (exportFormat) => {
    setShowModal(false);

    try {
      switch (exportFormat) {
        case "XLSX":
          const wb = XLSX.utils.book_new();
          const ws = XLSX.utils.json_to_sheet(displayedResults);
          XLSX.utils.book_append_sheet(wb, ws, "Results");
          XLSX.writeFile(wb, "Results.xlsx");
          break;
        case "CSV":
          const csvRows = [];
          const headers = Object.keys(displayedResults[0]);
          csvRows.push(headers.join(","));

          for (const row of displayedResults) {
            const values = headers.map((header) => {
              const escaped = ("" + row[header]).replace(/"/g, '\\"');
              return `"${escaped}"`;
            });
            csvRows.push(values.join(","));
          }

          const csvString = csvRows.join("\r\n");
          const csvBlob = new Blob([csvString], {
            type: "text/csv;charset=utf-8;",
          });
          const csvUrl = URL.createObjectURL(csvBlob);
          const link = document.createElement("a");
          link.href = csvUrl;
          link.setAttribute("download", "Results.csv");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          break;
        default:
          throw new Error(`Unsupported export format: ${exportFormat}`);
      }
    } catch (error) {
      console.error(`Error exporting results: ${error}`);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const regex = new RegExp(term, "i");
    const filteredResults = results.filter(
      (result) =>
        regex.test(result.examineeId) ||
        regex.test(result.date) ||
        regex.test(result.category)
    );

    setDisplayedResults(filteredResults);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setDisplayedResults(originalResults);
  };

  return (
    <div className="flex flex-col w-full p-8 md:p-10 gap-4">
      <Header title="Result" />
      <main className="flex-grow">
        <section className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row mb-4 justify-between gap-4">
            <div className="relative flex md:w-2/3">
              <input
                type="text"
                className="border rounded-md py-2 px-4 w-full"
                placeholder="Search here..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {searchTerm && (
                  <button
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={handleClearSearch}
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
                {!searchTerm && (
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                title="Export Result"
                btnStyles="px-4 py-3 bg-primary rounded-md text-white"
                btnClick={() => setShowModal(true)}
              />
            </div>
          </div>
          <div className="w-full">
            <Table
            customTitle="Results"
              data={
                displayedResults.length > 0
                  ? displayedResults.map((results, index) => ({
                      ...results,
                      id: index + 1,
                      questions: results.data.length,
                      date: new Date(results.date).toDateString(),
                    }))
                  : [{ examineeId: "No results available" }]
              }
              columns={columns}
            />
          </div>
        </section>
      </main>
      {showModal && (
        <Modal
          title="Export Result"
          content={
            <div className="flex flex-col gap-4 my-2">
              <div className="text-primary">Export as:</div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="xlsx"
                    type="radio"
                    name="exportFormat"
                    value="XLSX"
                    checked={format === "XLSX"}
                    onChange={() => setFormat("XLSX")}
                    className="form-radio h-5 w-5 text-green-600"
                  />
                  <label htmlFor="xlsx" className="ml-2 text-gray-700">
                    EXCEL
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="csv"
                    type="radio"
                    name="exportFormat"
                    value="CSV"
                    checked={format === "CSV"}
                    onChange={() => setFormat("CSV")}
                    className="form-radio h-5 w-5 text-green-600"
                  />
                  <label htmlFor="csv" className="ml-2 text-gray-700">
                    CSV
                  </label>
                </div>
              </div>
            </div>
          }
          buttons={
            <Button
              title="Export"
              btnStyles="bg-primary px-4 py-3 text-white rounded-md w-full my-5"
              btnClick={() => handleExportFormat(format)}
            />
          }
          closeModal={() => setShowModal(false)}
          modStyles="w-1/2"
        />
      )}
    </div>
  );
};
