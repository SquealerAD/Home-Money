
export class User {

  constructor(
    public email : string,
    public password : string,
    public name : string,
    public id? : number // when using ? inside
    // constructors param list this field becomes
    // optional
  ){}

}
