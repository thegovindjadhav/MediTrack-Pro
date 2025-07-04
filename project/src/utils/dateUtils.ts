import { format, isAfter, isBefore, differenceInDays } from 'date-fns';

export const formatDate = (date: string | Date): string => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), 'MMM dd, yyyy HH:mm');
};

export const isDatePast = (date: string | Date): boolean => {
  return isBefore(new Date(date), new Date());
};

export const isDateFuture = (date: string | Date): boolean => {
  return isAfter(new Date(date), new Date());
};

export const getDaysUntilDate = (date: string | Date): number => {
  return differenceInDays(new Date(date), new Date());
};

export const getContractStatus = (endDate: string): 'Active' | 'Expired' | 'Expiring Soon' => {
  const daysUntilExpiry = getDaysUntilDate(endDate);
  
  if (daysUntilExpiry < 0) {
    return 'Expired';
  } else if (daysUntilExpiry <= 30) {
    return 'Expiring Soon';
  } else {
    return 'Active';
  }
};