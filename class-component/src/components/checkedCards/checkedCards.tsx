import styles from './checked.module.css';
type Props = {
  onCange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
};
export const MagicCheckbox = ({ onCange, checked }: Props) => {
  return (
    <div className={styles.wrapper_checkbox}>
      <label className={styles.textLabel}>
        Selected card
        <input
          type="checkbox"
          className={styles.magicCheckbox}
          onChange={onCange}
          checked={checked}
        />
      </label>
    </div>
  );
};
