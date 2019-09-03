import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";


export default function Appointment (props) {
  return (<article className="appointment">
    <Header
    time={props.time}/>
    <Empty
    onAdd={props.onAdd}/>
    <Show
    student={props.student}
    interviewer={props.interviewer}
    onEdit={props.onEdit}
    onDelete={props.onDelete}
    />
    </article>
    
  )
}