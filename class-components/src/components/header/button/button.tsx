import './button.css';
type ButtonProps = {
  onClick?: () => void | undefined;
};

export default function Button({ onClick }: ButtonProps) {
  return (
    <button className="button" type="button" onClick={onClick}>
      Search
    </button>
  );
}
