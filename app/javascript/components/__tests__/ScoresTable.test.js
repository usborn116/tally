/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { ScoresTable } from '../ScoresTable';
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()

const data = {
    session: {
        session_categories: [
            {   id: 1, 
                name: 'Cat A',
                point_based: true,
                session_scores: [
                    { id: 11, amount: 11, win: false},
                    { id: 12, amount: 12, win: false},
                ]
            },
            {   id: 2, 
                name: 'Cat B',
                point_based: false,
                session_scores: [
                    { id: 13, amount: 13, win: false},
                    { id: 14, amount: 14, win: true},
                ]
            },
        ]
    }
}

const styling = null

const players = [{id: 1, name: 'Bob'}, {id: 3, name: 'Sue'}]

const totals = (
    <div className="row" style={styling}>
        <div>TOTALS</div>
            <div key={24}>24</div>
            <div key={26}>26</div>
    </div>
)

const mockUpdateData = jest.fn()

describe('Scores table shows proper names and is editable',() => {
    test('you can edit the scores of the session', () => {
        render(<ScoresTable data={data} players={players} styling={styling} enterScores={true} updateData={mockUpdateData}
            setData={jest.fn()} setError={jest.fn()} WIN_TYPE={{true: 'WON!', false: 'Not won'}}/>)
        expect(screen.getAllByRole('spinbutton').length).toBe(2)
        expect(screen.getAllByText('Won?').length).toBe(2)
    });

    test('data is saved when editing a score', async () => {
        render(<ScoresTable data={data} players={players} styling={styling} enterScores={true} updateData={mockUpdateData}
            setData={jest.fn()} setError={jest.fn()} WIN_TYPE={{true: 'WON!', false: 'Not won'}}/>)
        const boxes = screen.getAllByRole('spinbutton')
        await user.type(boxes[0],'1')
        await user.click(screen.getByText('Cat A'))
        expect(mockUpdateData).toHaveBeenCalled()
       
    });

    test('calculating the scores sends the right API request', () => {
        //tested in Button.test.js
    });

    test('has the right people', () => {
        render(<ScoresTable data={data} players={players} styling={styling} enterScores={false} updateData={mockUpdateData}
            setData={jest.fn()} setError={jest.fn()} WIN_TYPE={{true: 'WON!', false: 'Not won'}}/>)
        expect(screen.getByText('Bob')).toBeDefined()
        expect(screen.getByText('Sue')).toBeDefined()
    });

    test('shows the right totals and right "Won! or "Not won" designation', () => {
        render(<ScoresTable data={data} players={players} totals={totals} styling={styling} enterScores={false} updateData={mockUpdateData}
            setData={jest.fn()} setError={jest.fn()} WIN_TYPE={{true: 'WON!', false: 'Not won'}}/>)
            expect(screen.getByText('WON!')).toBeDefined()
        expect(screen.getByText('Not won')).toBeDefined()
        expect(screen.getByText('24')).toBeDefined()
        expect(screen.getByText('26')).toBeDefined()
    });
  })