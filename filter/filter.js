//判断用户是否登录
let islogin = function () {
  let tokens = sessionStorage.getItem('token');
  let is_logins = false;
  if (tokens) {
    is_logins = true
  } else {
    is_logins = false;
  }
  return is_logins
}

export default {
	islogin
}