import { useState } from "react"
import { ChatUserInfo } from "../types/ChatUserInfo.type";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const [error, setError] = useState<boolean>(false);
    const [chatUser, setChatUser] = useState<ChatUserInfo>({});
    const [errMsg, setErrMsg] = useState<string>('');
    const navigate = useNavigate();
    const join = async () => {
        const res = await axios.post('http://localhost/join', chatUser, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then((res) => {
            console.log(res);
            alert('회원가입 완료');
            navigate('/sign-in');
        }).catch(err=>{
            console.log(err);
            setErrMsg('오류');
        })
    }
    const changeUser = (event: any) => {
        setChatUser({
            ...chatUser,
            [event.target.id]: event.target.value
        })
        console.log(chatUser);
    }
    return (
        <div className="auth-inner">
            <form>
                <h3>Sign Up</h3>

                <div className="mb-3">

                    <div className='text-danger'>
                        {errMsg !== '' ? errMsg : ''}
                    </div>

                    <label>아이디</label>
                    <input type="text" className="form-control" placeholder="아이디" id='chiId' onChange={changeUser} />
                </div>

                <div className="mb-3">
                    <label>비밀번호</label>
                    <input type="password" className="form-control" placeholder="비밀번호" id='chiPwd' onChange={changeUser} />
                </div>

                <div className="mb-3">
                    <label>이름</label>
                    <input type="text" className="form-control" placeholder="이름" id='chiName' onChange={changeUser} />
                </div>

                <div className="d-grid">
                    <button type="button" className="btn btn-primary" onClick={join} >
                        회원가입
                    </button>
                </div>
                <p className="forgot-password text-right">
                    <a href="#">로그인하러가기</a>
                </p>
            </form>
        </div>
    )
}