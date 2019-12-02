export function getAppointmentsForDay(state, day) {
  //   const filteredAppointments = state.days.filter(a => a.name === day);
  //   let appointments = [];
  //   if (filteredAppointments.length) {
  //     appointments = filteredAppointments[0].appointments.map(
  //       b => state.appointments[b]
  //     );
  //   }
  //   return appointments;
  // }
  const validDays = state.days.map(day => day.name);
  if (!day || !validDays.includes(day)) return [];

  return state.days
    .filter(appointment => appointment.name === day)[0]
    .appointments.map(apptId => state.appointments[apptId]);
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const interviewObj = {
    student: interview.student
  };

  interviewObj.interviewer = state.interviewers[interview.interviewer];
  return interviewObj;
}

export function getInterviewersForDay(state, day) {
  const validDays = state.days.map(day => day.name);
  // console.log('validDays', validDays);
  if (!day || !validDays.includes(day)) return [];

  return state.days
    .filter(interviewer => interviewer.name === day)[0]
    .appointments.map(interId => state.interviewers[interId]);
}

// const filteredInterviewers = state.days.filter(days => days.name === day);

// let interviewers = [];
// if (filteredInterviewers.length && filteredInterviewers[0].appointments) {
//   interviewers = filteredInterviewers[0].interviewers.map(
//     d => state.interviewers[d]
//   );
// }
//   return interviewers;
// }
