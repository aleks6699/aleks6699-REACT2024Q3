import './form.css';
import PasswordStrength from '../components/password/password';
import getPasswordValidity from '../utils/getPasswordValidate';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useForm } from '../hooks/useFormUncontrolled.tsx';

export default function FormUncontrolled() {
  const {
    nameRef,
    ageRef,
    emailRef,
    passwordRef,
    passwordConfirmRef,
    maleRef,
    femaleRef,
    termsRef,
    profilePictureRef,
    countryRef,
    buttonRef,
    errors,
    createUser,
  } = useForm();

  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );

  return (
    <form className="form-uncontrolled" onSubmit={createUser} noValidate>
      <div className="inner-uncontrolled inner-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" ref={nameRef} />
        <p className="error">{errors.name}</p>
      </div>
      <div className="inner-uncontrolled inner-form">
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" ref={ageRef} />
        <p className="error">{errors.age}</p>
      </div>
      <div className="inner-uncontrolled inner-form">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" ref={emailRef} />
        <p className="error">{errors.email}</p>
      </div>

      <div className="inner-uncontrolled inner-form">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={passwordRef}
          autoComplete="new-password"
        />
        <p className="error">{errors.password}</p>
        <PasswordStrength
          password={getPasswordValidity(passwordRef.current?.value).toString()}
        />
      </div>

      <div className="inner-uncontrolled inner-form">
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          ref={passwordConfirmRef}
          autoComplete="new-password"
        />

        <p className="error">{errors.passwordConfirm}</p>
      </div>
      <div className="inner-uncontrolled inner-form">
        <label>Gender:</label>
        <div className=" inner-gender">
          <div className="inner-uncontrolled inner-form">
            <label htmlFor="gender-male">Male</label>

            <input
              type="radio"
              id="gender-male"
              name="gender"
              value="male"
              ref={maleRef}
            />
          </div>

          <div className="inner-uncontrolled inner-form">
            <label htmlFor="gender-female">Female</label>

            <input
              type="radio"
              id="gender-female"
              name="gender"
              value="female"
              ref={femaleRef}
            />
          </div>
        </div>
        <p className="error">{errors.gender}</p>
      </div>
      <div className="inner-uncontrolled inner-form">
        <label htmlFor="terms">I accept the Terms and Conditions</label>
        <input type="checkbox" id="terms" name="terms" ref={termsRef} />
        <p className="error">{errors.terms}</p>
      </div>
      <div className="inner-uncontrolled inner-form">
        <label htmlFor="profile-picture">Upload Profile Picture:</label>
        <input
          type="file"
          id="profile-picture"
          name="profilePicture"
          accept=".jpeg,.jpg,.png"
          ref={profilePictureRef}
        />

        <p className="error">{errors.profilePicture}</p>
      </div>
      <div className="inner-uncontrolled inner-form">
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          list="country-list"
          ref={countryRef}
        />
        <datalist id="country-list">
          {countries.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </datalist>
        <p className="error">{errors.country}</p>
      </div>

      <button className="btn btn-uncontrolled" type="submit" ref={buttonRef}>
        Submit
      </button>
    </form>
  );
}
