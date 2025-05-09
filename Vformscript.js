function doPost(e) {
  const sheet = SpreadsheetApp.openById('1OU7qxTRRafN0Ww-F5dJT0Rox7aJK0dqvndRuVV0oSvw').getSheetByName('volunteerForm');
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),                          // Timestamp
    data.name || '',
    data.phone || '',
    data.email || '',
    (data.contact || []).join(', '),
    (data.frequency || []).join(', '),
    (data.days || []).join(', '),
    (data.times || []).join(', '),
    (data.roles || []).join(', '),
    data.role_other || '',
    data.experience || '',
    data.languages || '',
    data.signature || '',
    data.date || '',
    data.printed_name || ''
  ]);

  return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}


