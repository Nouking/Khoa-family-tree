import React, { memo, useMemo } from 'react';

import { Connection } from '../lib/connectionCalculator';

import TreeConnection from './TreeConnection';

interface VirtualizedConnectionsProps {
  connections: Connection[];
  viewport: {
    x: number;
    y: number;
    zoom: number;
    width: number;
    height: number;
  };
}

/**
 * Optimized connection renderer that only shows connections in viewport
 * Reduces SVG element count for better performance
 */
const VirtualizedConnections = memo<VirtualizedConnectionsProps>(({ connections, viewport }) => {
  // Filter connections that are visible in the current viewport
  const visibleConnections = useMemo(() => {
    // Handle empty or undefined connections
    if (!connections || connections.length === 0) {
      return [];
    }
    
    // Calculate viewport bounds
    const viewportBounds = {
      left: -viewport.x / viewport.zoom,
      top: -viewport.y / viewport.zoom,
      right: (-viewport.x + viewport.width) / viewport.zoom,
      bottom: (-viewport.y + viewport.height) / viewport.zoom,
    };
    
    // Add buffer for smooth scrolling
    const buffer = 100;
    viewportBounds.left -= buffer;
    viewportBounds.top -= buffer;
    viewportBounds.right += buffer;
    viewportBounds.bottom += buffer;
    
    return connections.filter(connection => {
      // Check if connection line intersects with viewport
      const minX = Math.min(connection.from.x, connection.to.x);
      const maxX = Math.max(connection.from.x, connection.to.x);
      const minY = Math.min(connection.from.y, connection.to.y);
      const maxY = Math.max(connection.from.y, connection.to.y);
      
      return !(
        maxX < viewportBounds.left ||
        minX > viewportBounds.right ||
        maxY < viewportBounds.top ||
        minY > viewportBounds.bottom
      );
    });
  }, [connections, viewport]);
  
  if (visibleConnections.length === 0) {
    return null;
  }
  
  return (
    <>
      {visibleConnections.map(connection => (
        <TreeConnection
          key={connection.id}
          from={connection.from}
          to={connection.to}
          type={connection.type}
        />
      ))}
    </>
  );
});

VirtualizedConnections.displayName = 'VirtualizedConnections';

export default VirtualizedConnections;