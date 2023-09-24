import { useMemo, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import ActionButtonCellRenderer from "./ActionButtonCellRenderer";
import { useDispatch, useSelector } from "react-redux";
import { loadTeachersList } from "../../../redux/action";

const Teachers = () => {

  
  const dispatch = useDispatch();
  const {teachersList} = useSelector(state=>state?.data)


  const containerStyle = useMemo(() => ({ width: "100%", height: "90%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const deleteHandler = (act) => {
    const { data = {} } = act;
    const { id } = data;
    console.log("id :", id);
    // NEED TO DO API CALL BASED ON ID AND UPDATE ROWDATA
  };
 


  const headCells = [
    {
      "field": "name",
      "headerName": "Name",
      "resizable": true,
      "sortable": true,
      "editable": true,
      "flex": 1
    },
    {
      "field": "department",
      "headerName": "Department",
      "resizable": true,
      "sortable": true,
      "editable": true,
      "flex": 1
    },
    {
      "field": "branch",
      "headerName": "Branch",
      "resizable": true,
      "sortable": true,
      "editable": true,
      "flex": 1
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionButtonCellRenderer,
      cellRendererParams: { deleteHandler },
      flex: 1,
    },
  ]
  

  const getRowHeight = useCallback(() => {
    return 45;
  }, []);


  useEffect(()=>{
    dispatch(loadTeachersList())
  },[dispatch])
  return (
    <div className="flex-grow-1 px-3" style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact // resizable, sortable
          rowData={teachersList?.data?.map(o=>({...o,name:`${o?.first_name} ${o?.last_name}`}))}
          columnDefs={headCells}
          pagination={true}
          getRowHeight={getRowHeight}
        />
      </div>
    </div>
  );
};

export default Teachers;
