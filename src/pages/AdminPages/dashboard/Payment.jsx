import React, { useEffect, useState } from "react";
import { Table } from "../../../components/shared/Table";
import { Header } from "../../../components/shared/Header";
import { useUserStore } from "../../../store/userStore";

const columns = [
  { key: "id", label: "S/N" },
  { key: "examineeId", label: "ID" },
  { key: "plan", label: "Plan" },
  { key: "reference", label: "Reference" },
  { key: "createdAt", label: "Payment Date" },
  { key: "expiresAt", label: "Payment Ending" },
];

export const Payment = () => {
  const { subscribers } = useUserStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedData, setDisplayedData] = useState(subscribers);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const regex = new RegExp(term, "i");
    const filteredData = subscribers.filter(
      (item) =>
        regex.test(item.plan) ||
        regex.test(item.reference) ||
        regex.test(item.examineeId)
    );

    setDisplayedData(filteredData);
  };
  
  const handleClearSearch = () => {
    setSearchTerm('');
    setDisplayedResults(originalResults);
};

  return (
    <div className="flex flex-col w-full p-8 md:p-10 gap-4">
      <Header title="Payment" />
      <main className="flex-grow">
        <section className="flex flex-col gap-4">
          <div className="flex mb-4 justify-between gap-8 h-14">
            <div className="relative flex w-full">
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
          </div>
          <div className="w-full">
            <Table data={displayedData.map((data, index) => ({...data, id: index + 1, createdAt: new Date(data.createdAt).toDateString(), expiresAt: new Date(data.expiresAt).toDateString()}))} columns={columns} />
          </div>
        </section>
      </main>
    </div>
  );
};
