export default {
  navigation: {
    library: 'Library',
    collections: 'Collections',
    configuration: 'Configuration',
  },
  library: {
    title: 'Song Library',
    importButton: 'Import Song',
    noSongs: 'No songs available. Import a song to get started.',
    deleteConfirm: 'Are you sure you want to delete this song?',
    created: 'Created',
    loading: 'Loading songs...',
    delete: 'Delete',
  },
  collections: {
    title: 'Music Collections',
    loading: 'Loading collections...',
    error: 'Failed to load collections. Please try again later.',
    addToLibrary: 'Add to Library',
    added: 'Added',
  },
  import: {
    title: 'Import MusicXML File',
    dropzone: {
      text: 'Drag and drop your MusicXML file here',
      or: 'or',
      button: 'Choose File',
    },
    selectedFile: 'Selected file',
    nameInput: 'Enter song name',
    buttons: {
      cancel: 'Cancel',
      import: 'Import',
    },
  },
  playback: {
    tempo: 'Tempo',
    bpm: 'BPM',
    presets: {
      label: 'Preset',
      slow: 'Slow (40 BPM)',
      medium: 'Medium (80 BPM)',
      fast: 'Fast (120 BPM)',
    },
  },
  colorConfig: {
    title: 'Coloring',
  },
  common: {
    backToLibrary: 'Back to Library',
    loading: 'Loading...',
    print: 'Print',
  },
  displayMode: {
    all: 'Both',
    sheet: 'Sheet',
    playalong: 'Colored bars',
  },
  settings: {
    title: 'Settings',
    displayMode: {
      label: 'Default Display Mode',
      description: 'Choose how sheet music is displayed by default',
    },
  },
}
