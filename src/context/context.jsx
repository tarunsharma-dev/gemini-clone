import { createContext, useState } from "react";

import PropTypes from "prop-types";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };
  const onSent = async (prompt) => {
    //

    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);

      response = await runChat(input);
    }

    let responseArray = response.split("**");
    let newResponse = "";
    console.log(responseArray);
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b class='font-semibold'>" + responseArray[i] + "</b>";
      }
    }
    console.log(newResponse);
    let newResponse2 = newResponse.split("*").join("</br>");

    let newResponseArray = newResponse2.split(" ");

    for (let i = 0; i < newResponseArray.length; i++) {
      const newxtWord = newResponseArray[i];
      delayPara(i, newxtWord + " ");
    }
    // setResultData(newResponse2);
    setLoading(false);
    setInput("");
  };

  // onSent("What is react js?");

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    setLoading,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;

ContextProvider.propTypes = {
  children: PropTypes.any,
};
