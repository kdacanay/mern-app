import axios from 'axios';

const setAuthToken = token => {

  // if there is a token in local storage, this will send it with every request

  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;