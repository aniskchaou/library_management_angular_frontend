'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// Library Lab — Demo Mock Data
// All data is static / in-memory. Nothing is persisted.
// ─────────────────────────────────────────────────────────────────────────────

const categories = [
  { id: 1, categoryName: 'Fiction' },
  { id: 2, categoryName: 'Science' },
  { id: 3, categoryName: 'History' },
  { id: 4, categoryName: 'Technology' },
  { id: 5, categoryName: 'Biography' },
  { id: 6, categoryName: 'Reference' },
];

const writers = [
  { id: 1, writerName: 'F. Scott Fitzgerald', nationality: 'American' },
  { id: 2, writerName: 'Harper Lee',           nationality: 'American' },
  { id: 3, writerName: 'George Orwell',         nationality: 'British'  },
  { id: 4, writerName: 'Stephen Hawking',       nationality: 'British'  },
  { id: 5, writerName: 'Yuval Noah Harari',     nationality: 'Israeli'  },
  { id: 6, writerName: 'Robert C. Martin',      nationality: 'American' },
  { id: 7, writerName: 'Carl Sagan',            nationality: 'American' },
  { id: 8, writerName: 'Jared Diamond',         nationality: 'American' },
  { id: 9, writerName: 'Walter Isaacson',       nationality: 'American' },
  { id: 10, writerName: 'Richard Dawkins',      nationality: 'British'  },
  { id: 11, writerName: 'Sun Tzu',              nationality: 'Chinese'  },
  { id: 12, writerName: 'Andrew Hunt',          nationality: 'American' },
];

const publishers = [
  { id: 1, publisherName: 'Scribner',      address: 'New York, USA'       },
  { id: 2, publisherName: 'HarperCollins', address: 'London, UK'          },
  { id: 3, publisherName: 'Penguin Books', address: 'New York, USA'       },
  { id: 4, publisherName: 'MIT Press',     address: 'Cambridge, USA'      },
  { id: 5, publisherName: 'Bantam Books',  address: 'New York, USA'       },
  { id: 6, publisherName: 'Oxford Press',  address: 'Oxford, UK'          },
];

const mediaTypes = [
  { id: 1, type: 'Book',      description: 'Physical book'            },
  { id: 2, type: 'eBook',     description: 'Electronic book'          },
  { id: 3, type: 'DVD',       description: 'Digital video disc'       },
  { id: 4, type: 'Magazine',  description: 'Periodical publication'   },
  { id: 5, type: 'Journal',   description: 'Academic journal'         },
];

const memberTypes = [
  { id: 1, typeName: 'Student',  description: 'University student',       maxBooks: 5,  loanDays: 14 },
  { id: 2, typeName: 'Faculty',  description: 'Teaching / research staff', maxBooks: 10, loanDays: 30 },
  { id: 3, typeName: 'Regular',  description: 'Community member',          maxBooks: 3,  loanDays: 14 },
];

const departments = [
  { id: 1, departmentName: 'Main Library',     location: 'Building A, Floor 1' },
  { id: 2, departmentName: 'Science Section',  location: 'Building B, Floor 2' },
  { id: 3, departmentName: 'Digital Library',  location: 'Building A, Floor 3' },
];

const shelves = [
  { id: 1, shelfName: 'Shelf A1', departement: departments[0] },
  { id: 2, shelfName: 'Shelf A2', departement: departments[0] },
  { id: 3, shelfName: 'Shelf B1', departement: departments[1] },
];

const rows = [
  { id: 1, rowName: 'Row 1', shelf: shelves[0] },
  { id: 2, rowName: 'Row 2', shelf: shelves[0] },
  { id: 3, rowName: 'Row 1', shelf: shelves[1] },
  { id: 4, rowName: 'Row 1', shelf: shelves[2] },
];

const physicalDescriptions = [
  { id: 1, description: 'Standard',    dimensions: '21x14 cm', weight: '300 g' },
  { id: 2, description: 'Large Format', dimensions: '28x21 cm', weight: '500 g' },
  { id: 3, description: 'Pocket',      dimensions: '18x11 cm', weight: '200 g' },
];

const books = [
  {
    id: 1, isbn: '9780743273565', title: 'The Great Gatsby',
    subtitle: 'A Novel', writer: writers[0], edition: '1st', edition_year: '1925',
    number_of_books: '5', photo: 'gatsby.jpg', publisher: publishers[0],
    series: '', size: '21 cm', price: '12.99', call_no: 'FIC GAT', location: 'Shelf A1 / Row 1',
    editor: '', publishing_year: '1925', publication_place: 'New York',
    number_of_pages: '180', source_details: '', notes: 'Classic American novel',
    pdf: '', link: '', category: categories[0], mediaType: mediaTypes[0],
    departement: departments[0], shelf: shelves[0], row: rows[0], bookStatus: 'AVAILABLE',
  },
  {
    id: 2, isbn: '9780061935466', title: 'To Kill a Mockingbird',
    subtitle: '', writer: writers[1], edition: '1st', edition_year: '1960',
    number_of_books: '3', photo: 'mockingbird.jpg', publisher: publishers[1],
    series: '', size: '21 cm', price: '14.99', call_no: 'FIC LEE', location: 'Shelf A1 / Row 2',
    editor: '', publishing_year: '1960', publication_place: 'New York',
    number_of_pages: '281', source_details: '', notes: 'Pulitzer Prize winner',
    pdf: '', link: '', category: categories[0], mediaType: mediaTypes[0],
    departement: departments[0], shelf: shelves[0], row: rows[1], bookStatus: 'AVAILABLE',
  },
  {
    id: 3, isbn: '9780451524935', title: 'Nineteen Eighty-Four',
    subtitle: '', writer: writers[2], edition: '1st', edition_year: '1949',
    number_of_books: '4', photo: '1984.jpg', publisher: publishers[2],
    series: '', size: '21 cm', price: '11.99', call_no: 'FIC ORW', location: 'Shelf A2 / Row 1',
    editor: '', publishing_year: '1949', publication_place: 'London',
    number_of_pages: '328', source_details: '', notes: 'Dystopian masterpiece',
    pdf: '', link: '', category: categories[0], mediaType: mediaTypes[0],
    departement: departments[0], shelf: shelves[1], row: rows[2], bookStatus: 'ISSUED',
  },
  {
    id: 4, isbn: '9780553380163', title: 'A Brief History of Time',
    subtitle: 'From the Big Bang to Black Holes', writer: writers[3], edition: '1st', edition_year: '1988',
    number_of_books: '2', photo: 'hawking.jpg', publisher: publishers[2],
    series: '', size: '24 cm', price: '16.99', call_no: 'SCI HAW', location: 'Shelf B1 / Row 1',
    editor: '', publishing_year: '1988', publication_place: 'London',
    number_of_pages: '212', source_details: '', notes: '',
    pdf: '', link: '', category: categories[1], mediaType: mediaTypes[0],
    departement: departments[1], shelf: shelves[2], row: rows[3], bookStatus: 'AVAILABLE',
  },
  {
    id: 5, isbn: '9780062316097', title: 'Sapiens: A Brief History of Humankind',
    subtitle: '', writer: writers[4], edition: '1st', edition_year: '2011',
    number_of_books: '6', photo: 'sapiens.jpg', publisher: publishers[1],
    series: '', size: '24 cm', price: '19.99', call_no: 'HIS HAR', location: 'Shelf A2 / Row 1',
    editor: '', publishing_year: '2011', publication_place: 'Tel Aviv',
    number_of_pages: '443', source_details: '', notes: 'International bestseller',
    pdf: '', link: '', category: categories[2], mediaType: mediaTypes[0],
    departement: departments[0], shelf: shelves[1], row: rows[2], bookStatus: 'AVAILABLE',
  },
  {
    id: 6, isbn: '9780132350884', title: 'Clean Code',
    subtitle: 'A Handbook of Agile Software Craftsmanship', writer: writers[5], edition: '1st', edition_year: '2008',
    number_of_books: '3', photo: 'cleancode.jpg', publisher: publishers[3],
    series: '', size: '24 cm', price: '45.99', call_no: 'TEC MAR', location: 'Shelf B1 / Row 1',
    editor: '', publishing_year: '2008', publication_place: 'Upper Saddle River',
    number_of_pages: '431', source_details: '', notes: 'Essential for developers',
    pdf: '', link: '', category: categories[3], mediaType: mediaTypes[0],
    departement: departments[1], shelf: shelves[2], row: rows[3], bookStatus: 'AVAILABLE',
  },
  {
    id: 7, isbn: '9780345539434', title: 'Cosmos: A Personal Voyage',
    subtitle: '', writer: writers[6], edition: '1st', edition_year: '1980',
    number_of_books: '2', photo: 'cosmos.jpg', publisher: publishers[4],
    series: '', size: '28 cm', price: '18.99', call_no: 'SCI SAG', location: 'Shelf B1 / Row 1',
    editor: '', publishing_year: '1980', publication_place: 'New York',
    number_of_pages: '365', source_details: '', notes: '',
    pdf: '', link: '', category: categories[1], mediaType: mediaTypes[0],
    departement: departments[1], shelf: shelves[2], row: rows[3], bookStatus: 'ISSUED',
  },
  {
    id: 8, isbn: '9780393317558', title: 'Guns, Germs, and Steel',
    subtitle: 'The Fates of Human Societies', writer: writers[7], edition: '1st', edition_year: '1997',
    number_of_books: '3', photo: 'guns.jpg', publisher: publishers[0],
    series: '', size: '24 cm', price: '17.99', call_no: 'HIS DIA', location: 'Shelf A2 / Row 1',
    editor: '', publishing_year: '1997', publication_place: 'New York',
    number_of_pages: '498', source_details: '', notes: 'Pulitzer Prize winner',
    pdf: '', link: '', category: categories[2], mediaType: mediaTypes[0],
    departement: departments[0], shelf: shelves[1], row: rows[2], bookStatus: 'AVAILABLE',
  },
  {
    id: 9, isbn: '9781451648539', title: 'Steve Jobs',
    subtitle: '', writer: writers[8], edition: '1st', edition_year: '2011',
    number_of_books: '4', photo: 'stevejobs.jpg', publisher: publishers[2],
    series: '', size: '24 cm', price: '22.99', call_no: 'BIO ISA', location: 'Shelf A1 / Row 1',
    editor: '', publishing_year: '2011', publication_place: 'New York',
    number_of_pages: '630', source_details: '', notes: 'Authorized biography',
    pdf: '', link: '', category: categories[4], mediaType: mediaTypes[0],
    departement: departments[0], shelf: shelves[0], row: rows[0], bookStatus: 'AVAILABLE',
  },
  {
    id: 10, isbn: '9780618918249', title: 'The Selfish Gene',
    subtitle: '', writer: writers[9], edition: '30th Anniversary', edition_year: '1976',
    number_of_books: '2', photo: 'selfish.jpg', publisher: publishers[1],
    series: '', size: '21 cm', price: '15.99', call_no: 'SCI DAW', location: 'Shelf B1 / Row 1',
    editor: '', publishing_year: '1976', publication_place: 'Oxford',
    number_of_pages: '360', source_details: '', notes: '',
    pdf: '', link: '', category: categories[1], mediaType: mediaTypes[0],
    departement: departments[1], shelf: shelves[2], row: rows[3], bookStatus: 'AVAILABLE',
  },
  {
    id: 11, isbn: '9781590302255', title: 'The Art of War',
    subtitle: '', writer: writers[10], edition: 'Classic', edition_year: '500BC',
    number_of_books: '7', photo: 'artofwar.jpg', publisher: publishers[5],
    series: '', size: '18 cm', price: '8.99', call_no: 'HIS SUN', location: 'Shelf A2 / Row 1',
    editor: '', publishing_year: '2003', publication_place: 'Oxford',
    number_of_pages: '96', source_details: '', notes: 'Ancient strategy treatise',
    pdf: '', link: '', category: categories[2], mediaType: mediaTypes[0],
    departement: departments[0], shelf: shelves[1], row: rows[2], bookStatus: 'AVAILABLE',
  },
  {
    id: 12, isbn: '9780201616224', title: 'The Pragmatic Programmer',
    subtitle: 'From Journeyman to Master', writer: writers[11], edition: '1st', edition_year: '1999',
    number_of_books: '2', photo: 'pragmatic.jpg', publisher: publishers[3],
    series: '', size: '24 cm', price: '49.99', call_no: 'TEC HUN', location: 'Shelf B1 / Row 1',
    editor: '', publishing_year: '1999', publication_place: 'Reading, MA',
    number_of_pages: '352', source_details: '', notes: '',
    pdf: '', link: '', category: categories[3], mediaType: mediaTypes[0],
    departement: departments[1], shelf: shelves[2], row: rows[3], bookStatus: 'AVAILABLE',
  },
];

const members = [
  {
    id: 1, firstname: 'Alice', surname: 'Johnson',
    email: 'alice@library.demo', primary_email: 'alice@library.demo',
    secondary_email: '', primary_phone: '555-0101', secondary_phone: '',
    mobile: '555-0101', address: '123 Main Street, Cityville',
    user_type: 'Member', userType: 'Member',
    type_id: '1', typeId: '1',
    gender: 'Female', status: 'ACTIVE', dob: '2000-01-15',
  },
  {
    id: 2, firstname: 'Bob', surname: 'Smith',
    email: 'bob@library.demo', primary_email: 'bob@library.demo',
    secondary_email: '', primary_phone: '555-0102', secondary_phone: '',
    mobile: '555-0102', address: '456 Oak Avenue, Townsburg',
    user_type: 'Member', userType: 'Member',
    type_id: '2', typeId: '2',
    gender: 'Male', status: 'ACTIVE', dob: '1985-06-22',
  },
  {
    id: 3, firstname: 'Carol', surname: 'White',
    email: 'carol@library.demo', primary_email: 'carol@library.demo',
    secondary_email: '', primary_phone: '555-0103', secondary_phone: '',
    mobile: '555-0103', address: '789 Elm Street, Villageton',
    user_type: 'Member', userType: 'Member',
    type_id: '3', typeId: '3',
    gender: 'Female', status: 'ACTIVE', dob: '1992-03-10',
  },
  {
    id: 4, firstname: 'David', surname: 'Brown',
    email: 'david@library.demo', primary_email: 'david@library.demo',
    secondary_email: '', primary_phone: '555-0104', secondary_phone: '',
    mobile: '555-0104', address: '321 Pine Road, Hamletburg',
    user_type: 'Member', userType: 'Member',
    type_id: '1', typeId: '1',
    gender: 'Male', status: 'ACTIVE', dob: '2002-09-05',
  },
  {
    id: 5, firstname: 'Emma', surname: 'Davis',
    email: 'emma@library.demo', primary_email: 'emma@library.demo',
    secondary_email: '', primary_phone: '555-0105', secondary_phone: '',
    mobile: '555-0105', address: '654 Maple Lane, Boroughville',
    user_type: 'Member', userType: 'Member',
    type_id: '2', typeId: '2',
    gender: 'Female', status: 'ACTIVE', dob: '1978-11-30',
  },
  {
    id: 6, firstname: 'Frank', surname: 'Wilson',
    email: 'frank@library.demo', primary_email: 'frank@library.demo',
    secondary_email: '', primary_phone: '555-0106', secondary_phone: '',
    mobile: '555-0106', address: '987 Cedar Court, Districtfield',
    user_type: 'Member', userType: 'Member',
    type_id: '3', typeId: '3',
    gender: 'Male', status: 'INACTIVE', dob: '1995-07-18',
  },
];

const circulationStatuses = [
  { id: 1, name: 'ISSUED',   description: 'Book issued to member'        },
  { id: 2, name: 'RETURNED', description: 'Book returned'                 },
  { id: 3, name: 'OVERDUE',  description: 'Return is overdue'             },
];

const circulations = [
  {
    id: 1, memberName: members[0], catalogItemName: books[0], writer: writers[0],
    issueDate: '2026-05-01', lastDate: '2026-05-15', toReturn: '2026-05-15',
    returnDate: null, penalty: '0', returnStatus: circulationStatuses[0],
  },
  {
    id: 2, memberName: members[1], catalogItemName: books[2], writer: writers[2],
    issueDate: '2026-05-05', lastDate: '2026-06-05', toReturn: '2026-06-05',
    returnDate: null, penalty: '0', returnStatus: circulationStatuses[0],
  },
  {
    id: 3, memberName: members[2], catalogItemName: books[4], writer: writers[4],
    issueDate: '2026-04-10', lastDate: '2026-04-24', toReturn: '2026-04-24',
    returnDate: '2026-04-22', penalty: '0', returnStatus: circulationStatuses[1],
  },
  {
    id: 4, memberName: members[3], catalogItemName: books[6], writer: writers[6],
    issueDate: '2026-04-15', lastDate: '2026-04-29', toReturn: '2026-04-29',
    returnDate: null, penalty: '5.00', returnStatus: circulationStatuses[2],
  },
  {
    id: 5, memberName: members[4], catalogItemName: books[8], writer: writers[8],
    issueDate: '2026-05-10', lastDate: '2026-06-10', toReturn: '2026-06-10',
    returnDate: null, penalty: '0', returnStatus: circulationStatuses[0],
  },
];

// ── Dashboard analytics ────────────────────────────────────────────────────
const shortAnalytics = {
  bookNumber:      String(books.length),
  memberNumber:    String(members.length),
  issueBookNumber: String(circulations.filter(c => c.returnStatus.name === 'ISSUED').length),
  categoryNumber:  String(categories.length),
};

// ngx-charts single-series format
const bookByCategoryData = [
  { name: 'Fiction',    value: 42 },
  { name: 'Science',    value: 35 },
  { name: 'History',    value: 28 },
  { name: 'Technology', value: 22 },
  { name: 'Biography',  value: 18 },
  { name: 'Reference',  value: 15 },
];

const bookByAuthorData = [
  { name: 'F. Scott Fitzgerald', value: 12 },
  { name: 'George Orwell',       value: 9  },
  { name: 'Yuval Noah Harari',   value: 8  },
  { name: 'Stephen Hawking',     value: 7  },
  { name: 'Robert C. Martin',    value: 6  },
];

const publicationsByAuthors = [
  { name: 'F. Scott Fitzgerald', value: 3 },
  { name: 'George Orwell',       value: 5 },
  { name: 'Yuval Noah Harari',   value: 4 },
  { name: 'Stephen Hawking',     value: 3 },
  { name: 'Carl Sagan',          value: 4 },
  { name: 'Jared Diamond',       value: 2 },
  { name: 'Walter Isaacson',     value: 6 },
];

const publicationsByGenre = [
  { name: 'Fiction',    value: 38 },
  { name: 'Science',    value: 29 },
  { name: 'History',    value: 24 },
  { name: 'Technology', value: 19 },
  { name: 'Biography',  value: 16 },
];

const itemsByType = [
  { name: 'Book',     value: 142 },
  { name: 'eBook',    value: 67  },
  { name: 'DVD',      value: 23  },
  { name: 'Magazine', value: 45  },
  { name: 'Journal',  value: 31  },
];

const distributionByGenre = [
  { name: 'Fiction',          value: 38 },
  { name: 'Science Fiction',  value: 22 },
  { name: 'Mystery',          value: 19 },
  { name: 'Non-Fiction',      value: 35 },
  { name: 'Biography',        value: 16 },
];

// ngx-charts multi-series for line/bar charts
const expensesMulti = [
  {
    name: 'Expenses',
    series: [
      { name: 'Jan', value: 1200 }, { name: 'Feb', value: 980  },
      { name: 'Mar', value: 1450 }, { name: 'Apr', value: 1100 },
      { name: 'May', value: 890  },
    ],
  },
];
const incomesMulti = [
  {
    name: 'Incomes',
    series: [
      { name: 'Jan', value: 2400 }, { name: 'Feb', value: 1980 },
      { name: 'Mar', value: 2650 }, { name: 'Apr', value: 2200 },
      { name: 'May', value: 1890 },
    ],
  },
];

const expenses = [
  { id: 1, description: 'Book purchases Q1', amount: 1200, date: '2026-01-15', category: 'Acquisition' },
  { id: 2, description: 'Periodical subscriptions', amount: 980, date: '2026-02-01', category: 'Subscriptions' },
  { id: 3, description: 'Equipment maintenance', amount: 450, date: '2026-03-10', category: 'Maintenance' },
];

const incomes = [
  { id: 1, description: 'Membership fees Q1', amount: 2400, date: '2026-01-31', category: 'Membership' },
  { id: 2, description: 'Late fines collected', amount: 180, date: '2026-02-28', category: 'Fines' },
  { id: 3, description: 'Event tickets', amount: 650, date: '2026-03-20', category: 'Events' },
];

const overdues = [
  {
    id: 1, memberName: members[3], catalogItemName: books[6],
    issueDate: '2026-04-15', dueDate: '2026-04-29',
    daysOverdue: 32, fine: 5.00,
  },
];

const requestedBooks = [
  {
    id: 1, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman',
    isbn: '9780374533557', requestedBy: members[0],
    requestDate: '2026-05-20', status: 'PENDING',
  },
  {
    id: 2, title: 'Deep Work', author: 'Cal Newport',
    isbn: '9781455586691', requestedBy: members[2],
    requestDate: '2026-05-22', status: 'APPROVED',
  },
];

const tags = [
  { id: 1, name: 'Bestseller'   },
  { id: 2, name: 'Classic'      },
  { id: 3, name: 'Award Winner' },
  { id: 4, name: 'New Arrival'  },
  { id: 5, name: 'Staff Pick'   },
];

const itemTypes = [
  { id: 1, typeName: 'Hardcover',   description: 'Hardcover bound book' },
  { id: 2, typeName: 'Paperback',   description: 'Paperback edition'    },
  { id: 3, typeName: 'Large Print', description: 'Large print edition'  },
  { id: 4, typeName: 'Audio',       description: 'Audiobook'            },
];

const settings = [
  {
    id: 1, libraryName: 'City Public Library',
    address: '100 Library Square', phone: '555-LIBRARY',
    email: 'contact@librarydemo.com', currency: 'USD',
    timezone: 'America/New_York', language: 'EN',
    maxBooksPerMember: 5, loanPeriodDays: 14, finePerDay: 0.25,
  },
];

const menuI18n = {
  dashboardI18n: 'Dashboard',
  categoriesI18n: 'Categories',
  archivedBookI18n: 'Archived Books',
  destroyedBookI18n: 'Destroyed Books',
  membersI18n: 'Members',
  typeMembersI18n: 'Member Types',
  circulationsMenuI18n: 'Circulations',
  circulationsI18n: 'Circulations',
  calendarI18n: 'Calendar',
  circulationStatusI18n: 'Status',
  account18n: 'Account',
  reportI18n: 'Reports',
  bookReportI18n: 'Book Report',
  memberReportI18n: 'Member Report',
  analyticsI18n: 'Analytics',
  bookAnalayticsI18n: 'Book Analytics',
  accountAnalyticsI18n: 'Account Analytics',
  settingsI18n: 'Settings',
  generalSettingsI18n: 'General Settings',
  logOutI18n: 'Logout',
};

const dashboardI18n = {
  bookNumber: 'Total Books',
  memberNumber: 'Total Members',
  issueBookNumber: 'Books Issued',
  categoryNumber: 'Categories',
};

const bookI18n = {
  isbn: 'ISBN', title: 'Title', author: 'Author',
  edition: 'Edition', publishingYear: 'Publishing Year', status: 'Status',
};

module.exports = {
  books, members, categories, writers, publishers,
  mediaTypes, memberTypes, departments, shelves, rows, physicalDescriptions,
  circulations, circulationStatuses,
  shortAnalytics,
  bookByCategoryData, bookByAuthorData,
  publicationsByAuthors, publicationsByGenre,
  itemsByType, distributionByGenre,
  expensesMulti, incomesMulti, expenses, incomes,
  overdues, requestedBooks,
  tags, itemTypes, settings,
  menuI18n, dashboardI18n, bookI18n,
};
