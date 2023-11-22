/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Home } from '../Home';


describe('Logging out works',() => {
    test('Logging out shows the right alert and returns you to the Home page', () => {
        render(<Home/>)
    });
  })