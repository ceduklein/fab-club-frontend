import { parseISO, format } from "date-fns";

export function formatDate(date) {
  const parsedDate = parseISO(date);

  const formatedDate = format(parsedDate, 'dd/MM/yyyy');

  return formatedDate;
}