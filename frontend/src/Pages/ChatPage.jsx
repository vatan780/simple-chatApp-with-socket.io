import React from 'react'
import { ChatState } from '../ChatProvider'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../pageComponent/miscellaneous/SideDrawer'
import MyChats from '../pageComponent/MyChats'
import ChatBox from '../pageComponent/ChatBox'

const ChatPage = () => {
  const { user } = ChatState()
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))

  return (
    <>
      <div style={{ width: "100%" }}>

        {userInfo && <SideDrawer />}
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          h='91.5vh'
          p="10px"

        >
          {userInfo && <MyChats />}
          {userInfo && <ChatBox />}

        </Box>

      </div>

    </>
  )
}

export default ChatPage
