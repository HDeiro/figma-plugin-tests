const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

(async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });

  // Get random cat fact
  // TS was complaining about json not being in FetchResponse. Since it's just a test, I workarounded it =p
  const responseText = await (await fetch('https://cat-fact.herokuapp.com/facts/random?animal_type=cat')).text();
  const responseJson = JSON.parse(responseText);

  const txt = figma.createText();

  txt.characters = responseJson.text;
  txt.x = randomIntFromInterval(0, 200);
  txt.y = randomIntFromInterval(0, 200);
  txt.fontSize = 16;

  figma.closePlugin("Text added successfully");
})();
