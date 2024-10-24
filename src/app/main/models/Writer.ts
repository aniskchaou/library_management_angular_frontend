export default class Writer {
  id: number;
  name: string;
  note: string;
  dateOfBirth: Date | null;
  died: boolean;
  dateOfDeath: Date | null;
  publications: string;
  bio: string;
  award: string;
  references: string;

  constructor(
    id: number,
    name: string,
    note: string,
    dateOfBirth: Date | null,
    died: boolean,
    dateOfDeath: Date | null,
    publications: string,
    bio: string,
    award: string,
    references: string
  ) {
    this.id = id;
    this.name = name;
    this.note = note;
    this.dateOfBirth = dateOfBirth;
    this.died = died;
    this.dateOfDeath = dateOfDeath;
    this.publications = publications;
    this.bio = bio;
    this.award = award;
    this.references = references;
  }
}
