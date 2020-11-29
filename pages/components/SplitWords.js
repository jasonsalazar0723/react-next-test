import * as React from "react";
import { AT_T, NATO } from "../constants";

export default function SplitWords({ words, alphabetType }) {
  let alphabet = alphabetType === "AT_T" ? AT_T : NATO;
  const handleSpeak = () => {
    let synth = window.speechSynthesis;
    let utterThis = new SpeechSynthesisUtterance(words);
    synth.speak(utterThis);
  };

  const iterateWords = words.toUpperCase().split("");
  return (
    <>
      <div>
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
      <button onClick={handleSpeak}>Listen</button>
    </>
  );
}
