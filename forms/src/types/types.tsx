interface IForms {
  name: string | undefined;
  age: string | undefined;
  email: string | undefined;
  password: string | undefined;
  passwordConfirm: string | undefined;
  gender: string | undefined;
  terms: boolean | undefined;
  profilePicture: FileReader | File | null;
  country: string | undefined;
}
export default IForms;
