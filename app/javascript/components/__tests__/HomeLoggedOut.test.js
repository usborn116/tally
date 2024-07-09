/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Games } from '../Games';
    
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

const user = userEvent.setup()
describe('Home has expected components',() => {

    test('has the games component', () => {
        render(<MemoryRouter><Games /></MemoryRouter>)
        const heading = screen.getAllByText('Top 5 Games')
        expect(heading[0]).toBeDefined()
        expect(screen.queryByText('My Players')).toBe(null)
    })
  })