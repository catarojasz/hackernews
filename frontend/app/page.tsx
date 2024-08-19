'use client'

import React, { useState } from 'react';
import Header from './components/molecules/Header/Header';
import StoryContainer from './components/organisms/StoryContainer';

const Home: React.FC = () => {
  return (
    <>
      <Header title="HN Feed" subtitle="We <3 hacker news!" />
      <StoryContainer />
    </>
  );
};

export default Home;