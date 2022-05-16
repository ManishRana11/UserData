import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Button from "../../components/Button"
import TextField from "../../components/TextField"
import { editUser } from "./userSlice"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";


const EditUser = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const users = useSelector(store => store.users);
  const navigate = useNavigate();
  const existingUser = users.filter(user => user.id === params.id);
  const { firstname, lastname, group, permissions } = existingUser[0];
  const [values, setValues] = useState({
    firstname,
    lastname,
    group,
    permissions
  });

  const options = ["Jumping", "Standing", "Sitting", "Running"]

  const handleEditUser = () => {
    setValues({ firstname: '', lastname: '', group: '', permissions: [] });
    dispatch(editUser({
      id: params.id,
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
      <Button onClick={handleEditUser}>Edit</Button>
    </div>
  )
}

export default EditUser