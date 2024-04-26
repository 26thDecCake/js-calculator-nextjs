'use client'

import { useState } from "react";


export default function Home() {
  const [calcResult, setCalcResult] = useState('');
  const [mathExpr, setMathExpr] = useState('');
  const mathExprTrimmed = mathExpr.trim();

  const isMathOpe = (value: string) => {
    return /[*/+-]/.test(value);
  }

  const handleBtnClick = (value: string) => {
    if (value === 'clear') {
      setCalcResult('');
      setMathExpr('0');
    } else if (value === 'negative') {
      if(calcResult === '') return;
      setCalcResult(
        calcResult.toString().charAt(0) === '-' ? calcResult.slice(1) : '-' + calcResult
      );
    } else if (value === 'percent') {
      if(calcResult === '') return;
      setCalcResult(
        (parseFloat(calcResult) / 100).toString()
      );
    } else if (value === '0') {
      if (mathExpr.charAt(0) !== '0') {
        setMathExpr(mathExpr + value);
      }
    } else if (value === '.') {
      const lastDigit = mathExpr.split(/[-+/*]/g).pop();
      if (!lastDigit) return;
      if (lastDigit?.includes('.')) return;
      setMathExpr(mathExpr + value);
    } else if (isMathOpe(value)) {
      // setMathExpr(mathExpr.trim() + ' ' + value + ' ');


      const lastChar = mathExpr.charAt(mathExpr.length - 1);
    if (value === '-' && lastChar === '-') {
      // Allow consecutive negative signs
      setMathExpr(mathExpr + value);
    } else if (isMathOpe(lastChar) && value !== '-') {
      // Replace the last operator with the new one
      setMathExpr(mathExpr.slice(0, -1) + value);
    } else {
      setMathExpr(mathExpr.trim() + ' ' + value + ' ');
    }

    } else if (value === '=') {
      calculateMathExpr();      
    } else {
      if (mathExpr.charAt(0) === '0') {
        setMathExpr(mathExpr.slice(1) + value);
      } else {
        setMathExpr(mathExpr + value);
      }
    }
  }

  const calculateMathExpr = () => {
    if (isMathOpe(mathExprTrimmed.charAt(mathExprTrimmed.length - 1))) return;

    const parts = mathExprTrimmed.split(' ');
    const newParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isMathOpe(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isMathOpe(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }

    const newMathExpr = newParts.join(' ');
    if(isMathOpe(newMathExpr.charAt(0))) {
      setCalcResult(eval(calcResult + newMathExpr) as string);
    } else {
      setCalcResult(eval(newMathExpr) as string);
    }
    setMathExpr('');
  }

  return (
    <main className="flex flex-col items-center justify-content p-24 h-full">
      <h1>JS Calculator</h1>
      <div id="calculator" className="grid grid-cols-4 gap-2 w-1/5 h-2/5 bg-slate-400 p-2 rounded mt-5">
        <div id="display" className="col-span-4 text-right p-2 bg-gray-800 text-white">
          <div id="answer" className="min-h-6">{calcResult}</div>
          <div id="expression" className="min-h-6">{mathExpr}</div>
        </div>
        <div id="buttons" className="col-span-4 grid grid-cols-4 gap-2">
          <button id="clear" onClick={() => handleBtnClick("clear")} className="h-12 bg-gray-300 rounded-full active:scale-95">C</button>
          <button id="negative" onClick={() => handleBtnClick("negative")} className="h-12 bg-gray-300 rounded-full active:scale-95">+/-</button>
          <button id="percentage" onClick={() => handleBtnClick("percentage")} className="h-12 bg-gray-300 rounded-full active:scale-95">%</button>
          <button id="divide" onClick={() => handleBtnClick("/")} className="h-12 bg-yellow-300 rounded-full active:scale-95">/</button>
          <button id="seven" onClick={() => handleBtnClick("7")} className="h-12 bg-gray-600 rounded-full active:scale-95">7</button>
          <button id="eight" onClick={() => handleBtnClick("8")} className="h-12 bg-gray-600 rounded-full active:scale-95">8</button>
          <button id="nine" onClick={() => handleBtnClick("9")} className="h-12 bg-gray-600 rounded-full active:scale-95">9</button>
          <button id="multiply" onClick={() => handleBtnClick("*")} className="h-12 bg-yellow-300 rounded-full active:scale-95">x</button>
          <button id="four" onClick={() => handleBtnClick("4")} className="h-12 bg-gray-600 rounded-full active:scale-95">4</button>
          <button id="five" onClick={() => handleBtnClick("5")} className="h-12 bg-gray-600 rounded-full active:scale-95">5</button>
          <button id="six" onClick={() => handleBtnClick("6")} className="h-12 bg-gray-600 rounded-full active:scale-95">6</button>
          <button id="subtract" onClick={() => handleBtnClick("-")} className="h-12 bg-yellow-300 rounded-full active:scale-95">-</button>
          <button id="one" onClick={() => handleBtnClick("1")} className="h-12 bg-gray-600 rounded-full active:scale-95">1</button>
          <button id="two" onClick={() => handleBtnClick("2")} className="h-12 bg-gray-600 rounded-full active:scale-95">2</button>
          <button id="three" onClick={() => handleBtnClick("3")} className="h-12 bg-gray-600 rounded-full active:scale-95">3</button>
          <button id="add" onClick={() => handleBtnClick("+")} className="h-12 bg-yellow-300 rounded-full active:scale-95">+</button>
          <button id="zero" onClick={() => handleBtnClick("0")} className="h-12 bg-gray-600 col-span-2 rounded-full active:scale-95">0</button>
          <button id="decimal" onClick={() => handleBtnClick(".")} className="h-12 bg-gray-600 rounded-full active:scale-95">.</button>
          <button id="equals" onClick={() => handleBtnClick("=")} className="h-12 bg-blue-600 rounded-full active:scale-95">=</button>
        </div>
      </div>
    </main>
  );
}
