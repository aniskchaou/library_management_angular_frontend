import CatalogItem from './Book';
import CirculationStatus from './CirculationStatus';
import Member from './Member';
import Writer from './Writer';

export default class Circulation {
  id: number;
  memberName: Member;
  catalogItemName: CatalogItem;
  writer: Writer;
  issueDate: string;
  lastDate: string;
  toReturn: string;
  returnDate: string;
  penalty: string;
  returnStatus: CirculationStatus;

  constructor(
    id: number,
    memberName: Member,
    bookName: CatalogItem,
    writer: Writer,
    issueDate: string,
    lastDate: string,
    toReturn: string,
    returnDate: string,
    penalty: string,
    returnStatus: CirculationStatus
  ) {
    this.id = id;
    this.memberName = memberName;
    this.catalogItemName = bookName;
    this.writer = writer;
    this.issueDate = issueDate;
    this.lastDate = lastDate;
    this.toReturn = toReturn;
    this.returnDate = returnDate;
    this.penalty = penalty;
    this.returnStatus = returnStatus;
  }
}
