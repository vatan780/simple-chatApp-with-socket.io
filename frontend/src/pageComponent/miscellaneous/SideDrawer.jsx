import React, { useState } from 'react'
import {
  Avatar, Box, Button, flexbox,
  Input, Menu, MenuButton, MenuDivider,
  MenuItem, MenuList, position, Spinner, Tooltip, useDisclosure,
  useToast
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import ProfileModal from './ProfileModal'
import { useNavigate } from 'react-router-dom'

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import axios from 'axios'
import ChatLoading from '../ChatLoading'
import UserListItem from '../UserAvatar/UserListItem'
import { ChatState } from '../../Context/ChatProvider'



const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()


  const { user, setSelectedChat, chats, setChats } = ChatState();




  const userInfo = JSON.parse(localStorage.getItem("userInfo"))


  const handleLogOut = () => {
    localStorage.removeItem("userInfo")
    navigate("/")
  }


  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Please Enter Some Thing in Search',
        // description: "We've created your account for you.",
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left'
      })
      return
    }

    try {
      setLoading(true)
      let config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`
        }
      }

      const { data } = await axios.get(`/api/user?search= ${search}`, config)
      setLoading(false)
      setSearchResult(data?.data)

    } catch (error) {
      toast({
        title: 'Error Occured',
        description: "Failed To Load The Search Result",
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left'
      })
    }

  }



  const accessChat = async (userId) => {
    try {
      setLoadingChat(true)
      let config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.data.token}`
        }
      }

      const { data } = await axios.post("/api/chat", { userId }, config);

      console.log("access chat==========>",data.data.users)

      let allChets = data.data.users


      // if(!chats.find((c)=>c._id === allChets?._id)) setChats([...allChets , ...chats ])


      setSelectedChat(data.data.users)
      setLoadingChat(false)
      onClose()

    } catch (error) {
      toast({
        title: 'Error Occured in Fetching Chats',
        description: error.message,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left'
      })
    }

  }



  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search User To Chat" hasArrow placement='bottom-end'>
          <Button variant="ghost" onClick={onOpen}>
            <i class="fa-solid fa-magnifying-glass"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>

          </Button>

        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">Talk-A-Tive</Text>

        <div>
          <Menu>
            <MenuButton>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            {/* <MenuList></MenuList> */}

          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" cursor="pointer" name={userInfo.data.name} src={userInfo.pic} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={userInfo?.data}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider></MenuDivider>
              <MenuItem onClick={handleLogOut}>LogOut</MenuItem>

            </MenuList>
          </Menu>
        </div>
      </Box>


      {/* //side bar or drawer */}
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input placeholder='Search By Nama and Email'
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                variant='outline'

                onClick={handleSearch}
              >
                Go
              </Button>
            </Box>

            {
              loading ? (
                <ChatLoading />
              ) : (
                searchResult?.map(user => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )
            }

            {
              loadingChat && <Spinner ml='auto' display="flex" />
            }

          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>


    </>
  )
}

export default SideDrawer
