import * as yup from 'yup';

const UserSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: yup
    .number()
    .transform((value, originalValue) =>
      originalValue.trim() === '' ? null : value
    )
    .nullable()
    .positive('Age must be a positive number')
    .required('Age is required'),
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
      'Email must be a valid email'
    )
    .required('Email is required'),
  password: yup
    .string()
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(
      /[!@#%^&*]/,
      'Password must contain at least one special character (!@#$%^&*)'
    )
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Password confirmation is required'),
  gender: yup.string().required('Gender is required'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
  profilePicture: yup
    .mixed()
    .test(
      'fileFormat',
      'The file must be in PNG or JPEG format.',
      (value) =>
        (value && (value as File).type === 'image/jpeg') ||
        (value as File).type === 'image/png'
    )
    .test(
      'fileSize',
      'The file size must not exceed 2 MB.',
      (value) => value && (value as File).size <= 2000000
    )
    .required('Profile picture is required'),
  country: yup.string().required('Country is required'),
});

export default UserSchema;
