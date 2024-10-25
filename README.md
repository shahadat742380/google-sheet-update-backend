## Sheet update app.


### write this function  in google sheet App Script...

```bash
const sheets = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1vS3yxSmpCggX4ksjAriF9JIvS5jNayYDvTa1wU1N5po/edit?gid=0#gid=0");
const sheet = sheets.getSheetByName("sheet-update");

function doPost(e) {
let data = e.parameter;
sheet.appendRow([data.user_name, data.email, data.dob, data.phone]);
return ContentService.createTextOutput("Success");
}
```
