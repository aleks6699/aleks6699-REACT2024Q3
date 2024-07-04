import { Component, FormEvent } from 'react';
import Header from '../components/header/header';
import Main from '../components/main/result';
import Loading from '../components/loading/loading';
import ButtonError from '../components/button-error/button-error';
interface Planet {
  name: string;
  climate: string;
  terrain: string;
  diameter: string;
  rotation_period: string;
}

interface PageState {
  inputValue: string;
  searchResults: Planet[];
  isLoading: boolean;
  hasError: boolean;
}

// Компонент Header
export default class Page extends Component<unknown, PageState> {
  state: PageState = {
    inputValue: '',
    searchResults: [],
    isLoading: false,
    hasError: false,
  };

  handleInput = (event: FormEvent) => {
    this.setState({
      inputValue: (event.currentTarget as HTMLInputElement).value,
    });
  };

  handleClick = async () => {
    return await this.getData(this.state.inputValue);
  };
  throwError = () => {
    this.setState({
      hasError: true,
    });
  };

  async getData(searchTerm: string) {
    this.setState({ isLoading: true });
    const response = await fetch(
      `https://swapi.dev/api/planets/?page=1&search=${searchTerm.trim()}`
    );
    const data = await response.json();
    this.setState({ searchResults: data.results });
    localStorage.setItem('inputValue', searchTerm);
    localStorage.setItem('searchResults', JSON.stringify(data.results));
    return this.setState({ isLoading: false });
  }

  componentDidMount() {
    const savedValue = localStorage.getItem('inputValue');
    const savedResults = localStorage.getItem('searchResults');
    if (savedValue && savedResults) {
      this.setState({
        inputValue: savedValue,
        searchResults: JSON.parse(savedResults),
      });
    } else {
      this.getData('');
    }
  }

  render() {
    if (this.state.hasError) {
      throw new Error('Why did you break everything?)');
    }
    return (
      <>
        <Header
          inputValue={this.state.inputValue}
          onInput={this.handleInput}
          onClick={this.handleClick}
        />
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <Main results={this.state.searchResults} />
        )}

        <ButtonError onClick={this.throwError} />
      </>
    );
  }
}
