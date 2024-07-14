import './pagination.css';

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
        className={`page-button ${activePage === (i + 1).toString() ? 'active' : ''}`}
        onClick={(event) => clickPagination && clickPagination(event)}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <>
      {pageCount === 0 ? (
        <></>
      ) : (
        <div className="pagination">{pageButtons}</div>
      )}
    </>
  );
}
