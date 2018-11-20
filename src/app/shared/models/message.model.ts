export class Message {
  constructor(public type : string, public text : string){

  }

  setMessage(type : string, text : string){
    this.text = text;
    this.type = type;
  }
}
