const initialState = {
  loading: false,
  status: "",
  data: [],
  error: false,
  postData: [],
  users: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_FETCH_REQUESTED":
      return {
        ...state,
        loading: true,
      };
    case "USER_FETCH_SUCCEEDED":
      return {
        ...state,
        loading: false,
        data: action.data,
        status: action.status,
      };
    case "USER_FETCH_FAILED":
      return {
        ...state,
        loading: false,
        data: action.data,
        status: action.status,
        error: true,
      };

    case "USER_POST_SUCCEEDED":
      return {
        ...state,
        loading: false,
        postData: action.postData,
        status: action.status,
        users: [...state.users, action.name],
      };
    case "USER_POST_FAILED":
      return {
        ...state,
        loading: false,
        postData: action.postData,
        status: action.status,
        error: true,
      };
    default:
      return { ...state };
  }
};
