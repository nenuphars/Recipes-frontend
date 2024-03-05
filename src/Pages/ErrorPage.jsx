import './ErrorPage.css'
import { Link } from 'react-router-dom'
function ErrorPage(){
return(
    <div id="errorPage-container">
        <h1>The page you are searching does not exist 🙁</h1>
        <br></br><br></br>
        <Link to="/"> <button id="errorPage-button">Go to homepage</button></Link>
    </div>
    
)
}

export default ErrorPage