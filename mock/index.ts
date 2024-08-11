// mocks/index.js
import { MockMethod } from 'vite-plugin-mock';
import tableMockData from './table';
import authMockData from './auth';

export default [
  ...tableMockData,
  ...authMockData
] as MockMethod[];
