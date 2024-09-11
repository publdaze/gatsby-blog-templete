module.exports = {
  siteUrl: 'http://publdaze.github.io/test',
  meta: {
    title: `publdaze의 블로그`,
    description: `publdaze의 블로그입니다.`,
    author: `publdaze`,
  },
  author: {
    name: `publdaze`,
    social: {
      resume: ``, // `https://publdaze.github.io/resume`,
      github: ``, // `https://github.com/publdaze`,
      email: ``, // `publdaze@example.com`,
    },
  },
  introduction: {
    sub: `안녕하세요!`,
    main: {
      start: `핸모밖에 모르는`,
      highlight: `"바보"`,
      end: `김은지입니다.`,
    },
  },
  categories: [
    {
      name: 'Category1',
      subCategories: [
        {
          name: 'Subcategory1',
          href: '/?category=clean_code',
        },
        {
          name: 'Subcategory2',
          href: '/?category=effective_java',
        },
      ],
    },
    { name: 'Category2' },
    {
      name: 'Category3',
      subCategories: [
        {
          name: 'Subcategory3',
          href: '/?category=Git',
        },
      ],
    },
  ],
  comments: {
    utterances: {
      repo: 'publdaze/test',
    },
  },
};
