/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Logout } from '../Logout';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const user = userEvent.setup()

const mockedFn = jest.fn()

jest.mock('../helpers/api_helpers', () => ({
    getUser: () => jest.fn()
}));

describe('Logging out works',() => {
    test('Clicking logout triggers the logout handler', async () => {
        render(<MemoryRouter><Logout setUser={jest.fn()} setLoading={jest.fn()} handler={mockedFn}/></MemoryRouter>)
        expect(screen.getByText('Log Out')).toBeDefined()
        await user.click(screen.getByRole('button'))
        expect(mockedFn).toHaveBeenCalled()
    });
  })