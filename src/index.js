import ReactDOM from 'react-dom'
import Layout from "./components/Layout"
import "./style/style.css"

export default function App(){
    return(
        <>
        <Layout/>
        </>
    )
}

ReactDOM.render(App(), document.querySelector(".root"))