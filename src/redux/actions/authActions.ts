import { REQUEST, authConstants, SUCCESS, FAILURE } from '../constants';
import { Payload } from 'types/action';

const loginUser = (payload: Payload) => ({
  type: REQUEST(authConstants.LOGIN),
  payload: payload,
});

const logout = (payload: Payload) => ({
  type: REQUEST(authConstants.LOGOUT),
  payload,
});

const login2User = (payload: Payload) => ({
  type: REQUEST(authConstants.LOGIN2),
  payload: payload,
});

const getUserInfo = (payload: Payload) => ({
  type: REQUEST(authConstants.GET_USER_INFO),
  payload: payload,
});

const detectLastChangePassword = (payload: Payload) => ({
  type: REQUEST(authConstants.DETECT_LAST_CHANGE_PASSWORD),
  payload,
})

const checkEmail = (payload: Payload) => ({
  type: REQUEST(authConstants.CHECK_EMAIL),
  payload,
});

const reissuePassword = (payload: Payload) => ({
  type: REQUEST(authConstants.REISSUE_PASSWORD),
  payload,
})

const removeErrorMessage = () => ({
  type: SUCCESS(authConstants.LOGIN2),
})

const clearIsFinishReissueFlag = () => ({
  type: FAILURE(authConstants.REISSUE_PASSWORD)
})

const sendMailResetPassword = (payload: Payload) => ({
  type: REQUEST(authConstants.SEND_MAIL_RESET_PASSWORD),
  payload,
});

const resetSendMail = () => ({
  type: authConstants.RESET_SEND_MAIL,
});

const checkLinkResetPassword = (payload: Payload) => ({
  type: REQUEST(authConstants.CHECK_LINK_RESET_PASSWORD),
  payload,
});

const resetPassword = (payload: Payload) => ({
  type: REQUEST(authConstants.RESET_PASSWORD),
  payload,
});

const clearCheckLinkReset = () => ({
  type: authConstants.CLEAR_CHECK_LINK_RESET,
});

const passUserInfo = (payload: Payload) => ({
  type: REQUEST(authConstants.PASS_USER_INFO),
  payload,
})

const getRoles = () => ({
  type: REQUEST(authConstants.GET_ROLES),
})

export {
  loginUser,
  login2User,
  logout,
  getUserInfo,
  detectLastChangePassword,
  checkEmail,
  reissuePassword,
  removeErrorMessage,
  clearIsFinishReissueFlag,
  sendMailResetPassword,
  resetSendMail,
  checkLinkResetPassword,
  resetPassword,
  clearCheckLinkReset,
  passUserInfo,
  getRoles,
};
