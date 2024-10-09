import React, { useState, useEffect } from "react";
import coding_gif from "../assets/images/coding.gif";

const useTypewriter = (
  texts,
  typingSpeed = 150,
  deletingSpeed = 100,
  pauseTime = 2000
) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentText = texts[index];

    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        return;
      }
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      }, deletingSpeed);
    } else {
      if (displayText === currentText) {
        timer = setTimeout(() => setIsDeleting(true), pauseTime);
        return;
      }
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [
    displayText,
    index,
    isDeleting,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return displayText;
};

function About() {
  const introTexts = [
    "Hi, I'm Muskan",
    "I Create Seamless Web Experiences",
    "Let's Build Something Amazing",
  ];
  const animatedText = useTypewriter(introTexts);

  return (
    <div className="mx-auto h-auto my-36 max-xl:my-20" id="about">
      <div className="flex gap-6 justify-between items-center max-md:flex-wrap max-xl:justify-center">
        <div className="w-1/2 max-xl:w-full text-left max-md:text-center">
          <h1 className="text-5xl max-md:text-4xl mb-5 h-20">
            <span className="text-accent-primary">{animatedText}</span>
            <span className="animate-blink">|</span>
          </h1>
          <p className="text-3xl max-md:text-base mb-5 font-light">
            I'm a passionate web Developer, I create seamless,
            beautiful, and creative websites. I bring ideas to life
            through code.
          </p>
          <a
            href="#contact"
            className="p-2 px-4 rounded-md text-base bg-accent-primary text-white hover:bg-accent-secondary transition-all inline-block w-auto"
          >
            GET IN TOUCH
          </a>
        </div>
        <img
          className="h-80 max-xl:h-64 rounded max-[426px]:h-auto max-[426px]:w-full max-[426px]:mb-5"
          src={coding_gif}
          alt="Coding illustration"
        />
      </div>
    </div>
  );
}

export default About;
