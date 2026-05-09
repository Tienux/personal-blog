/**
 * Constantes des routes du blog
 */
export const ROUTES = {
  HOME: '/',
  PROJECTS: '/projets/',
  PROJECT_DETAIL: (slug: string) => `/projets/${slug}`,
  ABOUT: '/about',
} as const;

export type RouteKey = keyof typeof ROUTES;
