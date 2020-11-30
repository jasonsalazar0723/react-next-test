import * as React from "react";
import { Button } from "react-bootstrap";
import { AT_T, NATO } from "../pages/constants";
import styles from "../../spelling/styles/Home.module.css";

export default function SplitWords({ words, alphabetType }) {
  const alphabet = alphabetType === "AT_T" ? AT_T : NATO;

  const iterateWords = words.toUpperCase().split("");

  const handleSpeak = () => {
    const synth = window.speechSynthesis;
    iterateWords.map((iterateWord, index) => {
      const utterThis = new SpeechSynthesisUtterance(
        `${iterateWord} as in ${alphabet[iterateWord]}`
      );
      if (iterateWord !== " ") synth.speak(utterThis);
    });
  };

  return (
    <>
      <div className={styles.iterateWord}>
        {iterateWords.map((iterateWord, index) => {
          if (iterateWord !== " ")
            return (
              <p key={index}>
                {iterateWord} as in {alphabet[iterateWord]}
              </p>
            );
          return <br key={index} />;
        })}
      </div>
      <Button onClick={handleSpeak}>Listen</Button>
    </>
  );
}
