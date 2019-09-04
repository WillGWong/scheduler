import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors"

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  let interview = {}

  useEffect(() => {
    Promise.all([ 
    axios.get("/api/days"),
    axios.get("/api/appointments"),
    axios.get("/api/interviewers")
    ]).then((all) => {
      console.log(all[2].data)
      setState(prev => ({days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  },[])

  const appointments = getAppointmentsForDay(state, state.day)

  const schedule = appointments.map((appointment) => {
    interview = getInterview(state, appointment.interview);
  });
  

  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList
    days={state.days}
    day={state.day}
    setDay={setDay}
  />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {appointments.map(appointment => 
        <Appointment
          {...appointment}
          interviewer={interview}
        />
        )}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
    
  );
}
