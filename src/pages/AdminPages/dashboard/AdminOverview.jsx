import React, { useEffect, useState } from "react";
import { Header } from "../../../components/shared/Header";
import { Chart } from "../../../components/user/Chart";
import user from "../../../assets/user.png";
import subscription from "../../../assets/sub.png";
import examinee from "../../../assets/examinee.png";
import { OverviewCard } from "../../../components/admin/OverviewCard";
import { useUserStore } from "../../../store/userStore";

export const AdminOverview = () => {
  const {
    users,
    materials,
    questions,
    checkedInUsers,
    subscribers,
    results,
  } = useUserStore();

  const cards = [
    {
      icon: user,
      value: users.length,
      label: "Total Users",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      iconBgColor: "bg-green-500",
      iconTextColor: "text-white",
    },
    {
      icon: subscription,
      value: 0,
      label: "Total Subscriptions",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      iconBgColor: "bg-green-500",
      iconTextColor: "text-white",
    },
    {
      icon: examinee,
      value: checkedInUsers.length,
      label: "Total Examinees",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      iconBgColor: "bg-blue-500",
      iconTextColor: "text-white",
    },
  ];

  console.log(
    users,
    "users",
    materials,
    "materials",
    questions,
    "questions",
    subscribers,
    "subscribers",
    results,
    "results"
  )

  return (
    <div className="flex flex-col w-full p-8 md:p-10">
      <Header title="Dashboard" />
      <main className="flex-grow mt-4">
        <div className="flex flex-col md:flex-row md:justify-around justify-center items-center gap-6 md:p-5">
          {cards.map((card, index) => (
            <div key={index} className="w-2/3 md:w-fit">
              <OverviewCard
                cardStyles="flex justify-center p-6"
                label={card.label}
                cardValue={card.value}
                icon={
                  <>
                    <img className="w-10" src={card.icon} alt={card.icon} />
                  </>
                }
              />
            </div>
          ))}
        </div>

        <section className="mt-8">
          <h2 className="md:text-xl font-bold mb-4">Test Overview</h2>
          <div className="bg-white">
            <Chart />
          </div>
        </section>
      </main>
    </div>
  );
};
