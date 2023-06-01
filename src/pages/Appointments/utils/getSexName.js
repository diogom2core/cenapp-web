export function getSexName(sex) {
  switch (sex) {
    case 'm':
      return 'Masculino';
    case 'f':
      return 'Feminino';
    case 'i':
      return 'Indiferente';
    default:
      return '';
  }
}
