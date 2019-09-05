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

export function getInterviewersForDay (state, day) {
  let interviewerKey = state.days.filter(days => days.name === day)
  let interviewerList = []

  if(!interviewerKey[0]) {
    return []
  } else {
    for (let id of interviewerKey[0].interviewers) {
        interviewerList.push(state.interviewers[id])
    }
    return interviewerList
  }
}