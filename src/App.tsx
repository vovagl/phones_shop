import './App.css';
import React from 'react';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import { Routes, Route} from 'react-router-dom';
import CatalogPage from './pages/CatalogPage.tsx';
import HomePage from './pages/HomePage.tsx';
import CurrentProductPage from './pages/CurrentProductPage.tsx';
import FavoritePage from './pages/FavoritePage.tsx';
import CartPage from './pages/CartPage.tsx';
import phones from "./api/phones.json";
import tablets from "./api/tablets.json";
import accessories from "./api/accessories.json";
import NotFoundPage from './pages/NotFoundPage.tsx';

const App:React.FC=() =>{  
  return (
  // <BrowserRouter basename="/phones_shop">
    <div className='App'>
      <div>
      <Header/>
       {/* basename="/phones_shop"> */}
      <Routes> 
      <Route path= '/' element={<HomePage/>}/>
      <Route path= '/phones' element={<CatalogPage products={phones} title = {'Phones'}/>}/>  
      <Route path= '/tablets' element={<CatalogPage products={tablets} title = {'Tablets'}/>}/>
      <Route path= '/accessories' element={<CatalogPage products={accessories} title= {'Accessories'}/>}/>
      <Route path= '/:title/:id' element={<CurrentProductPage/>}/>
      <Route path= '/favorite' element={<FavoritePage />}/>
      <Route path= '/cart' element={<CartPage />}/>
      <Route path= '/*' element={<NotFoundPage />}/>
      </Routes>
      </div>
      <Footer/>
    </div>
    // </BrowserRouter>
  );
}
//{`${process.env.PUBLIC_URL}/*`}
export default App;
