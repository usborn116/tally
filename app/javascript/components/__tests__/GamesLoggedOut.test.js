/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Games } from '../Games';
import { SearchBar } from '../SearchBar';
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()

const mockSearch = jest.fn()

const fakecontext2 = [
        false,
        () => { },
        () => { },
        null,
        false,
        () => { },
    ]

jest.mock('react-router-dom', () => ({
...jest.requireActual('react-router-dom'),
    useOutletContext: () => ( fakecontext2 ),
}));

describe('Games component works correctly', () => {

    test('Has no searchbar if not Logged In', () => {
        render(<Games />)
        expect(screen.queryByRole('textbox')).toBe(null)
        expect(screen.queryByText('Add New Game')).toBe(null)
    });
})