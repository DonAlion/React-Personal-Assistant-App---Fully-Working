import React = require('react');

export interface CellProps {
  classes: string;
  day: string;
  content: string;
  clickFunc: Function;
}

export default function Cell(props: CellProps) {
  return (
    <button
      type="button"
      className={'flex-ele ' + props.classes}
      onClick={() => {
        props.clickFunc();
      }}
    >
      <h2>{props.day}</h2>
      <p>{props.content}</p>
    </button>
  );
}
