import './App.css';
import './scss/app.scss';
import React from 'react';
import Header from './componets/Header';
import { Home } from './componets/Pages/Home';
import { Route, Routes } from 'react-router-dom';
import { NotFount } from './componets/Pages/NotFount';
import { Cart } from './componets/Pages/Cart';
import { Page } from './componets/Pages/Page';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="App">
      <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<Page />} />
                <Route path="cart" element={<Cart />} />
                <Route path="*" element={<NotFount />} />
              </Routes>
            </div>
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  );
}

export default App;
