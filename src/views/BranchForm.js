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

const BranchForm = () => {
  const { branchId } = useParams();
  console.log(branchId);
  const [branchName, setBranchName] = useState("");
  const [branchStatusId, setBranchStatusId] = useState("");
  const [orgId, setOrgId] = useState("");
  const [orgOption, setOrgOption] = useState([]);

  const loadOrgOptions = async () => {
    try {
      const respond = await services.getOrgs();
      //   console.log(respond["data"]);
      const orgs = respond["data"];
      setOrgOption(orgs);
    } catch (error) {
      alert("Failed to get org info");
    }
  };

  const loadBranch = async () => {
    try {
      const respond = await services.editBranch(branchId);
      const branch = respond.data;
      setBranchName(branch[0]["branchName"]);
      setBranchStatusId(branch[0]["branchStatusId"]);
      setOrgId(branch[0]["orgId"]);
    } catch (error) {
      alert("Failed to get branch info");
    }
  };

  const loadDefaultBranch = async () => {
    setBranchName("");
    setBranchStatusId("");
    setOrgId("");
  };

  useEffect(() => {
    if (branchId === "form") {
      loadDefaultBranch();
    } else {
      loadBranch();
    }
    loadOrgOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(branchId, branchName, branchStatusId);
    try {
      const branch = {
        branchId,
        branchName,
        branchStatusId,
        orgId,
      };
      var respond = "";
      if (branchId === "form") {
        respond = await services.addBranch(branch);
      } else {
        respond = await services.updateBranch(branch);
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
            <Typography variant="h6">Branch Form</Typography>
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
                id="branchName"
                label="Branch Name"
                variant="outlined"
                value={branchName}
                fullWidth
                required
                onChange={(e) => setBranchName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">
                  Branch Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="branchStatusId"
                  value={branchStatusId}
                  label=" Branch Status"
                  onChange={(e) => setBranchStatusId(e.target.value)}
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
                  {orgOption.map((options) => (
                    <MenuItem value={options.orgId} key={options.orgId}>
                      {options.orgName}
                    </MenuItem>
                  ))}
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

export default BranchForm;
