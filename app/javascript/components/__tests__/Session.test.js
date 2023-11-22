/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Session } from '../Session';


describe('Session component works correctly',() => {
    test('has the name, date, winner, and a delete button', () => {
        render(<Games/>)
    });

    test('has the Players and Scores section', () => {
        render(<Games/>)
    });

    test('You can change the date', () => {
        render(<Games/>)
    });

    test('You can add a player to your user account', () => {
        render(<Games/>)
    });

    test('You can add a player to the session, it renders the right amount of fields, and Scores table shows those players', () => {
        render(<Games/>)
    });

    test('you can edit the scores of the session', () => {
        render(<Games/>)
    });

    test('data is saved when editing a score', () => {
        render(<Games/>)
    });

    test('calculating the scores sends the right API request and shows the right results', () => {
        render(<Games/>)
    });
  })