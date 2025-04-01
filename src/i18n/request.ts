import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const isValidLocale = (locale: string): locale is "en" | "ru" | "kz" => {
  return routing.locales.includes(locale as "en" | "ru" | "kz");
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !isValidLocale(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
