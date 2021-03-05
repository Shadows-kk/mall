import axios from 'axios'

export function request(config){
  
    const instance = axios.create({
      baseURL:'http://152.136.185.210:7878/api/m5',
      timeout:500
    }) 

    // a.axios的拦截器 请求拦截
    instance.interceptors.request.use(config => {
      // console.log('拦截器的数据');
      // console.log(config);
      return config
    },err => {
      console.log(err);
    })
    // b.响应拦截
    instance.interceptors.response.use(res => {
      // console.log(res);
      return res.data
    },err => {
      console.log(err);
    })

    // instance返回值就是promise 
    // 发送真正的网络请求
    return instance(config)
    
  }
