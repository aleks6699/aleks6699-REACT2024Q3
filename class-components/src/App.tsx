import './App.css';
import Page from './view/page';
import ErrorBoundary from './components/errorBoundary/errorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Page />
    </ErrorBoundary>
  );
}

export default App;
