import React, { useEffect } from "react";
import bannerImg from "../../assets/images/building-banner.png";
import beamImg from "../../assets/images/beam-image.png";
import frameImg from "../../assets/images/frame-image.png";
import BigHeader from "../../components/typography/BigHeader";
import { TypeAnimation } from "react-type-animation";
import { NavLink } from "react-router";
import { beamActions } from "../../store/beam";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(beamActions.reset());
  }, [dispatch]);

  return (
    <div className="relative bg-primary flex flex-col h-screen">
      <img src={bannerImg} alt="banner" className="w-full" />
      <div className="grow bg-tertiary" />
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-full bg-primary min-h-[75%] max-h-[90%] max-w-[75%] shadow-[0px_3px_6px_0px_rgba(0,0,0,0.10)] rounded-3xl py-20">
        <BigHeader className="text-center mb-2">
          <TypeAnimation
            sequence={[
              "Beam Calculator - Group 6 CEG 410",
              1000,
              "Click below to design and calculate a structure:",
              1000,
              "Beam Calculator",
              1000,
              "Or",
              1000,
              "Frame Calculator",
              1000,
              "Group Members and Contributions:",
              1000,
              "Attah Gbubemi David - Developer",
              1000,
              "Ajayi Olatomiwa Joseph - Designer",
              1000,
              "Ajayi Samuel - Project Manager",
              1000,
              " Ajayi Olatomiwa Joseph",
              1000,
              "Egundeyi Olaoluwa Ajibola",
              1000,
              "Oyeleye Solomon",
              1000,
              "Abolarin Oyinkansola",
              1000,
              "Adenrele Olatunbosun Fawaz",
              1000,
              "Al-Amin Oseni Olanrewaju",
              1000,
              "Odebunmi Oluwafemi Joshua",
              1000,
              "Thomas Edward Vikram",
              1000,
              " Ugwuoke Kenneth Chukwujiekwu",
              1000,
            ]}
            wrapper="div"
            speed={50}
            repeat={Infinity}
            cursor={false}
            style={{ minHeight: "3rem" }}
          />
        </BigHeader>
        <p className="text-secondary text-center text-base not-italic font-normal leading-[150%] font-inter mb-16">
          Select which type of structure you would like to analyze
        </p>
        <div className="flex gap-x-20 container mx-auto w-full max-w-[70%] justify-between">
          <NavLink
            to="/beam-calculator/question"
            className="border border-[#CDCED9] rounded-2xl border-solid px-10 pt-16 pb-11 flex flex-col gap-14 grow basis-[50%] transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
          >
            <img src={beamImg} alt="beam" className="aspect-video" />
            <p className="text-secondary text-center text-base not-italic font-semibold leading-[150%]">
              Beam Calculator
            </p>
          </NavLink>
          <NavLink
            to="/frame-calculator/question"
            className="border border-[#CDCED9] rounded-2xl border-solid px-10 pt-16 pb-11 flex flex-col gap-14 grow basis-[50%] transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
          >
            <img
              to="/frame-calculator"
              src={frameImg}
              alt="frame"
              className="aspect-video"
            />
            <p className="text-secondary text-center text-base not-italic font-semibold leading-[150%]">
              Frame Calculator
            </p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
