import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route} from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import HomePage from './pages/HomePage';
import CurrentProductPage from './pages/CurrentProductPage';
import FavoritePage from './pages/FavoritePage';
import CartPage from './pages/CartPage';
import phones from "./api/phones.json";
import tablets from "./api/tablets.json";
import accessories from "./api/accessories.json";
import NotFoundPage from './pages/NotFoundPage';


function App() {
  
  return (
    <div className='App'>
      <div>
      <Header/>
      <Routes> 
      <Route path='/' element={<HomePage/>}/>
      <Route path='/phones' element={<CatalogPage products ={phones} title = {'Phones'}/>}/>  
      <Route path='/tablets' element={<CatalogPage products={tablets} title = {'Tablets'}/>}/>
      <Route path='/accessories' element={<CatalogPage products={accessories} title= {'Accessories'}/>}/>
      <Route path='/:title/:id' element={<CurrentProductPage/>}/>
      <Route path='/favorite' element={<FavoritePage />}/>
      <Route path='/cart' element={<CartPage />}/>
      <Route path='/*' element={<NotFoundPage />}/>
      </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
