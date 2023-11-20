/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Button } from '../Button';
import { Home } from '../Home';


describe('button has expected text',() => {
    test('renders correct text', () => {
        render(<Home />)
        render(<Button/>);
        const button = screen.getByRole('button');
        expect(button.textContent).toMatch(/Create New/)
    });
  })