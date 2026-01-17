import React,{ useEffect,useState } from 'react'
import axios from "axios";
import download from "../../images/download.jpg";
import cross from "../../images/wrong_cross.jpg";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Favorite = () => {
  let id = sessionStorage.getItem("id");
  const [favorites, setFavorites] = useState({});
  const [cards,setCards] = useState([])
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchFavorite = async () => {
        try {
          const response = await axios.get(`${window.location.origin}/niko/v1/getfavorite/${id}`);
          setCards(response.data.favoriteList);
        } catch (error) {
          console.error(error);
        }
      };
      fetchFavorite();
    }
  }, [id]);

  const getDownloadLinks = async(bookId) => {
      try {
        const response = await axios.get(`${window.location.origin}/niko/api/books/${bookId}/download`);
        setSelectedBook(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
  };

  return (
  	<div style={{marginTop:"1.25rem"}}>
    <div><h1 style={{fontFamily:"helvetica",padding:"10px"}}>Your Favourites 💗 </h1></div>
    <div className="book-list margin_side">
      {cards.map((book) => (
        <div key={book._id} className="book-card">
          <div className="book-cover">
            <LazyLoadImage
              alt={book.title}
              effect="blur"
              wrapperProps={{ style: { transitionDelay: "1s" } }}
              src={book.coverUrl}
              onError={(e) => {
                e.target.src = 'https://archive.org/images/notfound.png';
              }}
            />
          </div>
          <div className="book-info">
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
            <button onClick={() => getDownloadLinks(book.item_id)}>View Download Options</button>
          </div>
        </div>
      ))}

      {selectedBook && (
        <div className="download-modal">
          <div className="modal_header">
            <h2>{selectedBook.title}</h2>
            <button id="modal_cross" className="modal_cross" onClick={() => setSelectedBook()}>
              <img src={cross} alt="cross" />
            </button>
          </div>
          <img src={selectedBook.coverUrl} alt={selectedBook.title} />
          <div className="download-options">
            <div className="d-flex">
              <h3>Available Links: </h3>
              <span><img src={download} alt="download" /></span>
            </div>
            <ul>
              {selectedBook.downloadLinks.map((link) => (
                <li className="Download_link" key={link.format}>
                  <a href={link.url} download target="_blank" rel="noopener noreferrer">
                    {link.format} ({link.size} MB)
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};


export default Favorite;