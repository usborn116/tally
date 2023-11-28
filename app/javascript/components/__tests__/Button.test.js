/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Button } from '../Button';
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()

const mockHandler = jest.fn()


describe('button has expected text',() => {
    test('renders correct text', () => {
        render(<Button name='test'/>);
        const button = screen.getByRole('button');
        expect(button.textContent).toMatch(/Create New test/)
    });

    test('calls onClick handler', async () => {
        render(<Button handler={mockHandler}/>);
        const button = screen.getByRole('button');
        await user.click(button)
        expect(mockHandler).toHaveBeenCalled()
    });
  })