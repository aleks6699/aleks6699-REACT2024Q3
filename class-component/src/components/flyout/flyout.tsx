'use client';
import styles from './flyout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, clearFavorites } from '../../store/store';
import convertToCSV from '../../utils/convertCsv';
import useTheme from '../../hooks/useTheme';

export default function Flyout() {
  const { theme } = useTheme();

  const dispatch = useDispatch();
  const favoritesList = useSelector(
    (state: RootState) => state.favoritesList.favoritesList
  );

  function hiddenFlyout(): boolean {
    return favoritesList.length > 0;
  }

  return (
    <div className={`${styles.flyout_container} ${theme ? styles.light : ''}`}>
      <div
        className={`${styles.flyout} ${hiddenFlyout() ? '' : styles.flyout_hidden}`}
      >
        <div className="selected">Selected items: {favoritesList.length}</div>
        <div className={styles.inner_flyout}>
          <button
            className={styles.flyout_clear}
            type="button"
            onClick={() => dispatch(clearFavorites())}
          >
            Unselect all
          </button>
          <a
            className={styles.flyout_download}
            href={convertToCSV(favoritesList)}
            download={`starwars_${favoritesList.length}.csv`}
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
