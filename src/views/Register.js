import React, { useState, useEffect } from "react";
import axios from "axios";

import services from "../services";
import moment from "moment";
import Swal from "sweetalert2";
import {
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
} from "@mui/material";

const Register = () => {
  const [status, setStatus] = useState("success");
  const [statusCode, setStatusCode] = useState();
  const [message, setMessage] = useState("message");
  const [an, setAn] = useState("");
  const deptID = 1;
  const staffName = "Admin";
  moment.locale("th");
  const today = moment().add(543, "year").format("L");
  // console.log(today);

  const [charts, setCharts] = useState({ blogs: [] });
  const fetchCharts = async () => {
    try {
      const { data } = await services.getCharts();
      // setCharts([...charts, { blogs: data }]);
      setCharts({ blogs: data });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const updateChartList = (value) => {
  //   const blogs = [...charts.blogs, value];
  //   setCharts({ blogs });
  // };

  useEffect(() => {
    fetchCharts();
  }, [setCharts]);

  const handleSubmit = async () => {
    try {
      const chart = {
        an,
        deptID,
        staffName,
      };

      // const respond = await services.addChart(chart);
      // console.log(respond);
      // console.log(respond.status);
      axios
        .post(`http://localhost:3001/chart/upload/`, chart)
        .then((response) => {
          console.log(response.data);
          // return response;
          setOpen(true);
          setStatus("success");
          setMessage(response.data.message);
          fetchCharts();
        })
        .catch((error) => {
          // Error
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.data.errors[0].msg);
            console.log(error.response.status);
            setOpen(true);
            setStatus("error");
            setStatusCode(error.response.status);
            setMessage(error.response.data.errors[0].msg);
            // console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
          // return error;
        });
      // if (respond["status"] === 400) {
      //   setOpen(true);
      //   setStatus("error");
      //   setMessage(respond["errors"][0]["msg"]);
      //   // console.log("ERROR : " + respond["data"]["errors"][0]["msg"]);
      // } else {
      //   setOpen(true);
      //   setStatus("success");
      //   setMessage(respond["message"]);
      //   // console.log("SUCCESS : " + respond["data"]["message"]);
      //   // updateChartList(chart);
      //   fetchCharts();
      // }
      setAn("");
      // console.log(status);
    } catch (error) {
      console.log(error);
    }
  };

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  // console.log(an, deptID, staffName);
  const { vertical, horizontal } = state;
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline>
        <Container maxWidth="xl" sx={{ p: 2 }}>
          <Paper sx={{ p: 2, margin: 2 }}>
            <Typography variant="h4" sx={{ mb: 5 }}>
              รับชาร์ตจาก WARDS
            </Typography>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              {/* <AlertTitle>Success</AlertTitle> */}
              <Alert
                variant="filled"
                onClose={handleClose}
                severity={status}
                sx={{ width: "100%" }}
              >
                {message}
              </Alert>
            </Snackbar>

            <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("submitted : " + an);
                  handleSubmit();
                }}
              >
                <TextField
                  id="branchName"
                  label="Barcode AN"
                  variant="outlined"
                  placeholder="กรุณาสแกนบาร์โค้ดที่นี"
                  autoFocus={true}
                  value={an}
                  fullWidth
                  required
                  onChange={(e) => setAn(e.target.value)}
                />
              </form>
            </Grid>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">AN</TableCell>
                    <TableCell align="center">HN</TableCell>
                    <TableCell align="center">ชื่อ-สกุล</TableCell>
                    <TableCell align="center">วันที่ Discharge</TableCell>
                    <TableCell align="center">ชื่อแพทย์</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {charts.blogs.map((row) => (
                    <TableRow
                      key={row.an}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.an}
                      </TableCell>
                      <TableCell align="center">{row.hn}</TableCell>
                      <TableCell align="left">{row.ptName}</TableCell>
                      <TableCell align="center">{row.dischargeDate}</TableCell>
                      <TableCell align="left">{row.dischargeDoctor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </CssBaseline>
    </React.Fragment>
  );
  //   }
};

export default Register;
