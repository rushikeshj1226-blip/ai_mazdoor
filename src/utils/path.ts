// Static builds emit /about.html; strip the extension and trailing slash so URLs stay clean.
export const cleanPath = (pathname: string) =>
  pathname.replace(/(\/index)?\.html$/, '').replace(/\/$/, '') || '/';
