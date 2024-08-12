import './form.css';
import PasswordStrength from '../components/password/password';
import getPasswordValidity from '../utils/getPasswordValidate';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserSchemaControlled } from '../validation/validation';
import { useNavigate } from 'react-router-dom';
import { createUserData } from '../store/store';
import imageUploaded from '../utils/converterBase64';
import { FormData } from '../types/types';

export default function FormControlled() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(UserSchemaControlled),
    mode: 'all',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );
  const password: string = watch('password');

  const onSubmit = async (data: FormData) => {
    try {
      const file = (data.profilePicture as File[])[0];
      const imageBase64 = await imageUploaded(file);

      dispatch(
        createUserData({
          ...data,
          age: data.age.toString(),
          profilePicture: imageBase64,
          terms: data.terms ?? false,
        })
      );
      navigate('/');
      console.log(data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <form
      className="form-controlled"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="inner-uncontrolled inner-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" {...register('name')} />
        <p className="error">{errors.name?.message}</p>
      </div>
      <div className="inner-uncontrolled inner-form">
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" {...register('age')} />
        <p className="error">{errors.age?.message}</p>
      </div>
      <div className="inner-uncontrolled inner-form">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" {...register('email')} />
        <p className="error">{errors.email?.message}</p>
      </div>

      <div className="inner-uncontrolled inner-form">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          {...register('password')}
          autoComplete="new-password"
        />
        <p className="error">{errors.password?.message}</p>
        <PasswordStrength password={getPasswordValidity(password).toString()} />
      </div>

      <div className="inner-uncontrolled inner-form">
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          {...register('passwordConfirm')}
          autoComplete="new-password"
        />

        <p className="error">{errors.passwordConfirm?.message}</p>
      </div>
      <div className="inner-uncontrolled inner-form">
        <label>Gender:</label>
        <div className=" inner-gender">
          <div className="inner-uncontrolled inner-form">
            <label htmlFor="gender-male">Male</label>

            <input
              type="radio"
              id="gender-male"
              value="male"
              {...register('gender')}
            />
          </div>

          <div className="inner-uncontrolled inner-form">
            <label htmlFor="gender-female">Female</label>

            <input
              type="radio"
              id="gender-female"
              value="female"
              {...register('gender')}
            />
          </div>
        </div>
        <p className="error">{errors.gender?.message}</p>
      </div>
      <div className="inner-uncontrolled inner-form">
        <label htmlFor="terms">I accept the Terms and Conditions</label>
        <input type="checkbox" id="terms" {...register('terms')} />
        <p className="error">{errors.terms?.message}</p>
      </div>
      <div className="inner-uncontrolled inner-form">
        <label htmlFor="profile-picture">Upload Profile Picture:</label>
        <input
          type="file"
          id="profile-picture"
          accept=".jpeg,.jpg,.png"
          {...register('profilePicture')}
        />

        <p className="error">{errors.profilePicture?.message}</p>
      </div>
      <div className="inner-uncontrolled inner-form">
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          list="country-list"
          {...register('country')}
        />
        <datalist id="country-list">
          {countries.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </datalist>
        <p className="error">{errors.country?.message}</p>
      </div>

      <button
        className="btn btn-uncontrolled"
        type="submit"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
}
