/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Home } from '../Home';
import { Players } from '../Players';
import { Player } from '../Player';
import userEvent from '@testing-library/user-event';


const user = userEvent.setup()

const mockHomeError = jest.fn()


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
        const heading = screen.getAllByText('All Games')
        expect(heading[0]).toBeDefined()
        expect(screen.queryByText('Your Players')).toBe(null)
    })

    test('has the players component if user', () => {
        render(<Home setLoading={() => {}} setError={() => {}} user={{name: 'John'}}/>)
        expect(screen.queryByText('Your Players')).not.toBe(null)
    })

    test('you can add a new player', async () => {
        render(<Players homeError={mockHomeError}/>)
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