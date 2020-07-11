import axios from 'axios';
import {
  onGlobalError,
  onGlobalSuccess,
  API_HOST_PREFIX,
} from '../services/serviceHelpers';

const getRooms = () => {
  const config = {
    method: 'GET',
    url: `${API_HOST_PREFIX}/videochat/rooms`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getConfig = () => {
  const config = {
    method: 'GET',
    url: `${API_HOST_PREFIX}/videochat/`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const createRoom = (payload) => {
  const config = {
    method: 'POST',

    data: payload,
    url: `${API_HOST_PREFIX}/videochat/rooms`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getRoomInfo = (roomId) => {
  const config = {
    method: 'GET',
    url: `${API_HOST_PREFIX}/videochat/room/${roomId}`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getRoom = (roomId) => {
  const config = {
    method: 'POST',
    url: `${API_HOST_PREFIX}/videochat/room/${roomId}`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteRoom = (roomId) => {
  const config = {
    method: 'DELETE',
    url: `${API_HOST_PREFIX}/videochat/room/${roomId}`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getMeetings = () => {
  const config = {
    method: 'GET',
    url: `${API_HOST_PREFIX}/videochat/meetings`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

//getRooms
//PostRooms
//GET room name
//POST room name
//DELETE room name
//POST meeting tokens
//GET meeting tokens

//GET analytics

export {
  getRooms,
  getConfig,
  createRoom,
  getRoom,
  getRoomInfo,
  deleteRoom,
  getMeetings,
};
