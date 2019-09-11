import axios from "axios";
import { useEffect, useReducer } from "react";
import reducer from "reducers/application";

export default function UseApplicationData() {
  const [state, dispatchState] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatchState({ value: day, type: "SET_DAY" });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      dispatchState({
        value: { appointments: all[1].data, days: all[0].data },
        type: "SET_APPLICATION_DATA"
      });
      dispatchState({ value: all[2].data, type: "SET_INTERVIEW" });
    });
  }, []);

  function bookInterview(id, interview, edit = false) {
    console.log(id, interview, edit);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .put(`/api/appointments/${id}`, { ...appointment })
      .then(res => {
        dispatchState({
          value: { appointments: appointments },
          type: "SET_APPLICATION_DATA"
        });
        dispatchState({
          value: { id, spots: edit ? 0 : -1 },
          type: "SET_SPOT"
        });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`/api/appointments/${id}`, { interview: null })
      .then(res => {
        dispatchState({
          value: { appointments: appointments },
          type: "SET_APPLICATION_DATA"
        });
        dispatchState({ value: { spots: 1 }, type: "SET_SPOT" });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
