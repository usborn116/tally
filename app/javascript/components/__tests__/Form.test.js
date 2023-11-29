//to make sure submitting a Form calls a function
//make sure form session creates new session

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