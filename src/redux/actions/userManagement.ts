import { REQUEST, userManagementConstants } from '../constants';
import { Payload } from 'types/action';

export const getUsers = (payload: Payload) => ({
  type: REQUEST(userManagementConstants.GET_USERS),
  payload: payload,
});

export const searchCompanies = (payload: Payload) => ({
  type: REQUEST(userManagementConstants.SEARCH_COMPANY),
  payload: payload,
});

export const getMemberDetail = (payload: Payload) => ({
  type: REQUEST(userManagementConstants.GET_MEMBER_DETAIL),
  payload: payload,
})

export const clearMemberData = () => ({
  type: REQUEST(userManagementConstants.CLEAR_MEMBER_DATA),
})

export const deleteUser = (payload: Payload) => ({
  type: REQUEST(userManagementConstants.DELETE_MEMBER),
  payload: payload,
})

export const createMember = (payload: Payload) => ({
  type: REQUEST(userManagementConstants.CREATE_MEMBER),
  payload,
})

export const updateMember = (payload: Payload) => ({
  type: REQUEST(userManagementConstants.UPDATE_MEMBER),
  payload,
})
