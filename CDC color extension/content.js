const frameName = "myframe"; // Replace with the name of your iframe
const targetFrame = window.frames[frameName]; //Access the frame by its name
var templateXPath = "/html/body/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td/div[2]/div[3]/div[3]/div/table/tbody/tr[{number}]/td[12]";
const startNumber = 2;
const endNumber = 500;
const greenColor = '#a5fc03'; //green
const redColor = '#fc2403'; //red 
const boxColor = '#cccccc';
var intervalID = setInterval(myFunction, 100);

// Function to generate Xpath Expressions from template
function generateXPathExpressions(templateXPath, startNumber, endNumber) {
  var xpaths = [];

  for (var i = startNumber; i <= endNumber; i++) {
    var xpath = templateXPath.replace('{number}', i);
    xpaths.push(xpath.trim());
  }

  return xpaths;
}

// Get element date and time from text content 
function getElementDateTimeFromText(timeTextContent) {

  // Parse the time text and create a Date object
  var parts = timeTextContent.split(/[- :]/);
  var year = parseInt(parts[2], 10);
  var month = parseInt(parts[1], 10) - 1; // Months are zero-based in JavaScript
  var day = parseInt(parts[0], 10);
  var hour = parseInt(parts[3], 10);
  var minute = parseInt(parts[4], 10);
  var elementDateTime = new Date(year, month, day, hour, minute);
  return elementDateTime;
}

// selecting all the elements in which i want color change
function selectedElements(element) {
  var array = [];

  array.push(element); //current element (resumen upload end)
  var previousElement = element.previousElementSibling; 
  array.push(previousElement); // (resume upload start)
  previousElement = previousElement.previousElementSibling;
  array.push(previousElement); // (Application status)
  previousElement = previousElement.previousElementSibling;
  array.push(previousElement); // (Application Details)
  previousElement = previousElement.previousElementSibling;
  array.push(previousElement); // (Application Details)
  previousElement = previousElement.previousElementSibling;
  array.push(previousElement); // (Application Details)
  //previousElement = previousElement.previousElementSibling.previousElementSibling.previousElementSibling; 
  
  previousElement = previousElement.previousElementSibling;
  array.push(previousElement); // Apply/Acceptance
  previousElement = previousElement.previousElementSibling;
  array.push(previousElement); // Apply/Acceptance
  // previousElement = previousElement.previousElementSibling.previousElementSibling;
  previousElement = previousElement.previousElementSibling;
  array.push(previousElement); // PPT
  previousElement = previousElement.previousElementSibling;
  array.push(previousElement); // Additional Details
  previousElement = previousElement.previousElementSibling;
  array.push(previousElement); // Company
  previousElement = previousElement.previousElementSibling;

  return array;
}

// Compare the two time values and change background color accordingly
function changeColor(element, elementDateTime, currentDateTime) {
  var changeColorElement = selectedElements(element);

  for (var i = 0; i < changeColorElement.length; i++) {
    if (elementDateTime > currentDateTime) {
      changeColorElement[i].style.backgroundColor = greenColor; 
      changeColorElement[i].style.borderColor = boxColor; 

    } else {
      changeColorElement[i].style.backgroundColor = redColor; 
      changeColorElement[i].style.borderColor = boxColor; 
    }
  }
}


// mainFunction

function myFunction() {

 
  var generatedXPaths = generateXPathExpressions(templateXPath, startNumber, endNumber);
  
  for (var i = 0; i < generatedXPaths.length; i++) {


    var xpath = generatedXPaths[i];
    var element = targetFrame.document.evaluate(xpath, targetFrame.document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var timeText = element.textContent;

    // Get deadline date and time
    var elementDateTime = getElementDateTimeFromText(timeText);

    // Get the current date and time
    var currentDate = new Date();
    var currentDateTime = currentDate.getTime();

    // Change Color
    changeColor(element, elementDateTime, currentDateTime);
  }

} // Delay of 0.1 seconds (100 milliseconds)


// Clear the interval after a certain time or condition
setTimeout(function () {
  clearInterval(intervalID);
}, 30000); // Stop after 30 seconds

