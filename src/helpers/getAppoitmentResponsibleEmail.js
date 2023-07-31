export function getAppoitmentResponsibleEmail(appointment) {
  switch (appointment.preference_service_type) {
    case 'adultos':
      return appointment.patient_email;
    case 'idosos':
      return appointment.patient_email;
    case 'casais':
      return appointment.patient_email;
    case 'adolescentes':
      return appointment.responsible_appointment_email;
    case 'criancas':
      return appointment.responsible_appointment_email;
    case 'familias':
      return appointment.families[0].email;
    case 'interverncoes':
      return (
        appointment.responsible_appointment_email ||
        appointment.responsible_appointment_two_email
      );
    default:
      return '';
  }
}
