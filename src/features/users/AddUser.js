import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import Button from "../../components/Button"
import TextField from "../../components/TextField"
import { addUser } from "./userSlice"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    group: '',
    permissions: []
  });

  const options = ["Jumping", "Standing", "Sitting", "Running"]

  const handleAddUser = () => {
    setValues({ firstname: '', lastname: '', group: '', permissions: [] });
    dispatch(addUser({
      id: uuidv4(),
      firstname: values.firstname,
      lastname: values.lastname,
      group: values.group,
      permissions: values.permissions
    }));
    navigate('/');
  }

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <TextField
        label="First Name"
        value={values.firstname}
        onChange={(e) => setValues({ ...values, firstname: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'First Name' }}
      />
      <br />
      <TextField
        label="Last Name"
        value={values.lastname}
        onChange={(e) => setValues({ ...values, lastname: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'Last Name' }}
      />
      <br />
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-filled-label">Operator</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={values.group}
          label="Group"
          onChange={(e) => setValues({ ...values, group: e.target.value })}
        >
          <MenuItem value={"Operator"}>Operator</MenuItem>
          <MenuItem value={"Administrator"}>Administrator</MenuItem>
          <MenuItem value={"Service"}>Service</MenuItem>
        </Select>
      </FormControl>
    </Box>
      <br />
      <FormControl fullWidth>
      <InputLabel id="mutiple-select-label">Permissions</InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        value={values.permissions}
        onChange={(e) => setValues({ ...values, permissions: e.target.value })}
        renderValue={(permissions) => permissions.join(", ")}
      >
        <MenuItem
          value="all"
        >
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <ListItemIcon>
              <Checkbox checked={values.permissions.indexOf(option) > -1} />
            </ListItemIcon>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
      <Button onClick={handleAddUser}>Submit</Button>
    </div>
  )
}

export default AddUser