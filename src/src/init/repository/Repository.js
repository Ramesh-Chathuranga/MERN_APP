import axios from "axios";
import _ from "lodash";

const URL=`http://localhost:3002/`;


export default class Repository {
  url = `${URL}api/1.0.0.0/machine`;

  constructor() {
 
  }

  data = async (method, path, data = null, token = '') => {
    return axios({
      method: method,
      url: this.url + path,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        // "Access-Control-Allow-Origin":'*',
        // "Access-Control-Allow-Methods": "POST,GET,OPTIONS, PUT, DELETE",
        // "Access-Control-Allow-Headers": "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
      }
    })
      .then((response) => response)
      .catch((e) => {
        return e.response;
      });
  };


  getAxios = async (path) => {
    return axios.get(path);
  }

  getData = (path, data, token = '') => {
    return this.data("get", path, data, token);
  };

  postData = (path, data, token = '') => {
    return this.data("post", path, data, token);
  };

  putData = (path, data, token = '') => {
    return this.data("put", path, data, token);
  };

  deleteData = (path, data, token = '') => {
    return this.data("delete", path, data, token);
  };

  saveForm =async (path,fd,token)=>{
    try{
      const config = {
        header:{
          'content-type':'multipart/form-data',
        }
      };
      const data= await axios.post(this.url+path,fd,config);
      return data
    }catch(error){
      console.log("Error",error);
      return {error}
    }
  }

  updateForm =async (path,fd,token)=>{
    try{
      const config = {
        header:{
          'content-type':'multipart/form-data',
        }
      };
      const data= await axios.put(this.url+path,fd,config);
      return data
    }catch(error){
      console.log("Error",error);
      return {error}
    }
  }

}

export {URL}