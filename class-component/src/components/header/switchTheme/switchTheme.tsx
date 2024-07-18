import useTheme from '../../../hooks/useTheme';
import './switchTheme.css';

export default function SwitchTheme() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="toggle">
      <input
        className="btn"
        type="checkbox"
        id="btn"
        onChange={toggleTheme}
        checked={theme}
      />
      <label htmlFor="btn">
        <span className="thumb" />
      </label>
    </button>
  );
}
