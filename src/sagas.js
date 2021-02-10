import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
// import Api from '...'

function fetchApi(param) {
  console.log(param);
  return axios.request({
    method: "get",
    url: "https://jsonplaceholder.typicode.com/users",
  });
}

function postUsers(param) {
  console.log(param, "param..");
  return axios.request({
    method: "post",
    url: "https://reqres.in/api/users",
    body: JSON.stringify({
      name: param,
      job: "software",
    }),
  });
}

function* sendData(action) {
  console.log(action);
  try {
    const { data } = yield call(postUsers, action.data);
    console.log(data, "data....");
    yield put({
      type: "USER_POST_SUCCEEDED",
      status: "success",
      postData: data,
      name: action.data
    });
  } catch (e) {
    yield put({ type: "USER_POST_FAILED", status: "failed", postData: [] });
  }
}

function* fetchUser(action) {
  const { error } = action;
  try {
    const { data } = yield call(fetchApi, action.error);
    yield put({ type: "USER_FETCH_SUCCEEDED", status: "success", data: data });
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", status: "failed", data: [] });
  }
}

function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
  yield takeLatest("USER_SUBMIT", sendData);
}

export default mySaga;
