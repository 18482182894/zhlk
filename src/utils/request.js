import axios from 'axios'
//import router from '../router/index.js'
const service = axios.create({
    baseURL:process.env.BASE_API,
    timeout: 150000
})
axios.defaults.headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
}
axios.defaults.transformRequest = [function (data) {
    var newData = "";
    for (var k in data) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
    }
    return newData
}];

service.interceptors.request.use(config =>{
    // console.log(JSON.stringify(config))
    if(localStorage.getItem("userInfo")){
        let token =  JSON.parse(localStorage.getItem("userInfo"))
        if(token.access_token){
            // config.params = {"access_token":token.access_token};
           config.params['access_token'] = token.access_token
        }
    }
    // config.headers['token'] = getToken();
    return config
},error => {
    Promise.reject(error)
})


service.interceptors.response.use(response => {
    if (response) {
        switch (response.data.code) {
            case "500":
                if (response.data.data=="access_token不合法或已过期!") {
                  layer.alert('请重新登录！',{closeBtn:0},function() {
                    layer.closeAll();
                    window.localStorage.removeItem("userInfo");
                    router.replace({
                      path: '/login',
                      query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    })
                  })
                }
            break
        }
    }
    return response.data
},error => {
    return Promise.reject(error)
})


export default service
