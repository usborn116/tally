/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Login } from '../Login';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const user = userEvent.setup()

const mockSetUser = jest.fn()

describe('Login component works correctly',() => {
    beforeEach(() => {
        render(<MemoryRouter><Login setUser={mockSetUser}/></MemoryRouter>)
    })

    test('shows email/password inputs', () => {
        expect(screen.getByTestId('login-box')).toBeDefined()
        expect(screen.queryByTestId('signup-box')).toBe(null)
    });

    test('you can sign up and it shows 4 fields in a form', async () => {
        await user.click(screen.getByText('Sign Up'))
        expect(screen.getByTestId('signup-box')).toBeDefined()
        await user.click(screen.getByText('Log In'))
        expect(screen.getByTestId('login-box')).toBeDefined()
    });
    
  })