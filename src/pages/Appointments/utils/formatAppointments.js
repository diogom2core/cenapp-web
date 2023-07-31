import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import { getAppoitmentResponsibleName } from '../../../helpers/getAppoitmentResponsibleName';
import { getAppoitmentResponsibleEmail } from '../../../helpers/getAppoitmentResponsibleEmail';
import { getShift } from '../../../utils/getShift';

export function formatAppointments(appointments) {
  return appointments.map((appointmentItem) => ({
    ...appointmentItem,
    name: getAppoitmentResponsibleName(appointmentItem),
    email: getAppoitmentResponsibleEmail(appointmentItem),
    createdFormatted: format(
      parseISO(appointmentItem.created_at),
      'dd/MM/yyyy',
      {
        locale: pt,
      },
    ),
    status: appointmentItem && [appointmentItem.status],
    preference_service_type: appointmentItem.preference_service_type,
    analyst: appointmentItem.analyst
      ? appointmentItem.analyst.name
      : 'Sem analista',
    have_bond_spbsb: appointmentItem.have_bond_spbsb ? 'Sim' : 'Não',
    time_preferences: getShift({
      afternoon_service: appointmentItem.preference_afternoon_service,
      morning_service: appointmentItem.preference_morning_service,
      night_service: appointmentItem.preference_night_service,
    }),
    preference_service_modality: appointmentItem.preference_service_modality,
  }));
}
