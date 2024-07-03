import { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import Main from './components/main/main';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Main />
      </>
    );
  }
}

export default App;
