import { useState, useRef } from 'react';
import * as yup from 'yup';
import UserSchema from '../validation/validation.tsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUserData } from '../store/store.tsx';
import IForms from '../types/types.tsx';
import imageUploaded from '../utils/converterBase64.tsx';

export const useForm = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: IForms = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      passwordConfirm: passwordConfirmRef.current?.value,
      gender: maleRef.current?.checked
        ? 'male'
        : femaleRef.current?.checked
          ? 'female'
          : '',

      terms: termsRef.current?.checked,
      profilePicture: profilePictureRef.current?.files?.[0] ?? null,
      country: countryRef.current?.value,
    };

    try {
      await UserSchema.validate(formData, { abortEarly: false });
      setErrors({});
      const imageBase64 = await imageUploaded(
        profilePictureRef.current?.files?.[0] ?? null
      );

      dispatch(
        createUserData({
          ...formData,
          profilePicture: imageBase64 as FileReader | File | null,
        })
      );
      navigate('/');
    } catch (error) {
      const validationErrors: Record<string, string> = {};

      if (error instanceof yup.ValidationError) {
        error.inner.forEach((error) => {
          if (error.path !== undefined) {
            validationErrors[error.path] = error.message;
          }
        });
      }

      setErrors(validationErrors);
    }
  };

  return {
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
    setErrors,
    createUser,
  };
};
