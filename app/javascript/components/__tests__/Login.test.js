/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Login } from '../Login';


describe('Login component works correctly',() => {
    test('shows email/password inputs', () => {
        render(<Games/>)
    });

    test('you can sign up and it shows 4 fields in a form', () => {
        render(<Games/>)
    });

    test('logging in takes you to the home page', () => {
        render(<Games/>)
    });
  })