import './password.css';
import showPasswordStrangth from '../../utils/showPasswordStrangth';

export default function PasswordStrength({ password }: { password: string }) {
  console.log(password);
  return (
    <div className="password-strength">{showPasswordStrangth(password)}</div>
  );
}
