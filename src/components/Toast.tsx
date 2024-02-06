import { useChatDispatch, useChatSelector } from "../store"
import { initUser, setEnterUser } from "../store/enterUserSlice";
import { User } from "../types/User.type";

export const Toast = ()=>{
    const enterUser:any = useChatSelector((state:any)=>state.enterUser);
    const loginUser:any = useChatSelector((state:any)=>state.user);
    const dispatch = useChatDispatch();
    const user:any = {uiNum:0,uiName:''};
    const hideDiv = ()=>{
        dispatch(initUser());
    }
    const printMsg = ()=>{
        return`${enterUser.uiName}님${enterUser.uiNum===loginUser.uiNum?' 반갑습니다':'이 입장하셨습니다.'}`;
    }
    return (
        <div>
            {enterUser.uiNum!=0?
                <div className="custom-toast">
                <p>{printMsg()}</p>
                <button onClick={hideDiv}>확인</button>
                </div>:''
            }
        </div>
    )
    
}