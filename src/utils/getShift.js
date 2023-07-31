export function getShift(shiftPreference) {
  const { night_service, afternoon_service, morning_service } = shiftPreference;

  const shiftResult = [];

  if (morning_service) {
    shiftResult.push(' Manhã ');
  }

  if (afternoon_service) {
    shiftResult.push(' Tarde ');
  }

  if (night_service) {
    shiftResult.push(' Noite ');
  }

  return shiftResult.toString();
}
