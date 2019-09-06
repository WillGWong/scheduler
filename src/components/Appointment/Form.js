import React, { useState } from "react";
import "components/Appointment/styles.scss";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form (props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(null);

  const resetForm = () => {
    setName("");
    setInterviewer(null);
  }

  const cancelForm = () => {
    resetForm();
    props.onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off"
    onSubmit={event => event.preventDefault()}
    >
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder={name? name:"Please enter a name"}
        onChange={(event)=>setName(event.target.value)}
        value={name}
        /*
          This must be a controlled component
        */
      />
    </form>
    <InterviewerList interviewers={props.interviewer} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancelForm} danger>Cancel</Button>
      <Button onClick={() => 
        props.onSave(name, interviewer)} confirm>Save</Button>
    </section>
  </section>
</main>
  )
}





