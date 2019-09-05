import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"

  const { mode, transition, back } = useVisualMode(
    props.interviewers ? SHOW : EMPTY
  );


  return (<article className="appointment">

    <Header
      time={props.time}/>

    {mode === EMPTY && <Empty onAdd={transition} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode === CREATE && <Form
      interviewer={props.interviewerList}
    />}

    </article>
  )
}
