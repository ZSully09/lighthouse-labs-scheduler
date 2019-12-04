export const SET_DAY = 'SET_DAY';
export const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
export const SET_INTERVIEW = 'SET_INTERVIEW';

// Functions used to update spots upon cancelling or booking an interview
function getSpotsRemainingForDay(day, appointments) {
  let spotsForThisDay = day.appointments;
  let freeSpots = 0;
  for (const spot of spotsForThisDay) {
    if (appointments[spot].interview === null) {
      freeSpots++;
    }
  }
  return freeSpots;
}

function decorateDaysWithSpots(days, appointments) {
  const decoratedDays = days.map(day => ({
    ...day,
    spots: getSpotsRemainingForDay(day, appointments)
  }));
  return decoratedDays;
}

// Reducer function
export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW: {
      const appointments = {
        ...state.appointments,
        [action.id]: {
          ...state.appointments[action.id],
          interview: action.interview === null ? null : { ...action.interview }
        }
      };
      const days = decorateDaysWithSpots(state.days, appointments);

      return {
        ...state,
        days,
        appointments
      };
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
