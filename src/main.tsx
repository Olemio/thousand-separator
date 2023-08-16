import {createRoot} from "react-dom/client"
import App from "./App"

function Main() {
  return (
    <App />
  )
}

// ReactDOM.render(<Main/>, document.getElementById("root"))
const root = createRoot(document.getElementById("root") as HTMLElement)
root.render(<Main />)