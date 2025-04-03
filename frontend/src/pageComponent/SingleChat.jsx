import { Box, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { ArrowBackIcon } from '@chakra-ui/icons'

const SingleChat = ({fatchAgain , setFatchAgain}) => {
    const {selectedChat , setSelectedChat} = ChatState()
  return (
    <>
    {
        selectedChat ? (
            <Text
            fontSize={{base:"28px" , md:"30px"}}
            pb={3}
            px={2}
            width="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{base:"space-between"}}
            // alignItems="center"
            >
                <IconButton 
                display={{base:'flex',md:'none'}}
                icon={<ArrowBackIcon/>}
                onClick={()=>setSelectedChat("")}
                >

                </IconButton>

            </Text>
        )
        :
        (
            <Box display="flex" alignItems="center" justifyContent="center" h='100%'>


                <Text fontSize="3xl" pb={3} fontFamily='Work sans'>
                    Click On the User To Start CHatting
                </Text>

            </Box>
        )
    }
    </>
  )
}

export default SingleChat
