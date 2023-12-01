import React from 'react';
import MainLayout from '../../components/MainLayout.jsx';
import Hero from './container/Hero.jsx';
import Articles from './container/Articles.jsx';

const HomePage = () => {
  return (
    <>
    <MainLayout>
      <Hero />
      <Articles />
    </MainLayout>
    </>
  )
}

export default HomePage;