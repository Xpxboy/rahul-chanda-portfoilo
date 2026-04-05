import https from 'https';

https.get('https://rahulchandaphoto.myportfolio.com/food-photoshot', (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    const regex = /<img[^>]+src="([^">]+)"/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      console.log(match[1]);
    }
    
    // Also check for data-src
    const regex2 = /<img[^>]+data-src="([^">]+)"/g;
    while ((match = regex2.exec(data)) !== null) {
      console.log(match[1]);
    }
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
