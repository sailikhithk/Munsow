import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
const ActionButtonCellRenderer = (props) => {
  const { deleteHandler = ()=>{} } = props;

  return (
    <div>
    <DeleteIcon  onClick={() => deleteHandler(props)} color="error" className="cursor-pointer" />
      {/* <button
        type="button"
        className="btn btn-secondary"
        onClick={() => deleteHandler(props)}
      >
        Delete
      </button> */}
    </div>
  );
};

export default ActionButtonCellRenderer;
