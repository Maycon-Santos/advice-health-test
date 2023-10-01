export function getDateColorByDayLate(date) {
  const dateCopy = new Date(date.getTime());
  const dateNow = new Date();

  dateCopy.setHours(0, 0, 0, 0);
  dateNow.setHours(0, 0, 0, 0);

  const diffTime = dateNow - dateCopy;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return "text-body-secondary";
  }

  if (diffDays >= 15) {
    return "text-danger";
  }

  if (diffDays === 0) {
    return "text-body";
  }

  return "text-warning";
}

export function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
