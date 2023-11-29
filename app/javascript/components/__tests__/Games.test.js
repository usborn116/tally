/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Games } from '../Games';
import { SearchBar } from '../SearchBar';
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()

const mockSearch = jest.fn()

const fakeuser = {user: {name: 'John', email: 'a@a.com', 
                games: [{'sessions': ['a','b']}, {'sessions': ['a','b','c','d']}]}, setLoading: () => {}}

jest.mock('../helpers/useSetUser', () => ({
   useSetUser: () => {
       return fakeuser;
   },
}));


describe('Games component works correctly',() => {
    test('you can enter a search', async () => {
        render(<Games endpoint='user_games'/>)
        const search = screen.queryByRole('textbox')
        expect(search.value).toBe('')
        await user.type(search, 'Wingspan')
        expect(search.value).toBe('Wingspan')
    });

    test('searchbar fires event handler', async () => {
        render(<SearchBar setSearch={mockSearch}/>)
        const search = screen.queryByRole('textbox')
        expect(search.value).toBe('')
        await user.type(search, 'Wingspan')
        expect(search.value).toBe('Wingspan')
        expect(mockSearch).toHaveBeenCalled()
    });

    test('clicking "Add New Game" shows the form', async() => {
        render(<Games endpoint='user_games'/>)
        await user.click(screen.getByText('Add New Game'))
        expect(screen.getByText('See All Games')).toBeDefined()
    });

    test('Has a List of games', () => {
        render(<Games/>)
        const headers = screen.getAllByRole('heading')
        expect(headers[0].closest('div').classList.contains('top')).toBe(true)
    });

    test('Has no searchbar if Home', () => {
        render(<Games/>)
        expect(screen.queryByRole('textbox')).toBe(null)
        expect(screen.queryByText('Add New Game')).toBe(null)
    });

    test('Has searchbar if My Games', () => {
        render(<Games endpoint='user_games'/>)
        expect(screen.queryByRole('textbox')).not.toBe(null)
        expect(screen.getByText('Add New Game')).not.toBe(null)
    });
  })