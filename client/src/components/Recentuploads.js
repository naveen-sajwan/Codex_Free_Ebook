import React,{ useState,useEffect } from 'react'
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Fuse from "fuse.js";

const Recentuploads = () => {
  let userId = sessionStorage.getItem("id");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");

    useEffect(() => {
    const fetchUploads = async()=>{
      try{
        const result = await axios.get(`${window.location.origin}/niko/AllUploads`);
        if(result.data.allUploads){
          setUploadedFiles(result.data.allUploads);
          setSearchResults(result.data.allUploads);
        }
      }catch(error){
        console.error(error);
      }
    }
    fetchUploads();
  }, []); 

  useEffect(() => {
  if (searchText.trim() === "") {
    setSearchResults(uploadedFiles);
  } else {
    // Fuse.js Constructor
    const fuse = new Fuse(uploadedFiles, {
      keys: ["name"],
      threshold: 0.3,
    });
    const result = fuse.search(searchText);
    console.log(result);
    setSearchResults(result.map((r)=>r.item));
  }
}, [searchText, uploadedFiles]); 

  return (
    <div className="uploaded_files_here margin_side">
    <div><h1 style={{fontFamily:"helvetica",padding:"10px"}}>Recently Added Here 📚</h1></div>
    <div className="search_bar">
      <label id="search">
        <input
          type="text"
          name="search"
          placeholder="🔍 Search Your Uploads..."
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      </label>
      
    </div>
    <div className="book-list">
    {searchResults.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        searchResults.map((uploads) => (
          <div key={uploads._id} className="book-card" style={{ display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
              <div className="book-cover">
                <LazyLoadImage
                    alt={uploads.name}
                    effect="blur"
                    wrapperProps={{ style: { transitionDelay: "1s" } }}
                    src={uploads.imageUrl}
                />
              </div>
              <div className="book-info">
              <hr/>
                <h4 style={{fontFamily:"helvetica",padding:"10px"}}>{uploads.name}</h4>
                <div style={{textAlign:"center"}}><a href={uploads.url} target="_blank" rel="noopener noreferrer"><button>Download Here ➜</button></a></div>
                
              </div>
          </div>
          ))
    )}  
    </div>
  </div>
  )
}

export default Recentuploads
  

