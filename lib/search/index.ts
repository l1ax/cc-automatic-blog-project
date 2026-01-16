/**
 * Search module exports
 */

// Build-time utilities
export { generateSearchIndex, writeSearchIndex } from './build-index';
export type { BuildTimeIndex, SearchableArticle } from './build-index';

// Client-side utilities
export { ClientSearchIndex, getSearchIndex } from './client-search';
export type { ClientSearchResult } from './client-search';

// Legacy utilities (for backward compatibility)
export { SearchIndex, createSearchIndex, generateSearchIndex as generateLegacySearchIndex } from './search-legacy';
export type { SearchDocument, SearchResult } from './search-legacy';
