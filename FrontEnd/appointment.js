function doPost(e) {
    var sheet = SpreadsheetApp.openById('1lV1Gf2LKBTASPzAPYnfDu1s18p5lBAx2c-CmpImy8q4').getActiveSheet();
    var firstName = e.parameter.first_name;
    var lastName = e.parameter.last_name;
    var contact = e.parameter.contact;
    var message = e.parameter.message;
    var dateFrom = e.parameter.date_from;
    var dateEnd = e.parameter.date_end;
  
    sheet.appendRow([firstName, lastName, contact, message, dateFrom, dateEnd]);
    return ContentService.createTextOutput('Form submitted successfully!').setMimeType(ContentService.MimeType.TEXT);
  }
  