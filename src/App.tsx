import React, { useState, useRef } from 'react'
import './index.css'


const App: React.FC = () => {
    const inputField = useRef<HTMLInputElement>(null)
    const inputField2 = useRef<string>('')
    const [numberValue, setNumberValue] = useState<number[]>([])
    const [inputValue, setInputValue] = useState('')
    const [keyPressed, setKeyPressed] = useState(String)
    const [mousePos, setMousePos] = useState<number[]>([0, 0])

    // Connect to translator so that the regex, toLoStr and separator is determined by the users language.
    const ENGLISH = {
        regex: /,/g,
        toLoStr: "en",
        separator: ','
    }

    const handleOnInput = async (event: React.KeyboardEvent<HTMLInputElement>) => {

        // Get input value from inputfield
        inputField2.current = (event.currentTarget.value)
        // Get input, remove separator from input and separate each number.
        const numberSplit = (inputField2.current.replace(ENGLISH.regex, '')).split('')
        // Make each number each own item in the NumberValue array.
        const parsedNumbers = numberSplit.map(Number);
        setNumberValue(parsedNumbers);

        console.log("Numberverdi: " + numberValue)

        
        if (keyPressed === 'Backspace') {
            event.preventDefault()
            //delete the number in 'numberValue' relative to the mouse position minus the commas in the thousand separated value. 

            let minus = 0

            if (mousePos[0] <= 4) {
                minus = 2
                for (let i = 0; i < (inputValue.split(ENGLISH.separator).length - minus); i++ ) {
                    numberValue.splice((mousePos[0] - inputValue.split(ENGLISH.separator).length) + i, 1)
                }
            } else if (mousePos[0] <= 7) {
                console.log()
                // LEGG TIL SHIT HERRRRRRRRRRRRRRR
            }
            else {
                alert("Noe funka ikke")
            }


            console.log("NY NUMBER VALUE ETTER BACKSPACE: " + numberValue)
            console.log("JOIN(): " + numberValue.join(''))
            console.log("NY NUMMER ETTER BACKSPACE PT2: " + Number(numberValue.join('')).toLocaleString(ENGLISH.toLoStr))
            // Delay function by 10 millisec otherwise it won't work for some reason.
            setTimeout(() => {
                setInputValue(Number(numberValue.join('')).toLocaleString(ENGLISH.toLoStr)); 
                console.log("NY VERDIIIII: " + inputValue)
            }, 10);
        }

    }
    // Track the cursor in the inputfield.
    const trackMouse = (event: React.MouseEvent<HTMLInputElement>) => {
        // Variables for SelectionStart and SelectionEnd.
        const selStart = Number(event.currentTarget.selectionStart)
        const selEnd = Number(event.currentTarget.selectionEnd)
        // Store Mouse Position so you can use it in a different function.
        setMousePos([selStart, selEnd])
        console.log(inputValue)
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        // Record what key is being pressed and store it in a state for later use in an external function.
        setKeyPressed(event.key)
        console.log("event key ONKEYDOWN: " + event.key)
    }

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        // Store userinput in a state
         setInputValue(Number(event.currentTarget.value.replace(ENGLISH.regex, '')).toLocaleString(ENGLISH.toLoStr))
    }


    return (
        <div>
            <input
                type='text'
                onChange={onChange}
                onInput={handleOnInput}
                onKeyDown={handleKeyDown}
                onMouseMove={trackMouse}
                ref={inputField}
                value={inputValue}
            >
            </input>
            <p>
                {numberValue}
            </p>
        </div>
    )
}

export default App