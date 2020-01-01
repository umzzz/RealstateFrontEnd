import React from 'react';
import './App.css';
import Listing from './Listing'
import Container from '@material-ui/core/Container';

function App() {
  return (
    <div>
    <Container maxWidth="lg" >
      <Listing/>
      </Container>
    </div>
  );
}

export default App;
