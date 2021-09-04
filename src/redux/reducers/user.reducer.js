import { REQUEST, SUCCESS, FAILURE, USER_ACTION } from '../constants';

const initialState = {
  userList: [],
  userInfo: {
    data: {},
    load: false,
    error: null,
  },
  responseAction: {
    login: {
      load: false,
      error: null,
    },
    register: {
      load: false,
      error: null,
    }
  }
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST(USER_ACTION.LOGIN): {
      return {
        ...state,
        responseAction: {
          ...state.responseAction,
          login: {
            ...state.responseAction.login,
            load: true,
            error: null,
          },
        }
      };
    }
    case SUCCESS(USER_ACTION.LOGIN): {
      const { data } = action.payload;
      return {
        ...state,
        responseAction: {
          ...state.responseAction,
          login: {
            ...state.responseAction.login,
            load: false,
            error: null,
          }
        },
        userInfo: {
          ...state.userInfo,
          data,
        },
      };
    }
    case FAILURE(USER_ACTION.LOGIN): {
      const { error } = action.payload;
      return {
        ...state,
        responseAction: {
          ...state.responseAction,
          login: {
            ...state.responseAction.login,
            load: false,
            error,
          }
        },
      };
    }

    case REQUEST(USER_ACTION.LOGOUT): {
      return {
        ...state,
        userInfo: {
          data: {},
          load: false,
          error: null,
        },
      };
    }

    case REQUEST(USER_ACTION.REGISTER): {
      return {
        ...state,
        responseAction: {
          ...state.responseAction,
          register: {
            ...state.responseAction.register,
            load: true,
            error: null,
          }
        }
      };
    }
    case FAILURE(USER_ACTION.REGISTER): {
      const { error } = action.payload;
      return {
        ...state,
        responseAction: {
          ...state.responseAction,
          register: {
            ...state.responseAction.register,
            load: false,
            error,
          }
        }
      };
    }

    case REQUEST(USER_ACTION.GET_USER_INFO): {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
          error: null,
        },
      };
    }
    case SUCCESS(USER_ACTION.GET_USER_INFO): {
      const { data } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data,
          load: false,
          error: null,
        },
      };
    }
    case FAILURE(USER_ACTION.GET_USER_INFO): {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          error,
        },
      };
    }
    default:
      return state;
  }
}

export default userReducer;
