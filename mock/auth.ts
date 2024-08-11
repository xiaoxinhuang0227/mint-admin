// mocks/index.js
import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

export default [
  {
    url: '/api/v1/auth/login',
    method: 'post',
    response: () => {
      return {
        code: 0,
        msg: 'success',
        data: {
          token:  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjE2YWJkNTlkOTAxNzQwZDliYmI3ZjczODBhZDkyNzNhIiwidXNlcklkIjoyLCJ1c2VybmFtZSI6ImFkbWluIiwiZGVwdElkIjoxLCJkYXRhU2NvcGUiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiZXhwIjoxNjkxMTAzMzgyfQ.P4cuIfmPepl3HuguhMS7NXn5a7IUPpsLbmtA_rHOhHk",
          username: 'admin',
          password: 'admin',
          role: 'admin',
          roleId: '1',
          permission: ['*.*.*'],
          avatar: ''
        },
      };
    },
  },
  {
    url: '/api/v1/auth/role',
    method: 'get',
    response: () => {
      return {
        code: 0,
        msg: 'success',
        data: Mock.mock({
          'items|1-10': [{
            'id|+1': 1,
            remark: '@ctitle(5, 10)',
            name: '@cname',
            createdAt: '@datetime',
            updatedAt: '@datetime',
          }],
          total: 5
        })
      };
    },
  },
  {
    url: '/api/v1/auth/manager',
    method: 'get',
    response: () => {
      return {
        code: 0,
        msg: 'success',
        data: Mock.mock({
          'items|1-10': [{
            'id|+1': 1,
            'roleId|+1': 1,
            'account|+1': 20023,
            status: 1,
            phone: '@phone',
            password: '',
            realName: '@cname',
            createdAt: '@datetime',
            updatedAt: '@datetime',
          }],
          total: 5
        })
      };
    },
  }
] as MockMethod[];
