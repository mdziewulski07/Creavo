export interface ProjectTheme {
  primaryColor: string;
  bannerType: 'image' | 'generated';
  bannerImageUrl?: string;
  iconLibrary: 'lucide' | 'feather' | 'material' | 'iconmonstr';
  iconName: string;
}

export interface ProjectInput {
  name: string;
  description?: string;
  theme: ProjectTheme;
}

export interface Project extends ProjectInput {
  id: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}
