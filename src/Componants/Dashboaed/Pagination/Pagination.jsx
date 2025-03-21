import ReactPaginate from "react-paginate";
import './Pagination.css'


export default function PaginatedItems({ itemsPerPage , Total , ChoosedPage }) {

  const pagecount = Total / itemsPerPage


  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={(e) => ChoosedPage(e.selected + 1)}  // .selected is from raect paginate , onPageChange called when changing pages ,,, So set page must be a state in every page
        pageRangeDisplayed={1} // range before ...
        pageCount={pagecount}
        previousLabel="<"
        renderOnZeroPageCount={null} // to delete paginate if no pages
        containerClassName="custom pagination d-flex  align-items-center justify-content-center"
        pageLinkClassName="pagination tag anchor mx-2 text-secendary rounded-circle"
        activeLinkClassName="bg-primary text-white"
      />
    </>
  );
}