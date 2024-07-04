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
    const { results } = this.props;

    return (
      <main className="results">
        {results.length === 0 ? (
          <div className="found">No results found</div>
        ) : (
          results.map((result, index) => (
            <div className="result-item" key={index}>
              <h2>{result.name}</h2>
              <p>Rotation Period: {result.rotation_period}</p>
              <p>Climate: {result.climate}</p>
              <p>Terrain: {result.terrain}</p>
              <p>Diameter: {result.diameter}</p>
            </div>
          ))
        )}
      </main>
    );
  }
}
