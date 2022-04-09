import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SaveIcon from "@mui/icons-material/Save";
import Swal from "sweetalert2";
import {
  TextField,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Link,
} from "@mui/material";
import services from "../services";

const PositionForm = () => {
  const { positionId } = useParams();
  console.log(positionId);
  const [positionName, setPositionName] = useState("");
  const [positionStatusId, setPositionStatusId] = useState("");
  const [orgId, setOrgId] = useState("");

  const loadPosition = async () => {
    try {
      const respond = await services.editPosition(positionId);
      const position = respond.data;
      setPositionName(position[0]["positionName"]);
      setPositionStatusId(position[0]["positionStatusId"]);
      setOrgId(position[0]["orgId"]);
    } catch (error) {
      alert("Failed to get position info");
    }
  };

  const loadDefaultPosition = async () => {
    setPositionName("");
    setPositionStatusId("");
    setOrgId("");
  };

  useEffect(() => {
    if (positionId === "form") {
      loadDefaultPosition();
    } else {
      loadPosition();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(positionId, positionName, positionStatusId);
    try {
      const position = {
        positionId,
        positionName,
        positionStatusId,
        orgId,
      };
      var respond = "";
      if (positionId === "form") {
        respond = await services.addPosition(position);
      } else {
        respond = await services.updatePosition(position);
      }

      if (respond["status"] === 400) {
        console.log("ERROR : " + respond["data"]["errors"][0]["msg"]);
        Swal.fire("Failed!", respond["data"]["errors"][0]["msg"], "error");
      } else {
        console.log("SUCCESS : " + respond["data"]["message"]);
        Swal.fire("Good job!", respond["data"]["message"], "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            p: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">Position Form</Typography>
          </Box>
          <Box>
            <Link href="./">
              <Button
                variant="contained"
                size="medium"
                startIcon={<ArrowBackIosIcon />}
              >
                Back
              </Button>
            </Link>
          </Box>
        </Box>
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">
                  Organization Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="orgId"
                  value={orgId}
                  label="Organization Name"
                  onChange={(e) => setOrgId(e.target.value)}
                >
                  <MenuItem value={1}>หจก.นัสรี</MenuItem>
                  <MenuItem value={2}>ทดสอบ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                startIcon={<SaveIcon />}
                type="submit"
                variant="contained"
                fullWidth
                size="medium"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default PositionForm;
