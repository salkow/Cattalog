import { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Layout from './layout/Layout';

const CatImages = lazy(() => { return import('./pages/CatImages/CatImages'); });
const CatBreeds = lazy(() => { return import('./pages/CatBreeds/CatBreeds'); });
const FavouriteCats = lazy(() => { return import('./pages/FavouriteCats/FavouriteCats'); });

const AppRouter: React.FC = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <Layout>
            <CatImages />
          </Layout>
        } />

        <Route path='/breeds' element={
          <Layout>
            <CatBreeds />
          </Layout>
        } />

        <Route path='/favourites' element={
          <Layout>
            <FavouriteCats />
          </Layout>
        } />

        <Route path='*' element={ <Navigate replace to='/' /> } />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;