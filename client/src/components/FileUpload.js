import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadStatus, setUploadStatus] = useState('idle');

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 10 * 1024 * 1024 // 5MB
  });

  const uploadFiles = async () => {
    if (files.length === 0) return;
    
    setUploadStatus('uploading');
    
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post(`${window.location.origin}/niko/compress-upload`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(prev => ({
            ...prev,
            [progressEvent.target.fileName]: percentCompleted
          }));
        }
      });
      
      setUploadStatus('success');
      console.log('Upload successful:', response.data);
      setFiles([]);
      setTimeout(() => setUploadStatus('idle'), 3000);
    } catch (error) {
      setUploadStatus('error');
      console.error('Upload failed:', error);
    }
  };

  const removeFile = (fileIndex) => {
    const newFiles = [...files];
    newFiles.splice(fileIndex, 1);
    setFiles(newFiles);
  };

  return (
    <div className="container">
      <div 
        {...getRootProps()} 
        className={`dropzone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop some files here, or click to select files</p>
        )}
      </div>

      {files.length > 0 && (
        <div className="files-preview">
          <h4>Files to upload:</h4>
          <ul>
            {files.map((file, index) => (
              <li key={file.name}>
                <span>{file.name}</span>
                <button onClick={() => removeFile(index)}>Remove</button>
                {uploadProgress[file.name] && (
                  <div className="progress-bar">
                    <div style={{ width: `${uploadProgress[file.name]}%` }}></div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <button onClick={uploadFiles} disabled={uploadStatus === 'uploading'}>
            {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      )}

      {uploadStatus === 'success' && (
        <div className="success-message">Upload successful!</div>
      )}
      {uploadStatus === 'error' && (
        <div className="error-message">Upload failed. Please try again.</div>
      )}
    </div>
  );
};

export default FileUpload;