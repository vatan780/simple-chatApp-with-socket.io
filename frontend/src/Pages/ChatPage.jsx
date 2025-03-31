import React from 'react'
// import { ChatState } from '../ChatProvider'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../pageComponent/miscellaneous/SideDrawer'
import MyChats from '../pageComponent/MyChats'
import ChatBox from '../pageComponent/ChatBox'
import { ChatState } from '../Context/ChatProvider'

const ChatPage = () => {
  const { user } = ChatState()
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"))

  return (
    <>
      <div style={{ width: "100%" }}>

        {user?.data && <SideDrawer />}
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          h='91.5vh'
          p="10px"

        >
          {user?.data && <MyChats />}
          {user?.data && <ChatBox />}

        </Box>

      </div>

    </>
  )
}

export default ChatPage
