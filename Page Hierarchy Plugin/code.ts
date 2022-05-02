import { Page } from "./Page";

const SPACER = '#';
const SPACER_REGEX = /^\#{1,}/;

const pages = [
  Page.create('Cover'),
  Page.create('Designs', [
    Page.create('Version 1'),
    Page.create('Version 2', [
      Page.create('Defined'),
      Page.create('Ongoing'),
    ]),
  ]),
  Page.create('Toolbox', [
    Page.create('Components'),
    Page.create('Fav Icons'),
    Page.create('Assets'),
  ]),
  Page.create('Discovery'),
  Page.create('References'),
  Page.create('Graveyard'),
]

const init = () => {
  pages.forEach(({name, children}) => addChildren(createFigmaPage(`${SPACER} ${name}`), children));
  // Notify that the process ended
  figma.notify('Generated Page Structure Successfully!');
  // Once create all pages, close the plugin
  figma.closePlugin();
};

const createFigmaPage = (name: string) => {
  const page = figma.createPage();
  page.name = name;
  return page;
}

const addChildren = (parentPage: PageNode, children: Page[]) => (children || []).forEach(({name, children}) => {
  // Pluck parent spacer. In case undefined, have a whitespace
  const [parentSpace = ''] = SPACER_REGEX.exec(parentPage.name);
  // Set children page with parent spacer + defined spacer + name
  const childrenPage = createFigmaPage(`${parentSpace + SPACER} ${name}`);
  // In case have children, goes down recursivelly
  if (children) addChildren(childrenPage, children);
});

init();
