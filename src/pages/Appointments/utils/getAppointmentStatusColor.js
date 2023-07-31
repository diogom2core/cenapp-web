export function getAppointmentStatusColor(type) {
  switch (type) {
    case 'pedding':
      return 'red';
    case 'expired':
      return 'red';
    case 'service_started':
      return 'orange';
    case 'interviewed':
      return '#2db7f5';
    case 'canceled':
      return 'red';
    case 'scheduled':
      return 'green';
    case 'not_interview':
      return 'red';
    case 'not_service_started':
      return 'red';
    default:
      return '';
  }
}
