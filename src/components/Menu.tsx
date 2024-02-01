import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { persistor } from '..';
import { useChatSelector } from '../store';
import { User } from '../types/User.type';


export const Menu = () => {
    const loginUser: User = useChatSelector((state: any) => state.user);
    const dispatch = useDispatch();

    return (

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
                {loginUser.uiNum === 0 ? <>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/sign-in'}>
                            SignIn
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/sign-up'}>
                            SignUp
                        </Link>
                    </li></>
                    : ''}
                {loginUser.uiNum !== 0 ? <>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/'} onClick={() => persistor.purge()}>
                            로그아웃
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/Main'}>
                            채팅
                        </Link>
                    </li></> : ''
                }
            </ul>
        </div>

    );
}