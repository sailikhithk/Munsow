import React, { useEffect, useRef, useState } from "react";
import UploadImage from "../../../assets/login.jpg";

import { loadBrachList, loadCourseList, loadDepartmentList, loadInstitutionList, uploadUser, user_create } from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { Autocomplete, Box, Button, Tab, TextField} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
const AddTeachers = () => {

  const dispatch = useDispatch()
  const {institutionList,departmentList,branchList} = useSelector(state=>state.data)

  const formData = new FormData();
  formData.append("mode","Teacher")
  // ref
  const input = useRef(null);

  // utils
  const handleSelectFiles = (e) => {
    formData.append('file', e.currentTarget.files[0]);
    dispatch(uploadUser(formData))
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [mainData,setMainData] = useState({});
  const userFeilds =
    [
      {
        label:"First Name",
        key:"first_name",
        value:mainData?.first_name ?? "" ,
        type:"text"
      },
      {
        label:"Last Name",
        key:"last_name",
        value:mainData?.last_name ?? "" ,
        type:"text"
      },
      {
        label:"Email",
        key:"email",
        value:mainData?.email ?? "" ,
        type:"text"
      },
      {
        key:"mobile_number",
        label:"Mobile Number",
        value:mainData?.mobile_number ?? "",
        type:"text"
      },
      {
        label:"Address",
        key:"address",
        value:mainData?.address ?? "" ,
        type:"text"
      },
      {
        label:"Password",
        key:"password",
        value:mainData?.password ?? "",
        type:"text"
      },
      {
        label:"Institution",
        key:"institution",
        value:mainData?.institution ?? null ,
        type:"select",
        options: institutionList?.map((o)=>({label:o?.institution_name ?? "-",value:o?.id})) ?? [],
      },
      {
        label:"Department",
        key:"department",
        value:mainData?.department ?? null ,
        options: departmentList?.map((o)=>({label:o?.name ?? "-" ,value:o?.id})) ?? [],
        type:"select"
      },
      {
        label:"Branch",
        key:"branch",
        value:mainData?.branch ?? null,
        options: branchList?.map((o)=>({label:o?.name ?? "-" ,value:o?.id})) ?? [],
        type:"select"
      },
    ]
  

  const handleInputChange = (key,value) => {
    let temp = {...mainData}
    temp[key] = value;
    setMainData(()=>({...temp}))
  }
  useEffect(()=>{
    dispatch(loadBrachList());
    dispatch(loadInstitutionList());
    dispatch(loadDepartmentList())

  },[])


  useEffect(()=>{
    console?.info(mainData,"--mainData")
  },[mainData])

  const onHandleCreate = () => {
    const payload = {
      "first_name": mainData?.first_name,
      "last_name": mainData?.last_name ,
      "email": mainData?.email,
      "phone_number": mainData?.mobile_number ,
      "branch_id": mainData?.branch?.value ,
      "department_id": mainData?.department?.value ,
      "address": mainData?.address ,
      "institution_id": mainData?.institution?.value,
      "password": mainData?.password 
    }
    dispatch(user_create(payload,{mode:"teacher"},()=>{setMainData({})}))
  }

  return (
        <div className="px-4" >

        <TabContext value={value} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" style={{backgroundColor:"white",borderRadius:"8px"}}  >
            <Tab label="Bulk Create" value="1" />
            <Tab label="Manual Create" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" style={{background:"white",borderRadius:"8px",marginTop:"10px"}} >
        <div className="" >

<div className="flex justify-between">
  <div className="flex justify-between items-center text-blue-500 text-2xl  font-semibold">
  
  Import Teachers
  
  </div>
  <div className="flex justify-between items-center gap-2 text-lg font-semibold text-blue-500 cursor-pointer"><CloudDownloadOutlinedIcon /> Download Sample User File</div>
</div>


<div className="col-lg-12 mt-12">
  <div className="flex justify-start items-start">
    <span className="text-4xl font-semibold">Upload Teacher Information</span>
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
            <div className="">
              <div>
                <div className="FileUpload-upload-drag-icon w-full flex justify-center">
                  <img
                    src={UploadImage}
                    className="w-[200px] rounded "
                    style={{saturation:"blur(30px)"}}
                    alt="Upload Icon"
                  />
                </div>
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

        </TabPanel>
        <TabPanel value="2" style={{background:"white",borderRadius:"8px",marginTop:"10px"}}>

            <div className="grid grid-cols-2 gap-4 bg-white p-4" >
            {
              userFeilds?.map((o)=>(
                <>
                  {
                    o?.type === "select" ?
                    <>
                    <Autocomplete
                      size="small"
                      fullWidth
                      disablePortal
                      value={o?.value}
                      defaultValue={o?.value}
                      id="combo-box-demo"
                      options={o?.options ?? []}
                      renderInput={(params) => <TextField {...params} label={o?.label} />}
                      onChange={(e,value)=>{handleInputChange(o?.key,value)}}
                    />

                    </>
                     :
                <TextField 
                key={o?.key}
                type={o?.type}
                label={o?.label}
                value={o?.value}
                size="small"
                onChange={(e)=>{handleInputChange(o?.key,e.target.value)}}
                 />
                  }
                </>
                 )
              )
            }
            </div>
              <div className="flex justify-end gap-3" >
                <Button variant="outlined" color="error" onClick={()=>{ setMainData(()=>({branch:null})) }} >
                  Clear Data
                </Button>
                <Button variant="contained" onClick={()=>{onHandleCreate()}}>
                  Create Teacher
                </Button>
              </div>
        </TabPanel>
      </TabContext>
      </div>
      

  );
};

export default AddTeachers;
