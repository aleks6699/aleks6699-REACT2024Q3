import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
export default function CountryList() {
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );

  return (
    <>
      <label htmlFor="country">Country:</label>
      <input
        type="text"
        id="country"
        name="country"
        list="country-list"
        autoComplete="off"
      />
      <datalist id="country-list">
        {countries.map((country) => (
          <option key={country}>{country}</option>
        ))}
      </datalist>
      ;
    </>
  );
}
