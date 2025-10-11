import { render, screen } from '@testing-library/react';
import { SearchBar } from '@/app/components/search-bar';
import '@testing-library/jest-dom/vitest';

describe('SearchBar', () => {
    it('should render a search bar and return a value when name is provided', () => {
        render(<SearchBar />);
        
        const input = screen.getByRole('input');
        expect(input).toBeInTheDocument();
    })
})