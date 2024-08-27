/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as AuthLayoutImport } from './routes/_authLayout'
import { Route as LayoutIndexImport } from './routes/_layout/index'
import { Route as AuthLayoutAuthImport } from './routes/_authLayout/auth'

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const AuthLayoutRoute = AuthLayoutImport.update({
  id: '/_authLayout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any)

const AuthLayoutAuthRoute = AuthLayoutAuthImport.update({
  path: '/auth',
  getParentRoute: () => AuthLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authLayout': {
      id: '/_authLayout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/_authLayout/auth': {
      id: '/_authLayout/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthLayoutAuthImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AuthLayoutRoute: AuthLayoutRoute.addChildren({ AuthLayoutAuthRoute }),
  LayoutRoute: LayoutRoute.addChildren({ LayoutIndexRoute }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authLayout",
        "/_layout"
      ]
    },
    "/_authLayout": {
      "filePath": "_authLayout.tsx",
      "children": [
        "/_authLayout/auth"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/"
      ]
    },
    "/_authLayout/auth": {
      "filePath": "_authLayout/auth.tsx",
      "parent": "/_authLayout"
    },
    "/_layout/": {
      "filePath": "_layout/index.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
