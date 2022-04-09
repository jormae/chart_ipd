import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { maxWidth } from "@mui/system";
import Link from "@mui/material/Link";
import services from "../services";
import EditIcon from "@mui/icons-material/Edit";

// export default function Position() {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [positions, setPositions] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3001/position")
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           setIsLoaded(true);
//           setPositions(result);
//         },
//         // Note: it's important to handle errors here
//         // instead of a catch() block so that we don't swallow
//         // exceptions from actual bugs in components.
//         (error) => {
//           setIsLoaded(true);
//           setError(error);
//         }
//       );
//   }, []);

const Position = () => {
  const [positions, setPositions] = useState({ blogs: [] });
  const fetchPositions = async () => {
    try {
      const { data } = await services.getPositions();
      setPositions({ blogs: data });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, [setPositions]);

  //   if (error) {
  //     return <div>Error: {error.message}</div>;
  //   } else if (!isLoaded) {
  //     return <div>Loading...</div>;
  //   } else {
  return (
    <React.Fragment>
      <CssBaseline>
        <Container maxWidth="lg" sx={{ p: 2 }}>
          <Paper sx={{ p: 2 }}>
            <div style={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  p: 1,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                }}
              >
                <Box sx={{ flexGrow: 1 }}>Position Info</Box>
                <Box>
                  <Link href="form">
                    <Button variant="contained" size="medium">
                      Create
                    </Button>
                  </Link>
                </Box>
              </Box>

              <TableContainer>
                <Table sx={{ width: maxWidth }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="right">Position Name</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {positions.blogs.map((row) => (
                      <TableRow
                        key={row.positionId}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.positionId}
                        </TableCell>
                        <TableCell align="right">{row.positionName}</TableCell>
                        <TableCell align="right">
                          {row.positionStatusId}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            size="medium"
                            startIcon={<EditIcon />}
                            href={row.positionId.toString()}
                          >
                            update
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
        </Container>
      </CssBaseline>
    </React.Fragment>
  );
  //   }
};

export default Position;
