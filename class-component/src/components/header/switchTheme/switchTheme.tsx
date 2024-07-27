import useTheme from '../../../hooks/useTheme';

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
        <span data-testid="thumb" className="thumb" />
      </label>
    </button>
  );
}
