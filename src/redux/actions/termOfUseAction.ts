import { REQUEST, SUCCESS, termOfUseConstants } from '../constants';
import { Payload } from 'types/action';

const getTermsOfUse = (payload: Payload) => ({
  type: REQUEST(termOfUseConstants.GET_TERMS_OF_USE),
  payload: payload,
});

const clearFilterTermOfUse = () => ({
  type: termOfUseConstants.CLEAR_FILTER_TERMS_OF_USE,
})

export { getTermsOfUse, clearFilterTermOfUse };
