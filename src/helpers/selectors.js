export function getAppointmentsForDay(state, day) {
  let appointmentKey = state.days.filter(days => days.name === day)
  let appointmentList = []

  if(!appointmentKey[0]) {
    return []
  } else {
    for (let id of appointmentKey[0].appointments) {
        appointmentList.push(state.appointments[id])
    }
    return appointmentList
  }
}

export function getInterview (state, interview) {
  if (interview === null) {
    return null
  }

  let interviewObj = interview
  for (let key in state.interviewers) {
    if (key == interview.interviewer) {
      interviewObj["interviewer"] = state.interviewers[key]
    }
  }
  return interviewObj
}