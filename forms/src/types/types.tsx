import { InferType } from 'yup';
import { UserSchemaControlled } from '../validation/validation';

export type FormData = InferType<typeof UserSchemaControlled>;

interface IForms {
  name: string | undefined;
  age: string | undefined;
  email: string | undefined;
  password: string | undefined;
  passwordConfirm: string | undefined;
  gender: string | undefined;
  terms: boolean | undefined;
  profilePicture: FileReader | File | null | File[] | string;
  country: string | undefined;
}

export default IForms;
