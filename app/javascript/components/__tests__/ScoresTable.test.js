/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import { ScoresTable } from '../ScoresTable';


describe('Scores table shows proper names and is editable',() => {
    beforeEach(() => {
        render(<ScoresTable data={data} styling={styling} enterScores={jest.fn()} updateData={jest.fn()}
            setData={jest.fn()} setError={jest.fn()} WIN_TYPE={{true: 'WON!', false: 'Not won'}}/>)
    })

    test('the right players show up in the table', () => {
        
        
    });

    test('you can edit the scores of the session', () => {
        
        
    });

    test('data is saved when editing a score', () => {
        
       
    });

    test('calculating the scores sends the right API request and shows the right results', () => {
        
        
    });
  })