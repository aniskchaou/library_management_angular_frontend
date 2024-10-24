export default class Member {
  id: number;            // Unique identifier for the member
  surname: string;       // Member's surname
  firstname: string;     // Member's first name
  user_type: string;     // Type of user (e.g., Normal, Admin)
  type_id: string;       // Identifier for the type of member (e.g., Student, Regular)
  email: string;         // Member's email address
  mobile: string;        // Member's mobile phone number
  password: string;      // Member's password (consider encryption for security)
  address: string;       // Member's physical address
  dob: Date;             // Member's date of birth
  gender: string;        // Member's gender (e.g., Male, Female, Other)
  status: string;        // Current status of the member (e.g., Active, Inactive)

  constructor(
    id: number,
    surname: string,
    firstname: string,
    user_type: string,
    type_id: string,
    email: string,
    mobile: string,
    password: string,
    address: string,
    dob: Date,
    gender: string,
    status: string
  ) {
    this.id = id;
    this.surname = surname;
    this.firstname = firstname;
    this.user_type = user_type;
    this.type_id = type_id;
    this.email = email;
    this.mobile = mobile;
    this.password = password;
    this.address = address;
    this.dob = dob;
    this.gender = gender;
    this.status = status;
  }
}
