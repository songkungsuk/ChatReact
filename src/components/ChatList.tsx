import {
    Avatar,
    ChatContainer,
    ConversationHeader,
    InfoButton,
    Message,
    MessageInput,
    MessageList,
    MessageSeparator,
    VideoCallButton,
    VoiceCallButton
} from "@chatscope/chat-ui-kit-react";
import { useEffect, useState } from "react";
import { axiosAuth } from "../api/axiosHttp";
import { publishMsg } from "../service/ChatService";
import { useChatDispatch, useChatSelector } from "../store";
import { setChatList } from "../store/chatListSlice";
import { Msg } from "../types/Msg.type";



export const ChatList = () => {
    // rtk에 저장한 채팅리스트
    const chatList = useChatSelector((state: any) => state.chatList);
    //페이징을 위한 변수 
    let currentPage = 1;
    //rtk함수를 위한 디스패치 사용
    const dispatch = useChatDispatch();
    //채팅창에서 내가 입력한 메세지
    const [InputMsg, setInputMsg] = useState("");
    //유저리스트에서 선택한 유저 UserList.tsx에서 onClick으로 dispatch 해서 selectedUser를 저장한걸 꺼내옴
    const selectedUser = useChatSelector((state: any) => state.selectedUser);
    //로그인한 유저
    const loginUser = useChatSelector((state: any) => state.user);
    //메세지 리스트
    const [msgs, setMsg] = useState<Msg[]>([]);

    //채팅날짜가 다른경우 날짜선 표시해주는 함수
    const days = ['월', '화', '수', '목', '금', '토', '일']
    const printMessageSeparator = (date1?: any, date2?: any) => {
        const d2 = new Date(date2);
        const d2Str = `${d2.getFullYear()}-${getFormat(d2.getMonth() + 1)}-${getFormat(d2.getDate())}`;
        if (!date1) {
            return <MessageSeparator content={`${d2Str} ${days[d2.getDay()]}요일`} />
        }

        const d1 = new Date(date1);
        const d1Str = `${d1.getFullYear()}-${getFormat(d1.getMonth() + 1)}-${getFormat(d1.getDate())}`;
        if (d1Str !== d2Str) {
            return <MessageSeparator content={`${d2Str} ${days[d2.getDay()]}요일`} />
        }
    }

    //날짜가 한자리수일때는 두자리로 표현해준다
    const getFormat = (n: number) => {
        return n < 10 ? '0' + n : n;
    }

    //메세지 보내는 함수
    const sendMsg = () => {
        console.log(InputMsg);
        publishMsg(`/publish/react-chat/${loginUser.uiNum}`, {
            cmiMessage: InputMsg,
            cmiSenderUiNum: loginUser.uiNum,
            cmiReceiveUiNum: selectedUser.uiNum
        });
        setInputMsg("");
    }

    //메세지 리스트 가져오는 함수 useRef사용해야하나 ?
    const getMsgs = async (init: boolean) => {
        if (init) {
            currentPage = 1;
            const res = await axiosAuth.get(`/chat-list?cmiSenderUiNum=${loginUser.uiNum}&cmiReceiveUiNum=${selectedUser.uiNum}&page=${currentPage}`);
            const tmpMsgs = res.data.list.reverse();
            console.log(tmpMsgs);
            setMsg(tmpMsgs);

            const chatInfo: any = {
                uiNum: selectedUser.uiNum,
                list: tmpMsgs
            }
            dispatch(setChatList(chatInfo));

        } else {
            currentPage++;
            const res = await axiosAuth.get(`/chat-list?cmiSenderUiNum=${loginUser.uiNum}&cmiReceiveUiNum=${selectedUser.uiNum}&page=${currentPage}`);
            const tmpMsgs = res.data.list.reverse();
            setMsg([...tmpMsgs, msgs]);
        }
    }



    useEffect(() => {
        //UseEffect에서는 async를 사용하려면 이렇게도 할수 있다고 한다.. 안에서 함수만들어서 실행!
        const messageList = async () => {
            //메세지 리스트 불러오는 함수.
            await getMsgs(true);
        }
        messageList();
    }, [selectedUser]);
    return (
        <ChatContainer>
            <ConversationHeader>
                <ConversationHeader.Back />
                <Avatar src="data:image/png;base64,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" name="Zoe" />
                <ConversationHeader.Content userName={selectedUser.uiId} info={selectedUser.loginDate} />
                <ConversationHeader.Actions>
                    <VoiceCallButton />
                    <VideoCallButton />
                    <InfoButton />
                </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList /*typingIndicator={<TypingIndicator content="" />}*/>
                {
                    selectedUser.uiNum !== 0 && chatList.list.map((msg: any, idx: number) => (
                        <>

                            {printMessageSeparator(idx === 0 ? null : chatList.list[idx - 1].cmiSentTime, msg.cmiSentTime)}
                            <Message
                                model={{
                                    message: msg.cmiMessage,
                                    sentTime: msg.cmiSentTime,
                                    sender: msg.cmiSender,
                                    direction: msg.cmiSenderUiNum === loginUser.uiNum ? "outgoing" : "incoming",
                                    position: "single"
                                }}                >
                                {msg.cmiSenderUiNum !== loginUser.uiNum ? <Avatar src="data:image/png;base64,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" name="Zoe" /> : ''}
                            </Message>
                        </>
                    ))

                }

                {/* 
                <Message model={{ message: "Hello my friend", sentTime: "15 mins ago", sender: "Patrik", direction: "outgoing", position: "single" }} avatarSpacer />
                <Message model={{ message: "Hello my friend", sentTime: "15 mins ago", sender: "Zoe", direction: "incoming", position: "first" }} avatarSpacer />
                */}

            </MessageList>
            <MessageInput placeholder="Type message here"
                value={InputMsg}
                onChange={(val) => {
                    setInputMsg(val);
                }}
                onSend={() => {
                    sendMsg();

                }}
            />
        </ChatContainer>
    )
}