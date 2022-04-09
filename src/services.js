import axios from "axios";
const BASE_API_URL = "http://localhost:3001";

export default {
  getPositions: () => axios.get(`${BASE_API_URL}/position`),
  addPosition: (position) =>
    axios.post(`${BASE_API_URL}/position/`, position).catch(({ response }) => {
      return response;
    }),
  editPosition: (positionId) =>
    axios.get(`${BASE_API_URL}/position/${positionId}`),

  updatePosition: (position) =>
    axios.put(`${BASE_API_URL}/position/${position.positionId}`, position),

  getBranches: () => axios.get(`${BASE_API_URL}/branch`),
  addBranch: (branch) =>
    axios.post(`${BASE_API_URL}/branch/`, branch).catch(({ response }) => {
      return response;
    }),
  editBranch: (branchId) => axios.get(`${BASE_API_URL}/branch/${branchId}`),

  updateBranch: (branch) =>
    axios.put(`${BASE_API_URL}/branch/${branch.branchId}`, branch),

  getOrgs: () =>
    axios
      .get(`${BASE_API_URL}/org`)
      .then(function (response) {
        let options = response.data.map((orgs) => ({
          value: orgs.orgId,
          label: orgs.orgName,
        }));
        return { options };
      })
      .catch(function (error) {
        console.log(error);
      }),

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
