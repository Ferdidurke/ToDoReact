import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

const server = setupServer(
    rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
        return res(ctx.json({id: 1, name: '111'}))
    }),
)


// test('loads and displays greeting', async () => {
//     render(<Fetch url="/greeting" />)
//
//     fireEvent.click(screen.getByText('Load Greeting'))
//
//     await waitFor(() => screen.getByRole('heading'))
//
//     expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//     expect(screen.getByRole('button')).toBeDisabled()
// })