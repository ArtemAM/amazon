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
