// const homepagePath = 'E:/Documents/scripts/homepage';
const prompt = require('prompt');
const fs = require('fs');

main();

async function main() {
  prompt.message = "\n\n\n";
  prompt.delimiter = blueString("\n--------------\n");
  prompt.get({
    properties: {
      site: {
        pattern: /pixel|cgdm/,
        required: true,
        default: "cgdm",
        description: yellowString(`For which site? (${blueString("pixel")} ${yellowString("or")} ${blueString("cgdm")}${yellowString(")")}`)
      },
      title: {
        required: true,
        description: yellowString("Article title"),
      },
      folderName: {
        required: true,
        description: yellowString("Which folder to use? It will be the url too")
      },
      blurb: {
        required: false,
        description: yellowString("Short description to display on the article header")
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
  const {site, title, folderName, blurb} = data;

  if(!site || !title || !folderName) {
    logRed("Missing something!");
    logRed(JSON.stringify(data));
  }

  const configFileName = site === "pixel" ? "config-pixel.json" : "config-cgdm.json";
  const configFilePath = `./${configFileName}`;

  const rawJson = fs.readFileSync(configFilePath);
  const config = await JSON.parse(rawJson);
  const articles = config.articles;

  if(articles.find((article) => {return article.id === folderName})) {
    logRed(`${folderName} already exists`);
    return;
  }

  fs.mkdirSync(`./articles/${folderName}`);
  fs.writeFileSync(`./articles/${folderName}/template.html`, getHtmlTemplate(folderName));
  articles.push(		{
    "title": title,
    "id": folderName,
    "date": Date.now()
  })
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));

  console.log("");
  logGreen("-----------------------------------------------------------------------------")
  console.log("");
  logGreen("Finished creating folder and template for /"+folderName);
  console.log("");
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
  <cg-diapo />

  <cg-header id="${id}" />

  <div class="article-content">
  
    <p>Write your stuff here</p>
  
  </div>
</div>`)
}