import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Col, Row, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function SagaExample() {
  const state = useSelector((state) => state);
  const [text, setText] = React.useState("");
  const dispatch = useDispatch();
  console.log(state);

  const fetchUsers = () => {
    dispatch({ type: "USER_FETCH_REQUESTED", error: true });
  };

  const submit = () => {
    dispatch({ type: "USER_SUBMIT", data: text });
    setText("");
  };

  return (
    <div style={{ height: "100vh" }}>
      <nav class="navbar navbar-light bg-dark">
        <div
          class="container-fluid justify-content-center"
          style={{ padding: "30px" }}
        >
          <span
            class="navbar-brand mb-0 h1"
            style={{ color: "#fff", fontWeight: "bold", fontSize: 30 }}
          >
            React App
          </span>
        </div>
      </nav>
      <div
        style={{
          margin: "100px",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <div></div>
        <button
          onClick={fetchUsers}
          type="button"
          class="btn btn-primary"
          style={{ height: 60, width: 170, alignItems: "center" }}
        >
          Fetch Data
        </button>
      </div>

      <div
        style={{
          margin: "100px",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            Name
          </span>
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <button
          onClick={submit}
          type="button"
          class="btn btn-primary"
          style={{ height: 40, width: 170, alignItems: "center" }}
        >
          Post Data
        </button>
      </div>

      <div
        style={{
          height: "50vh",
          marginTop: "10vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {state.loading ? (
          <div class="spinner-border" role="status"></div>
        ) : (
          <div>
            {state.data.map((e, idx) => (
              <p key={idx}>{e.name}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SagaExample;
