import { type } from "@testing-library/user-event/dist/type";
import React, { memo, useState } from "react";
import { useEffect } from "react";
import Buttons from "./Components/Buttons";

export default function Calculator() {

    const [inputText, setInputText] = useState("");
    const [numberEntered, setNumberEntered] = useState([]);
    const [lastClicked, setLastClicked] = useState("");
    const [currentNumber, setCurrentNumebr] = useState("");
    const [result, setResult] = useState(0);
    const [memory, setMemory] = useState([]);


    function handleClick(event) {  //update display/add nums/decide next operation
        const textContent = event.target.textContent;
        const className = event.target.className;

        if (lastClicked === "operation-button" && className === "operation-button" && textContent !="C") return;
        if (textContent==="C") {reset();return;}


        setInputText(prev => prev + textContent);
        setCurrentNumebr(prev => className !== "operation-button" ? prev + textContent : prev)
        setNumberEntered(prev => className === "operation-button" ? [...prev, currentNumber] : [...prev])
        setLastClicked(className)
        setMemory([className, textContent, currentNumber])
    }
    console.log(parseFloat(currentNumber))
    if(result===0) setResult(parseFloat(currentNumber)) // goal is to set result to the first number entred and solve current number NAN error
    //console.log(memory[2])
    if (numberEntered.length > 1 && memory[0] === "operation-button") calculate(memory[1])

    function calculate(operation) {

        switch (operation) {
            case " + ":
                
                var newNum = parseFloat(memory[2])
                //console.log(result)
                setResult(prev => prev + newNum)
                setMemory([])
                
                break;
            }
    }

    function reset(){
        setInputText("")
        setNumberEntered([])
        setLastClicked("")
        setCurrentNumebr("")
        setResult(0)
        setMemory([])
    }

    return (
        <div className="calculator-div">

            <div id="display-div">
                <div id="operation-div">{inputText}</div>
                <div id="result-div">{result}</div>
            </div>
            <Buttons onClick={handleClick} />
        </div>
    )
}