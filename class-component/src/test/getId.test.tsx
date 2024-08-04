import getId from '../utils/getId';

describe('getId', () => {
  it('should return the correct ID from a URL', () => {
    const url = 'https://swapi.dev/api/people/1/';
    expect(getId(url)).toBe('1');
  });

  it('should return null if the URL does not end with an ID', () => {
    const url = 'https://swapi.dev/api/people/';
    expect(getId(url)).toBeNull();
  });

  it('should return null if the URL is null', () => {
    const url = null;
    expect(getId(url)).toBeNull();
  });

  it('should return null if the URL is an empty string', () => {
    const url = '';
    expect(getId(url)).toBeNull();
  });

  it('should handle URLs with multiple segments correctly', () => {
    const url = 'https://swapi.dev/api/people/1234/';
    expect(getId(url)).toBe('1234');
  });

  it('should return null if the URL does not match the expected pattern', () => {
    const url = 'https://swapi.dev/api/people/1234/extra/';
    expect(getId(url)).toBeNull();
  });
});
