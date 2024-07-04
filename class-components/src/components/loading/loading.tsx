import { Component } from 'react';
import './loading.css';
import loading from '/loading.gif';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <img src={loading} alt="loading" />
      </div>
    );
  }
}
