import React from 'react'
import  { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SingleChat from './SingleChat';

const ChatBox = ({fatchAgain , setFatchAgain}) => {
  const { selectedChat } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      // alignItems="center"
      justifyContent="center"
      flexDirectin="column"  
      p={3}
      bg="white"
      w={{base:"100%" , md:"68%"}}
      borderRadious="lg"
      borderWidth="1px "
    >
   
      <SingleChat fatchAgain={fatchAgain} setFatchAgain={setFatchAgain}  />

    </Box>
    // <h1>hello</h1>
  )
}

export default ChatBox
