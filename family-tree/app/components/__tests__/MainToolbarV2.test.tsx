import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MainToolbarV2 from '../../v2/components/MainToolbarV2';
import '@testing-library/jest-dom';

describe('MainToolbarV2', () => {
  const mockProps = {
    title: 'Test Family Tree',
    onOpenFilters: jest.fn(),
    onSearchFocus: jest.fn(),
    searchQuery: '',
    onSearchChange: jest.fn(),
    onSearchSubmit: jest.fn(),
    searchSuggestions: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders toolbar with title, search, and filters', () => {
    render(<MainToolbarV2 {...mockProps} />);
    
    // Check title is present and truncated
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveTextContent('Test Family Tree');
    expect(title).toHaveClass('truncate');
    
    // Check search input
    const searchInput = screen.getByLabelText('Search family members');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'search');
    
    // Check filters button
    const filtersButton = screen.getByLabelText('Open Filters');
    expect(filtersButton).toBeInTheDocument();
  });

  it('has proper accessibility and semantic structure', () => {
    render(<MainToolbarV2 {...mockProps} />);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveAttribute('title', 'Test Family Tree');
    
    const searchInput = screen.getByLabelText('Search family members');
    expect(searchInput).toHaveAttribute('placeholder', 'Search members');
  });

  it('calls search handlers correctly', () => {
    render(<MainToolbarV2 {...mockProps} />);
    
    const searchInput = screen.getByLabelText('Search family members');
    
    // Test search change
    fireEvent.change(searchInput, { target: { value: 'john' } });
    expect(mockProps.onSearchChange).toHaveBeenCalledWith('john');
    
    // Test search focus
    fireEvent.focus(searchInput);
    expect(mockProps.onSearchFocus).toHaveBeenCalledTimes(1);
    
    // Test search submit on Enter
    fireEvent.keyDown(searchInput, { key: 'Enter' });
    expect(mockProps.onSearchSubmit).toHaveBeenCalledTimes(1);
  });

  it('renders search suggestions when provided', () => {
    const propsWithSuggestions = {
      ...mockProps,
      searchSuggestions: ['John Doe', 'Jane Smith', 'Bob Johnson'],
    };
    
    render(<MainToolbarV2 {...propsWithSuggestions} />);
    
    const datalist = screen.getByRole('listbox');
    expect(datalist).toBeInTheDocument();
    expect(datalist).toHaveAttribute('id', 'toolbar-v2-search-suggestions');
    
    // Check that options are present
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveAttribute('value', 'John Doe');
  });

  it('calls onOpenFilters when filters button is clicked', () => {
    render(<MainToolbarV2 {...mockProps} />);
    
    const filtersButton = screen.getByLabelText('Open Filters');
    fireEvent.click(filtersButton);
    
    expect(mockProps.onOpenFilters).toHaveBeenCalledTimes(1);
  });

  it('uses tokenized styling classes', () => {
    render(<MainToolbarV2 {...mockProps} />);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('u-header-accent--gradient');
    
    const searchInput = screen.getByLabelText('Search family members');
    expect(searchInput).toHaveClass('input');
    expect(searchInput).toHaveClass('focus-visible:outline-(--color-primary)');
    
    const filtersButton = screen.getByLabelText('Open Filters');
    expect(filtersButton).toHaveClass('btn');
    expect(filtersButton).toHaveClass('focus-visible:outline-(--color-primary)');
  });

  it('has responsive search width constraints', () => {
    render(<MainToolbarV2 {...mockProps} />);
    
    const searchInput = screen.getByLabelText('Search family members');
    expect(searchInput).toHaveClass('w-32', 'sm:w-40', 'md:w-56');
  });

  it('has responsive filters button text', () => {
    render(<MainToolbarV2 {...mockProps} />);
    
    const filtersText = screen.getByText('Filters');
    expect(filtersText).toHaveClass('hidden', 'sm:inline');
  });

  it('limits search suggestions to 10 items', () => {
    const manySuggestions = Array.from({ length: 15 }, (_, i) => `Person ${i + 1}`);
    const propsWithManySuggestions = {
      ...mockProps,
      searchSuggestions: manySuggestions,
    };
    
    render(<MainToolbarV2 {...propsWithManySuggestions} />);
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(10); // Should be limited to 10
  });
});