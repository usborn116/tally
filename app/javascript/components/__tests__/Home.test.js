/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Home } from '../Home';
import { Header } from '../Header';
import { Players } from '../Players';
import { Player } from '../Player';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { Games } from '../Games';

const fakeuser = {
    user: {
        name: 'John', email: 'a@a.com', 
        games: [{ 'sessions': ['a', 'b'] }, { 'sessions': ['a', 'b', 'c', 'd'] }]
    },
    setUser: () => { },
    error: null,
    setError: () => { },
    loading: false,
    setLoading: () => { },

}

jest.mock('../helpers/useSetUser', () => ({
   useSetUser: () => {
       return fakeuser;
   },
}));

const fakecontext = [
        {
            name: 'John', email: 'a@a.com', 
            games: [{ 'sessions': ['a', 'b'] }, { 'sessions': ['a', 'b', 'c', 'd'] }]
        },
        () => { },
        () => { },
        null,
        false,
        () => { },
    ]

jest.mock('react-router-dom', () => ({
...jest.requireActual('react-router-dom'),
    useOutletContext: () => ( fakecontext ),
}));

const user = userEvent.setup()
describe('Home has expected components',() => {

    test('has the games component', () => {
        render(<MemoryRouter><Games /></MemoryRouter>)
        const heading = screen.getAllByText('Top 5 Games')
        expect(heading[0]).toBeDefined()
        expect(screen.queryByText('My Players')).toBe(null)
    })

    test('has the players component if user', () => {
        render(<MemoryRouter><Header /></MemoryRouter>)
        expect(screen.queryByText('My Players')).not.toBe(null)
    })

    test('you can add a new player', async () => {
        act(() => render(<Players />))
        await user.click(screen.getByText('Add New Player'))
        const box = screen.getByRole('textbox')
        expect(box).toBeDefined()
        expect(box.value).toBe('')
        await user.type(box, 'User1')
        expect(box.value).toBe('User1')
        await user.click(screen.getByText('Never mind!'))
        expect(screen.queryByRole('textbox')).toBe(null)
    })

    test('you can save changes to an existing player', async () => {
        render(<Player key={1} data={{id: 2, name: 'John'}} setData={jest.fn()}/>)
        const player = screen.getByRole('textbox')
        expect(player.value).toBe('John')
        await user.type(player, 'ny')
        expect(player.value).toBe('Johnny')
    })
  })