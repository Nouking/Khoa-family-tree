import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TreeConnection from '../TreeConnection';

describe('TreeConnection', () => {
  test('renders parent-child connection with correct attributes', () => {
    const from = { x: 10, y: 20 };
    const to = { x: 30, y: 40 };
    
    render(<svg><TreeConnection from={from} to={to} type="parent-child" /></svg>);
    
    const connection = screen.getByTestId('tree-connection-parent-child');
    expect(connection).toBeInTheDocument();
    
    // Check coordinates
    expect(connection).toHaveAttribute('x1', '10');
    expect(connection).toHaveAttribute('y1', '20');
    expect(connection).toHaveAttribute('x2', '30');
    expect(connection).toHaveAttribute('y2', '40');
    
    // Check styling for parent-child
    expect(connection).toHaveAttribute('stroke', '#3b82f6'); // Blue color
    expect(connection).toHaveAttribute('stroke-width', '2');
    expect(connection).not.toHaveAttribute('stroke-dasharray', '5,5');
  });
  
  test('renders spouse connection with correct attributes', () => {
    const from = { x: 50, y: 60 };
    const to = { x: 70, y: 80 };
    
    render(<svg><TreeConnection from={from} to={to} type="spouse" /></svg>);
    
    const connection = screen.getByTestId('tree-connection-spouse');
    expect(connection).toBeInTheDocument();
    
    // Check coordinates
    expect(connection).toHaveAttribute('x1', '50');
    expect(connection).toHaveAttribute('y1', '60');
    expect(connection).toHaveAttribute('x2', '70');
    expect(connection).toHaveAttribute('y2', '80');
    
    // Check styling for spouse
    expect(connection).toHaveAttribute('stroke', '#10b981'); // Green color
    expect(connection).toHaveAttribute('stroke-width', '1');
    expect(connection).toHaveAttribute('stroke-dasharray', '5,5'); // Dashed line
  });
}); 