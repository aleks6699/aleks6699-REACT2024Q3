import './checked.css';
export const MagicCheckbox = () => {
  return (
    <div className="wrapper-checkbox">
      <label className="textLabel">
        Selected card
        <input type="checkbox" className="magicCheckbox" />
      </label>
    </div>
  );
};
