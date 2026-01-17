import react,{ useEffect } from "react";
import './App.css';
import { BrowserRouter as Router,Routes,Route,useLocation,useNavigate } from "react-router-dom";
import PDFUploader from "./components/PdfUploader.js"
import FileUpload from "./components/FileUpload.js"
import BookSearch from "./components/BookSearch.js"
import Navbar from "./components/Navbar.js"
import Recentuploads from "./components/Recentuploads.js"
import Footer from "./components/Footer.js"
import Dashboard from "./components/dashboard/Dashboard.js"
import Home from "./components/home/Home.js"
import Nopage from "./components/Nopage.js"
import AboutUs from "./components/AboutUs.js"
import ContactUs from "./components/ContactUs.js"
import Signup from "./components/Sign/Signup.js"
import Signin from "./components/Sign/Signin.js"
import { useDispatch,useSelector } from "react-redux";
import { authActions } from "./store";
import PrivateRoute from "./components/PrivateRoute";
import Favorite from "./components/dashboard/Favorite.js";
import Upload from "./components/dashboard/Upload.js";



function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=> state.isLoggedIn);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login());    
    }
    
  },[dispatch])

  useEffect(() => {
    if(isLoggedIn && location.pathname === "/signin"){
      navigate("/dashboard",{replace:true});
    }
  }, [isLoggedIn,location,navigate])

  return (
    <div className="app_css">
    
        {!isLoggedIn && <Navbar/>}
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/Browse" element={<BookSearch/>}/>
          <Route path="/contact-us" element={<ContactUs/>} />
          <Route path="/recent-uploads" element={<Recentuploads />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin location={location}/>} />
          <Route path="/*" element={<Nopage/>}/>
          
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route path="favorite" element={<Favorite />} />
            <Route path="upload" element={<PDFUploader/>} />
            <Route path="recent-uploads" element={<Recentuploads />} />
            <Route path="browse" element={<BookSearch />} />
            <Route path="your-uploads" element={<Upload />} />
          </Route>
        </Routes>
        {!isLoggedIn && <Footer/>}
         
    </div>
  );
}

export default App;
