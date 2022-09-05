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
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import HotelIcon from "@mui/icons-material/Hotel";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  blueGrey: {
    backgroundColor: "#eceff1",
    color: (props) => props.color,
  },
  darkBlueGrey: {
    backgroundColor: "#78909c",
    color: (props) => props.color,
  },
  lightBlue: {
    backgroundColor: "#e1f5fe",
    color: (props) => props.color,
  },
  teal: {
    backgroundColor: "#b2dfdb",
    color: (props) => props.color,
  },
  deepPurple: {
    backgroundColor: "#d1c4e9",
    color: (props) => props.color,
  },
});

const ReturnSummary = (props) => {
  const classes = useStyles(props);

  const [status, setStatus] = useState("success");
  const [statusCode, setStatusCode] = useState();
  const [message, setMessage] = useState("message");
  const [errMsg, setErrMsg] = useState("");
  let msg;

  const [an, setAn] = useState("");
  const staffName = localStorage.getItem("staffName");
  moment.locale("th");
  // const today = moment().add(543, "year").format("L");
  // const today = moment().add(543, "year").format("L");
  const today = moment().format();
  // console.log(today);

  const [charts, setCharts] = useState({ blogs: [] });
  const fetchCharts = async () => {
    try {
      const { data } = await services.getReturnSummaryCharts();
      console.log(data);
      setCharts({ blogs: data });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCharts();
  }, [setCharts]);

  const handleSubmit = async () => {
    try {
      const chart = {
        an,
        staffName,
      };

      // const respond = await services.addChart(chart);
      // console.log(respond);
      // console.log(respond.status);
      axios
        .put(`http://localhost:3001/chart/return-summary/${an}/${today}`, chart)
        .then((response) => {
          // console.log(response.data);
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
            // console.log(error.response);
            console.log(error.response.status);
            // console.log(error.response.data.errors[0].msg);
            // console.log(error.response.status);
            if (error.response.status === 400) {
              msg = error.response.data.errors[0].msg;
            } else if (error.response.status === 404) {
              msg = error.response.data.msg;
              // msg = error.response.data.msg;
            }
            console.log(msg);
            setOpen(true);
            setStatus("error");
            setStatusCode(error.response.status);
            setMessage(msg);
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
          <Typography variant="h4" sx={{ marginLeft: 2 }}>
            รับ Chart จากหมอ สรุป
          </Typography>
          <Grid container sx={{ p: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.blueGrey} sx={{ marginRight: 2 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <HotelIcon sx={{ fontSize: 40 }} />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: 20 }} color="text.secodary">
                        IPD 1
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ fontSize: 20 }}
                        color="text.primary"
                        align="center"
                      >
                        30 คน
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions className={classes.darkBlueGrey}></CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.blueGrey} sx={{ marginRight: 2 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <HotelIcon sx={{ fontSize: 40 }} />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: 20 }} color="text.secodary">
                        IPD 2
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ fontSize: 20 }}
                        color="text.primary"
                        align="center"
                      >
                        30 คน
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions className={classes.darkBlueGrey}></CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.blueGrey} sx={{ marginRight: 2 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <HotelIcon sx={{ fontSize: 40 }} />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: 20 }} color="text.secodary">
                        LR 1
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ fontSize: 20 }}
                        color="text.primary"
                        align="center"
                      >
                        30 คน
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions className={classes.darkBlueGrey}></CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.blueGrey} sx={{ marginRight: 0 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <HotelIcon sx={{ fontSize: 40 }} />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: 20 }} color="text.secodary">
                        LR 2
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ fontSize: 20 }}
                        color="text.primary"
                        align="center"
                      >
                        30 คน
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions className={classes.darkBlueGrey}></CardActions>
              </Card>
            </Grid>
          </Grid>
          <Paper sx={{ p: 2, margin: 2 }}>
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
                    <TableCell align="center">หอผู้ป่วย</TableCell>
                    <TableCell align="center">วันที่รับสรุป Chart</TableCell>
                    <TableCell align="center">ผู้บันทึก</TableCell>
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
                      <TableCell align="left">{row.wardName}</TableCell>
                      <TableCell align="center">
                        {row.returnSummaryDate}
                      </TableCell>
                      <TableCell align="left">
                        {row.returnedSummaryBy}
                      </TableCell>
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

export default ReturnSummary;
