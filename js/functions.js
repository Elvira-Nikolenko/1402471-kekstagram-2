function workTime(workStart, workEnd, meetingStart, meetingDuration) {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(workStart) || !timeRegex.test(workEnd) || !timeRegex.test(meetingStart)) {
    throw new Error('Некорректный формат времени. Ожидается HH:MM.');
  }
  const parseTime = (timeStr) => {
    const [hours, minutes = '0'] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const workStartMinutes = parseTime(workStart);
  const workEndMinutes = parseTime(workEnd);
  const meetingStartMinutes = parseTime(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return (
    meetingStartMinutes >= workStartMinutes &&
    meetingEndMinutes <= workEndMinutes
  );
}

workTime('08:00', '18:00', '10:00', 90);
