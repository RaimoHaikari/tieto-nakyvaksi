import { Link } from "react-router-dom";

// import LetterFrequences from "./components/VaakaPylvaskuvio/LetterFrequences";
// import VaakaPylvaskuvio from "./components/VaakaPylvaskuvio";
// import Pyramidikuvio from "./components/Pyramidikuvio";
// import VaestoPyramidi from "./components/Pyramidikuvio/VaestoPyramidi";

const Pylvaskuvio = () => {
    return (
        <div>
            Pylvaskuvioita tänne ja paljon.
            <ul>
                <li><Link to="/pylvaskuvio/vaakapylvaskuvio">Vaakapylvaskuvio</Link></li>
                <li><Link to="/pylvaskuvio/pyramidikuvio">Pyramidikuvio</Link></li>
            </ul>
        </div>
    );
};

export default Pylvaskuvio;