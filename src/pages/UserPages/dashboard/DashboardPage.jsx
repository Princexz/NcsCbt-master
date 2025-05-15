import React, { useEffect, useState } from "react";
import { Header } from "../../../components/shared/Header";
import { Button } from "../../../components/shared/Button";
import quiz from "../../../assets/quiz.png";
import { Chart } from "../../../components/user/Chart";
import { useUserStore } from "../../../store/userStore";

export const DashboardPage = () => {
  const {userMaterials, isLoggedIn} = useUserStore()
  const topMaterials = userMaterials.slice(0, 4);

  useEffect(()=> console.log(isLoggedIn),[isLoggedIn, userMaterials])

  return (
    <div className="flex flex-col w-full p-8 md:p-10">
      <Header title="Dashboard" />
      <main className="flex-grow">
        <section>
          <h2 className="text-xl mb-4 font-semibold">Top Materials to Read</h2>
          <div className="grid grid-cols-2 justify-center md:grid-cols-4 gap-4">
            {userMaterials.length >= 4 ? (
              topMaterials.map((material, index) => (
                <div key={index} className="p-4 text-darkgrey w-full">
                  <img
                    src={material.materialDetails.customMetadata.materialCover}
                    alt={material.materialDetails.customMetadata.name}
                    className="w-full h-32 object-cover border-4 border-yellow rounded-md mb-2 bg-grey"
                  />
                  <h3 className="mb-1">
                    {material.materialDetails.customMetadata.name}
                  </h3>
                  <div className="text-xs">
                    {" "}
                    Rank: {material.materialDetails.customMetadata.rank}
                  </div>
                </div>
              ))
            ) : (
              <p className="h-40 col-span-4 rounded-md shadow-md bg-grey animate-pulse"></p>
            )}
          </div>
        </section>

        <section className="bg-yellow rounded-lg p-10 mt-8 flex md:flex-row flex-col-reverse gap-6 items-center justify-between">
          <div className="w-full md:w-1/2 flex flex-col gap-4 md:text-left md:justify-start">
            <h2 className="text-2xl md:text-3xl mb-4">
              Take Quiz to Test Your Knowledge
            </h2>
            <Button
              title="Take Exam"
              btnStyles="bg-primary text-white py-2 px-4 rounded-md md:w-fit"
              btnClick={() => navigate("/dashboard/practice")}
            />
          </div>
          <img className="object-contain" src={quiz} alt="Quiz" />
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">Test Overview</h2>
          <div className="bg-white">
            <Chart />
          </div>
        </section>
      </main>
    </div>
  );
};
