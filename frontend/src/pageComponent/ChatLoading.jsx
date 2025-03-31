import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const ChatLoading = () => {
    return (
        <stack>

            <Stack>
                <Skeleton height='45px' />
                <Skeleton height='45px' />
                <Skeleton height='45px' />
                <Skeleton height='45px' />
                <Skeleton height='45px' />
                <Skeleton height='45px' />
                <Skeleton height='45px' />
                <Skeleton height='45px' />
                <Skeleton height='45px' />
                <Skeleton height='45px' />
            </Stack>

        </stack>
    )
}

export default ChatLoading
