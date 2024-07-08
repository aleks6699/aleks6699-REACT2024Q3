import './button-error.css';
interface ButtonErrorProps {
  onClick: () => void;
}

export default function ButtonError({ onClick }: ButtonErrorProps) {
  return (
    <button className="button-error" type="button" onClick={onClick}>
      Error
    </button>
  );
}
