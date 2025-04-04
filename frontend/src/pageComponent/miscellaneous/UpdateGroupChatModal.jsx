import { ViewIcon } from '@chakra-ui/icons'
import {
    Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, useDisclosure,
    useToast
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from './UserBadgeItem'
import axios from 'axios'


const UpdateGroupChatModal = ({fatchAgain ,setFetchAgain}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [groupChatName, setGroupChatName] = useState("")
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoaing] = useState(false)
    const [renameloading, setRenameloading] = useState(false)

    const toast = useToast()

    const { selectedChat, setSelectedChat, user } = ChatState()

    const handleRemove = () => {

    }
    const handleRename = async() =>{
        try {
            if(!groupChatName)return
            setRenameloading(true)
            

            const config = {
                headers: {
                  Authorization: `Bearer ${user.data.token}`,
                },
              };

            let {data} = await axios.put("/api/chat/rename",{
                chatId:selectedChat?._id,
                chatName:groupChatName

            },config)

            console.log("data after group updating=====>",data)

            setSelectedChat(data)
            setFetchAgain(!fatchAgain)
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

    const handleSearch = ()=>{

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
                            selectedChat?.users?.map((user) => (
                                <UserBadgeItem
                                    key={user?._id}
                                    user={user}
                                    handleFunction={() => handleRemove(user)}
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
                            mr={5 }
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






                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={()=>handleRemove(user)}>
                            Leave Group
                        </Button>
                    
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}
export default UpdateGroupChatModal
