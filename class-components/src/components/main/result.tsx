import { Component } from 'react';
import './main.css';
interface MainProps {
  results: {
    name: string;
    climate: string;
    terrain: string;
    diameter: string;
    rotation_period: string;
  }[];
}

export default class Main extends Component<MainProps> {
  render() {
    return (
      <main className="results">
        {this.props.results.map((result, index) => (
          <div className="result-item" key={index}>
            <h2>{result.name}</h2>
            <p> Period: {result.rotation_period}</p>
            <p> Climate: {result.climate}</p>
            <p> Terrain: {result.terrain}</p>
            <p> Diameter: {result.diameter}</p>
          </div>
        ))}
      </main>
    );
  }
}
