import './index.css'
import React from "react"

export default function App() {
  const inputRef = React.useRef(null)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  function handleKeyDown(e) {
    if (!inputRef.current) {return null}
    
    if(!e.key.match(/[0-9]/) 
      && e.key !== "Backspace" 
      && e.key !== "Delete"
      && e.key !== "ArrowLeft" 
      && e.key !== "ArrowRight"
      && e.key !== "ArrowUp"
      && e.key !== "ArrowDown"
      && !e.ctrlKey
    ) { return e.preventDefault() }
    e.preventDefault()
    const target = e.nativeEvent.target
  
    let sel = {
      start: target.selectionStart ?? 0, 
      end: target.selectionEnd ?? 0
    }

    const formattedNumber = formatNumber(
      target.value.substring(0, sel.start) + e.key + target.value.substring(sel.end)
    ) 
    
    const commas = formattedNumber.match(/,/g) || []
    const oldCommas = inputRef.current.value.match(/,/g) || []

    commas.length !== oldCommas.length ? (
      sel.end += 1
    ) : null

    inputRef.current.value = formattedNumber

    inputRef.current.selectionEnd = sel.end + 1
    inputRef.current.selectionStart = sel.end + 1
  }
  

  const formatNumber = (num) => {
    return BigInt(num.replace(/\D+/g, "")).toLocaleString("en");
  };

  function handleChange() {
    console.log("jea")
  }

  return (
    <>
      <input     
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      ref={inputRef}
      />
    </>
    );
}