import React = require('react');
import { CalenderState } from '../CalendarApp/CalendarApp';

interface EditModalProps {
  appState: CalenderState;
  setAppState: Function;
}

export default class EditModal extends React.Component<EditModalProps, {}> {
  val: string;

  constructor(props: EditModalProps) {
    super(props);
    const setAppState = this.props.setAppState;
    this.val = this.props.appState.cellData[this.props.appState.activeCell];
  }

  getActiveCell() {
    return this.props.appState.cellData[this.props.appState.activeCell];
  }

  closeThis() {}

  render() {
    /**
    console.log(
      'Edit modal: ',
      appState,
      appState.activeCell,
      appState.cellData[appState.activeCell],
      setAppState
    );
   */

    return null;
  }
}
