import React from 'react';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import 'components/Appointment/styles.scss';

export default function Appointment(props) {
  return (
    <article className="appointment">
      <header>
        {props.time}
        {props.interview ? (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={props.onEdit}
            onDelete={props.onDelete}
          />
        ) : (
          <Empty onAdd={props.onAdd} />
        )}
      </header>
    </article>
  );
}
