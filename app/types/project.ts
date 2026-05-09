/**
 * Type pour les métadonnées d'un projet
 */
export interface ProjectMetadata {
  title: string;
  excerpt?: string;
  description?: string;
  date?: string;
  tags?: string[];
  published?: boolean | string;
  [key: string]: boolean | string | string[] | undefined;
}

/**
 * Type pour un projet parsé
 */
export interface ParsedProject {
  title: string;
  excerpt: string;
  date: string;
  metaDonnees: ProjectMetadata;
  content: string;
}

/**
 * Type pour une carte de projet affichée
 */
export interface ProjectCard {
  title: string;
  excerpt: string;
  date: string;
  link: string;
}
