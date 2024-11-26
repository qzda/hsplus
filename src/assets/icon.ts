const icons = {
  // https://icones.netlify.app/collection/tabler?s=world

  default:
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m.6-3h16.8M3.6 15h16.8"/><path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 0 18"/></g></svg>',
  // bolt: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20.985 12.52a9 9 0 1 0-7.52 8.36M3.6 9h16.8M3.6 15h10.9"/><path d="M11.5 3a17 17 0 0 0 0 18m1-18c2.313 3.706 3.07 7.856 2.27 12M19 16l-2 3h4l-2 3"/></g></svg>',
  // cancel:
  //   '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M21 12a9 9 0 1 0-8.985 9M3.6 9h16.8M3.6 15h9.9"/><path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 2.53 10.275M16 19a3 3 0 1 0 6 0a3 3 0 1 0-6 0m1 2l4-4"/></g></svg>',
  // check:
  //   '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20.946 12.99a9 9 0 1 0-9.46 7.995M3.6 9h16.8M3.6 15h13.9"/><path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 2.311 12.001M15 19l2 2l4-4"/></g></svg>',
  // code: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20.942 13.02a9 9 0 1 0-9.47 7.964M3.6 9h16.8M3.6 15h9.9"/><path d="M11.5 3a17 17 0 0 0 0 18m1-18c2 3.206 2.837 6.913 2.508 10.537M20 21l2-2l-2-2m-3 0l-2 2l2 2"/></g></svg>',
  // download:
  //   '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M21 12a9 9 0 1 0-9 9M3.6 9h16.8M3.6 15H12"/><path d="M11.578 3a17 17 0 0 0 0 18M12.5 3c1.719 2.755 2.5 5.876 2.5 9m3 2v7m-3-3l3 3l3-3"/></g></svg>',
  // upload:
  //   '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M21 12a9 9 0 1 0-9 9M3.6 9h16.8M3.6 15H12"/><path d="M11.578 3a17 17 0 0 0 0 18M12.5 3c1.719 2.755 2.5 5.876 2.5 9m3 9v-7m3 3l-3-3l-3 3"/></g></svg>',
  // x: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20.929 13.131A9 9 0 1 0 11.998 21M3.6 9h16.8M3.6 15h9.9"/><path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 2.505 10.573M22 22l-5-5m0 5l5-5"/></g></svg>',
  // question:
  //   '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20.975 11.33a9 9 0 1 0-5.673 9.043M3.6 9h16.8M3.6 15h9.9"/><path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 2.57 9.518m-1.056 5.403A17 17 0 0 1 12.5 21m6.5 1v.01M19 19a2.003 2.003 0 0 0 .914-3.782a1.98 1.98 0 0 0-2.414.483"/></g></svg>',
} as const;

export default icons;
