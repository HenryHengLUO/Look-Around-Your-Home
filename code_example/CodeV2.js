/**#####################################
 * Sets up server-side HTML environment
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile("Index").setXFrameOptionsMode(
    HtmlService.XFrameOptionsMode.ALLOWALL
  );
}

// function t(){
//   const latitude = 22.2485255;
//   const longitude = 114.1501576;
//   const range = 0.002;
//   let request = [latitude,longitude,range].join('/');

// getCameraFromWebAPP(request );
// }

function getCameraFromWebAPP(element) {
  const request = element.split("/");
  Logger.log(request);
  if (request.length == 3) {
    const latitude = parseFloat(request[0]);
    const longitude = parseFloat(request[1]);
    const range = parseFloat(request[2]);
    const result = calculateCamera(latitude, longitude, range);
    if (result.length > 1) {
      const cameralist = result
        .map((e) => '<img src="' + e[2] + '"> <br> ')
        .join("");
      Logger.log(cameralist);
      return cameralist;
    } else {
      let answer =
        '<span style="color:red">There is no result for your request!</span>';
      return answer;
    }
  } else {
    let answer = `<span style="color:red">Your type information is missing!!!</span>`;
    return answer;
  }
}

function calculateCamera(latitude, longitude, range) {
  const cameraBD = "URL";
  const ss = SpreadsheetApp.openByUrl(cameraBD);
  const sheet = ss.getSheets()[0];
  const lastrow = sheet.getDataRange().getLastRow();
  const valuesall = sheet.getRange(2, 7, lastrow - 1, 3).getValues();
  // Logger.log(valuesall[0].toString());
  const check = valuesall.filter(function (elem) {
    return (elem[0] - latitude) ** 2 + (elem[1] - longitude) ** 2 <= range ** 2;
  });
  Logger.log(check);
  return check;
}

/*notificaiton functions will updated soon!*/

/*the code can be run in Node.js.
in short future, Node.js version will be released. And the code will be updated.
*/
