import { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

const AllCats = lazy(() => { return import('./pages/AllCats'); });
const CatBreeds = lazy(() => { return import('./pages/CatBreeds'); });
const FavouriteCats = lazy(() => { return import('./pages/FavouriteCats'); });

const AppRouter: React.FC = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <AllCats /> } />
        <Route path='*' element={ <Navigate replace to='/' /> } />
        <Route path='/breeds' element={ <CatBreeds /> } />
        <Route path='/favourites' element={ <FavouriteCats /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;