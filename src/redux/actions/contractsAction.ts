import { REQUEST, contractConstant, FAILURE } from '../constants';
import { Payload } from 'types/action';

const getContracts = (payload: Payload) => ({
  type: REQUEST(contractConstant.GET_CONTRACTS),
  payload: payload,
});

const searchCompaniesInContract = (payload: Payload) => ({
  type: REQUEST(contractConstant.SEARCH_COMPANY),
  payload: payload,
});

const getOptionSettings = (payload: Payload) => ({
  type: REQUEST(contractConstant.GET_OPTION_SETTINGS),
  payload: payload,
});

const getMeetingSettings = (payload: Payload) => ({
  type: REQUEST(contractConstant.GET_MEETING_SETTINGS),
  payload: payload,
});

const clearFilterContracts = () => ({
  type: contractConstant.CLEAR_FILTER_CONTRACTS,
});

const createContract = (payload: Payload) => ({
  type: REQUEST(contractConstant.CREATE_CONTRACT),
  payload: payload,
});

const getContractDetail = (payload: Payload) => ({
  type: REQUEST(contractConstant.GET_CONTRACT_DETAIL),
  payload: payload,
})

const clearContractData = () => ({
  type: REQUEST(contractConstant.CLEAR_CONTRACT_DATA),
})

const updateContract = (payload: Payload) => ({
  type: REQUEST(contractConstant.UPDATE_CONTRACT),
  payload: payload,
});

const setCompanySelected = (payload: Payload) => ({
  type: contractConstant.SET_COMPANY_SELECTED,
  payload: payload,
});

const clearFilterMeetingSetting = () => ({
  type: contractConstant.CLEAR_FILTER_MEETING_SETTINGS,
});

const onGenLoginId = (payload: Payload) => ({
  type: REQUEST(contractConstant.GEN_LOGIN_ID),
  payload,
});

const updateMeetingSetting = (payload: Payload) => ({
  type: REQUEST(contractConstant.UPDATE_MEETING_SETTING),
  payload,
});

const deleteContract = (payload: Payload) => ({
  type: REQUEST(contractConstant.DELETE_CONTRACT),
  payload,
});

const setLoadingRefer = (payload: Payload) => ({
  type: contractConstant.SET_LOADING_REFER,
  payload,
});
const clearFilterOption = () => ({
  type: REQUEST(contractConstant.CLEAR_FILTER_OPTION),
})

const referOptionSetting = (payload: Payload) => ({
  type: REQUEST(contractConstant.REFER_OPTION_SETTING),
  payload,
});

export {
  getContracts,
  searchCompaniesInContract,
  getOptionSettings,
  getMeetingSettings,
  clearFilterContracts,
  createContract,
  getContractDetail,
  clearContractData,
  updateContract,
  setCompanySelected,
  clearFilterMeetingSetting,
  onGenLoginId,
  updateMeetingSetting,
  deleteContract,
  setLoadingRefer,
  clearFilterOption,
  referOptionSetting,
}; 
