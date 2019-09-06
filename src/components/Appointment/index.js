import React, { useEffect } from "react";
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
  const { mode, transition, back } = useVisualMode(EMPTY);
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  }

  useEffect(() => {
    if (props.interviewers) {
      transition(props.interviewers.interviewer ? SHOW : EMPTY)
    } else {
      transition(EMPTY)
    }
  }, [props.interviewers])

  debugger

  return (<article className="appointment">

    <Header
      time={props.time}/>

    {mode === EMPTY && <Empty onAdd={transition} />}
    {mode === SHOW && (
      <>
        {console.log(props)}
        <Show
          student={props.interviewers.student}
          interviewer={props.interviewers.interviewer}
        />
      </>
    )}
    {mode === CREATE && <Form
      interviewer={props.interviewerList}
      onSave={save}
    />}

    </article>
  )
}
