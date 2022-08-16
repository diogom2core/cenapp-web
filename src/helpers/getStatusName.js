function getStatusName(statusName) {
  switch (statusName) {
    case 'pedding':
      return 'Pendente';
    case 'scheduled':
      return 'Agendado';
    case 'canceled':
      return 'Cancelado';
    case 'interviewed':
      return 'Fez entrrevista';
    case 'not_interview':
      return 'Não Fez entrrevista';
    case 'service_started':
      return 'Iniciou atendimento';
    case 'not_service_started':
      return 'Não Iniciou atendimento';
    default:
      return '';
  }
}

export default getStatusName;
