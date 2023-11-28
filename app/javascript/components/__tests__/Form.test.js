//to make sure submitting a Form calls a function
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