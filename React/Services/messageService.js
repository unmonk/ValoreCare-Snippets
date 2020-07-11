import axios from 'axios';
import {
  onGlobalError,
  onGlobalSuccess,
  API_HOST_PREFIX,
} from '../services/serviceHelpers';

const getReceivedBy = () => {
  const config = {
    method: 'GET',
    url: `${API_HOST_PREFIX}/api/messages/received`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getSentBy = () => {
  const config = {
    method: 'GET',
    url: `${API_HOST_PREFIX}/api/messages/sent`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getDrafts = () => {
  const config = {
    method: 'GET',
    url: `${API_HOST_PREFIX}/api/messages/drafts`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getCorrespondents = () => {
  const config = {
    method: 'GET',
    url: `${API_HOST_PREFIX}/api/messages/correspondents`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getConversation = (userId) => {
  const config = {
    method: 'GET',
    url: `${API_HOST_PREFIX}/api/messages/conversation/${userId}`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getById = (id) => {
  const config = {
    method: 'GET',
    url: `${API_HOST_PREFIX}/api/messages/${id}`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAll = () => {
  const config = {
    method: 'GET',
    url: `${API_HOST_PREFIX}/api/messages`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllPaginated = (pageIndex, pageSize) => {
  const config = {
    method: 'GET',
    url: `${API_HOST_PREFIX}/api/messages/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const add = (payload) => {
  const config = {
    method: 'POST',
    url: `${API_HOST_PREFIX}/api/messages/`,
    data: payload,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const update = (payload) => {
  const config = {
    method: 'PUT',
    url: `${API_HOST_PREFIX}/api/messages/${payload.id}`,
    data: payload,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteById = (id) => {
  const config = {
    method: 'DELETE',
    url: `${API_HOST_PREFIX}/api/messages/${id}`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export {
  getReceivedBy,
  getSentBy,
  getDrafts,
  getConversation,
  getCorrespondents,
  getById,
  getAll,
  getAllPaginated,
  add,
  update,
  deleteById,
};

// {
// 	"name": "5_0",
// 	"properties":{
// 		"max_participants": 2

// 	}
// }
