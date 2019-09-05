import InterviewerList from "components/InterviewerList";

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
  let appointmentList = getAppointmentsForDay(state,day)
  let idList = []
  let interviewerList = []

  for (let appointment of appointmentList) {
    if (appointment.interview !== null) {
      idList.push(appointment.interview.interviewer)
    }
  }

  for (let id of idList) {
    for (let interviewer in state.interviewers) {
      if (id == interviewer) {
        interviewerList.push(state.interviewers[interviewer])
      }
    }
  }

  return interviewerList


}