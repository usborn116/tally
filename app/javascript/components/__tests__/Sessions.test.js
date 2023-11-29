/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { Sessions } from '../Sessions'
import { MemoryRouter } from 'react-router-dom';


const stuff = [{id: 1, date: "2021-03-25", victor: 'Victorious person' }]

describe('Sessions component renders correctly',() => {

    test('has the name, date, winner, and a delete button', () => {
        render(<MemoryRouter><Sessions data={stuff} setter={jest.fn()}/></MemoryRouter>)
        //render(<Sessions data={data} game_id={1} setter={() => {}}/>)
        expect(screen.getByText('Sessions')).toBeDefined()
        expect(screen.getByText('Victorious person')).toBeDefined()
        expect(screen.getByText("2021-03-25")).toBeDefined()
    });

})