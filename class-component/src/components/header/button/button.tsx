'use client';
import styles from './button.module.css';
import useTheme from '../../../hooks/useTheme';
type ButtonProps = {
  onClick?: () => void | undefined;
};

export default function Button({ onClick }: ButtonProps) {
  const { theme } = useTheme();
  return (
    <button
      className={`${styles.button} ${theme ? styles.light : ''}`}
      type="button"
      onClick={onClick}
    >
      Search
    </button>
  );
}
