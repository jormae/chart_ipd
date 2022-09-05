import React from "react";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
// import DocumentScannerIcon from "@mui/icons-material/DocumentScannerIcon";
// import { maxWidth } from "@mui/system";
// import Link from "@mui/material/Link";
// import services from "../services";
import {
  CssBaseline,
  Button,
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";

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

const Dashboard = (props) => {
  const classes = useStyles(props);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3001/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status != "success") {
          localStorage.removeItem("token");
          localStorage.removeItem("staffName");
          window.location = "/login";
          console.log(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <React.Fragment>
      <CssBaseline>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, Welcome back
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.blueGrey} sx={{ minWidth: 275 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Typography
                        sx={{ fontSize: 20 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        รับจาก WARD
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <DriveFileMoveIcon sx={{ fontSize: 80 }} />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions className={classes.darkBlueGrey}>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    href="/register"
                    // startIcon={<DocumentScannerIcon />}
                  >
                    Go!
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.blueGrey} sx={{ minWidth: 275 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Typography
                        sx={{ fontSize: 20 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        ส่งสรุป Chart
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <DriveFileMoveIcon sx={{ fontSize: 80 }} />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions className={classes.darkBlueGrey}>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    href="/summary"
                  >
                    Go!
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.blueGrey} sx={{ minWidth: 275 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Typography
                        sx={{ fontSize: 20 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        3.รับ Chart จากหมอ สรุป
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <DriveFileMoveIcon sx={{ fontSize: 80 }} />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions className={classes.darkBlueGrey}>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    href="/return-summary"
                  >
                    Go!
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.blueGrey} sx={{ minWidth: 275 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Typography
                        sx={{ fontSize: 20 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        4.ลงทะเบียน Reaudit Chart
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <DriveFileMoveIcon sx={{ fontSize: 80 }} />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions className={classes.darkBlueGrey}>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    href="/reaudit"
                  >
                    Go!
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </CssBaseline>
    </React.Fragment>
  );
  //   }
};

export default Dashboard;
