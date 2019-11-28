// export function getAppointmentsForDay(state, day) {
//   const filteredAppointments = state.days.filter(days => days.name === day);
//   let appointments = [];
//   if (filteredAppointments.length) {
//     appointments = filteredAppointments[0].appointments.map(
//       d => state.appointments[d]
//     );
//   }
//   return appointments;
// }

export function getAppointmentsForDay(state, day) {
  const validDays = state.days.map(day => day.name);
  // console.log('validDays', validDays);
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
// let results = [];
// for (let key in state.appointments) {
//   if ()
// }

// const filtered = state.appointments[filteredAppointmentIds];
// // const filtered = filteredDays.appointments.map(id => {
// //   appointments[id];
// // });
// console.log(filteredAppointmentIds);
// return filteredAppointmentIds;

// const state = {
//   days: [
//     {
//       id: 1,
//       name: 'Monday',
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: 'Tuesday',
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     '1': { id: 1, time: '12pm', interview: null },
//     '2': { id: 2, time: '1pm', interview: null },
//     '3': {
//       id: 3,
//       time: '2pm',
//       interview: { student: 'Archie Cohen', interviewer: 2 }
//     },
//     '4': { id: 4, time: '3pm', interview: null },
//     '5': {
//       id: 5,
//       time: '4pm',
//       interview: { student: 'Chad Takahashi', interviewer: 2 }
//     }
//   }
// };
