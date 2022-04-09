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

// export default function Branch() {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [branches, setBranches] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3001/branch")
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           setIsLoaded(true);
//           setBranches(result);
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

const Branch = () => {
  const [branches, setBranches] = useState({ blogs: [] });
  const fetchBranches = async () => {
    try {
      const { data } = await services.getBranches();
      setBranches({ blogs: data });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, [setBranches]);

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
                <Box sx={{ flexGrow: 1 }}>Branch Info</Box>
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
                      <TableCell align="center">Branch Name</TableCell>
                      <TableCell align="center">Org Name</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {branches.blogs.map((row) => (
                      <TableRow
                        key={row.branchId}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {row.branchId}
                        </TableCell>
                        <TableCell align="left">{row.branchName}</TableCell>
                        <TableCell align="left">{row.orgName}</TableCell>
                        <TableCell align="left">{row.branchStatusId}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            size="medium"
                            startIcon={<EditIcon />}
                            href={row.branchId.toString()}
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

export default Branch;
