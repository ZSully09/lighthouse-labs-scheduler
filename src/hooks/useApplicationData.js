import { useReducer, useEffect } from 'react';
import axios from 'axios';

const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

function getSpotsRemainingForDay(day, appointments) {
  let spotsForThisDay = day.appointments;
  let freeSpots = 0;
  // go through each spot for this day
  for (const spot of spotsForThisDay) {
    // if that spot's appointment's interview is null:
    // that spot is free; increment freeSpots
    if (appointments[spot].interview === null) {
      freeSpots++;
    }
  }
  return freeSpots;
}

function decorateDaysWithSpots(days, appointments) {
  console.log(days);
  const decoratedDays = days.map(day => ({
    ...day,
    spots: getSpotsRemainingForDay(day, appointments)
  }));
  return decoratedDays;
}

function reducer(state, action) {
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

export default function useApplicationData() {
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    dispatch({ type: SET_INTERVIEW, id: id, interview: interview });
    return axios.put(`/api/appointments/${id}`, { interview });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const nullAppointment = {
        ...state.appointments[id],
        interview: null
      };

      const appointments = {
        ...state.appointments,
        [id]: nullAppointment
      };

      dispatch({ type: SET_INTERVIEW, id: id, interview: null });
    });
  }

  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day: day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
      // setState(prev => ({
      //   ...prev,
      //   days: response[0].data,
      //   appointments: response[1].data,
      //   interviewers: response[2].data
      // }));
    });
  }, []);
  return {
    state,
    setDay,
    // dispatch,
    bookInterview,
    cancelInterview
  };
}
