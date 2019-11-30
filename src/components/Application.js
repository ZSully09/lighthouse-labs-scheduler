import React from 'react';
// import axios from 'axios';
import useApplicationData from 'hooks/useApplicationData';
import DayList from 'components/DayList';
// import InterviewerList from 'components/InterviewerList';
import Appointment from 'components/Appointment';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from 'helpers/selectors.js';
import 'components/Application.scss';

export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  // const [state, setState] = useState({
  //   day: 'Monday',
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  // const setDay = day => setState({ ...state, day });

  // useEffect(() => {
  //   Promise.all([
  //     axios.get('/api/days'),
  //     axios.get('/api/appointments'),
  //     axios.get('/api/interviewers')
  //   ]).then(response => {
  //     setState(prev => ({
  //       ...prev,
  //       days: response[0].data,
  //       appointments: response[1].data,
  //       interviewers: response[2].data
  //     }));
  //   });
  // }, []);
  // console.log(state.interviewers);

  // function bookInterview(id, interview) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //   setState(state => ({
  //     ...state,
  //     appointments
  //   }));
  //   return axios.put(`/api/appointments/${id}`, { interview });
  // }

  // function cancelInterview(id, interview) {
  //   return axios.delete(`/api/appointments/${id}`, { interview }).then(() => {
  //     const appointment = {
  //       ...state.appointments[id],
  //       interview: { ...interview }
  //     };

  //     const appointments = {
  //       ...state.appointments,
  //       [id]: appointment
  //     };

  //     setState(state => ({
  //       ...state,
  //       appointments
  //     }));
  //   });
  // }

  // const appointments = getAppointmentsForDay(state, state.day);
  // const interviewers = getInterviewersForDay(state, state.day);
  const schedule = getAppointmentsForDay(state, state.day).map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    // const schedule = appointments.map(appointment => {
    // const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  // const SelectDay = () => {
  //   setDay(state.day);
  // };

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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
