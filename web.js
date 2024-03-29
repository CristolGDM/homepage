// const homepagePath = 'E:/Documents/scripts/homepage';
const prompt = require('prompt');
const fs = require('fs');
const open = require('open');

main();

async function main() {
  prompt.message = "\n\n\n";
  prompt.delimiter = blueString("\n--------------\n");
  prompt.get({
    properties: {
      site: {
        pattern: /pixel|cgdm|both/,
        required: true,
        default: "cgdm",
        description: yellowString(`For which site? ( ${blueString("pixel")} ${yellowString("/")} ${blueString("cgdm")} ${yellowString("/")} ${blueString("both")} ${yellowString(")")}`)
      },
      title: {
        required: true,
        description: yellowString("Article title"),
      },
      blurb: {
        required: false,
        description: yellowString("Blurb to display on the article header")
      },
      folderName: {
        required: true,
        description: yellowString("Which folder to use? It will be the url too")
      },
      imageSearch: {
        required: false,
        description: yellowString("Search for an image?")
      }
    }
  }, (err, result) => {
    if(err) {
      console.log(redString("-------------------------------------------------------"));
      console.log(redString("Error happened"));
      console.log(redString(err));
      return;
    }
    processEnteredData(result);
  })
};

async function processEnteredData(data) {
  const {site, title, folderName, imageSearch} = data;

  if(!site || !title || !folderName) {
    logRed("Missing something!");
    logRed(JSON.stringify(data));
  }

  const cristolConfig = "config-cgdm.json";
  const pixelConfig = "config-pixel.json";

  if(site !== "pixel") {
    await addArticleToConfig(cristolConfig, data)
  }
  if(site !== "cgdm") {
    await addArticleToConfig(pixelConfig, data)
  }
  
  fs.mkdirSync(`./articles/${folderName}`);
  fs.writeFileSync(`./articles/${folderName}/template.html`, getHtmlTemplate(folderName));

  console.log("");
  logGreen("-----------------------------------------------------------------------------")
  console.log("");
  logGreen("Finished creating folder and template for /"+folderName);
  console.log("");

  open(`./articles/${folderName}/template.html`, {app: {name: "C:\\Users\\Cristol\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe"}});
  await new Promise(resolve => setTimeout(resolve, 3000));
  if(imageSearch) {
    open(`https://www.google.com/search?q=${imageSearch.replace(/\s/g, "+")}&tbm=isch`)
  }
}

async function addArticleToConfig(configFileName, data) {
  const {title, folderName, blurb} = data;
  const configFilePath = `./${configFileName}`;

  const rawJson = fs.readFileSync(configFilePath);
  const config = await JSON.parse(rawJson);
  const articles = config.articles;

  if(articles.find((article) => {return article.id === folderName})) {
    logRed(`${folderName} already exists`);
    return;
  }

  const hasBlurb = blurb ? {blurb} : {};

  articles.push(		{
    "title": title,
    "id": folderName,
    "date": Date.now(),
    ...hasBlurb
  })
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
}

function redString(string) {
	return `\x1b[91m${string}\x1b[0m`
}

const logRed = (string) => {console.log(redString(string))};
const logBlue = (string) => {console.log(blueString(string))};
const logYellow = (string) => {console.log(yellowString(string))};
const logGreen = (string) => {console.log(greenString(string))};

function blueString(string) {
	return `\x1b[96m${string}\x1b[0m`
}

function greenString(string) {
	return `\x1b[92m${string}\x1b[0m`
}

function yellowString(string) {
	return `\x1b[93m${string}\x1b[0m`
}

function getHtmlTemplate(id) {
  return (`<div class="article">
  <cg-diapo></cg-diapo>
  <-- header_portrait is 400x400 -->
  <-- header_small is (width)x400 -->

  <cg-header id="${id}"></cg-header>

  <div class="article-content">
  
    <p>Write your stuff here</p>
    <cg-figure src="image.webp" caption="My image"></cg-figure>
  
  </div>
</div>`)
}