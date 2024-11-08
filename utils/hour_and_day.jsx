// utils/hoursAndDay.js
import { addDays, format, isToday } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

// Función para obtener el día de la semana de una fecha específica
export const getDayOfWeek = (date, locale = 'es') => {
  return format(date, 'EEEE', { locale: locale === 'es' ? es : enUS });
};

// Función para verificar si una fecha es hoy
export const isDateToday = (date) => {
  return isToday(date);
};

// Función para obtener el día de mañana
export const getTomorrow = () => {
  return addDays(new Date(), 1);  // Usa la fecha actual sin ajustar a ninguna zona horaria
};

// Función para formatear la hora
export const formatHour = (date, locale = 'es') => {
  return format(date, 'p', { locale: locale === 'es' ? es : enUS });
};
