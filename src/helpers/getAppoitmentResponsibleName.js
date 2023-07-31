export function getAppoitmentResponsibleName(appointment) {
  switch (appointment.preference_service_type) {
    case 'adultos':
      return appointment.patient_name;
    case 'idosos':
      return appointment.patient_name;
    case 'casais':
      return appointment.patient_name;
    case 'adolescentes':
      return appointment.responsible_appointment_name;
    case 'criancas':
      return appointment.responsible_appointment_name;
    case 'familias':
      return appointment.families[0].name;
    case 'interverncoes':
      return (
        appointment.responsible_appointment_name ||
        appointment.responsible_appointment_two_name
      );
    default:
      return '';
  }
}
