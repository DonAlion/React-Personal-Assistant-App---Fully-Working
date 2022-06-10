import React from 'react';
import { connect } from 'react-redux';
import {
  moveNoteDown,
  moveNoteUp,
  removeNote,
  modifyNote,
  ModifyNoteAction,
} from '..//slices/noteSlice';

class Note extends React.Component {
  constructor(props: NoteProps) {
    super(props);
  }

  changeTitle(event) {
    let x: ModifyNoteAction = {
      i: this.props.index,
      f: 'title',
      v: event.target.value,
    };

    this.props.modifyNote(x);
  }

  changeDescription(event) {
    let x: ModifyNoteAction = {
      i: this.props.index,
      f: 'description',
      v: event.target.value,
    };

    this.props.modifyNote(x);
  }

  changeEditMode(val) {
    let x: ModifyNoteAction = {
      i: this.props.index,
      f: 'editMode',
      v: val,
    };

    this.props.modifyNote(x);
  }

  getEditComponent() {
    return (
      <div>
        <h2>Modify Title</h2>
        <input
          type="text"
          value={this.props.notes.value[this.props.index].title}
          onChange={(e) => {
            this.changeTitle(e);
          }}
        ></input>
        <h2>Modify Content</h2>
        <input
          type="text"
          value={this.props.notes.value[this.props.index].description}
          onChange={(e) => {
            this.changeDescription(e);
          }}
        ></input>
        <br />
        <button
          onClick={(e) => {
            this.changeEditMode(false);
          }}
        >
          Save
        </button>
      </div>
    );
  }

  render() {
    var editComponent = <div></div>;
    var bottom = null;
    let note = this.props.notes.value[this.props.index];

    if (note.editMode) {
      editComponent = this.getEditComponent();
      bottom = <hr />;
    }

    let isDisabled = this.props.disableReorder;

    return (
      <div className="note">
        <h1>{note.title}</h1>
        <p>{note.time.toUTCString()}</p>
        <p>{note.description}</p>
        <button
          onClick={(e) => {
            this.changeEditMode(true);
          }}
        >
          Edit
        </button>
        <button
          disabled={isDisabled}
          onClick={() => {
            this.props.moveNoteUp(this.props.index);
          }}
        >
          Up
        </button>
        <button
          onClick={() => {
            this.props.moveNoteDown(this.props.index);
          }}
          disabled={isDisabled}
        >
          Down
        </button>
        <button
          onClick={() => {
            this.props.removeNote(this.props.index);
          }}
        >
          Delete
        </button>
        {bottom}
        {editComponent}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const notes = state.notes;

  return {
    notes,
  };
}

const mapDispatchToProps = {
  removeNote,
  moveNoteUp,
  moveNoteDown,
  modifyNote,
};

interface NoteProps {
  moveNoteDown: Function;
  moveNoteUp: Function;
  removeNote: Function;
  modifyNote: Function;
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);
