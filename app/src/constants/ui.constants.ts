export const UI_ICONS = {
  SEARCH: '🔍',
  CLOSE: '✕',
  WARNING: '⚠️',
  MALE: '👨',
  FEMALE: '👩',
} as const

export const UI_TEXT = {
  FILTER_PLACEHOLDER: 'Filter by interest (e.g., music, coding, travel...)',
  FILTER_CLEAR_LABEL: 'Clear filter',
  FILTER_RESULTS: (count: number) => `Found ${count} user${count !== 1 ? 's' : ''}`,
  ERROR_TITLE: 'Something went wrong',
  ERROR_MESSAGE: "We couldn't load the users data. Please try again later or reload the page.",
  ERROR_DETAILS: (message: string) => `Error: ${message}`,
  ERROR_BUTTON: 'Reload page',
  LOADING_TEXT: 'Loading users...',
  POPUP_INTERESTS_LABEL: 'Interests',
} as const
