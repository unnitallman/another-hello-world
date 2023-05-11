import axios from "axios";

const fetch = () => axios.get("api/v1/job_sheets");
const create = payload => axios.post("api/v1/job_sheets", payload);
const update = (id, payload) => axios.put(`api/v1/job_sheets/${id}`, payload);
const destroy = payload => axios.post("api/v1/job_sheets/bulk_delete", payload);

const JobSheetsApi = {
  fetch,
  create,
  update,
  destroy,
};

export default JobSheetsApi;
