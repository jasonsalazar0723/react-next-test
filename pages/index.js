import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import SplitWords from "../components/SplitWords";

export default function Home() {
  const [text, setText] = useState("");
  const [alphabetType, setAlphabetType] = useState("AT_T");
  const [show, setShow] = useState(false);
  const [savedWords, setSavedWords] = useState([]);

  useEffect(() => {
    let savedWords = JSON.parse(localStorage.getItem("saved-words")) || [];
    setSavedWords(savedWords);
  }, []);

  const handleWordChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z ]/gi, "");
    setText(value);
    setShow(false);
  };

  const handleResetClick = () => {
    if (show) setText("");
    if (text !== "") {
      setShow(false);
      let savedWords = JSON.parse(localStorage.getItem("saved-words")) || [];
      setSavedWords(savedWords);
      savedWords.unshift(text);
      localStorage.setItem(
        "saved-words",
        JSON.stringify(savedWords.slice(0, 9))
      );
    }
    setShow(!show);
  };

  const handleRadioChange = (e) => {
    setAlphabetType(e.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.alphabet}>
          <input value={text} onChange={handleWordChange} type="text" />
          <Button onClick={handleResetClick}>{show ? "Reset" : "Show"}</Button>
        </div>
        {show && (
          <div className={styles.radio}>
            <div>
              <input
                id="AT_T"
                type="radio"
                name="AT_T"
                value="AT_T"
                checked={alphabetType === "AT_T"}
                onChange={handleRadioChange}
              />
              <label htmlFor="AT_T">AT&T</label>
            </div>
            <div>
              {" "}
              <input
                id="NATO"
                type="radio"
                name="NATO"
                value="NATO"
                checked={alphabetType === "NATO"}
                onChange={handleRadioChange}
              />
              <label htmlFor="NATO">NATO</label>
            </div>
            <SplitWords words={text} alphabetType={alphabetType} />
          </div>
        )}
      </div>
      <div>
        {!!savedWords.length && (
          <>
            <h2>Recent words</h2>
            {savedWords.map((savedWord, index) => {
              return <p key={index}>{savedWord}</p>;
            })}
          </>
        )}
      </div>
    </div>
  );
}
