import { render, screen } from '@testing-library/react'
import { SearchBar } from '../../src/app/components/search-bar';

describe('SearchBar', () => {
    it('should load the input search bar', () => {
        render(<SearchBar />);
        
        const input = screen.getByRole('input');
        expect(input).toBeInTheDocument();
    })
})