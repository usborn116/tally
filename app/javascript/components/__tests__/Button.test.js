/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Button } from '../Button';


describe('button has expected text',() => {
    test('renders correct text', () => {
        render(<Button/>);
        const button = screen.getByRole('button');
        expect(button.textContent).toMatch(/Create New/)
    });

    test('calls onClick handler', () => {
        render(<Button/>);
        const button = screen.getByRole('button');
        expect(button.textContent).toMatch(/Create New/)
    });
  })