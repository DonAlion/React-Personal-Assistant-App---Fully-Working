import React from 'react';
import { connect } from 'react-redux';
import NoteData from './NoteData';

import {
  addNote,
  moveNoteDown,
  moveNoteUp,
  removeNote,
} from '..//slices/noteSlice';
import { modifyView } from '../slices/viewSlice';
import { modifyPage } from '../slices/pageSlice';
import { modifyPageSize } from '../slices/pageSizeSlice';
import { modifyFilter } from '../slices/filterSlice';
import Note from './Note';

class NoteApp extends React.Component {
  constructor(props: any) {
    super(props);

    this.doNoteAppFilter = this.doNoteAppFilter.bind(this);
    this.getNotesPerPageSlider = this.getNotesPerPageSlider.bind(this);
  }

  getNumberFormattedToTwoSpaces(x: number): string {
    return x < 10 ? '0' + x : x + '';
  }

  // ex: d:05/08/2022
  getDateMatch(v: NoteData, dateInput: string): boolean {
    let formattedNoteDate =
      this.getNumberFormattedToTwoSpaces(v.date.getMonth()) +
      '/' +
      this.getNumberFormattedToTwoSpaces(v.date.getDate()) +
      '/' +
      v.date.getFullYear();

    return dateInput === formattedNoteDate;
  }

  // dr:05/05/2022-05/08/2022
  getDateRangeMatch(v: NoteData, dateInput: string): boolean {
    // First, make sure user input is in proper format.
    let reg = /\d\d\/\d\d\/\d\d\d\d-\d\d\/\d\d\/\d\d\d\d/gi;

    if (dateInput.match(reg) == null) {
      return false;
    }

    // Next, construct date range.
    let twoDatesFragmentArr = dateInput
      .split('-')
      .map((v1) => v1.split('/').map((v2) => parseInt(v2)));
    let fragA = twoDatesFragmentArr[0];
    let fragB = twoDatesFragmentArr[1];
    let date1 = new Date(fragA[2], fragA[0], fragA[1], 0, 0, 0, 0);
    let date2 = new Date(fragB[2], fragB[0], fragB[1], 23, 59, 59, 999);

    // Finally, return whether our note's date is within the specified date range.
    return (
      v.date.getTime() >= date1.getTime() && v.date.getTime() <= date2.getTime()
    );
  }

  getNotesMap(): React.ReactNode {
    let counter = 0;
    let len: number = this.props.notes.value.length;
    let filter = this.props.filter.value;
    let keywordFilteredNotes;

    if (
      filter === undefined ||
      filter.value === undefined ||
      filter.length === 0
    ) {
      keywordFilteredNotes = this.props.notes.value;
    } else {
      let keywords = filter.value.split(' ');

      if (keywords.length === 0) {
        keywordFilteredNotes = this.props.notes.value;
      } else {
        // First, process our filter str.
        keywordFilteredNotes = this.props.notes.value.filter(
          (v: NoteData, i: number) => {
            let found = false;

            keywords.some((keyWord) => {
              if (
                keyWord.substring(0, 2) === 'c:' &&
                v.content.includes(keyWord.substring(2, keyWord.length))
              ) {
                found = true;
              } else if (
                keyWord.substring(0, 2) === 'd:' &&
                this.getDateMatch(v, keyWord.substring(2, keyWord.length))
              ) {
                found = true;
              } else if (
                keyWord.substring(0, 3) === 'dr:' &&
                this.getDateRangeMatch(v, keyWord.substring(3, keyWord.length))
              ) {
                found = true;
              } else if (
                keyWord.substring(0, 2) === 'r:' &&
                !v.title.includes(keyWord.substring(2, keyWord.length))
              ) {
                found = true;
              } else if (v.title.includes(filter.value)) {
                found = true;
              }

              return found;
            });

            return found;
          }
        );
      }
    }

    // Now, create our core map of JSX elements to display.
    let jsxArr = keywordFilteredNotes.map((v: NoteData, i: number) => {
      let noteProp = {
        index: i,
        disableReorder: this.props.filter.value !== '',
      };

      return <Note {...noteProp} />;
    });

    // Filter results based on page.
    let pageStart = this.props.pageSize.value * this.props.page.value;
    let pageEnd = pageStart + this.props.pageSize.value - 1;

    let core = jsxArr.filter((v: NoteData, i: number) => {
      return i >= pageStart && i <= pageEnd;
    });

    let maxPages = (jsxArr.length - 1) / this.props.pageSize.value;

    // wrap: {this.getPaginationControl(maxPages)}

    return (
      <div>
        <div className="note-grid">{core}</div>
      </div>
    );
  }

  doNoteAppFilter(e: any) {
    this.props.modifyFilter(e.target.value);
  }

  updatePage(newPage: number) {
    this.props.modifyPage(newPage);
  }

  getPaginationControl(maxPages: number) {
    let active = this.props.page.value;
    let items = [];

    if (maxPages < 0) {
      maxPages = 0;
    }

    let getI;
    if (maxPages >= 10) {
      getI = (i: number) => {
        return this.getNumberFormattedToTwoSpaces(i + 1);
      };
    } else {
      getI = (i: number) => {
        return i + 1;
      };
    }

    for (let i = 0; i <= maxPages; i++) {
      items.push(
        <button
          key={i}
          disabled={i === active}
          onClick={() => {
            this.updatePage(i);
          }}
        >
          {getI(i)}
        </button>
      );
    }

    return <div>{items}</div>;
  }

  getNotesPerPageSlider() {
    return (
      <div className="slider-parent">
        <p className="slider-child">
          {this.getNumberFormattedToTwoSpaces(this.props.pageSize.value)}
        </p>
        <input
          type="range"
          className="slider-child"
          min="1"
          max="20"
          value={this.props.pageSize.value}
          onChange={(e) => {
            this.props.modifyPageSize(e.target.value);
          }}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.props.addNote();
          }}
        >
          Add Note
        </button>
        <input
          value={this.props.filter.value}
          onChange={this.doNoteAppFilter}
          placeholder="Start Typing to Filter"
        ></input>
        {this.getNotesPerPageSlider()}
        {this.getNotesMap()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const filter = state.filter;
  const notes = state.notes;
  const pageSize = state.pageSize;
  const page = state.page;
  const view = state.view;

  return {
    filter,
    notes,
    pageSize,
    page,
    view,
  };
}

const mapDispatchToProps = {
  addNote,
  moveNoteDown,
  moveNoteUp,
  removeNote,
  modifyView,
  modifyPage,
  modifyFilter,
  modifyPageSize,
};

interface AppProps {
  addNote: Function;
  moveNoteDown: Function;
  moveNoteUp: Function;
  removeNote: Function;
  modifyView: Function;
  modifyPage: Function;
  modifyFilter: Function;
  modifyPageSize: Function;
  modifyEditMode: Function;
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteApp);
