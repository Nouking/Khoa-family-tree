# Family Tree Design Tool - Project Overview

## Purpose
A professional family tree design tool built with Next.js 15, TypeScript, and Tailwind CSS. It transforms family genealogy data into beautiful, interactive visualizations with a Canva-like editing experience.

## Core Features
- **Canvas Editor**: Interactive drag-and-drop family tree design with positioning
- **Professional Toolbar**: Complete design tools with undo/redo support
- **Multiple Layouts**: Hierarchical, radial, or custom arrangements
- **Share & Export**: Generate shareable links and export to CSV/PNG
- **Auto-save**: Automatic saving with version history
- **Touch Support**: Mobile-optimized interface with gesture controls

## Target Users
- **Family Patriarch (45-65)**: Primary designer creating professional family tree visualizations
- **Family Members (18-80)**: Viewers accessing shared content via links
- **Family Historian (30-60)**: Advanced editor documenting detailed family stories

## Current Status
- **Phase 1-2**: ✅ COMPLETED - Canvas system, UI foundation, CRUD operations, state management
- **Phase 3**: 🔄 IN PROGRESS - Share & export system
- **Phase 4**: ⏳ PENDING - Mobile experience enhancement

## UI Versions
- **v2 UI (Recommended)**: `/v2/view` - New modern interface with enhanced features
- **v1 UI (Legacy)**: `/view` - Original interface for compatibility

## Core Data Models
- Family members with canvas positioning (x, y coordinates)
- Relationships (parent-child, spouse connections)
- Canvas settings (grid, theme, layout)
- User accounts with JWT authentication