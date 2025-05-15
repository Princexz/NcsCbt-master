import React, { useEffect, useState } from "react";
import { Button } from "../../components/shared/Button";
import { Link, useNavigate } from "react-router-dom";
import ncs from "../../assets/ncs.png";
import screenshot from "../../assets/quizscreen.png";
import flower from "../../assets/flower.png";
import flowr from "../../assets/flowr.png";
import quote from "../../assets/quote.png";
import { Card } from "../../components/website/Card";
import { Cbt } from "../../components/user/Cbt";
import { Pq } from "../../components/user/Pq";
import { Time } from "../../components/user/Time";
import { User } from "../../components/user/User";
import { Data } from "../../components/user/Data";
import { TestimonialCard } from "../../components/website/TestimonialCard";
import { PricingTable } from "../../components/website/PricingTable";
import { Contact } from "../../components/website/Contact";
import { Footer } from "../../components/website/Footer";
import { useUserStore } from "../../store/userStore";
import { useAnimate, stagger, motion, AnimatePresence } from "framer-motion";

const featured = [
  {
    icon: <Cbt />,
    title: "CBT Mock Exams",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta obcaecati quis reiciendis repellendus incidunt recusandae?",
  },
  {
    icon: <Pq />,
    title: "Past Questions",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta obcaecati quis reiciendis repellendus incidunt recusandae?",
  },
  {
    icon: <Time />,
    title: "Manage your Time",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta obcaecati quis reiciendis repellendus incidunt recusandae?",
  },
  {
    icon: <User />,
    title: "User Friendly",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta obcaecati quis reiciendis repellendus incidunt recusandae?",
  },
  {
    icon: <Data />,
    title: "Less Data",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta obcaecati quis reiciendis repellendus incidunt recusandae?",
  },
];

const testimonials = [
  {
    name: "Floyd Miles",
    title: "Vice President, GoPro",
    testimonial:
      "Arrow team underline scrolling list community strikethrough component inspect. Reesizing reesizing horizontal stroke polygon prototype. Follower style edit bullet content layout duplicate strikethrough.",
  },
  {
    name: "Jane Cooper",
    title: "CEO, Airbnb",
    testimonial:
      "Connection edit duplicate shadow underline. Distribute duplicate scale scale polygon clip device. Align horizontal inspect overflow union stroke horizontal rectangle. Create.",
  },
  {
    name: "Kristin Watson",
    title: "Co-Founder, Strap",
    testimonial: "Effect edit auto main figjam thumbnail. Hand outline.",
  },
];

export const Home = () => {
  const navigate = useNavigate();
  const { questions } = useUserStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col bg-secondary">
        <div className="">
          <img className="absolute right-0" src={flower} alt="flower" />
          <img className="absolute -bottom-96" src={flowr} alt="flower" />
        </div>
        {/* mobile header */}
        <header className="md:hidden mx-5 mt-6">
          <motion.nav
            whileTap={{ scale: 0.97 }}
            className="flex justify-between items-center bg-white py-8 px-6 h-12 rounded-lg shadow-md"
          >
            <div className="flex items-center">
              <img src={ncs} alt="ncs" className="h-8" />
              <div className="font-black text-xl text-primary">NCSCBT</div>
            </div>
            <Button
              title={
                <svg
                  width="34"
                  height="29"
                  viewBox="0 0 34 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M34 12.75V15.5833C34 15.9591 33.8507 16.3194 33.5851 16.5851C33.3194 16.8507 32.9591 17 32.5833 17H1.41667C1.04094 17 0.680609 16.8507 0.414932 16.5851C0.149256 16.3194 0 15.9591 0 15.5833V12.75C0 12.3743 0.149256 12.0139 0.414932 11.7483C0.680609 11.4826 1.04094 11.3333 1.41667 11.3333H32.5833C32.9591 11.3333 33.3194 11.4826 33.5851 11.7483C33.8507 12.0139 34 12.3743 34 12.75ZM32.5833 22.6667H1.41667C1.04094 22.6667 0.680609 22.8159 0.414932 23.0816C0.149256 23.3473 0 23.7076 0 24.0833V26.9167C0 27.2924 0.149256 27.6527 0.414932 27.9184C0.680609 28.1841 1.04094 28.3333 1.41667 28.3333H32.5833C32.9591 28.3333 33.3194 28.1841 33.5851 27.9184C33.8507 27.6527 34 27.2924 34 26.9167V24.0833C34 23.7076 33.8507 23.3473 33.5851 23.0816C33.3194 22.8159 32.9591 22.6667 32.5833 22.6667ZM32.5833 0H1.41667C1.04094 0 0.680609 0.149256 0.414932 0.414932C0.149256 0.680609 0 1.04094 0 1.41667V4.25C0 4.62572 0.149256 4.98606 0.414932 5.25173C0.680609 5.51741 1.04094 5.66667 1.41667 5.66667H32.5833C32.9591 5.66667 33.3194 5.51741 33.5851 5.25173C33.8507 4.98606 34 4.62572 34 4.25V1.41667C34 1.04094 33.8507 0.680609 33.5851 0.414932C33.3194 0.149256 32.9591 0 32.5833 0Z"
                    fill="#016F4A"
                  />
                </svg>
              }
              btnClick={toggleMenu}
              btnStyles=""
            />
          </motion.nav>
          <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className={`absolute right-5 left-5 top-16 px-10 py-5 shadow-md mt-10 rounded-lg bg-white transition-all duration-300 ease-out z-10 ${
                isMenuOpen ? "max-h-screen" : ""
              }`}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <div className="grid grid-cols-2">
                <Link
                  to="/"
                  onClick={toggleMenu}
                  className="py-3 px-4 font-semibold text-primary hover:bg-primary hover:text-primary text-center rounded-md"
                >
                  Home
                </Link>
                <Link
                  onClick={() => {
                    toggleMenu();
                    scrollToSection("about");
                  }}
                  className="py-3 px-4 font-semibold text-primary hover:bg-primary hover:text-primary text-center rounded-md"
                >
                  About Us
                </Link>
                <Link
                  onClick={() => {
                    toggleMenu();
                    scrollToSection("pricing");
                  }}
                  className="py-3 px-4 font-semibold text-primary hover:bg-primary hover:text-primary text-center rounded-md"
                >
                  Pricing
                </Link>
                <Link
                  onClick={() => {
                    toggleMenu();
                    scrollToSection("contact");
                  }}
                  className="py-3 px-4 font-semibold text-primary hover:bg-primary hover:text-primary text-center rounded-md"
                >
                  Contact
                </Link>
              </div>
              <div className="gap-4 w-2/3 flex flex-col mx-auto my-6">
                <Button
                  title="Create Account"
                  btnStyles="px-4 py-3 border border-primary rounded-md text-primary hover:bg-primary hover:text-white font-semibold w-full"
                  btnClick={() => navigate("create-account")}
                />
                <Button
                  title="Sign In"
                  btnStyles="px-4 py-3 bg-primary rounded-md text-primary hover:animate-pulse text-white font-semibold w-full"
                  btnClick={() => navigate("/login")}
                />
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </header>

        {/* medium & large screen header */}
        <header className="hidden md:block py-8 px-10 h-24">
          <nav className="flex justify-between items-center">
            <div
              className="flex items-center gap-2 text-2xl font-bold ml-5 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={ncs} alt="" />
              <span className="font-bold text-2xl text-primary">NCSCBT</span>
            </div>
            <ul className="flex text-lg space-x-10 font-bold hover:text-primary">
              <li>
                <a href="#" onClick={() => scrollToSection("home")}>
                  Home
                </a>
              </li>
              <li>
                <a href="#" onClick={() => scrollToSection("about")}>
                  About us
                </a>
              </li>
              <li>
                <a href="#" onClick={() => scrollToSection("pricing")}>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" onClick={() => scrollToSection("contact")}>
                  Contact
                </a>
              </li>
            </ul>
            <div className="flex w-1/3 h-12">
              <Button
                title="Create Account"
                btnStyles="w-full border border-primary text-blue-primary px-4 py-3 rounded-md mr-4 font-bold text-primary"
                btnClick={() => {
                  navigate("/create-account");
                }}
              />
              <Button
                title="Sign in"
                btnStyles="w-full bg-primary text-white px-4 py-3 rounded-md mr-4 font-bold"
                btnClick={() => {
                  navigate("/login");
                }}
              />
            </div>
          </nav>
        </header>

        <main className="flex-grow px-5 md:px-0">
          <section id="home" className="py-20 px-6">
            <div className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center">
              <h1 className="text-2xl md:text-5xl font-bold mb-4 text-primary flex flex-col items-center">
                <div className="whitespace-nowrap overflow-hidden [animation-delay: -2s]">
                  Nigeria Customs Service
                  <br />
                </div>
                <div className="whitespace-nowrap overflow-hidden [animation-delay: -60s]">
                  CBT Platform
                </div>{" "}
              </h1>
              <span className="text-sm">
                Score High for Nigeria Customs Service 2024 Promotion Exams
              </span>
              <Button
                title="Get Started"
                btnStyles="px-4 py-3 rounded-md bg-primary text-white my-8"
                btnClick={() => navigate("/create-account")}
              />
              <img
                src={screenshot}
                alt="Application Screenshot"
                className="md:mx-auto my-8 mx-10"
              />
            </div>
          </section>

          <section id="about" className="text-center md:py-20 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className=" text-2xl md:text-4xl text-primary font-bold mb-8">
                What we've achieved so far <br />{" "}
                <span className="text-sm font-normal">
                  Register with us today to get rid of the fear of using a
                  computer
                </span>
              </h2>
              <div className="flex items-center justify-center text-center">
                <div className="md:p-6">
                  <p className="text-4xl text-yellow font-bold">1894+</p>
                  <h3 className="w-full">Total Number of Questions</h3>
                </div>
                <div className="md:p-6">
                  <p className="text-4xl text-yellow font-bold">3M</p>
                  <h3 className="">Active Users</h3>
                </div>
                <div className="md:p-6">
                  <p className="text-4xl text-yellow font-bold">1M</p>
                  <h3 className="">Total Users</h3>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 text-primary">
                Features
              </h2>
              <span className="text-sm">
                Link rectangle rotate undo boolean boolean. Library project
                stroke line thumbnail. Background opacity star polygon object
                reesizing image star bullet.{" "}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-8 mx-auto py-10">
                {featured.map((feature, index) => (
                  <Card
                    key={index}
                    title={feature.title}
                    content={feature.content}
                    icon={feature.icon}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="bg-story py-20 px-10 md:px-32">
            <div className="md:px-20">
              <img
                className="inset-0 -ml-10 md:-ml-32 w-32"
                src={quote}
                alt={quote}
              />
              <div className="md:-ml-24 md:-mt-12 -mt-8">
                <div className="text-3xl md:text-6xl font-bold">
                  Real stories from real customers
                </div>
                <span className="text-sm font-normal">
                  Get inspired by these stories
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                {testimonials.map((testimonial, index) => {
                  if (index === 0) {
                    return (
                      <div key={index} className="md:col-span-2">
                        <TestimonialCard
                          name={testimonial.name}
                          title={testimonial.title}
                          testimonial={testimonial.testimonial}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div key={index}>
                        <TestimonialCard
                          name={testimonial.name}
                          title={testimonial.title}
                          testimonial={testimonial.testimonial}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </section>

          <section id="pricing" className="py-10 md:py-20 px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-2xl md:text-4xl font-bold text-primary">
                Pricing
              </div>
              <span className="text-sm font-normal">
                Editor share clip share pencil distribute content component.
                Undo duplicate bold strikethrough flatten invite selection
                duplicate main. Asset font shadow select follower.
              </span>
              <div className="hidden md:block">
                <PricingTable />
              </div>
              {/* mobile pricing */}
              <div className="md:hidden text-grey py-10 flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="free"
                    className="font-semibold text-lg text-primary"
                  >
                    Free
                  </label>
                  <div className="bg-story border border-darkgrey rounded-md p-6">
                    <div className="flex justify-start border-b border-b-darkgrey py-3 text-lg font-bold">
                      Benefits
                    </div>
                    <div className="my-4">
                      <div className="flex">
                        <div className="flex w-full justify-start text-left">
                          <ul className="space-y-10">
                            <li>Past Questions</li>
                            <li>Manage Your Time</li>
                            <li>Less Data</li>
                            <li>Reading Materials</li>
                            <li>Result History</li>
                          </ul>
                        </div>
                        <div className="flex justify-end">
                          <ul className="space-y-10">
                            <li>Limited</li>
                            <li>
                              <span className="text-primary">&#10003;</span>
                            </li>
                            <li>
                              <span className="text-primary">&#10003;</span>
                            </li>
                            <li>No</li>
                            <li>No</li>
                          </ul>
                        </div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    <div className="flex justify-end pt-4">
                      <Button
                        title="Subscribe"
                        btnStyles="px-4 py-3 bg-primary text-white rounded-md w-2/3"
                        btnClick={() => navigate("create-account")}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="free"
                    className="font-semibold text-lg text-primary"
                  >
                    Paid <br /> N1000/Month
                  </label>
                  <div className="bg-story border border-darkgrey rounded-md p-6">
                    <div className="flex justify-start border-b border-b-darkgrey py-3 text-lg font-bold">
                      Benefits
                    </div>
                    <div className="my-4">
                      <div className="flex">
                        <div className="flex w-full justify-start text-left">
                          <ul className="space-y-10">
                            <li>Past Questions</li>
                            <li>Manage Your Time</li>
                            <li>Less Data</li>
                            <li>Reading Materials</li>
                            <li>Result History</li>
                          </ul>
                        </div>
                        <div className="flex justify-end">
                          <ul className="space-y-10">
                            <li>
                              <span className="text-primary">&#10003;</span>
                            </li>
                            <li>
                              <span className="text-primary">&#10003;</span>
                            </li>
                            <li>
                              <span className="text-primary">&#10003;</span>
                            </li>
                            <li>
                              <span className="text-primary">&#10003;</span>
                            </li>
                            <li>
                              <span className="text-primary">&#10003;</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end pt-4">
                      <Button
                        title="Subscribe"
                        btnStyles="px-4 py-3 bg-primary text-white rounded-md w-2/3"
                        btnClick={() => navigate("create-account")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="md:py-20 mb-10 w-full">
            <Contact />
          </section>
        </main>

        {/* <footer className="bg-gray-800 text-white py-4 px-6">
        <div className="max-w-3xl mx-auto text-center">
          &copy; 2023 Nigeria Customs Service 2024 CBT Practice. All rights reserved.
        </div>
      </footer> */}
        <Footer
          abtClick={() => scrollToSection("about")}
          contactClick={() => scrollToSection("contact")}
        />
      </div>
    </div>
  );
};
