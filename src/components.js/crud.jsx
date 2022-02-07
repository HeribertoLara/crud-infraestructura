import React, { useEffect, useState } from "react";
import { firebase } from "../firebase";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { IconButton, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";



const Crud = () => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState("");
  const [phone, setPhone] = useState("");
  const [rfc, setRfc] = useState("");
  const [nss, setNss] = useState("");
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("employess").get();
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
       
        setEmployees(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  }, []);

  const add = async (e) => {

    e.preventDefault();
    if(!employee.trim()){
      console.log('campos sin rellenar');
      return
    }
    try {
      const db= firebase.firestore()
      const newEmployee = {
        name:employee,
        phone:phone,
        rfc: rfc,
        nss:nss,
        date:Date.now()
      }
      const data = await  db.collection('employess').add(newEmployee)
      setEmployees([
        ...employees, 
        {...newEmployee, id:data.id}
      ])
      setEmployee("")
      setPhone("")
      setRfc("")
      setNss("")
      
    } catch (error) {
      console.log(error);
    }

   
  };
  const remove = async (id)=>{
    try {
      const db = firebase.firestore()
      await db.collection('employess').doc(id).delete()
      const filterArray = employees.filter(item => item.id !== id)
      setEmployees(filterArray)
    } catch (error) {
      console.log(error)
    }

  }
  const modeEdit = (item)=>{
    setEditMode(true)
    setEmployee(item.name)
    setPhone(item.phone)
    setRfc(item.rfc)
    setNss(item.nss)
    setId(item.id)
  }

  const edit = async (e)=>{
    e.preventDefault()
    if(!employee.trim()){
      console.log('campos sin rellenar');
      return
    }
    try {
      const db =firebase.firestore()
      await db.collection('employess').doc(id).update({
        name:employee,
        phone:phone,
        rfc: rfc,
        nss: nss,
      })
      const filterArray = employees.map(item =>(
        item.id === id ?{ id: item.id, name: employee, phone: phone, rfc: rfc, nss: nss }: item
      ))

      setEmployees(filterArray)
      setEditMode(false)
      setEmployee("")
      setPhone("")
      setRfc("")
      setNss("")
    } catch (error) {
      console.log(error);
    }

  }


  

  return (
    <div>
      <Typography variant="h2" color="initial" sx={{textAlign:'center'}}>CRUD EMPLOYESS</Typography>
      <div className="flex justify-center">
        <form className="" onSubmit={
          editMode?edit: add}>
          <Typography variant="h5" color="prymary" sx={{ml:2}}>
            {
              editMode? 'Edit employee' : ' Add employee'
            }
          </Typography>
          <TextField
            sx={{margin:2}}
            value={employee}
            type="text"
            onChange={(e) => setEmployee(e.target.value)}
            label="Name"
            variant="outlined"
          />
          <TextField
            sx={{margin:2}}
            value={phone}
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            label="Phone"
            variant="outlined"
          />
          <TextField
            sx={{margin:2}}
            value={rfc}
            type="text"
            onChange={(e) => setRfc(e.target.value)}
            label="RFC"
            variant="outlined"
          />
          <TextField
            sx={{margin:2}}
            value={nss}
            type="text"
            onChange={(e) => setNss(e.target.value)}
            label="NSS"
            variant="outlined"
          />
          <Button variant="contained" sx={{mt:2, height:'3.5rem'}} type="submit" color={editMode? 'secondary':'primary'}>
            {
              editMode?'Edit employee ':'Add employee'
            }
           
          </Button>
        </form>
      </div>
      <div className="container mx-auto">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }} className="w-24">
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} className="w-32">
                  phone
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} className="w-14">
                  RFC
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} className="w 14">
                  NSS
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} className="w 14">
                  Edit
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} className="w 14">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="capitalize w-24">{item.name}</TableCell>
                  <TableCell className=" w-32">{item.phone}</TableCell>
                  <TableCell className="w-32">{item.rfc}</TableCell>
                  <TableCell className="w-32">{item.nss}</TableCell>
                  <TableCell className="w-32">
                    <IconButton aria-label="Edit" onClick={()=>modeEdit(item)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell className="w-32">
                    <IconButton></IconButton>
                    <IconButton aria-label="Edit" onClick={(id)=>remove(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Crud;
