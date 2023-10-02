export class User{
    public password: string;
    public lastName: string;
    public firstName: string;
    public userName : string;
    public email: string
    public confirmPassword: string
    public contactNumber: string
    
 
    constructor (userName : string, password: string,
        firstName: string,
        lastName : string,
        email: string,
        confirmPassword: string,
        contactNumber: string){
                     this.userName=userName
                     this.password=password;
                     this.firstName=firstName;
                     this.lastName=lastName;
                     this.email=email
                    this.confirmPassword=confirmPassword
                    this.contactNumber=contactNumber
                 }
 }