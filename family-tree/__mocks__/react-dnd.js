'use client';
import React from 'react';

export const DndProvider = ({ children }) => <>{children}</>;
export const useDrag = () => [{}, React.useRef(null)];
export const useDrop = () => [{}, React.useRef(null)];
