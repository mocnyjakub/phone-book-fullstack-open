import axios from 'axios';
const URL = '/api/persons';

const getAll = () => {
  const request = axios.get(URL);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.data.error);
    });
};

const create = (newObject) => {
  const request = axios.post(URL, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.data.error);
    });
};

const deletePerson = (id) => {
  const request = axios.delete(`${URL}/${id}`);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.data.error);
    });
};

const update = (id, newObject) => {
  const request = axios.put(`${URL}/${id}`, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.data.error);
    });
};

const methods = { getAll, create, deletePerson, update };

export default methods;
