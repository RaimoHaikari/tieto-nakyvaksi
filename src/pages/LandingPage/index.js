import { Link } from "react-router-dom";

const LandingPage = () => {

    return (
        <div>
            Etusivun juttu
            <ul>
                <li><Link to="/zoomableCirclePacking">Zoomattavva mikälie</Link></li>
            </ul>
        </div>
    );
};

export default LandingPage;