import { ViewIcon } from '@chakra-ui/icons'
import {
    Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, Spinner, useDisclosure,
    useToast
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from './UserBadgeItem'
import axios from 'axios'
import UserListItem from '../UserAvatar/UserListItem';



const UpdateGroupChatModal = ({ fatchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [groupChatName, setGroupChatName] = useState("")
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [renameloading, setRenameloading] = useState(false)

    const toast = useToast()

    const { selectedChat, setSelectedChat, user } = ChatState()

    

    const handleAddUser = async (userData) => {
        if (selectedChat?.users.find((u) => u?._id === userData?._id)) {
            toast({
                title: 'User Already In The Group.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            return
        }

        if (selectedChat?.groupAdmin?._id !== user?.data?._id) {
            toast({
                title: 'Only Group Admin Can Add The User.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            return
        }

        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.data.token}`
                }
            }

            const {data} = await axios.put(`/api/chat/groupadd`,
                {
                    chatId:selectedChat._id,
                    userId:userData._id
                },
                config)

                setSelectedChat(data)
            setLoading(false)
            
        } catch (error) {
            toast({
                title: 'Error Occured.',
                description:error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            })

        }


    }

    const handleRemove = async (userData) => {
        console.log("user remove from group=======>",userData)
       

        console.log()
        if (selectedChat?.groupAdmin?._id !== user?.data?._id && userData?._id !== user?.data?._id) {
            toast({
                title: 'Only Group Admin Can Remove The User.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            return
        }

        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.data.token}`
                }
            }

            const {data} = await axios.put(`/api/chat/groupremove`,
                {
                    chatId:selectedChat._id,
                    userId:userData._id
                },
                config)


                userData?._id == user?.data?._id ? setSelectedChat("") : setSelectedChat(data)
            setSelectedChat(data)
            setLoading(false)
            
        } catch (error) {
            toast({
                title: 'Error Occured.',
                description:error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            })

        }

    }
    const handleRename = async () => {
        try {
            if (!groupChatName) return
            setRenameloading(true)


            const config = {
                headers: {
                    Authorization: `Bearer ${user.data.token}`,
                },
            };

            let { data } = await axios.put("/api/chat/rename", {
                chatId: selectedChat?._id,
                chatName: groupChatName

            }, config)

            console.log("data after group updating=====>", data)

            setSelectedChat(data)
            // setFetchAgain(!fatchAgain)
            setRenameloading(false)
            onClose()


        } catch (error) {
            toast({
                title: 'Error Occurred',
                description: 'Failed To Rename Group',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
            });
        }

    }

    const handleSearch = async (query) => {
        setSearch(query)
        if (!search) {
            return;
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.data.token}`
                }
            }

            const data = await axios.get(`/api/user?search=${search}`, config)
            setLoading(false)
            setSearchResult(data?.data?.data)
        } catch (error) {
            toast({
                title: 'Error Occured.',
                description: "Fetch To Load Search Result.",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            })

        }


    }



    return (
        <>
            <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />



            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >{selectedChat?.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            selectedChat?.users?.map((u) => (
                                <UserBadgeItem
                                    key={u?._id}
                                    user={u}
                                    handleFunction={() => handleRemove(u)}
                                />
                            ))
                        }
                    </ModalBody>

                    <FormControl display="flex">
                        <Input
                            placeholder="chat Name"
                            mb={3}
                            value={groupChatName}
                            onChange={(e) => setGroupChatName(e.target.value)}
                        />
                        <Button
                            variant="solid"
                            colorScheme='teal'
                            mr={5}
                            isLoading={renameloading}
                            onClick={handleRename}
                        >
                            Update
                        </Button>
                    </FormControl>

                    <FormControl display="flex">
                        <Input
                            placeholder="Add User To Group"
                            mb={3}
                            // value={groupChatName}
                            onChange={(e) => handleSearch(e.target.value)}
                        />

                    </FormControl>
                    {
                        loading ?
                            (<Spinner size='lg' />)
                            : searchResult?.slice(0, 4).map((u) => (
                                <UserListItem
                                    key={u?._id}
                                    user={u}
                                    handleFunction={() => handleAddUser(u)}
                                />
                            ))
                    }






                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={() => handleRemove(user?.data)}>
                            Leave Group
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}
export default UpdateGroupChatModal
