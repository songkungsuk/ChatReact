import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Main } from './components/Main';
import { useChatDispatch, useChatSelector } from './store';
import { useEffect } from 'react';
import { setUserList } from './store/userListSlice';
import { disconnectClient, initClient } from './service/ChatService';
import { Toast } from './components/Toast';
import { setEnterUser } from './store/enterUserSlice';
import { Menu } from './components/Menu';
import { persistor } from '.';
import { globalRouter } from './api/globalRouter';
import { setChatList } from './store/chatListSlice';




function App() {

  //토큰이 없을때 페이지에서 검사해서 이동시켜주는 navigate axios를 편집해서 간단하게 구현이되었습니다.
  const navigate = useNavigate();
  globalRouter.navigate = navigate;
  //useSelector로 저장된 유저객체 가져옴
  const loginUser = useChatSelector((state: any) => state.user);
  const uiNum = localStorage.getItem('uiNum');
  const tmpObj = useChatSelector((state: any) => state.userList);
  const selectedUser = useChatSelector((state: any) => state.selectedUser);
  const dispatch = useChatDispatch();
  const configs = [{
    //사람이 들어오면 해당 함수를 실행한다. 
    url: '/topic/enter-chat',
    callback: (data: any) => {
      const tmpUsers = JSON.parse(data.body);
      const loginUsers = tmpObj.list.filter((user: any) => {
        //redux에 저장된 state.userList.list 는 사용자가 접속할때 처음 받아오는 유저 리스트이다
        //그 유저리스트 중 login속성이 false인것일때만 해당 로직이 실행된다
        if (!user.login) {
          for (const tmpUser of tmpUsers) {
            //서버에서 받아온 유저리스트중 로그인인 유저를 loginUsers에 대입 
            if (tmpUser.login && tmpUser.uiNum === user.uiNum) {
              //
              return user;
            }
          }
        }
      });
      for (const loginUser of loginUsers) {
        //방금 접속한 유저를 reducers 에 저장 근데 enterUser는 배열이아니기때문에 하나만 저장되는것...
        dispatch(setEnterUser(loginUser));
      }
      //유저리스트를 reducers에 저장
      dispatch(setUserList(tmpUsers));
    }
  },
  //메세지를 받으면 이 함수가 자동적으로 실행이되는거다.
  {
    url: `/topic/chat/${loginUser.uiNum}`,
    callback: (data: any) => {
      const tmpList = JSON.parse(localStorage.getItem('userList') || '[]');
      const selectedUser = JSON.parse(localStorage.getItem('selectedUser') || '{}');
      const msg = JSON.parse(data.body);
      const uiNum = parseInt(localStorage.getItem('uiNum') || '0');
      //자신은숫자오르면안되니 자신은제외 
      if (msg.cmiSenderUiNum !== selectedUser.uiNum && msg.cmiSenderUiNum !== uiNum) {
        for (const user of tmpList) {
          if (user.uiNum === msg.cmiSenderUiNum) {
            user.unreadCnt = (isNaN(user.unreadCnt) ? 1 : ++user.unreadCnt);
            console.log(user);
          }

        }
      } else {
        const chatlist = JSON.parse(localStorage.getItem('chatList') || '');
        const chatInfo: any = {
          uiNum: selectedUser.uiNum,
          list: [...chatlist, msg]
        }
        dispatch(setChatList(chatInfo));
        console.log('msg=>', msg);
      }

      dispatch(setUserList(tmpList));

    }
  }]
  //useEffect로 로그인유저 화긴
  useEffect(() => {
    disconnectClient();
    if (!loginUser.uiNum) {
      persistor.purge();
      return;
    }
    initClient(configs)
      .catch(e => {
        console.log(e);
      });
  }, [loginUser]);

  return (
    <>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={loginUser.uiNum == 0 ? '/sign-in' : '/main'}>
              Chatting
            </Link>
            <Menu />
          </div>
        </nav>

        <div className="auth-wrapper">
          <Toast />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/main" element={<Main />} />
          </Routes>

        </div>
      </div>
    </>
  );
}

export default App;
