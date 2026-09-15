export class PlainJsObject {
  convertToDate(dateString: string) {
    let d = dateString.split("/");
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return dat;     
  }
}