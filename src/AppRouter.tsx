import { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

const CatImages = lazy(() => { return import('./pages/CatImages/CatImages'); });
const CatBreeds = lazy(() => { return import('./pages/CatBreeds/CatBreeds'); });
const FavouriteCats = lazy(() => { return import('./pages/FavouriteCats/FavouriteCats'); });

const AppRouter: React.FC = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <CatImages /> } />
        <Route path='*' element={ <Navigate replace to='/' /> } />
        <Route path='/breeds' element={ <CatBreeds /> } />
        <Route path='/favourites' element={ <FavouriteCats /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;