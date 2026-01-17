// src/components/BookSearch.js
import React, { useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import download from "../images/download.jpg";
import cross from "../images/wrong_cross.jpg";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const BookSearch = () => {
  const userid = sessionStorage.getItem("id");
  const [favorites, setFavorites] = useState({});
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedKitaab, setSelectedKitaab] = useState([]);

  const searchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${window.location.origin}/niko/api/books?query=${query}`);
      setBooks(response.data);
      // Load saved favorites from localStorage
      const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
      setFavorites(savedFavorites);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    console.log(books);
  };

  // Toggle favorite status by card ID
  const toggleFavorite = async(cardId) => {
    if(userid){
      try{
        const newFavorites = {
          ...favorites,
          [cardId]: !favorites[cardId]
        };
        
        const cardData = books.find(book => book.id === cardId);
          setSelectedKitaab(cardData);

        const payload = { ...cardData, userId: userid };
        await axios.post(`${window.location.origin}/niko/v1/savefavorite`,payload,{
           headers: {
            "Content-Type": "application/json",
          },
        }).then((response)=>{
          console.log(response.data)
          if(response.data.msg === "book Added Successfully"){
            toast.success("Add to Favorite");
            setFavorites(newFavorites);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
          }else{
            toast.error("already in favorite");
            setFavorites({})
          }
        })
        // setFavorites(newFavorites);
        // Save to localStorage
        // localStorage.setItem('favorites', JSON.stringify(newFavorites));
      }catch(error){
        console.error(error);
      }

    }else{
      toast.error('Please! SignUp first');
    }
    
  };

   const getDownloadLinks = async(bookId) => {
    if(userid){
      try{
        const response = await axios.get(`${window.location.origin}/niko/api/books/${bookId}/download`);
        setSelectedBook(response.data);
        console.log(response.data)
        }catch(error) {
          console.error(error);
        }
    }else{
      toast.error('Please! SignUp first');
    }
  }

  return (
    <div className="book-search margin_side">
    <ToastContainer/>
      <h1>Internet Archive eBook Finder 🔍</h1>
      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
        />
        <button onClick={searchBooks} disabled={loading}>
          Search
        </button>
      </div>

      {loading && <>
        <div className="loader_center">
          <div className="loader"></div>
        </div>
      </>}

      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-cover">
              <LazyLoadImage
                alt={book.title}
                effect="blur"
                wrapperProps={{
                // If you need to, you can tweak the effect transition using the wrapper style.
                style: {transitionDelay: "1s"},
                }}
                src={book.coverUrl} // use normal <img> attributes as props
                onError={(e) => {
                  e.target.src = 'https://archive.org/images/notfound.png';
                }} 
              />
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <button  onClick={() => getDownloadLinks(book.id)}>
                View Download Options
              </button>
            </div>
            <span className="book_heart" onClick={() => toggleFavorite(book.id)}>
            {!!favorites[book.id] ? <i class="bi bi-bookmark-heart-fill"></i> : <i class="bi bi-bookmark-heart"></i>}
            </span>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="download-modal">
          <div className="modal_header">
            <h2>{selectedBook.title}</h2>
            <button id="modal_cross" className="modal_cross" onClick={() => setSelectedBook()}>
              <img src={cross} alt="cross"/>
            </button>
          </div>
          <img src={selectedBook.coverUrl} alt={selectedBook.title} />
          <div className="download-options">
          <div className="d-flex">
            <h3>Available Links : </h3>
            <span><img src={download} alt="download"/></span>
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
  );
};

export default BookSearch;