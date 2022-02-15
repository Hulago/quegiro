import { useStorage } from '@quegiro/next';
import { formatToTimeZone, parseFromTimeZone } from 'date-fns-timezone';

let currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const useTimezone = (appName: string) => {
  const storage = useStorage(appName);

  const getCurrentTimezone = async () => {
    // get timezone from storage
    currentTimezone = await storage.getItem('currentTimezone');

    if (currentTimezone === null) {
      // if not found from storage validate if navigator lang match a supported language
      currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    return currentTimezone;
  };

  const setCurrentTimezone = async (timezone: string) => {
    currentTimezone = timezone;
    await storage.setItem('currentTimezone', timezone);

    return currentTimezone;
  };

  const parseTZ = (date: string, format = 'yyyy-MM-dd HH:mm', tz?: string) => {
    parseFromTimeZone(date, format, { timeZone: tz || currentTimezone });
  };

  const formatTZ = (date: Date, format = 'yyyy-MM-dd HH:mm', tz?: string) => {
    formatToTimeZone(date, format, { timeZone: tz || currentTimezone });
  };

  return {
    formatTZ,
    getCurrentTimezone,
    parseTZ,
    setCurrentTimezone
  };
};
