export function getServicesType(preference) {
  const {
    service_type_adult,
    service_type_elderly,
    service_type_children,
    service_type_adolescent,
    service_type_couple,
    service_type_family,
    service_type_early_interventions,
  } = preference;

  const result = [];

  if (service_type_adult) {
    result.push('Adultos');
  }

  if (service_type_elderly) {
    result.push('Idosos');
  }

  if (service_type_children) {
    result.push('Crianças');
  }

  if (service_type_adolescent) {
    result.push('Adolecentes');
  }

  if (service_type_couple) {
    result.push('Casais');
  }

  if (service_type_family) {
    result.push('Famílias');
  }

  if (service_type_early_interventions) {
    result.push('Intervenção precoce');
  }

  return result.join(', ');
}
