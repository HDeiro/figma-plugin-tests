(async () => {
  figma.showUI(__html__, {
    title: 'Test Plugin!',
    height: 500,
    width: 500
  });

  const [selection] = figma.currentPage.selection;

  if (selection.type !== 'TEXT') {
    return figma.closePlugin('Please select some text layer and re-run the plugin');
  }

  // Load fonts since it'll prolly be needed for changing cases
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });

  const utils = {
    changeFontSize: (item: TextNode, size: number) => {
      const current = item.fontSize as number;
      item.fontSize = current + size;
    },
    changeSolidColor: (item: TextNode, r = 0, g = 0, b = 0) => {
      item.setRangeFills(0, item.characters.length, [{
        color: { r, g, b },
        type: 'SOLID',
      }]);
    }
  }

  const actions = {
    makeUppercase: (item: TextNode) => item.characters = item.characters.toUpperCase(),
    makeLowercase: (item: TextNode) => item.characters = item.characters.toLowerCase(),
    makeCapital: (item: TextNode) => {
      const parsedText = (actions.makeLowercase(item) || '')
        .split(' ')
        .map(slice => slice[0].toUpperCase() + slice.substring(1))
        .join(' ');

      item.characters = parsedText;
    },
    makeRed: (item: TextNode) => utils.changeSolidColor(item, 1),
    makeBlack: (item: TextNode) => utils.changeSolidColor(item, 0),
    increaseFontSize: (item: TextNode) => utils.changeFontSize(item, 10),
    decreaseFontSize: (item: TextNode) => utils.changeFontSize(item, -10),
  }

  console.log(selection.fontSize);

  figma.ui.postMessage({
    id: selection.id,
    text: selection.name,
  });

  figma.ui.onmessage = ({type}) => {
    if (!type) return;
    const callback = actions[type];
    if (callback) callback(selection);
  }
})();
