/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Game } from '../Game';


describe('Game section works correctly',() => {
    test('has game info, categories, leaderboard, and sessions', () => {
        render(<Game/>)
    });

    test('clicking "Edit Game Details" shows the form', () => {
        render(<Game/>)
    });

    test('Editing a category saves data', () => {
        render(<Game/>)
    });
    
    test('Checking "point based" saves that selection', () => {
        render(<Game/>)
    });

    test('Clicking "+ New Session" adds a new session', () => {
        render(<Game/>)
    });
  })