import React, { useState, useRef, useEffect } from 'react'
import './index.css'


const App: React.FC = () => {
    const inputField = useRef<HTMLInputElement>(null)
    const inputField2 = useRef<string>('')
    const [numberValue, setNumberValue] = useState<number[]>([])
    const [inputValue, setInputValue] = useState('')
    const [keyPressed, setKeyPressed] = useState('')
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
    }


    let commas = 0

    useEffect(() => {
        if (keyPressed === 'Backspace') {
            // Delete the number in 'numberValue' relative to the mouse position minus the commas in the thousand separated value. 
            numberValue.splice(mousePos[0] - inputValue.split(ENGLISH.separator).length + commas, 1)

            setInputValue(Number(numberValue.join('')).toLocaleString(ENGLISH.toLoStr));
        }
        // setKeyPressed value to blank to avoid loop
        setKeyPressed('')
    }, [ENGLISH.separator, ENGLISH.toLoStr, inputValue, keyPressed, mousePos, numberValue])



    // Track the cursor in the inputfield.
    const trackMouse = (event: React.MouseEvent<HTMLInputElement>) => {
        // Variables for SelectionStart and SelectionEnd.
        const selStart = Number(event.currentTarget.selectionStart)
        const selEnd = Number(event.currentTarget.selectionEnd)
        // Store Mouse Position so you can use it in a different function.
        setMousePos([selStart, selEnd])
        console.log(mousePos)
        console.log(inputValue)
    }


    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        // Record what key is being pressed and store it in a state for later use in an external function.
        setKeyPressed(event.key)

        if (event.key === 'Backspace') {
            event.preventDefault()
        }
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