import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

describe('App Component', () => {
  it('renders the character counter title', () => {
    render(<App />);
    expect(screen.getByText('文字数カウンター')).toBeInTheDocument();
  });

  it('renders the textarea with correct placeholder', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText('ここにテキストを入力してください...');
    expect(textarea).toBeInTheDocument();
  });

  it('renders both counter sections', () => {
    render(<App />);
    expect(screen.getByText('空白を含む文字数:')).toBeInTheDocument();
    expect(screen.getByText('空白を含まない文字数:')).toBeInTheDocument();
  });

  it('initially shows zero for both counters', () => {
    render(<App />);
    expect(screen.getByTestId('count-with-whitespace')).toHaveTextContent('0');
    expect(screen.getByTestId('count-without-whitespace')).toHaveTextContent('0');
  });

  it('updates counters correctly when text is entered', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText('ここにテキストを入力してください...');
    
    // Type some text with spaces
    fireEvent.change(textarea, { target: { value: 'Hello World' } });
    
    // "Hello World" has 11 characters with spaces
    expect(screen.getByTestId('count-with-whitespace')).toHaveTextContent('11');
    // "HelloWorld" has 10 characters without spaces
    expect(screen.getByTestId('count-without-whitespace')).toHaveTextContent('10');
  });

  it('counts Japanese characters correctly', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText('ここにテキストを入力してください...');
    
    // Type Japanese text
    fireEvent.change(textarea, { target: { value: 'こんにちは 世界' } });
    
    // "こんにちは 世界" has 8 characters with spaces
    expect(screen.getByTestId('count-with-whitespace')).toHaveTextContent('8');
    // "こんにちは世界" has 7 characters without spaces
    expect(screen.getByTestId('count-without-whitespace')).toHaveTextContent('7');
  });

  it('handles empty string correctly', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText('ここにテキストを入力してください...');
    
    // Set empty string
    fireEvent.change(textarea, { target: { value: '' } });
    
    expect(screen.getByTestId('count-with-whitespace')).toHaveTextContent('0');
    expect(screen.getByTestId('count-without-whitespace')).toHaveTextContent('0');
  });

  it('handles whitespace-only string correctly', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText('ここにテキストを入力してください...');
    
    // Set string with only spaces
    fireEvent.change(textarea, { target: { value: '   ' } });
    
    expect(screen.getByTestId('count-with-whitespace')).toHaveTextContent('3'); // 3 spaces
    expect(screen.getByTestId('count-without-whitespace')).toHaveTextContent('0'); // 0 non-space characters
  });

  it('handles special characters and numbers correctly', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText('ここにテキストを入力してください...');
    
    // Set string with special characters and numbers
    fireEvent.change(textarea, { target: { value: '123!@#$%^&*()' } });
    
    expect(screen.getByTestId('count-with-whitespace')).toHaveTextContent('13');
    expect(screen.getByTestId('count-without-whitespace')).toHaveTextContent('13');
  });

  it('updates the textarea value when typing', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText('ここにテキストを入力してください...');
    
    // Type some text
    fireEvent.change(textarea, { target: { value: 'Test input' } });
    
    // Check if the textarea value is updated
    expect(textarea).toHaveValue('Test input');
  });

  it('handles long text correctly', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText('ここにテキストを入力してください...');
    
    // Create a long text string
    const longText = 'a'.repeat(1000);
    
    // Set the long text
    fireEvent.change(textarea, { target: { value: longText } });
    
    // Check if the counters show the correct values
    expect(screen.getByTestId('count-with-whitespace')).toHaveTextContent('1000');
    expect(screen.getByTestId('count-without-whitespace')).toHaveTextContent('1000');
  });
});
