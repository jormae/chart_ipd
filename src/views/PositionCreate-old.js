import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import {
  TextField,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

export default function PositionCreate() {
  const { positionId } = useParams();
  console.log(positionId);
  const [positionName, setPositionName] = useState("");
  const [positionStatusId, setPositionStatusId] = useState("");

  console.log(positionId);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3001/position/" + positionId, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result[0]["positionName"]);
        setPositionName(result[0]["positionName"]);
        setPositionStatusId(result[0]["positionStatusId"]);
      })
      .catch((error) => console.log("error", error));
  }, [positionId]);

  const handleSubmit = async (event) => {
    console.log(positionId, positionName, positionStatusId);

    // const respond = await services.editDepartment(deptId);
    // const department = respond.data;
    // setDeptName(department.deptName);
    // setDeptLabel(department.deptLabel);
    // setDeptStatusId(department.deptStatusId);

    event.preventDefault();
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //   positionName: positionName,
    //   positionStatusId: positionStatusId,
    //   orgId: 1,
    // });

    // if (positionId) {
    //   var requestOptions = {
    //     method: "PUT",
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: "follow",
    //   };

    //   fetch("localhost:3001/position/" + positionId, requestOptions)
    //     .then((response) => response.json())
    //     .then((result) => {
    //       alert(result["message"]);
    //     })
    //     .catch((error) => console.log("error", error));
    // } else {
    //   var requestOptions = {
    //     method: "POST",
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: "follow",
    //   };

    //   fetch("http://localhost:3001/position", requestOptions)
    //     .then((response) => response.json())
    //     .then((result) => {
    //       alert(result["message"]);
    //     })
    //     .catch((error) => console.log("error", error));
    // }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6">Create User</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="positionName"
                label="Position Name"
                variant="outlined"
                value={positionName}
                fullWidth
                required
                onChange={(e) => setPositionName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">
                  Position Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="positionStatusId"
                  value={positionStatusId}
                  label=" Position Status"
                  onChange={(e) => setPositionStatusId(e.target.value)}
                >
                  <MenuItem value={1}>เปิดใช้งาน</MenuItem>
                  <MenuItem value={2}>ปิดใช้งาน</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth size="medium">
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}
