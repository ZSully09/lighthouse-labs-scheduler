import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        /* insert logic */
      };
    case SET_APPLICATION_DATA:
      return {
        /* insert logic */
      };
    case SET_INTERVIEW: {
      return; /* insert logic */
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

    setState(state => ({
      ...state,
      appointments
    }));
    return axios.put(`/api/appointments/${id}`, { interview });
  }

  function cancelInterview(id, interview) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const nullAppointment = {
        ...state.appointments[id],
        interview: { ...state.appointments[id].interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: nullAppointment
      };

      setState(state => ({
        ...state,
        appointments
      }));
    });
  }

  // function cancelInterview(id, interview) {
  //       const appointment = {
  //         ...state.appointments[id],
  //         interview: { ...interview }
  //       };

  //       const appointments = {
  //         ...state.appointments,
  //         [id]: appointment
  //       };

  //       setState(state => ({
  //         ...state,
  //         appointments
  //       }));
  //     return axios.delete(`/api/appointments/${id}`, { interview }
  // }

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState(state => ({ ...state, day }));

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(response => {
      setState(prev => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      }));
    });
  }, []);
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
