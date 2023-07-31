function getServiceTypeName(statusName) {
  switch (statusName) {
    case 'adultos':
      return 'Adultos';
    case 'idosos':
      return 'Idosos';
    case 'criancas':
      return 'Crianças';
    case 'adolescentes':
      return 'Adolescentes';
    case 'casais':
      return 'Casal';
    case 'familias':
      return 'Famílias';
    case 'interverncoes':
      return 'Intervenções precoce';
    default:
      return '';
  }
}

export default getServiceTypeName;
