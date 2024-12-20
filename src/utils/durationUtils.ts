export const getNoteDurationInSeconds = (
  duration: number,
  tempo: number,
): number => {
  // Convert note duration to seconds based on tempo
  // duration 4 = quarter note, tempo is in quarter notes per minute
  return (duration / 4) * (60 / tempo);
};
