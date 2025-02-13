import React from "react";
import "./DayListItem.scss";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  return (
    <ul>
      {props.days.map(day => (
        <DayListItem
          key={day.id}
          id={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay}
        />
      ))}
    </ul>
  );
}
