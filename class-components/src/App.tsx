import { Component } from 'react';
import './App.css';
import Page from './view/page';
import ErrorBoundary from './components/errorBoundary/errorBoundary';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Page />
      </ErrorBoundary>
    );
  }
}

export default App;
