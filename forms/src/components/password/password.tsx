import './password.css';
import showPasswordStrangth from '../../utils/showPasswordStrangth';

export default function PasswordStrength({ password }: { password: string }) {
  return (
    <div className="password-strength">{showPasswordStrangth(password)}</div>
  );
}
