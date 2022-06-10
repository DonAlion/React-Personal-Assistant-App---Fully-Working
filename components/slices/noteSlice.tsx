import { createSlice } from '@reduxjs/toolkit';
import NoteLib from '../NoteApp/NoteLib';

// Our note data format
interface NoteData {
  title: string;
  description: string;
  time: Date;
  editMode: boolean;
}

export interface ModifyNoteAction {
  payload: {
    i: number;
    f: string;
    v: any;
  };
}

// Initialization data for noteSlice.
const now = new Date();
let noteDataArr: Array<NoteData> = [];

// Function to generate a new random note data.
function getNewRandomNoteData(): NoteData {
  return {
    title: NoteLib.getRandomNoteTitle(),
    description: NoteLib.getRandomNoteDescription(),
    time: now,
    editMode: false,
  };
}

// Populate noteDataArr and give first 2 records old dates.
(() => {
  const old1 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5);
  const old2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);

  for (var i = 0; i < 3; i++) {
    noteDataArr.push(getNewRandomNoteData());
  }

  noteDataArr[0].time = old1;
  noteDataArr[1].time = old2;
})();

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    value: noteDataArr,
  },
  reducers: {
    addNote: (state) => {
      state.value.push(getNewRandomNoteData());
    },
    removeNote: (state, action) => {
      state.value.splice(action.payload, 1);
    },
    moveNoteDown: (state, action) => {
      let i = action.payload;

      if (i === state.value.length - 1) {
        return;
      }

      let notes = state.value;
      let temp = notes[i + 1];
      notes[i + 1] = notes[i];
      notes[i] = temp;
    },
    moveNoteUp: (state, action) => {
      let i = action.payload;

      if (i === 0) {
        return;
      }

      const notes = state.value;
      let temp = notes[i - 1];
      notes[i - 1] = notes[i];
      notes[i] = temp;
    },
    modifyNote: (state, action: ModifyNoteAction) => {
      let p = action.payload;
      state.value[p.i][p.f] = p.v;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNote, removeNote, moveNoteDown, moveNoteUp, modifyNote } =
  notesSlice.actions;

export default notesSlice.reducer;
