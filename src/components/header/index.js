import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="primary-header">

            <div className="container">

                <div className="nav-wrapper">

                    <Link to="/">
                        H.I.M.A.A.N
                    </Link>
                    
                    <nav className="primary-navigation">

                        <ul role="list" aria-label="Primary" className="nav-list" id="primary-navigation">

                            <li>
                                <Link to="/pylvaskuvio">Pylväskuvio</Link>
                            </li>
                            <li>
                                <Link to="/helmitaulukuvio">Helmitaulukuvio</Link>
                            </li>

                        </ul>
                    
                    </nav>
                
                </div>
            
            </div>
        
        </header>
    );
};

export default Header;