import React, { useEffect, useRef, useState } from "react";
import bottomBorder from "../assets/title-img-orange.svg";
import member1 from "../images/member1.jpeg";
import member2 from "../images/member2.jpeg";
import member3 from "../images/member3.jpeg";
import member4 from "../images/member4.jpeg";
import member5 from "../images/member5.jpeg";
import RotatingFlowers from "../components/RotatingFlowers";
import { useLanguage } from "../contexts/LanguageContext";

const TeamMember = ({ name, role, image, delay }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [delay]);

  return (
   <div
  ref={ref}
  className={`w-64 m-4 flex flex-col items-center transition-all duration-500 ease-out
  hover:-translate-y-3 hover:scale-105 hover:shadow-2xl cursor-pointer
  ${
    visible
      ? "opacity-100 translate-y-0 scale-100"
      : "opacity-0 translate-y-10 scale-95"
  }`}
>
      {/* IMAGE */}
      <div className="relative w-full h-80">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* TEXT */}
      <div className="relative mt-2 text-center w-full pb-2">
        <div className="border-t-2 border-orange-500 pt-2">
          <div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
            style={{
              borderWidth: "8px",
              borderColor: "transparent transparent #ef5521 transparent",
              borderStyle: "solid",
              borderTopWidth: "0",
              borderBottomWidth: "0",
              width: "0",
              height: "0",
            }}
          />
        </div>

        <p className="font-semibold text-[#ef5521ff]">{name}</p>
        <p className="text-sm">{role}</p>
      </div>
    </div>
  );
};

const ManagementPage = ({ id }) => {
  const { t } = useLanguage();
  const committeeMembers = [
    { name: "", role: t.management.role, image: member1 },
    { name: "", role: t.management.role, image: member2 },
    { name: "", role: t.management.role, image: member3 },
    { name: "", role: t.management.role, image: member4 },
    { name: "", role: t.management.role, image: member5 },
  ];

  return (
    <div id={id} className="bg-gradient-to-b from-orange-50 to-[#F07A2A] w-full min-h-[100vh] pt-20 pb-10 relative overflow-hidden">
      {/* Rotating flower background */}
      <RotatingFlowers tintColor="rgba(255,255,255,0.5)" />
      
      {/* TITLE */}
      <h2 className="font-bold md:text-3xl xs:text-xl flex justify-center text-[#ef5521ff]">
        {t.management.title}
      </h2>

      <div className="flex justify-center mt-4">
        <img src={bottomBorder} alt="Bottom Border" className="md:w-1/4" />
      </div>

      {/* MEMBERS */}
      <div className="flex flex-wrap justify-center mt-8">
        {committeeMembers.map((member, index) => (
          <TeamMember
            key={`committee-${index}`}
            {...member}
            delay={index * 200} // 🔥 stagger animation
          />
        ))}
      </div>
    </div>
  );
};

export default ManagementPage;