const menuData = [
  {
    name: "Главная",
    link: "/",
    childItems: [{ name: "О нас", link: "/aboutUs" }],
  },
  {
    name: "Направление",
    childItems: [
      {
        name: "Software",
        link: "/software",
      },
      {
        name: "Hardware",
        link: "/hardware",
      },
      {
        name: "Data Science",
        link: "/data-science",
      },
    ],
  },
  {
    name: "Новости",
    link: "/news",
  },
  {
    name: "Наши участники",
    link: "/members",
  },
];

export { menuData };
