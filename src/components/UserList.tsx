import { Avatar, Conversation, ConversationList, Search, Sidebar } from "@chatscope/chat-ui-kit-react";
import { axiosAuth } from "../api/axiosHttp";
import { useEffect, useState } from "react";
import { User } from "../types/User.type";
import { useAppSelector } from "../store";

export const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const loginUser = useAppSelector((state: any) => state.user);

    const init = async () => {
        console.log(loginUser);
        const res = await axiosAuth.get('/user-infos');
        let tmpUsers: User[] = res.data;
        setUsers(tmpUsers.filter(user => user.uiNum !== loginUser.uiNum));
    }




    useEffect(() => {
        init();
        console.log(users);
    }, []);

    return (
        <Sidebar position="left" scrollable={false}>
            <Search placeholder="Search..." />
            <ConversationList>
                {
                    users.map((chatUser: User, idx) => (
                        <Conversation name={chatUser.uiId} lastSenderName={chatUser.uiName} info="Yes i can do it for you" style={{ justifyContent: "start" }}                >
                            <Avatar src={require("./images/ram.png")} name={chatUser.uiName} status={chatUser.login ? "available" : "dnd"} />
                        </Conversation>
                    ))
                }

                <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you"                >
                    <Avatar src={require("./images/ram.png")} name="Joe" status="dnd" />
                </Conversation>

                <Conversation name="Emily" lastSenderName="Emily" info="Yes i can do it for you" unreadCnt={3}                >
                    <Avatar src={require("./images/ram.png")} name="Emily" status="available" />
                </Conversation>

                <Conversation name="Kai" lastSenderName="Kai" info="Yes i can do it for you" unreadDot>
                    <Avatar src={require("./images/ram.png")} name="Kai" status="unavailable" />
                </Conversation>
            </ConversationList>
        </Sidebar>
    );
}