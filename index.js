const axios = require('axios');
const rl = require('readline-sync');
const colors = require('colors');

function rndm(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

let bulunan = 0;
const deneme = rl.question('Kac adet link aransin? ');

if (isNaN(deneme)) {
    console.log('Lutfen bir sayi giriniz!');
    process.exit();
}

async function main() {

    await axios.get(`https://i.hizliresim.com/${rndm(7)}.jpg`).then(async (res) => {
        if (res.status === 200) {
            console.log(`[+] ${res.request.res.responseUrl}`.green);
            bulunan++;
        }
    }).catch(async (err) => {
        if (err.response.status === 404) {
            console.log(`[-] ${err.response.request.res.responseUrl}`.red);
        }
    });

    // await axios.get(`https://i.imgur.com/${rndm(7)}.jpeg`).then(async (res) => {
    //     if (res.status === 200) {
    //         if(res.request.res.responseUrl.includes('removed')) {
    //             console.log(`[-] ${res.request.res.responseUrl}`.red);
    //         } else {
    //             console.log(`[+] ${res.request.res.responseUrl}`.green);
    //             bulunan++;
    //         }
    //     }
    // }).catch(async (err) => {
    //     if (err.response.status === 404) {
    //         console.log(`[-] ${err.response.request.res.responseUrl}`.red);
    //     }
    // });

    if(bulunan >= deneme) {
        process.exit();
    } else {
       await main();
    }
}

(async () => {
    await main();
    await main();
})();