import React from 'react';
import Commons from './Commons';
import web from '../src/images/w10.png'

const Home=()=> {
  return (
 <Commons name='Start Building Your Own Career...' imgsrc={web} visit='/courses' btname='Get Started'></Commons>
  );
}

export default Home;