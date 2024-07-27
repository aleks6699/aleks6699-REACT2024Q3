import styles from './pagination.module.css';
import useTheme from '../../hooks/useTheme';

interface PaginationProps {
  pages: string;
  activePage?: string;
  clickPagination?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Pagination({
  pages,
  clickPagination,
  activePage,
}: PaginationProps) {
  const pageCount = parseInt(pages, 10);

  const pageButtons = [];
  for (let i = 0; i < pageCount; i++) {
    pageButtons.push(
      <button
        key={i}
        className={`${styles.page_button} ${activePage === (i + 1).toString() ? styles.active : ''}`}
        onClick={(event) => clickPagination && clickPagination(event)}
      >
        {i + 1}
      </button>
    );
  }

  const { theme } = useTheme();

  return (
    <>
      {pageCount === 0 ? (
        <></>
      ) : (
        <div className={styles.pagination + ` ${theme ? styles.light : ''}`}>
          {pageButtons}
        </div>
      )}
    </>
  );
}
