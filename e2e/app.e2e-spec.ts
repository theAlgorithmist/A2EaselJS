import { GraphMarkerPage } from './app.po';

describe('graph-marker App', function() {
  let page: GraphMarkerPage;

  beforeEach(() => {
    page = new GraphMarkerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
