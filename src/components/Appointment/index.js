import React, { useEffect } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVE = "SAVE"
  const DELETE = "DELETE"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_DELETE = "ERROR_DELETE"
  const ERROR_SAVE = "ERROR_SAVE"
  const { mode, transition, back } = useVisualMode(EMPTY);
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE))
  }

  function cancel(id){
    transition(DELETE)
    props.cancelInterview((id))
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_DELETE))
  }

  useEffect(() => {
    if (props.interviewers) {
      transition(props.interviewers.interviewer ? SHOW : EMPTY)
    } else {
      transition(EMPTY)
    }
  }, [props.interviewers])

  return (<article className="appointment">

    <Header
      time={props.time}/>

    {mode === EMPTY && <Empty id={props.id} onAdd={transition} />}
    {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interviewers.student}
          interviewer={props.interviewers.interviewer}
          onDelete={transition}
          onEdit={transition}
        />
    )}
    {mode === CREATE && <Form
      id={props.id}
      interviewers={props.interviewerList}
      onSave={save}
      onCancel={transition}
      mode="EMPTY"
    />}
    {mode === SAVE && <Status message="SAVING"/>}
    {mode === DELETE && <Status message="DELETING"/>}
    {mode === CONFIRM && <Confirm 
      id={props.id}
      message="Are you sure you would like to delete?"
      onCancel={transition}
      onConfirm={cancel}
      />}
    {mode === EDIT && <Form 
      id={props.id}
      interviewers={props.interviewerList}
      interviewer={props.interview.interviewer.id}
      name={props.interview.student}
      message="DELETING"
      onSave={save}
      onCancel={transition}
      mode="SHOW"
      />}
      {mode === ERROR_DELETE && <Error 
        message="Could not delete"
        onClose={transition}
        mode="SHOW"
        />}
      {mode === ERROR_SAVE && <Error 
        message="Could not save"
        onClose={transition}
        mode="CREATE"
        />}

    </article>
  )
}
