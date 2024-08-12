import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import NoForms from '../components/noForms/noForms';
import './content.css';

export default function Main() {
  const forms = useSelector((state: RootState) => state.forms.forms);
  console.log(forms);

  return (
    <>
      {forms.length > 0 ? (
        <div className="contact">
          <div className="contact-container">
            {forms.map((form, index) => (
              <div key={index} className="inner-contact">
                {form.profilePicture && (
                  <div className="image-container">
                    <img src={`${form.profilePicture}`} alt="Profile" />
                  </div>
                )}
                <div className="text-container">
                  <p>
                    <span>Name: </span>
                    {form.name}
                  </p>
                  <p>
                    <span>Age:</span> {form.age}
                  </p>
                  <p>
                    <span>Email: </span>
                    {form.email}
                  </p>
                  <p>
                    <span>Password: </span>
                    {form.password}
                  </p>
                  <p>
                    <span>Gender: </span>
                    {form.gender}
                  </p>
                  <p>
                    <span>Terms:</span>{' '}
                    {form.terms ? 'Accepted' : 'Not Accepted'}
                  </p>
                  <p>
                    <span>Country:</span> {form.country}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NoForms />
      )}
    </>
  );
}
