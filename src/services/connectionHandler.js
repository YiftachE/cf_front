import axios from 'axios';
import config from '../config';

let handler = {};

handler.saveCampaign = function(data){
  return axios.post(config.server + 'newProject', {
      data: data
    });
}

export default handler;
