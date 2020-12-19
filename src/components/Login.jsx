import React from 'react';
import { useHistory } from 'react-router-dom';

const Login = ({authService}) => {
  const history=useHistory();
  
  const login = () => {
    authService.login().then((e) => {
      history.push({
        pathname:'/items',
        state:{id:e.user.uid}
      })
    })
  }

  const moveItemrow = () => {
    history.push('/items');
  }
  return(
  <div className="Login">
    <button className="btnLogin" onClick={login}>구글로그인</button>

  </div>
);
  }
export default Login;