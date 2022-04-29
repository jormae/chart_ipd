import axios from "axios";

const BASE_API_URL = "http://localhost:3001";
export default {
  getCharts: () => axios.get(`${BASE_API_URL}/chart`),
  getSummaries: () => axios.get(`${BASE_API_URL}/chart/summary`),
  addChart: (chart) =>
    axios
      .post(`${BASE_API_URL}/chart/upload/`, chart)
      .then((response) => {
        // console.log(response);
        return response;
      })
      .catch((error) => {
        // Error
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
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
      }),
  // getPositions: () => axios.get(`${BASE_API_URL}/position`),
  // addPosition: (position) =>
  //   axios.post(`${BASE_API_URL}/position/`, position).catch(({ response }) => {
  //     return response;
  //   }),
  // editPosition: (positionId) =>
  //   axios.get(`${BASE_API_URL}/position/${positionId}`),
  // updatePosition: (position) =>
  //   axios.put(`${BASE_API_URL}/position/${position.positionId}`, position),
  // getBranches: () => axios.get(`${BASE_API_URL}/branch`),
  // addBranch: (branch) =>
  //   axios.post(`${BASE_API_URL}/branch/`, branch).catch(({ response }) => {
  //     return response;
  //   }),
  // editBranch: (branchId) => axios.get(`${BASE_API_URL}/branch/${branchId}`),
  // updateBranch: (branch) =>
  //   axios.patch(`${BASE_API_URL}/branch/${branch.branchId}`, branch),
  //   getOrgs: () =>
  //     axios
  //       .get(`${BASE_API_URL}/org`)
  //       .then(function (response) {
  //         let options = response.data.map((orgs) => ({
  //           value: orgs.orgId,
  //           label: orgs.orgName,
  //         }));
  //         return { options };
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       }),
  //   getAllDepartments: () => axios.get(`${BASE_API_URL}/departments`),
  //   getAllActiveDepartments: () =>
  //     axios.get(`${BASE_API_URL}/departments/active`),
  //   addDepartment: (department) =>
  //     axios.post(`${BASE_API_URL}/department/`, department),
  //   editDepartment: (deptId) => axios.get(`${BASE_API_URL}/department/${deptId}`),
  //   updateDeptarment: (department) =>
  //     axios.put(`${BASE_API_URL}/department/${department.deptId}`, department),
  //   deleteDepartment: (deptId) =>
  //     axios.delete(`${BASE_API_URL}/department/${deptId}`),
  //   getAllNurseTypes: () => axios.get(`${BASE_API_URL}/nursetypes`),
  //   getAllDeptNurseTypes: (deptId) =>
  //     axios.get(`${BASE_API_URL}/nursetypes/deptId/${deptId}`),
  //   editNurseType: (nurseTypeId) =>
  //     axios.get(`${BASE_API_URL}/nursetype/${nurseTypeId}`),
  //   addNurseType: (nursetype) =>
  //     axios.post(`${BASE_API_URL}/nursetype/`, nursetype),
  //   updateNurseType: (nursetype) =>
  //     axios.put(`${BASE_API_URL}/nursetype/${nursetype.nurseTypeId}`, nursetype),
  //   deleteNurseType: (nurseTypeId) =>
  //     axios.delete(`${BASE_API_URL}/nursetype/${nurseTypeId}`),
  //   getAllOeratives: () => axios.get(`${BASE_API_URL}/operatives`),
  //   getAllDeptOperatives: (deptId) =>
  //     axios.get(`${BASE_API_URL}/operatives/deptId/${deptId}`),
};
