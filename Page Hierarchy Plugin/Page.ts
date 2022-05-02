export class Page {
  name: string;
  children: Page[];

  private constructor() {}

  static create(name: string, children: Page[] | null = null): Page {
    const page = new Page();

    page.name = name;
    page.children = children;

    return page;
  }
}
