import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Main } from './components/Main';
import { useChatDispatch, useChatSelector } from './store';
import { useEffect } from 'react';
import { setUserList } from './store/userListSlice';
import { disconnectClient, initClient } from './service/ChatService';



function App() {

  //useSelector로 저장된 유저객체 가져옴
  const loginUser = useChatSelector((state: any) => state.user);
  const dispatch = useChatDispatch();
  const config = {
    url: '/topic/enter-chat',
    callback: (data: any) => {
      const tmpUsers = JSON.parse(data.body);
      console.log('callback=>', tmpUsers);
      dispatch(setUserList(tmpUsers));
    }
  }
  //useEffect로 로그인유저 화긴
  useEffect(() => {
    disconnectClient();
    if (!loginUser.uiNum) {
      return;
    }
    console.log(loginUser);
    initClient(config);
    console.log('default=>', loginUser);
  }, [loginUser]);

  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              Chatting
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    SignIn
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    SignUp
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/Main'}>
                    채팅
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/main" element={<Main />} />
          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
