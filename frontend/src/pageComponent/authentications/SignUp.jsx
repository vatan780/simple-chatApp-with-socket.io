import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

import axios from 'axios'


import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [pic, setPic] = useState("" || "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.jpg?semt=ais_hybrid")
    const [show, setShow] = useState(false)
    const toast = useToast()

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleClick = () => {
        setShow(!show)
    }
    const postDetails = () => {

    }

    const submithandler = async () => {
        setLoading(true)
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: 'Please Fill All The Field',
                // description: "We've created your account for you.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false)
            return
        }


        if (password == !confirmPassword) {
            toast({
                title: 'Password Did Not Match',
                // description: "We've created your account for you.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            return
        }

        let config = {
            headers: {
                "Content-type": "application/json"
            },
        }

        try {
            let { data } = await axios.post("/api/user", { name, email, password, confirmPassword, pic } , config)

            toast({
                title: 'You Have Register Successfully...',
                // description: "We've created your account for you.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            localStorage.setItem("userInfo", JSON.stringify(data))
            setLoading(false)
            navigate('/chats')

        } catch (error) {
            console.log("error in registration",error)
            toast({
                title: 'Errro Occured',
                description: error.response.data.message,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false)

        }








    }

    return (
        <VStack>
            <FormControl id='name' isRequired>
                <FormLabel>
                    Name
                </FormLabel>
                <Input placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} />

            </FormControl>

            <FormControl id='email' isRequired>
                <FormLabel>
                    Email
                </FormLabel>
                <Input placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} />

            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>
                    Password
                </FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : 'password'} placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} />

                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>

            </FormControl>

            <FormControl id='confirmPassword' isRequired>
                <FormLabel>
                    Confirm Password
                </FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : 'password'} placeholder='Enter Your Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />

                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>


                </InputGroup>

            </FormControl>



            <FormControl id='email' isRequired>
                <FormLabel>
                    Upload Your Picture
                </FormLabel>
                <Input type='file' p={1.5} accept='image/*' placeholder='Upload Your Picture' onChange={(e) => postDetails(e.target.files[0])} />

            </FormControl>

            <Button
                colorScheme='blue'
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submithandler}
                isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default SignUp
