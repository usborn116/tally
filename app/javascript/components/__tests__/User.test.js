/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { User } from '../User';

const fakecontext = [
    {
        name: 'John', email: 'a@a.com', 
        sessions: [{'game_id' : 1 }, {'game_id' : 2 }],
        shared_sessions: [{'game_id' : 2 }, {'game_id' : 2 }, {'game_id' : 2 }, {'game_id' : 2 }]
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


describe('User component appears correctly',() => {
    test('name, email, total games, and total sessions show', () => {
        render(<User/>)
        const headers = screen.getAllByRole('heading')
        expect(headers[0].textContent).toMatch(/John/)
        expect(headers[1].textContent).toMatch(/a@a.com/)
        expect(headers[2].textContent).toMatch(/2/)
        expect(headers[3].textContent).toMatch(/6/)
  })
})