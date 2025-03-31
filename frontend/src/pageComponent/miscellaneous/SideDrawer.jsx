import React, { useState } from 'react'
import { Avatar, Box, Button, flexbox, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Tooltip, useDisclosure } from '@chakra-ui/react'
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



const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState("")
  const [loading, setLoading] = useState("")
  const [loadingChat, setLoadingChat] = useState("")
  const navigate = useNavigate()

  const userInfo = JSON.parse(localStorage.getItem("userInfo"))

  console.log("userInfo===================>", userInfo)

  const handleLogOut = () => {
    localStorage.removeItem("userInfo")
    navigate("/")
  }

  const { isOpen, onOpen, onClose } = useDisclosure()



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

            //  onClick={handleSearch}
            >
              Go
            </Button>
            </Box>
            
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
