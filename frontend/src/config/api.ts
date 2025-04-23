export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/login/refresh-token'
} as const

export const CATEGORY_ENDPOINTS = {
  GET_ALL: '/categories',
  GET_BY_ID: '/categories/:categoryId',
  GET_BY_SLUG: '/categories/by-slug/:slug',
  UPDATE_BY_ID: '/categories/:categoryId',
  CREATE: '/categories',
  DELETE_BY_ID: '/categories/:categoryId'
} as const

export const REVIEW_ENDPOINTS = {
  GET_ALL: '/reviews',
  LEAVE: '/leave/:productId',
  GET_AVERAGE_RATING_BY_PRODUCT_ID: '/average/:productId'
} as const

export const STATISTICS_ENDPOINTS = {
  GET_USER_OVERVIEW: '/statistics/main'
} as const

export const PRODUCT_ENDPOINTS = {
  GET_ALL: '/products',
  GET_BY_ID: '/products/:productId',
  GET_BY_SLUG: '/products/by-slug/:slug',
  GET_BY_CATEGORY: '/products/by-category/:categorySlug',
  GET_SIMILAR: '/products/similar/:productId',
  CREATE: '/products',
  UPDATE_BY_ID: '/products/:productId',
  DELETE_BY_ID: '/products/:productId'
} as const

export const USER_ENDPOINTS = {
  GET_PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/profile',
  TOGGLE_FAVORITE: '/users/favorites/:productId'
} as const
