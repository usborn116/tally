/**
 * @jest-environment jsdom
 */

//to make sure submitting a Form calls a function
//make sure Form toggle is hit

import {render, screen} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { Form } from '../Form';
import { Input } from '../Input';
import { Submit } from '../Submit';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup()

const mockUpdate = jest.fn()
const mockToggle = jest.fn()


describe('Forms submit correctly',() => {
    test('calls submit function and toggle function', async () => {
        
        render(<MemoryRouter>
                    <Form endpoint='/test' item='test' updater={mockUpdate} setError={jest.fn()} setToggle={mockToggle} navigate={mockUpdate}>
                        <Submit>Submit</Submit>
                    </Form>
                </MemoryRouter>)
        await user.click(screen.getByText('Submit'))
        expect(mockUpdate).toHaveBeenCalledTimes(2)
        expect(mockToggle).toHaveBeenCalledTimes(1)
        
    });

    test('text input renders text field', () => {
        render(<Input type='text' name='name' placeHolder='placeholder'/>)
        expect(screen.getByRole('textbox')).toBeDefined()
    });

    test('select input renders select field', () => {
        render(<Input type='select' name='name' placeHolder='placeholder' options={[{name: 'test opt', id: 1}]}/>)
        expect(screen.getByRole('combobox')).toBeDefined()
        const options = screen.getAllByRole('option')
        expect(options[0].value).toBe('')
        expect(options[1].value).toBe('1')
    });

    test('checkbox input renders checkbox field', () => {
        render(<Input type='checkbox' name='name' placeHolder='placeholder'/>)
        expect(screen.getByRole('checkbox')).toBeDefined()
        expect(screen.getByText('✓')).toBeDefined()
    });

    test('no submit button if nobutton is true', () => {
        render(<Submit nobutton={true}/>)
        expect(screen.queryByText('Submit')).toBe(null)
    });

    test('submit button if nobutton is false', () => {
        render(<Submit>Test Submit</Submit>)
        expect(screen.queryByText('Test Submit')).not.toBe(null)
    });

  })