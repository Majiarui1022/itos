import axios from 'axios';
import Vue from 'vue'
import router from '../router/index'

axios.interceptors.response.use(
  data => {
    if(data.data.error == -1){
      Vue.prototype.$alert.errorTit(Vue.prototype,data.data.message);
      return {code : -1}
    }
    return data;
  },
  err => {
    if (err.response.status === 504 || err.response.status === 404) {
      // console.log("服务器被吃了⊙﹏⊙∥");
      Vue.prototype.$alert.errorTit(Vue.prototype,'获取资源失败');
      return
    } else if (err.response.status === 401) {
      Vue.prototype.$alert.errorTit(Vue.prototype,'登录信息失效');
      router.push({
        name : 'login'
      })
    } else if (err.response.status === 500) {
      // console.log("服务器开小差了⊙﹏⊙∥");
      Vue.prototype.$alert.errorTit(Vue.prototype,'服务器开小差了');
      return
    } else if (err.response.status === 403) {
      // console.log("服务器开小差了⊙﹏⊙∥");
      Vue.prototype.$alert.errorTit(Vue.prototype,'您没有操作权限');
      return
    }
    return Promise.reject(err);
  }
);

export default {
  /**
   * POST请求
   * @param {string} url 接口地址
   * @param {object} request 请求参数
   */
  post(url, request, headerFlag) {
    const headers = {
      headers: {
        'Content-Type': headerFlag ? 'multipart/form-data' : "application/json;charset=UTF-8",
        "Authorization":sessionStorage.getItem('T_ok') ?  'JWT ' +  sessionStorage.getItem('T_ok') : sessionStorage.getItem('T_ok') ? 'JWT ' +  sessionStorage.getItem('T_ok') :'',
      }
    }
    return new Promise((resolve, reject) => {
      axios.post(url , request, headers).then((response) => {
        if(response.code == -1 && response.code)return
        resolve(response)
      }, (error) => {
        reject(error)
      });
    });
  },
  /**
   * GET请求
   * @param {string} url 接口地址
   * @param {object} request 请求参数
   */
  get(url, request) {
    const headers = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Authorization":sessionStorage.getItem('T_ok') ?  'JWT ' +  sessionStorage.getItem('T_ok') : sessionStorage.getItem('T_ok') ? 'JWT ' +  sessionStorage.getItem('T_ok') :'',
      }
    }
    return new Promise((resolve, reject) => {
      axios.get(url, headers, {
        params: request
      }).then((response) => {
        if(response.code == -1 && response.code)return
        resolve(response)
      }, (error) => {
       
        reject(error)
      });
    });
  },
  /**
   * DELETE 请求
   * @param {*} Vue
   */
  delete(url, request) {
    const headers = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Authorization":sessionStorage.getItem('T_ok') ?  'JWT ' +  sessionStorage.getItem('T_ok') : sessionStorage.getItem('T_ok') ? 'JWT ' +  sessionStorage.getItem('T_ok') :'',
      }
    }
    return new Promise((resolve, reject) => {
      axios.delete(url, headers, request).then((response) => {
        if(response.code == -1 && response.code)return
        resolve(response)
      }, (error) => {
        reject(error)
      });
    });
  },
  put(url, request, headerFlag) {
    const headers = {
      headers: {
        "content-type":  headerFlag ? 'multipart/form-data' : "application/json;charset=UTF-8",
        "Authorization":sessionStorage.getItem('T_ok') ?  'JWT ' +  sessionStorage.getItem('T_ok') : sessionStorage.getItem('T_ok') ? 'JWT ' +  sessionStorage.getItem('T_ok ') :'',
      }
    }
    return new Promise((resolve, reject) => {
      axios.put(url , request, headers).then((response) => {
        if(response.code == -1 && response.code)return
        resolve(response)
      }, (error) => {
        reject(error)
      });
    });
  },
  /**
   * PUT请求
   * @param {*} Vue
   */

  putfal(url, request) {
    const headers = {
      headers: {
        "content-type":"application/json;charset=UTF-8",
      }
    }
    return new Promise((resolve, reject) => {
      axios.put(url , request, headers).then((response) => {
        if(response.code == -1 && response.code)return
        resolve(response)
      }, (error) => {
        reject(error)
      });
    });
  },


  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', {
      value: {
        post: this.post,
        get: this.get,
        delete: this.delete,
        put: this.put,
        putfal : this.putfal
      }
    })
  }
}
