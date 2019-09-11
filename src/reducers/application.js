export default function reducer(state, action) {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOT = "SET_SPOT";
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        appointments: action.value.appointments,
        days: action.value.days || state.days
      };
    case SET_INTERVIEW: {
      return { ...state, interviewers: action.value };
    }
    case SET_SPOT: {
      let days = state.days.map(day => {
        if (day.name === state.day) {
          return {
            ...day,
            spots: day.spots + action.value.spots
          };
        }
        return day;
      });
      return {
        ...state,
        days
      };
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
