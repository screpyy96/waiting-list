export const config = {
  siteName: 'Farm2Door',
  siteUrl: 'https://farm2door.ro',
  api: {
    waitingList: '/api/waiting-list',
  },
  theme: {
    colors: {
      primary: '#16a34a',
      secondary: '#0f766e',
    },
  },
  contact: {
    email: 'contact@farm2door.ro',
    phone: '+40 123 456 789',
  },
} as const;

export type Config = typeof config; 