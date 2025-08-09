'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './globals.css';
import { ToastProvider } from './components/ToastProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DndProvider backend={HTML5Backend}>
          <ToastProvider>
            {children}
          </ToastProvider>
        </DndProvider>
      </body>
    </html>
  );
}
