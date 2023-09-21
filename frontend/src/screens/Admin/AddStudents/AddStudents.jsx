import React, { useRef } from "react";
import UploadImage from "../../../assets/login.jpg";
import "./AddStudents.css";

const AddStudents = () => {
  // ref
  const input = useRef(null);

  // utils
  const handleSelectFiles = (e) => {
    const files = [...e.target.files];
    if (files && files.length) {
      console.log("files :", files);
    }
  };

  return (
    <div className="flex-grow-1 p-12">
      <div className="container-lg">
        <div className="row">
          <div className="flex justify-between">
            <div className="flex justify-between items-center text-blue-500 text-2xl  font-semibold">Import Students</div>
            <div className="flex justify-between items-center text-lg font-semibold">Import User File</div>
          </div>
          <div className="col-lg-12 mt-12">
            <div className="flex justify-start items-start">
              <span className="text-4xl font-semibold">Upload Student Information</span>
            </div>
          </div>
          <div className="col-lg-12 mt-2">
            <div className="flex justify-start items-start">
              <span className="text-base font-normal">
                Download the excel file template from above and fill in the details, and our tool will automatically pick them up on import
              </span>
            </div>
          </div>
          <div className="col-md-12 mt-4">
            <div className="flex justify-between items-start">
              <div className="FileUploadContent-root">
                <div className="FileUploadGrid-item">
                  <div
                    className="FileUpload-upload FileUpload-upload-drag"
                    onClick={() => input && input.current.click()}
                  >
                    <input
                      ref={input}
                      type="file"
                      className="hidden"
                      accept=".csv, .xlsx"
                      onChange={(e) => handleSelectFiles(e)}
                      onClick={(e) => {
                        e.target.value = null;
                      }}
                    />
                    <span className="FileUpload-upload FileUpload-upload-btn">
                      <div className="FileUpload-upload-drag-container">
                        <div>
                          <p className="FileUpload-upload-drag-icon">
                            <img
                              src={UploadImage}
                              className="w-16 h-16"
                              alt="Upload Icon"
                            />
                          </p>
                          <p>Select a CSV or Excel file to import</p>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudents;
