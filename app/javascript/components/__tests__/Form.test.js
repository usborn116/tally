//to make sure submitting a Form calls a function
//make sure Form toggle is hit

/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Form } from 'react-router-dom';


describe('Forms submit correctly',() => {
    test('calls submit function', () => {
        render(<Form/>)
    });
  })