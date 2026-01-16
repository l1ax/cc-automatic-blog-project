/**
 * Search module exports (build-time only)
 * This file is only for Node.js build scripts
 */

// Shared types
export type { BuildTimeIndex, SearchableArticle } from './types';

// Build-time utilities
export { generateSearchIndex, writeSearchIndex } from './build-index';
