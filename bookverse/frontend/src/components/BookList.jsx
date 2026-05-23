
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchBooks } from "../features/books/booksSlice";
import { addToCart } from "../features/cart/cartSlice";

const BookList = () => {
  const dispatch = useDispatch();

  const { items, loading } = useSelector(
    state => state.books
  );

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Books</h1>

      {items.map(book => (
        <div key={book._id}>
          <h3>{book.title}</h3>

          <button
            onClick={() => dispatch(addToCart(book))}
          >
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
