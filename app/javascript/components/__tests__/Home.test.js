/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Home } from '../Home';


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
    })

    test('has the players component if user', () => {
        render(<Home setLoading={() => {}} setError={() => {}} user={{name: 'John'}}/>)
        expect(screen.getByText('Your Players')).toBeDefined()
    })

    test('you can add a new player', () => {
        //render(<Home setLoading={() => {}} setError={() => {}} user={{name: 'John'}}/>)
    })

    test('you can save changes to an existing player', () => {
        //render(<Home setLoading={() => {}} setError={() => {}} user={{name: 'John'}}/>)
    })
  })