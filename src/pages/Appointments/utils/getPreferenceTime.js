export function getPreferenceTime(preference) {
  const {
    preference_afternoon_service,
    preference_morning_service,
    preference_night_service,
  } = preference;

  const result = [];

  if (preference_morning_service) {
    result.push('Manhã');
  }

  if (preference_afternoon_service) {
    result.push('Tarde');
  }

  if (preference_night_service) {
    result.push('Noite');
  }

  return result.join(', ');
}
