import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home';
import Product from './components/products/Product';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Validation from './components/validation-command/Validation';
import Shop from './components/shop/Shop';
import Contactpage from './components/contact-component/Contactpage';
import Workshop from './components/workshop/Workshop';
import Box from './components/box/Box';
import Boxquestion from './components/box/Boxquestion';
import Boxchoiceproduct from './components/box/Boxchoiceproduct';
import Messagebox from './components/box/Messagebox';
import Informationperso from './components/box/Informationperso';
import Resumecommand from './components/box/Resumecommand';
function App() {
 
  return (
      <BrowserRouter>
        <Routes>
          <Route exact  path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contactpage />} />
          <Route path="/validation-commande" element={<Validation />} />
          <Route path="/validatecommand/:id" element={<Validation />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/box" element={<Box />} />
          <Route path="/box-personnalise/:id" element={<Boxquestion />} />
          <Route path="/box-choix-produit/:id" element={<Boxchoiceproduct />} />
          <Route path="/messagebox/:id" element={<Messagebox />} />
          <Route path="/information-commande/:id" element={<Informationperso />} />
          <Route path="/resume-command/:id" element={<Resumecommand />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
