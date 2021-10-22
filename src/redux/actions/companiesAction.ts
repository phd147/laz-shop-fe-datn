import { REQUEST, SUCCESS, companiesConstant } from '../constants';
import { Payload } from 'types/action';

const getCountries = (payload: Payload) => ({
  type: REQUEST(companiesConstant.COUNTRIES),
  payload: payload,
});

const getCompanies = (payload: Payload) => ({
  type: REQUEST(companiesConstant.GET_COMPANIES),
  payload: payload,
});

const clearFilterCompanies = () => ({
  type: REQUEST(companiesConstant.CLEAR_FILTER_COMPANIES),
});

const getCompany = (payload: Payload) => ({
  type: REQUEST(companiesConstant.GET_COMPANY),
  payload: payload,
});

const deleteCompany = (payload: Payload) => ({
  type: REQUEST(companiesConstant.DELETE_COMPANY),
  payload: payload,
});

const clearDetailCompany = () => ({
  type: REQUEST(companiesConstant.CLEAR_DETAIL_COMPANY),
});

const createCompany = (payload: Payload) => ({
  type: REQUEST(companiesConstant.CREATE_COMPANY),
  payload: payload,
});

const editCompany = (payload: Payload) => ({
  type: REQUEST(companiesConstant.EDIT_COMPANY),
  payload: payload,
});

export { getCountries, getCompanies, clearFilterCompanies, getCompany, deleteCompany, clearDetailCompany, createCompany, editCompany };
