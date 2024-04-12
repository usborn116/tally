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

const user = userEvent.setup()
describe('Home has expected components',() => {
    test('renders correct text for no user', () => {
        render(<Home setLoading={() => {}} setError={() => {}}/>)
        const heading = screen.getAllByRole('heading');
        expect(heading[0].textContent).toMatch(/Welcome To Tally, friend/)
    });

    test('renders correct text for user with name John', () => {
        render(<Home setLoading={() => {}} setError={() => {}} user={{name: 'John'}}/>)
        const heading = screen.getAllByRole('heading');
        expect(heading[0].textContent).toMatch(/Welcome To Tally, John/)
    });

    test('has the games component', () => {
        render(<Home setLoading={() => {}} setError={() => {}}/>)
        const heading = screen.getAllByText('Top 5 Games')
        expect(heading[0]).toBeDefined()
        expect(screen.queryByText('My Players')).toBe(null)
    })

    test('has the players component if user', () => {
        //render(<Home setLoading={() => {}} setError={() => {}} user={{name: 'John'}}/>)
        render(<MemoryRouter><Header user={{name: 'John'}} setUser={() => {}} setLoading={() => {}}/></MemoryRouter>)
        expect(screen.queryByText('My Players')).not.toBe(null)
    })

    test('you can add a new player', async () => {
        act(() => render(<MemoryRouter><Players setError={() => {}} /></MemoryRouter>))
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