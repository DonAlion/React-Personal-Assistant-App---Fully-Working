import React = require('react');

export default function HelpApp() {
  return (
    <div>
      <h1>App Help</h1>
      <hr />
      <h2>The 'Notes' Tab</h2>
      <p>
        Use the 'Notes' tab as a convenient way to create notes for, well,
        anything!
      </p>
      <p>
        The 'Add Note' button at the top can be used to add a new note, while
        the specific controls on each note can be used to manage the contents
        and position of notes.
      </p>
      <p>
        The filter bar filters notes using keywords (ex: 'cat hat bat'). By
        default, it is case sensitive and only searches note titles for matches.
        However, there are advanced options available through a prefix system.
        See the bottom of this page for the prefix reference.
      </p>
      <hr />
      <h2>The 'Calendar' Tab</h2>
      <p>
        The 'Calendar' tab is a simple proof-of-concept app to show how data
        from one application can be integrated into another. The calandar shows
        note titles related to given days. And, upon clicking on days, the user
        is returned to a pre-filtered instance of the Notes App to see all notes
        on that day and modify them as desired.
      </p>
      <hr />
      <h2>The 'Data' Tab</h2>
      <p>
        The 'Data' tab is used to save and load data to and from the
        application. Hitting the save button will let you save a file somewhere
        on your computer using your computer's browser, while the load feature
        will let you load the file from a chosen location.
      </p>
      <hr />
      <h2>Filter Prefix Reference</h2>
      <p>
        content: prefix 'c:' before keyword, ex: 'c:hat', format: 'c[keyword]'
      </p>
      <p>
        date: prefix 'd' before date, ex: d:05/08/2022, format: d:[MM/DD/YYYY] /{' '}
      </p>
      <p>
        date-range: prefix 'dr' before date range, ex: dr:05/05/2022-05/08/2022,
        format: 'dr:[MM/DD/YYYY]-[MM/DD/YYYY]' - (make sure the first date is
        less than second!)
      </p>
      <p>
        reverse-search: prefix 'r:' before keyword, ex: 'r:hat', format:
        'r:[keyword]'
      </p>
      <p>Surround a keyword with quotes to ignore advanced-search prefixes.</p>
    </div>
  );
}
