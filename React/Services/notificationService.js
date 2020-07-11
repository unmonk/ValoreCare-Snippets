import axios from 'axios';
import {
  onGlobalError,
  onGlobalSuccess,
  API_HOST_PREFIX,
} from '../services/serviceHelpers';

const getByUserId = (userId) => {
  const config = {
    method: 'GET',
    url: `${API_HOST_PREFIX}/api/notifications/${userId}`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getById = (id) => {
  const config = {
    method: 'GET',
    url: `${API_HOST_PREFIX}/api/notifications/notification/${id}`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const sendNotification = (payload) => {
  const config = {
    method: 'POST',
    url: `${API_HOST_PREFIX}/api/notifications/`,
    data: payload,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getTotal = () => {
  const config = {
    method: 'GET',
    url: `${API_HOST_PREFIX}/api/notifications/total`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { getById, getByUserId, getTotal, sendNotification };
