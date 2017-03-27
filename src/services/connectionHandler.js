import axios from 'axios';
import config from '../config';

let handler = {};

handler.saveCampaign = function(val){
  axios.post(config.server + 'newProject', {
      projectName: val
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default handler;
