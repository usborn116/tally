/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Session } from '../Session';
import userEvent from '@testing-library/user-event'
import { act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const user = userEvent.setup()

const mockedFn = jest.fn();

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
    useOutletContext: () => (fakecontext),
    useNavigate: () => mockedFn,
    useParams: () => jest.fn()
}));


describe('Session component works correctly',() => {

    test('has the name, date, winner, and a delete button', () => {
        render(<MemoryRouter><Session /></MemoryRouter>)
        const headers = screen.getAllByRole('heading')
        expect(headers[0].closest('div').classList.contains('game-name')).toBe(true)
        expect(screen.getByText(/Creator:/)).toBeDefined()
        expect(screen.getByText(/Winner:/)).toBeDefined()
        const button = screen.getAllByRole('button')
        expect(button[0].textContent).toMatch(/Delete Session/)
    });

    test('has the Players and Scores section', () => {
        render(<MemoryRouter><Session /></MemoryRouter>)
        const players = screen.getByText('Players')
        expect(players).toBeDefined()
        const scores = screen.getByText('Scores')
        expect(scores).toBeDefined()
    });

    test('You can change the date', async () => {
        render(<MemoryRouter><Session /></MemoryRouter>)
        expect(screen.queryByText('Save Date')).toBe(null)
        await user.click(screen.getByText('Change Date'))
        expect(screen.getByText('Save Date')).toBeDefined()
    });

    test('You can share a session', async () => {
        render(<MemoryRouter><Session /></MemoryRouter>)
        expect(screen.getByText(/Shared With:/)).toBeDefined()
        const emailField = screen.queryByText('Email')
        const shareButton = screen.queryByText('Share')
        const share = screen.queryAllByRole('button')[1]
        expect(emailField).toBe(null)
        expect(shareButton).toBe(null)
        await user.click(share)
        expect(emailField).toBeDefined()
        expect(shareButton).toBeDefined()
        await user.click(share)
        expect(emailField).toBe(null)
        expect(shareButton).toBe(null)
    });

    test('You can add a player to your user account', async () => {
        render(<MemoryRouter><Session /></MemoryRouter>)
        await user.click(screen.getByText('+ Player to Account'))
        expect(screen.getByText('Create New Player')).toBeDefined()
        const input = screen.getByRole('textbox')
        expect(input.value).toBe('')
        await user.type(input,'foo')
        expect(input.value).toBe('foo')
        await user.click(screen.queryByText('Create New Player'))
        await user.click(screen.queryByText('Done Adding'))
        expect(screen.queryByText('Create New Player')).toBe(null)
    });

    test('You can add a player to the session, it renders the right amount of fields, and exits out of the form when done', async () => {
        render(<MemoryRouter><Session /></MemoryRouter>)
        await user.click(screen.getByText('+ Player(s) to Game'))
        expect(screen.queryByText('# Players')).not.toBe(null)
        const input = screen.getByRole('spinbutton')
        expect(input.value).toBe('0')
        await user.type(input,'2')
        expect(input.value).toBe('2')
        const boxes = screen.getAllByRole('combobox')
        expect(boxes.length).toBe(2)
        await user.type(boxes[0],'foo')
        await user.type(boxes[1],'bar')
        await user.click(screen.queryByText('Done Adding'))
        expect(screen.queryByText('Done Adding')).toBe(null)
    });

    
  })