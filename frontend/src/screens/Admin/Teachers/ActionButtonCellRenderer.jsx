import React from "react";
import { useDispatch } from "react-redux";
import { userStatUpdate } from "../../../redux/action";
import { Switch } from "@mui/material";
const ActionButtonCellRenderer = (props) => {

  const { deleteHandler = ()=>{} } = props;
  const row = props?.node?.data;

  const dispatch = useDispatch()

  const [checked, setChecked] = React.useState(row?.is_active);

  const handleChange = (event) => {
    console.info(event,"--")
    setChecked(event);
    dispatch(userStatUpdate( row?.id , event ? "activate" : "deactivate"))
  };

  return (
    <div>

      <Switch
      checked={checked}
      color="primary"
      onChange={(event)=> handleChange(event?.target?.checked) }
      inputProps={{ 'aria-label': 'controlled' }}
    />
    </div>
  );
};

export default ActionButtonCellRenderer;
