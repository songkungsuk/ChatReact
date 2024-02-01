import { useChatDispatch, useChatSelector } from "../store"
import { setEnterUser } from "../store/enterUserSlice";

export const Toast = () => {
    //rtk에 저장되있는 enterUser꺼내옴
    const enterUser: any = useChatSelector((state: any) => state.enterUser);
    //rtk의 store폴더안에있는 애들쓸려면 해야되는것
    const dispatch = useChatDispatch();
    //확인눌럿을때 해당값으로 초기화
    const user: any = { uiNum: 0, uiName: '' };
    //확인버튼 눌럿을때 사용하는 함수
    const hideDiv = () => {
        dispatch(setEnterUser(user));
    }
    return (
        <div>
            {enterUser.uiNum != 0 ?
                <div className="custom-toast">
                    <p>**님이 로그인 하였습니다.</p>
                    <button>확인</button>
                </div>:''
            }
        </div>
    )
}