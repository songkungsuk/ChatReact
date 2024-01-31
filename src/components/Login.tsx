import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosHttp } from '../api/axiosHttp';
import { useAppDispatch } from '../store';
import { setUser } from '../store/userSlice';
import { User } from '../types/User.type';

export const Login = () => {
  const [error, setError] = useState<boolean>(false);
  const [chatUser, setChatUser] = useState<User>({});
  const [rememberId, setRememberId] = useState<boolean>(false);
  const uiId: any = localStorage.getItem('uiId');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //function 입력값에따라 유저객체가 변화한다
  const changeUser = (evt: any) => {
    if (localStorage.getItem('uiId')) {
      localStorage.removeItem('uiId');
    }
    setChatUser({
      ...chatUser,
      [evt.target.id]: evt.target.value
    })
  }

  //체크박스 체크 여부 
  const checkRememberId = (evt: any) => {
    setRememberId(evt.target.checked);
  }

  //로그인 함수
  const login = async () => {
    try {
      const res = await axiosHttp.post('/api/login', chatUser);
      dispatch(setUser(res.data));
      localStorage.setItem('token', res.data.token);
      navigate('/main');
    } catch (error) {
      setError(true);
    }
  }

  //useEffect에 두번째 매개변수에 [] 를 한 경우에는 한번만실행된다.
  useEffect(() => {
    if (localStorage.getItem('uiId')) {
      setRememberId(true);
    }
  }, [])


  return (
    <div className="auth-inner">
      <form>
        <h3>Sign In</h3>

        <div className="mb-3">
          {error
            ?
            <div className='text-danger'>
              아이디와 비밀번호를 확인해주세요.
            </div> : ''
          }
          <label>아이디</label>
          <input
            type="text"
            className="form-control"
            placeholder="아이디"
            onChange={changeUser}
            id='uiId'
            value={uiId}
          />
        </div>

        <div className="mb-3">
          <label>비밀번호</label>
          <input
            type="password"
            className="form-control"
            placeholder="비밀번호"
            onChange={changeUser}
            id='uiPwd'
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
              onChange={checkRememberId}
              checked={rememberId}
            />
            <label className="custom-control-label" htmlFor="customCheck1" >
              아이디 저장
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="button" className="btn btn-primary" onClick={login}>
            Sign In
          </button>
        </div>
        <p className="forgot-password text-right">
          <a href="#">회원가입</a>
        </p>
      </form>
    </div>
  )
}
