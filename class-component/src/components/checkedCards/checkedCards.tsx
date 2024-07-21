import './checked.css';
type Props = {
  onCange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
};
export const MagicCheckbox = ({ onCange, checked }: Props) => {
  return (
    <div className="wrapper-checkbox">
      <label className="textLabel">
        Selected card
        <input
          type="checkbox"
          className="magicCheckbox"
          onChange={onCange}
          checked={checked}
        />
      </label>
    </div>
  );
};
