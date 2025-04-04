import { Box, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { ArrowBackIcon } from '@chakra-ui/icons'

import { getSender, getSenderFull } from '../config/chatLogic'
import ProfileModal from './miscellaneous/ProfileModal'
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal'

const SingleChat = ({ fatchAgain, setFatchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState()

    console.log("selectedChat in signgle chat", selectedChat)
    return (
        <>
            {
                selectedChat ? (

                    <>
                        <Text
                            fontSize={{ base: "28px", md: "30px" }}
                            pb={3}
                            px={2}
                            width="100%"
                            fontFamily="Work sans"
                            display="flex"
                            justifyContent={{ base: "space-between" }}
                        // alignItems="center"
                        >
                            <IconButton
                                display={{ base: 'flex', md: 'none' }}
                                icon={<ArrowBackIcon />}
                                onClick={() => setSelectedChat("")}
                            />
                            {
                                !selectedChat.isGroupChat && selectedChat.users ?
                                    (
                                        <>
                                            {getSender(user, selectedChat.users)}

                                            <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            {selectedChat?.chatName?.toUpperCase()}
                                            {
                                                <UpdateGroupChatModal
                                                fatchAgain={fatchAgain}
                                                setFatchAgain={setFatchAgain}
                                                />
                                            }
                                        </>
                                    )}
                        </Text>



                        <Box
                            d='flex'
                            flexDir="column"
                            justifyContent='flex-end'
                            p={3}
                            bg="#E8E8E8"
                            W="100%"
                            h="100%"
                            borderRadius='lg'
                            overflow="hidden"

                        >

                        {/* message Here */}

                        </Box>
                    </>




                )
                    :
                    (
                        <Box display="flex" alignItems="center" justifyContent="center" h='100%'>


                            <Text fontSize="3xl" pb={3} fontFamily='Work sans'>
                                Click On the User To Start Chatting
                            </Text>

                        </Box>
                    )
            }
        </>
    )
}

export default SingleChat
