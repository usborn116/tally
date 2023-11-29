/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Game } from '../Game';
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom';

const user = userEvent.setup()


describe('Game section works correctly',() => {
    test('has game info, categories, leaderboard, and sessions', () => {
        render(<Game/>)
        const headers = screen.getAllByRole('heading')
        expect(headers[0].closest('div').classList.contains('game-details')).toBe(true)
        expect(headers[1].closest('div').classList.contains('game-categories')).toBe(true)
        expect(headers[2].closest('div').classList.contains('game-leaderboard')).toBe(true)
    });

    test('clicking "Edit Game Details" shows the form', async () => {
        render(<MemoryRouter><Game/></MemoryRouter>)
        await user.click(screen.getByText('Edit Game Details'))
        expect(screen.getByText('See Game Details')).toBeDefined()
    });

    test('Editing a category saves data', async () => {
        render(<MemoryRouter><Game/></MemoryRouter>)
        await user.click(screen.getByText('Add New Category'))
        expect(screen.getByText('Category Name')).toBeDefined()
        const box = screen.getByRole('textbox')
        expect(box).toBeDefined()
        expect(box.value).toBe('')
        await user.type(box, 'New Cat')
        expect(box.value).toBe('New Cat')
        const check = screen.getByRole('checkbox')
        expect(check.value).toBe('')
        await user.click(check)
        expect(check.value).toBe('true')
    });
  })