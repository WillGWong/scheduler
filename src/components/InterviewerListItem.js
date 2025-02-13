import React from "react";
import './InterviewerListItem.scss';
import classNames from 'classnames';


export default function InterviewerListItem(props) {
  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected
  });


  return (
    <li key={props.id} className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )};