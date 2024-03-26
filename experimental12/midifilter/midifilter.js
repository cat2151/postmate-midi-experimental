function midifilter(data) {
    console.log(`midifilter : before : `, data);

    addShiftedNotes(data[0]);

    console.log(`midifilter : after : `, data);
    return data;
}

function addShiftedNotes(events) {
    const orgNote = events[0];
    events.push(getShiftedNote(orgNote, 4));
    events.push(getShiftedNote(orgNote, 7));
}

function getShiftedNote(orgNoteEvent, semitone) {
    const newNoteEvent = new Uint8Array(orgNoteEvent);
    newNoteEvent[1] += semitone;
    return newNoteEvent;
}

export { midifilter };
