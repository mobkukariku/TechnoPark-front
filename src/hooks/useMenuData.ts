import { useTranslations } from "next-intl";

const useMenuData = () => {
  const t = useTranslations("HeaderMenu");

  return [
    {
      name: t("home"),
      link: "/",
      childItems: [{ name: t("aboutus"), link: "/aboutUs" }],
    },
    {
      name: t("direction"),
      childItems: [
        {
          name: "Software",
          link: "/software",
        },
        {
          name: "Hardware", // Same here
          link: "/hardware",
        },
      ],
    },
    {
      name: t("news"),
      link: "/news",
    },
    {
      name: t("members"),
      link: "/members",
    },
  ];
};

export default useMenuData;
