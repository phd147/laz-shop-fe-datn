const INIT_USER_INFO = 'INIT_USER_INFO'

export const userInitialState = {
  userInfo : {}
}


export const userReducer = (state :any, action : any) => {
  switch (action.type) {
    case INIT_USER_INFO:
      console.log('init user infor', action)
      return {
        userInfo: action.data,
      }

    default:
      return {}
  }
}
