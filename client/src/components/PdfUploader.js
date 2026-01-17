import { useState } from 'react';
import axios from 'axios';
import upload_img from "../images/upload_img.png";
import upload_page from "../images/upload_page.jpg";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function PDFUploader() {
  const userid = sessionStorage.getItem('id');
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [isloading,setIsLoading] = useState(false);
  const [uploadProgress,setUploadProgress] = useState(0);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('userId',userid)

    try{
      setIsLoading(true);
      const res = await axios.post(`${window.location.origin}/niko/upload`,formData,{
        onUploadProgress:(progressEvent)=>{
          const progress = Math.round((progressEvent.loaded/progressEvent.total)*100);
          setUploadProgress(progress);
        }
      });
      setUrl(res.data.url);
    }catch(error){
      console.error(error);
    }finally{
      setIsLoading(false);
    }

  };

  return(
    <div className="Uploads_outer_wrapper margin_side">
      <div className="uploads_heading">
        <h1>Uploads Files Here</h1>
      </div>
        <div className="uploadpage_content">
          <div className="upload_sidebar_img">
          <LazyLoadImage
                    alt="Codex_img"
                    effect="blur"
                    wrapperProps={{
                      style: {transitionDelay: "0.4s"},
                    }}
                    src={upload_page} 
          />
          </div>
          <div className="upload_sidebar_container">
            <div className="upload_sidebar_img_second"><img src={upload_img} alt="upload_image"/></div>
            <div className="input_upload_container">
              <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div style={{textAlign: "center",marginTop:"1.25rem"}}>
              <button onClick={handleUpload}>Upload & Compress</button>
            </div>
            <div>
            {isloading && <>
              <progress value={uploadProgress} max="100"/>
              <span>{uploadProgress}%</span>
            </>}
            </div>
          </div>
        </div>

        <div className="upload_guidance">
          <p id="upload_guidance_head">📤 User Guidance for Upload Page</p>
          <hr/>
          <div className="upload_guidance_wrapper">
            <div className="upload_guidance_card">
              <h3>✅ Supported File Types :</h3>
              <ul>
                <li>📄 Documents: .pdf</li>
              </ul>
            </div>
            <div className="upload_guidance_card">
              <h3>📏 File Size Limit :</h3>
              <ul>
                <li>Maximum: 10MB per file</li>
                <li>For larger files, consider compressing before uploading.</li>
              </ul>
            </div>
            <div className="upload_guidance_card">
              <h3>📂 How to Upload :</h3>
              <ul>
                <li>Click the “Upload” or “Browse” button.</li>
                <li>Select the file(s) from your device.</li>
                <li>Wait for the preview or progress bar to complete.</li>
                <li>Click “Submit” (if needed).</li>
              </ul>
            </div>
            <div className="upload_guidance_card">
              <h3>⚠️ Upload Tips :</h3>
              <ul>
                <li>Ensure your file is correctly named (no special characters like / \ * ? ).</li>
                <li>Don’t close or refresh the page while uploading.</li>
                <li>Only! [One] file upload at a time.</li>
              </ul>
            </div>
          </div>        
        </div>
    </div>
  );
}

export default PDFUploader;