import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all messages that are supported
  locales: ["en", "ru", "kz"],

  // Used when no locale matches
  defaultLocale: "en",
});
