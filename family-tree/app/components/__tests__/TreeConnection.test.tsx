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
    // Styling now uses CSS variables; verify stroke-width and class
    expect(connection).toHaveAttribute('stroke-width', '2');
    expect(connection).toHaveClass('connection-line');
  });
  
  test('renders spouse connection with correct attributes (double-line group)', () => {
    const from = { x: 50, y: 60 };
    const to = { x: 70, y: 80 };
    
    render(<svg><TreeConnection from={from} to={to} type="spouse" /></svg>);
    
    const group = screen.getByTestId('tree-connection-spouse');
    expect(group).toBeInTheDocument();
    const lines = screen.getAllByTestId('tree-connection-spouse-line');
    expect(lines.length).toBe(2);
    // Each line should have non-scaling-stroke and class
    lines.forEach(line => {
      expect(line).toHaveAttribute('vector-effect', 'non-scaling-stroke');
      expect(line).toHaveClass('connection-line');
    });
  });
}); 