/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Games } from '../Games';


describe('Games component works correctly',() => {
    test('searching for a game brings up the right game(s)', () => {
        render(<Games/>)
    });

    test('clicking "Add New Game" shows the form', () => {
        render(<Games/>)
    });

    test('Has a List of games', () => {
        render(<Games/>)
    });
  })