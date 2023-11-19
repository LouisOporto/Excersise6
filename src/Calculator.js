import { useState } from 'react';
import './calculator.css'

function CalculatorButton({ value, onCalculatorButtonClick }) {
  let addon;
  //Handle creating buttons for each function (0-9, +, -, *, /, C, =)
  if (value === '+' || value === '-' || value === 'X' || value === '/' || value === '=') {
    addon = "calButton operation";
  } else if(value ==='C') {
    addon = "calButton clear";
  } else {
    addon = "calButton";
  }

  return (
    <button className={addon} onClick={onCalculatorButtonClick}>
      {value}
    </button>
  );
}

function Panel({ value }) {
  //Display for showing math
  return (
    <div className="display">{value}</div>
  );
}

function Calculator() {
  //Main function for calculator to run
  const [result, setResult] = useState('');
  function handleClick(i) {
    if (i === '=') {
      setResult(calculateAnswer(result));
    } else if (i === 'C') {
      setResult('');
    } else {
      setResult(result + i);
    }
  }
  // Area where buttons are going to be calculated


  return (
    <>
      <div className="calBody">
        <Panel value={result} />
        <div className="board-row">
          <CalculatorButton value="7" onCalculatorButtonClick={() => handleClick('7')} />
          <CalculatorButton value="8" onCalculatorButtonClick={() => handleClick('8')} />
          <CalculatorButton value="9" onCalculatorButtonClick={() => handleClick('9')} />
          <CalculatorButton className="operation" value="/" onCalculatorButtonClick={() => handleClick('/')} />
        </div>
        <div className="board-row">
          <CalculatorButton value="4" onCalculatorButtonClick={() => handleClick('4')} />
          <CalculatorButton value="5" onCalculatorButtonClick={() => handleClick('5')} />
          <CalculatorButton value="6" onCalculatorButtonClick={() => handleClick('6')} />
          <CalculatorButton className="operation" value="X" onCalculatorButtonClick={() => handleClick('*')} />
        </div>
        <div className="board-row">
          <CalculatorButton value="1" onCalculatorButtonClick={() => handleClick('1')} />
          <CalculatorButton value="2" onCalculatorButtonClick={() => handleClick('2')} />
          <CalculatorButton value="3" onCalculatorButtonClick={() => handleClick('3')} />
          <CalculatorButton className="operation" value="-" onCalculatorButtonClick={() => handleClick('-')} />
        </div>
        <div className="board-row">
          <CalculatorButton className="clear" value="C" onCalculatorButtonClick={() => handleClick('C')} />
          <CalculatorButton value="0" onCalculatorButtonClick={() => handleClick(0)} />
          <CalculatorButton className="operation" value="=" onCalculatorButtonClick={() => handleClick('=')} />
          <CalculatorButton className="operation" value="+" onCalculatorButtonClick={() => handleClick('+')} />
        </div>
      </div>
    </>
  )

}

function calculateAnswer(problem) {
  let numbers = problem.split(/[+-]/g);
  let operations = problem.split(/[0-9*/]/g).filter(e => e.length);
  for (let i = 0; i < numbers.length; i++) {
    let currentNumber = numbers[i].split(/[/*]/g);
    let currentOperation = numbers[i].split(/[0-9]/g).filter(e => e.length);
    let newNumber = currentNumber[0];
    for (let i = 1; i < currentNumber.length; i++) {
      if (currentOperation[i - 1] === '*') {
        newNumber *= currentNumber[i];
      } else if (currentOperation[i - 1] === '/') {
        newNumber /= currentNumber[i];
      }
    }
    numbers[i] = newNumber;
  }

  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (operations[i - 1] === '+') {
      result += numbers[i];
    } else {
      result -= numbers[i];
    }
  }
  return result;
}

export default Calculator;
