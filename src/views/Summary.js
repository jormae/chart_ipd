import React, { useState, useEffect } from "react";
import axios from "axios";

import services from "../services";
// import moment from "moment";
import {
  CssBaseline,
  Grid,
  Paper,
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
import HotelIcon from "@mui/icons-material/Hotel";
import BadgeIcon from "@mui/icons-material/Badge";
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

const Summary = (props) => {
  const classes = useStyles(props);

  const [charts, setCharts] = useState({ blogs: [] });
  const [status, setStatus] = useState("success");
  //   const [statusCode, setStatusCode] = useState();
  const [message, setMessage] = useState("message");
  //   const [doctorCode, setDoctorCode] = useState();
  const staffName = "Maheedeen Jormae";
  //   moment.locale("th");
  //   const today = moment().add(543, "year").format("L");

  const fetchCharts = async () => {
    try {
      const { data } = await services.getSummaries();
      setCharts({ blogs: data });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCharts();
  }, [setCharts]);

  const submitSummaryChart = async (doctorCode) => {
    console.log(doctorCode);

    try {
      const chart = {
        staffName,
      };

      axios
        .put(`http://localhost:3001/chart/submit-summary/${doctorCode}`, chart)
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
          //   console.log(error);
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.data.errors[0].msg);
            console.log(error.response.status);
            setOpen(true);
            setStatus("error");
            // setStatusCode(error.response.status);
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
    } catch (error) {
      console.log(error);
    }
  };

  const [state] = useState({
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
            ส่งสรุป Chart
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

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ชื่อแพทย์</TableCell>
                    <TableCell align="center">จำนวนชาร์ต</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {charts.blogs.map((row) => (
                    <TableRow
                      key={row.doctorCode}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <BadgeIcon
                          sx={{
                            fontSize: 30,
                            marginRight: 2,
                            marginBottom: -1,
                          }}
                        />
                        {row.dischargeDoctor}
                      </TableCell>
                      <TableCell align="center">{row.TOTAL_CHART}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          //   value={row.doctorCode}
                          color="success"
                          size="large"
                          //   href={"/summary/" + row.doctorCode}
                          //   onClick={submitSummaryChart}
                          //   onClick={() => console.log(row.doctorCode)}
                          //   onClick={() => setDoctorCode(row.doctorCode)}
                          onClick={() => submitSummaryChart(row.doctorCode)}
                        >
                          ส่งสรุปชาร์ต
                        </Button>
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

export default Summary;
