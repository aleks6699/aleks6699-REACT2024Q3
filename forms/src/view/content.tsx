import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import './content.css';
export default function Main() {
  const countries = useSelector((state: RootState) => state.forms.forms);
  console.log(countries);

  return (
    <div>
      {Object.keys(countries).length > 0 ? (
        <div className="contact">
          <div className="inner-contact">
            {countries.profilePicture && (
              <div className="image-container">
                <img src={`${countries.profilePicture}`} alt="Country" />
              </div>
            )}
            <div className="text-container">
              <p>
                <span>Name: </span>
                {countries.name}
              </p>
              <p>
                <span>Age:</span> {countries.age}
              </p>
              <p>
                <span>Email: </span>
                {countries.email}
              </p>
              <p>
                <span>Password: </span>
                {countries.password}
              </p>
              <p>
                <span>Gender: </span>
                {countries.gender}
              </p>
              <p>
                <span>Terms:</span>{' '}
                {countries.terms ? 'Accepted' : 'Not Accepted'}
              </p>
              <p>
                <span>Country:</span> {countries.country}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
