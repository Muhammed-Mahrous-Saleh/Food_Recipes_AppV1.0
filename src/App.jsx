import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PhoneIcon from "./assets/icons/phone.svg?react";
import "./App.css";

function App() {
    return (
        <>
            <h1 className="text-success">
                <i className="fa-regular fa-face-smile"></i>
                <PhoneIcon className="text-danger" />
                Hello World
            </h1>
        </>
    );
}

export default App;
