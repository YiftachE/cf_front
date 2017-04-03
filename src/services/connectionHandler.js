import axios from 'axios';
import config from '../config';

let handler = {};

handler.saveCampaign = function(data){
  return axios.post(config.server + 'newProject', {
      data: data
    });
}

handler.addToBlackList = function(data){
  return axios.post(config.server + 'addToBlackList', {
      campaign: data.campaign,
      site: data.site
    });
}

handler.getAllBlackListed = function(){
  return axios.get(config.server + 'getAllBlackList');
}

handler.startAlgo = function(campaign, limit){
  return axios.post(config.server + 'start', {
      campaign: campaign,
      limit: limit
    });
}

export default handler;
