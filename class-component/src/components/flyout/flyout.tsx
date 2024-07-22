import './flyout.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, clearFavorites } from '../../store/store';
import convertToCSV from '../../utils/convertCsv';

export default function Flyout() {
  const dispatch = useDispatch();
  const favoritesList = useSelector(
    (state: RootState) => state.favoritesList.favoritesList
  );

  function hiddenFlyout(): boolean {
    return favoritesList.length > 0;
  }

  return (
    <div className={`flyout ${hiddenFlyout() ? '' : 'flyout-hidden'}`}>
      <div className="selected">Selected items: {favoritesList.length}</div>
      <div className="inner-flyout">
        <button
          className="flyout-clear"
          type="button"
          onClick={() => dispatch(clearFavorites())}
        >
          Unselect all
        </button>
        <a
          className="flyout-download"
          href={convertToCSV(favoritesList)}
          download={`starwars_${favoritesList.length}.csv`}
        >
          Download
        </a>
      </div>
    </div>
  );
}
