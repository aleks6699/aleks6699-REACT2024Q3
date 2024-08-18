import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserSchemaControlled } from '../validation/validation';
import { useNavigate } from 'react-router-dom';
import { createUserData } from '../store/store';
import imageUploaded from '../utils/converterBase64';
import { FormData } from '../types/types';
export default function useFormControlled() {
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
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return {
    handleSubmit,
    register,
    errors,
    isValid,
    onSubmit,
    countries,
    password,
  };
}
