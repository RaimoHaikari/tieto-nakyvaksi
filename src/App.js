import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Header from "./components/header";
import Footer from "./components/footer";

import LandingPage from "./pages/LandingPage";
import Pylvaskuvio from "./pages/Pylvaskuvio";
import Helmitaulukuvio from "./pages/Helmitaulukuvio";

// import LetterFrequences from "./components/VaakaPylvaskuvio/LetterFrequences";
import VaakaPylvaskuvio from "./components/VaakaPylvaskuvio";
import Pyramidikuvio from "./components/Pyramidikuvio";
import VaestoPyramidi from "./components/Pyramidikuvio/VaestoPyramidi";

/*
 *       <LetterFrequences />
         <VaakaPylvaskuvio />
         <VaestoPyramidi />
 */
const App = () => {

  return (
    <Router>

      <Header />

      <Routes>
        <Route path="/pylvaskuvio/vaakapylvaskuvio" element = {<VaakaPylvaskuvio />} />
        <Route path="/pylvaskuvio/pyramidikuvio" element = {<Pyramidikuvio />} />
        <Route path="/pylvaskuvio" element = {<Pylvaskuvio />} />
        <Route path="/helmitaulukuvio" element = {<Helmitaulukuvio />}  />
        <Route path="/" element={<LandingPage />} />
      </Routes>

      <Footer />
    
    </Router>
  );
};

/*

      <Routes>
        <Route path="/pylvaskuvio/vaakapylvaskuvio" element = {<VaakaPylvaskuvio />} />
        <Route path="/pylvaskuvio/pyramidikuvio" element = {<Pyramidikuvio />} />
        <Route path="/pylvaskuvio" element = {<Pylvaskuvio />} />
        <Route path="/helmitaulukuvio" element = {<Helmitaulukuvio />}  />
        <Route path="/" element={<LandingPage />} />
      </Routes>
*/

export default App;

