export default function request(options) {
  options.data = options.data || {};
  options.headers = options.headers || {};

  // 设置默认的请求头
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('order:token'),
  };

  // 真正发送的请求头
  const requestHeaders = {
    method: options.method || 'GET',
    headers: Object.assign(options.headers, defaultHeaders),
  }

  // 处理请求的数据
  if (requestHeaders.method == 'GET') {
    // get请求要求参数必须拼到URL上
    const esc = encodeURIComponent; //把字符串进行编码（十六进制）
    const queryParams = Object.keys(options.data).map(item => `${esc(item)}=${options.data[item]}`).join('&');

    if (queryParams) {
      options.url += `?${queryParams}`
    }

  } else {
    requestHeaders.body = JSON.stringify(options.data);
  }

  return fetch('http://order-api.chenxuehui.com' + options.url, requestHeaders).then(res => res.json());
}

// request({
//   url: '/auth/user',
//   methode: 'POST',
//   data: {
//     username: 'kaivon',
//     passwort: "123"
//   },
//   headers: {

//   },
// })
//   .then(res => {
//     console.log(res);
//   })
//   .catch(res => {
//     console.log(res);
//   })