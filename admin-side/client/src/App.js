import logo from './logo.svg';
import './App.css';
import Product from './components/product/Product';
import Allproduct from './components/product/Allproduct';
import Command from './components/command/Command';
import Password from './components/password/Password';
import Facture from './components/facture/Facture'
import Slide from './components/slide/Slide';
import BestSeller from './components/bestseller/BestSeller';
import Bestsell from './components/charts/Bestsell';
import Formrequest from './components/slide/Formrequest';
import DeleteBestProduct from './components/bestseller/DeleteBestProduct';
import PresentationHome from './components/Presentation/PresentationHome';
import Advantage from './components/advantage/Advantage';
import Feedback from './components/feedback/Feedback';
import Cart from './components/cart/Cart';
import Newsletter from './components/newsletter/Newsletter';
import Stock from './components/stock-management/Stock';
import Deletefeedback from './components/feedback/Deletefeedback';
import Deleteadvantage from './components/advantage/Deleteadvantage';
import DeleteSlide from './components/slide/DeleteSlide';
import Auth from './components/auth/Auth';
import Shipping from './components/shipping/Shipping';
import Landingpage from './components/landing-page/Landingpage';
import Commandbox from './components/commandebox/Commandbox';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Workshop from './components/workshop/Wrkshop';
import Addbox from './components/box/Addbox';
import Devis from './components/devis/Devis';
import Home from './components/home/Home';
function App() {
  return (
    <div className="App">
        <BrowserRouter /*basename={'/adminmabox'}*/>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/command" element={<Command />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Product />} />
          <Route path="/home/slide" element={<Slide />} />
          <Route path="/setting/login" element={<Password />} />
          <Route path="/stock/management" element={<Stock />} />
          <Route path="/devis" element={<Devis />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/statistique" element={<Bestsell />} />
          <Route path="/landing" element={<Landingpage />} />
          <Route path="/search/delivery" element={<Shipping />} />
          <Route path="/delete/slides" element={<DeleteSlide />} />
          <Route path="/bestsell" element={<BestSeller  />} />
          <Route path='/box' element={<Addbox />} />
          <Route path='/commande-box' element={<Commandbox />} />


          Feedback
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
