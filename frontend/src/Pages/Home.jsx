import React from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import Login from '../pageComponent/authentications/Login'
import SignUp from '../pageComponent/authentications/SignUp'
const Home = () => {
  return (
    <>
      <Container maxW="xl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg="white"
          width="100%"
          m="40px 0px 15px 0"
          borderRadius="lg"
          borderWidth="1px"

        >
          <Text fontSize="4xl" fontFamily="Work sans"> Welcome To Login Page</Text>

        </Box>

        <Box
          bg="white"
          w="100%"
          p={4}
          borderRadius='lg'
          borderWidth="1px"
        >

          <Tabs variant='soft-rounded'>
            <TabList mb="1rem">
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>

        </Box>

      </Container>

    </>
  )
}

export default Home
