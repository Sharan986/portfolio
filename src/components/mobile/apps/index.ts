'use client';

import { lazy } from 'react';
import type { LazyExoticComponent, ComponentType } from 'react';

export type AppEntry = {
  id:        string;
  name:      string;
  component: LazyExoticComponent<ComponentType>;
};

export const APPS: Record<string, AppEntry> = {
  projects: {
    id:        'projects',
    name:      'Projects',
    component: lazy(() => import('./ProjectsApp')),
  },
  files: {
    id:        'files',
    name:      'Files',
    component: lazy(() => import('./FilesApp')),
  },
  gallery: {
    id:        'gallery',
    name:      'Gallery',
    component: lazy(() => import('./GalleryApp')),
  },
  hackhorizon: {
    id:        'hackhorizon',
    name:      'HackHorizon',
    component: lazy(() => import('./HackHorizonApp')),
  },
  provn: {
    id:        'provn',
    name:      'PROVN',
    component: lazy(() => import('./PROVNApp')),
  },
  onerepmaax: {
    id:        'onerepmaax',
    name:      'OneRepMaax',
    component: lazy(() => import('./OneRepMaaxApp')),
  },
  collabase: {
    id:        'collabase',
    name:      'Collabase',
    component: lazy(() => import('./CollabaseApp')),
  },
};

/* Utility apps shown on homescreen — project apps live inside ProjectsApp */
export const HOMESCREEN_APPS = ['projects', 'files', 'gallery'];

export const APP_LIST = HOMESCREEN_APPS.map((id) => APPS[id]);
