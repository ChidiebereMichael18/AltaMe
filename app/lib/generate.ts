// ─── Types ──────────────────────────────────────────────────────────────

export type CountryCode = 'US' | 'GB' | 'CA' | 'AU' | 'DE' | 'FR' | 'NG' | 'IN';

export const COUNTRIES: Array<{ code: CountryCode; name: string }> = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'IN', name: 'India' },
];

export interface Identity {
  // Core
  id: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  fullName: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  age: number;
  zodiacSign: string;
  mothersMaidenName: string;
  // Location
  countryCode: CountryCode;
  country: string;
  nationality: string;
  fullAddress: string;
  city: string;
  region: string;
  regionAbbr: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  // Official docs
  nationalId: string;
  nationalIdLabel: string;
  licenseId: string;
  licenseLabel: string;
  // Contact
  phone: string;
  email: string;
  // Online
  username: string;
  password: string;
  website: string;
  userAgent: string;
  // Finance
  cardType: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVV: string;
  // Employment
  company: string;
  occupation: string;
  // Physical
  height: string;
  weight: string;
  bloodType: string;
  // Extra
  favoriteColor: string;
  vehicle: string;
  guid: string;
  generatedAt: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pad(n: number | string, len: number): string {
  return String(n).padStart(len, '0');
}
function randDigits(len: number): string {
  return Array.from({ length: len }, () => String(randInt(0, 9))).join('');
}
function randAlpha(len: number): string {
  const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  return Array.from({ length: len }, () => A[Math.floor(Math.random() * A.length)]).join('');
}
function randAlphaNum(len: number): string {
  const C = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  return Array.from({ length: len }, () => C[Math.floor(Math.random() * C.length)]).join('');
}
function formatDOB(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
}
function randFloat(min: number, max: number, dp = 6): string {
  return (Math.random() * (max - min) + min).toFixed(dp);
}
function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

const INITIALS = 'ABCDEFGHJKLMNPQRSTUVWXYZ'.split('');

// ─── Zodiac ───────────────────────────────────────────────────────────────

function zodiac(month: number, day: number): string {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}

// ─── Global Supplemental Data ────────────────────────────────────────────

const COMPANIES = [
  'Apex Solutions','Meridian Group','Pinnacle Tech','Crestwood Partners','Solaris Industries',
  'Nexus Dynamics','Ironclad Systems','Veridian Holdings','Cascade Ventures','Strata Global',
  'Luminary Corp','Forge Analytics','Summit Enterprises','Citadel Resources','Orbit Digital',
  'Vanguard Consulting','Stellar Systems','Keystone Labs','Harbour Capital','Nova Strategies',
  'BlueLine Services','Triton Networks','Matrix Consulting','Granite Financial','Onyx Group',
  'Titan Manufacturing','Cypress Tech','Redwood Solutions','Alchemy Partners','Echo Industries',
  'Phantom Systems','Cobalt Innovations','Argent Logistics','Tempest Group','Mosaic Media',
  'Vertex Analytics','Condor Industries','Prairie Capital','Shoreline Consulting','Prism Tech',
];

const OCCUPATIONS = [
  'Software Engineer','Data Analyst','Product Manager','Registered Nurse','Civil Engineer',
  'Accountant','Marketing Manager','Sales Representative','Graphic Designer','Teacher',
  'Electrical Engineer','Financial Advisor','Operations Manager','Human Resources Manager',
  'Construction Manager','Pharmacist','Physician','Dentist','Lawyer','Architect',
  'Mechanical Engineer','Supply Chain Manager','Business Analyst','Content Writer','UX Designer',
  'Project Manager','Network Administrator','Database Administrator','Cybersecurity Analyst',
  'Physical Therapist','Occupational Therapist','Social Worker','Logistics Coordinator',
  'Customer Success Manager','Real Estate Agent','Insurance Agent','Bank Manager','Chef',
  'Police Officer','Firefighter','Paramedic','Radiologist','Research Scientist','Statistician',
  'Warehouse Supervisor','Retail Manager','Event Planner','Journalist','Translator','Economist',
];

const VEHICLES = [
  '2019 Toyota Camry','2021 Honda Accord','2020 Ford F-150','2022 Chevrolet Silverado',
  '2018 BMW 3 Series','2020 Mercedes-Benz C-Class','2019 Audi A4','2021 Volkswagen Golf',
  '2022 Toyota RAV4','2020 Honda CR-V','2021 Ford Escape','2019 Nissan Altima',
  '2020 Hyundai Elantra','2021 Kia Sorento','2022 Subaru Outback','2018 Mazda CX-5',
  '2019 Jeep Grand Cherokee','2021 Ram 1500','2020 GMC Sierra','2022 Dodge Charger',
  '2019 Tesla Model 3','2021 Volvo XC60','2020 Lexus RX 350','2022 Acura MDX',
  '2018 Porsche Macan','2021 Land Rover Discovery','2019 Jaguar F-Pace','2020 Alfa Romeo Giulia',
  '2021 Peugeot 3008','2022 Renault Clio','2020 Skoda Octavia','2019 Seat Leon',
  '2021 Fiat 500X','2018 Opel Astra','2020 Citroën C3','2022 Dacia Duster',
  '2019 Honda Civic Type R','2021 Toyota Corolla','2020 Mitsubishi Outlander','2022 Suzuki Swift',
];

const COLORS = [
  'Midnight Blue','Burgundy','Forest Green','Charcoal','Slate Gray','Terracotta',
  'Navy','Olive','Rust','Indigo','Teal','Mauve','Sage','Ivory','Amber',
  'Crimson','Cobalt','Ochre','Plum','Pewter',
];

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
];

const BLOOD_TYPES = ['O+','O-','A+','A-','B+','B-','AB+','AB-'];
// Realistic distribution weights: O+35, O-13, A+30, A-8, B+8, B-2, AB+3, AB-1
const BLOOD_WEIGHTS = [35,13,30,8,8,2,3,1];

function weightedRand<T>(items: T[], weights: number[]): T {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

const PASSWORD_WORDS = ['Apple','River','Storm','Castle','Forest','Shadow','Eagle','Flame','Ocean','Bridge','Winter','Silver','Tiger','Garden','Thunder'];
const PASSWORD_SYMBOLS = ['!','@','#','$','%','&','*'];

function generatePassword(): string {
  const w = rand(PASSWORD_WORDS);
  const n = randInt(10, 9999);
  const s = rand(PASSWORD_SYMBOLS);
  const styles = [
    `${w}${n}${s}`,
    `${w}${s}${n}`,
    `${w.toLowerCase()}${n}${s}`,
    `${n}${w}${s}`,
    `${w}${randInt(10,99)}${s}${randAlpha(2).toLowerCase()}`,
  ];
  return rand(styles);
}

function generateWebsite(firstName: string, lastName: string): string {
  const fn = firstName.toLowerCase().replace(/[^a-z]/g, '');
  const ln = lastName.toLowerCase().replace(/[^a-z]/g, '');
  const tlds = ['.com','.net','.org','.io','.co'];
  const adjectives = ['fast','smart','bright','clear','sharp','bold','pure','prime','true','blue'];
  const nouns = ['hub','lab','base','bay','space','works','forge','wave','grid','core'];
  const styles = [
    `${fn}${ln}${rand(tlds)}`,
    `${fn}-${ln}${rand(tlds)}`,
    `${rand(adjectives)}${rand(nouns)}${rand(tlds)}`,
    `${ln}${rand(nouns)}${rand(tlds)}`,
    `the${fn}${rand(tlds)}`,
  ];
  return rand(styles);
}

// ─── Credit Card ─────────────────────────────────────────────────────────

function generateCard() {
  const r = Math.random();
  let type: string, number: string, cvv: string;

  if (r < 0.60) {
    // Visa
    type = 'Visa';
    number = '4' + randDigits(15);
    cvv = randDigits(3);
  } else if (r < 0.90) {
    // Mastercard
    type = 'Mastercard';
    number = String(randInt(51, 55)) + randDigits(14);
    cvv = randDigits(3);
  } else {
    // Amex
    type = 'Amex';
    const prefix = rand(['34', '37']);
    number = prefix + randDigits(13);
    cvv = randDigits(4);
  }

  // Format number
  let formatted: string;
  if (type === 'Amex') {
    formatted = `${number.slice(0,4)} ${number.slice(4,10)} ${number.slice(10)}`;
  } else {
    formatted = `${number.slice(0,4)} ${number.slice(4,8)} ${number.slice(8,12)} ${number.slice(12)}`;
  }

  const month = pad(randInt(1, 12), 2);
  const year  = randInt(new Date().getFullYear() + 1, new Date().getFullYear() + 6);
  const expiry = `${month}/${year}`;

  return { type, number: formatted, expiry, cvv };
}

// ─── Physical ─────────────────────────────────────────────────────────────

function generatePhysical(gender: 'Male' | 'Female') {
  let heightCm: number, weightKg: number;
  if (gender === 'Male') {
    heightCm = randInt(163, 193);
    weightKg = randInt(64, 110);
  } else {
    heightCm = randInt(152, 178);
    weightKg = randInt(50, 90);
  }
  const feet = Math.floor(heightCm / 30.48);
  const inches = Math.round((heightCm / 30.48 - feet) * 12);
  const lbs = Math.round(weightKg * 2.20462);
  return {
    height: `${feet}'${inches}" (${heightCm} cm)`,
    weight: `${lbs} lbs (${weightKg} kg)`,
    bloodType: weightedRand(BLOOD_TYPES, BLOOD_WEIGHTS),
  };
}

// ─── Country Definitions ──────────────────────────────────────────────────

interface RegionData {
  name: string;
  abbr: string;
  cities: string[];
  areaCodes?: string[];
  postalPrefix?: string;
}

interface CoordRange { lat: [number, number]; lon: [number, number]; }

interface CountryDef {
  name: string;
  nationality: string;
  nationalIdLabel: string;
  licenseLabel: string;
  maleNames: string[];
  femaleNames: string[];
  lastNames: string[];
  regions: RegionData[];
  streetNames: string[];
  streetTypes: string[];
  emailProviders: string[];
  coords: CoordRange;
  genNationalId: () => string;
  genLicense:    (r: RegionData) => string;
  genPhone:      (r: RegionData) => string;
  genPostal:     (r: RegionData) => string;
  fmtAddress:    (num: number, street: string, type: string, city: string, regionAbbr: string, postal: string) => string;
}

const countryDefs: Record<CountryCode, CountryDef> = {

  // ── United States ──────────────────────────────────────────────────────
  US: {
    name: 'United States', nationality: 'American',
    nationalIdLabel: 'Social Security No.', licenseLabel: "Driver's License",
    coords: { lat: [25, 49], lon: [-125, -65] },
    maleNames: ['James','John','Robert','Michael','William','David','Richard','Joseph','Thomas','Charles','Christopher','Daniel','Matthew','Anthony','Mark','Steven','Paul','Andrew','Joshua','Kevin','Brian','George','Timothy','Edward','Jason','Jeffrey','Ryan','Jacob','Gary','Nicholas','Eric','Jonathan','Stephen','Larry','Justin','Scott','Brandon','Benjamin','Samuel','Frank','Alexander','Patrick','Dennis','Peter','Henry','Aaron','Nathan','Evan','Dylan','Marcus'],
    femaleNames: ['Mary','Patricia','Jennifer','Linda','Barbara','Elizabeth','Susan','Jessica','Sarah','Karen','Lisa','Nancy','Betty','Margaret','Sandra','Ashley','Dorothy','Kimberly','Emily','Donna','Michelle','Carol','Amanda','Melissa','Deborah','Stephanie','Rebecca','Sharon','Laura','Cynthia','Kathleen','Amy','Angela','Shirley','Anna','Brenda','Emma','Nicole','Helen','Samantha','Katherine','Christine','Rachel','Carolyn','Janet','Catherine','Maria','Heather','Diana','Amber','Victoria'],
    lastNames: ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin','Lee','Perez','Thompson','White','Harris','Sanchez','Clark','Ramirez','Lewis','Robinson','Walker','Young','Allen','King','Wright','Scott','Torres','Nguyen','Hill','Flores','Green','Adams','Nelson','Baker','Hall','Rivera','Campbell','Mitchell','Carter','Roberts','Phillips','Evans','Turner','Parker','Collins','Edwards','Stewart','Morris','Murphy','Cook','Rogers','Morgan','Peterson','Cooper','Reed','Bailey','Bell','Gomez','Kelly','Howard','Ward','Cox','Diaz','Richardson','Wood','Watson','Brooks','Bennett','Gray','Hughes','Myers','Long','Foster','Sanders','Ross','Powell','Sullivan','Russell','Jenkins','Perry','Butler','Barnes','Fisher','Henderson','Coleman','Simmons'],
    regions: [
      { name:'California',abbr:'CA',cities:['Los Angeles','San Francisco','San Diego','Sacramento','Fresno','Long Beach','Oakland'],areaCodes:['213','310','415','619','916','714'] },
      { name:'Texas',abbr:'TX',cities:['Houston','San Antonio','Dallas','Austin','Fort Worth','El Paso','Arlington'],areaCodes:['210','214','281','512','713','817'] },
      { name:'Florida',abbr:'FL',cities:['Jacksonville','Miami','Tampa','Orlando','St. Petersburg','Hialeah','Tallahassee'],areaCodes:['305','407','561','727','813','850','904'] },
      { name:'New York',abbr:'NY',cities:['New York City','Buffalo','Rochester','Yonkers','Syracuse','Albany'],areaCodes:['212','315','516','518','585','718','914'] },
      { name:'Illinois',abbr:'IL',cities:['Chicago','Aurora','Rockford','Joliet','Naperville','Springfield'],areaCodes:['217','312','618','630','708','773'] },
      { name:'Pennsylvania',abbr:'PA',cities:['Philadelphia','Pittsburgh','Allentown','Erie','Reading','Scranton'],areaCodes:['215','267','412','570','610','717'] },
      { name:'Ohio',abbr:'OH',cities:['Columbus','Cleveland','Cincinnati','Toledo','Akron','Dayton'],areaCodes:['216','330','419','513','614','740'] },
      { name:'Georgia',abbr:'GA',cities:['Atlanta','Augusta','Columbus','Macon','Savannah','Athens'],areaCodes:['229','404','470','678','706','770','912'] },
      { name:'North Carolina',abbr:'NC',cities:['Charlotte','Raleigh','Greensboro','Durham','Winston-Salem'],areaCodes:['252','336','704','828','910','919'] },
      { name:'Michigan',abbr:'MI',cities:['Detroit','Grand Rapids','Warren','Sterling Heights','Ann Arbor','Lansing'],areaCodes:['231','248','313','517','586','616','734'] },
      { name:'Washington',abbr:'WA',cities:['Seattle','Spokane','Tacoma','Vancouver','Bellevue','Kent'],areaCodes:['206','253','360','425','509'] },
      { name:'Colorado',abbr:'CO',cities:['Denver','Colorado Springs','Aurora','Fort Collins','Lakewood'],areaCodes:['303','719','720','970'] },
      { name:'Missouri',abbr:'MO',cities:['Kansas City','St. Louis','Springfield','Columbia','Independence'],areaCodes:['314','417','573','636','816'] },
    ],
    streetNames: ['Oak','Maple','Cedar','Pine','Elm','Washington','Lincoln','Lake','Hill','River','Park','Main','Spring','Sunset','Highland','Meadow','Forest','Valley','Ridge','Church','Liberty','Union','Jefferson','Madison','Franklin','Willow','Cherry','Birch','Linden','Chestnut','Walnut','Magnolia','Aspen'],
    streetTypes: ['St','Ave','Blvd','Dr','Rd','Ln','Way','Ct','Pl'],
    emailProviders: ['gmail.com','yahoo.com','outlook.com','hotmail.com','icloud.com','proton.me'],
    genNationalId: () => `${pad(randInt(1,665),3)}-${pad(randInt(1,99),2)}-${pad(randInt(1,9999),4)}`,
    genLicense:    (r) => `${r.abbr}-${randAlphaNum(8)}`,
    genPhone:      (r) => `(${rand(r.areaCodes!)}) ${randInt(200,999)}-${pad(randInt(1000,9999),4)}`,
    genPostal:     () => pad(randInt(10000,99999),5),
    fmtAddress:    (num,st,type,city,abbr,postal) => `${num} ${st} ${type}, ${city}, ${abbr} ${postal}`,
  },

  // ── United Kingdom ─────────────────────────────────────────────────────
  GB: {
    name: 'United Kingdom', nationality: 'British',
    nationalIdLabel: 'National Insurance No.', licenseLabel: 'Driving Licence No.',
    coords: { lat: [50, 59], lon: [-6, 2] },
    maleNames: ['Oliver','George','Harry','Jack','Noah','Charlie','Jacob','Alfie','Freddie','Oscar','William','James','Thomas','Henry','Leo','Alexander','Ethan','Mason','Daniel','Liam','Archie','Edward','Sebastian','Max','Benjamin','Samuel','Luke','Isaac','Theo','Arthur','Reuben','Finley','Toby','Joshua','Dylan','Eli','Stanley','Jude','Dexter','Jasper'],
    femaleNames: ['Olivia','Amelia','Isla','Emily','Ava','Sophia','Grace','Lily','Freya','Evie','Charlotte','Isabella','Mia','Poppy','Ella','Imogen','Sophie','Sienna','Chloe','Jessica','Florence','Alice','Millie','Daisy','Phoebe','Hannah','Ruby','Rosie','Abigail','Lucy','Ellie','Emma','Scarlett','Matilda','Harriet','Isabelle','Lola','Lexi','Jasmine','Layla'],
    lastNames: ['Smith','Jones','Williams','Taylor','Brown','Davies','Evans','Wilson','Thomas','Roberts','Johnson','Lewis','Walker','Robinson','Wood','Thompson','White','Watson','Jackson','Wright','Green','Harris','Cooper','King','Lee','Martin','Clarke','James','Morgan','Hughes','Edwards','Hill','Moore','Clark','Harrison','Scott','Young','Morris','Hall','Ward','Turner','Carter','Collins','Parker','Phillips','Shaw','Price','Henderson'],
    regions: [
      { name:'England',abbr:'ENG',cities:['London','Birmingham','Manchester','Leeds','Liverpool','Sheffield','Bristol','Nottingham','Leicester','Coventry','Southampton','Portsmouth','Newcastle','Brighton','Plymouth'],areaCodes:['020','0121','0161','0113'] },
      { name:'Scotland',abbr:'SCO',cities:['Edinburgh','Glasgow','Aberdeen','Dundee','Inverness','Stirling','Perth'],areaCodes:['0131','0141','01224'] },
      { name:'Wales',abbr:'WLS',cities:['Cardiff','Swansea','Newport','Bangor','Wrexham'],areaCodes:['029','01792'] },
      { name:'Northern Ireland',abbr:'NIR',cities:['Belfast','Derry','Lisburn','Armagh','Newry'],areaCodes:['028'] },
    ],
    streetNames: ['High','Church','Main','Park','Victoria','King','Queen','Station','London','Manor','Green','Mill','North','South','East','West','Bridge','Castle','Market','Rose','Hill','Lake','Forest','Springfield','Elm','Oak','Birch','Willow','Chestnut'],
    streetTypes: ['Street','Road','Avenue','Lane','Drive','Close','Way','Crescent','Place','Court','Terrace'],
    emailProviders: ['gmail.com','yahoo.co.uk','outlook.co.uk','hotmail.co.uk','icloud.com','btinternet.com','sky.com'],
    genNationalId: () => `${randAlpha(2)} ${pad(randInt(10,99),2)} ${pad(randInt(10,99),2)} ${pad(randInt(10,99),2)} ${['A','B','C','D'][randInt(0,3)]}`,
    genLicense:    () => `${randAlpha(5)}${randDigits(6)}${randAlpha(2)}${randDigits(2)}${randAlpha(2)}`,
    genPhone:      () => `07${randInt(700,999)} ${randInt(100000,999999)}`,
    genPostal:     () => { const a=['SW','SE','NW','NE','EC','WC','W','E','N','S','M','B','LS','L','BS','BN','CB','OX','CF','EH','G']; return `${rand(a)}${randInt(1,20)} ${randInt(1,9)}${randAlpha(2)}`; },
    fmtAddress:    (num,st,type,city,_a,postal) => `${num} ${st} ${type}, ${city}, ${postal}`,
  },

  // ── Canada ─────────────────────────────────────────────────────────────
  CA: {
    name: 'Canada', nationality: 'Canadian',
    nationalIdLabel: 'Social Insurance No.', licenseLabel: "Driver's Licence",
    coords: { lat: [43, 70], lon: [-140, -52] },
    maleNames: ['Liam','Noah','William','Oliver','Benjamin','Elijah','Lucas','Mason','Logan','Ethan','Aiden','Jackson','Sebastian','Jack','Owen','Theodore','Samuel','Henry','Gabriel','Carter','Wyatt','Julian','Grayson','Leo','Ryan','Caleb','Evan','Connor','Dylan','Zachary','Nathan','Thomas','James','Michael','Matteo','Antoine','Olivier'],
    femaleNames: ['Emma','Olivia','Ava','Sophia','Isabella','Mia','Charlotte','Amelia','Harper','Evelyn','Abigail','Emily','Elizabeth','Sofia','Ella','Madison','Scarlett','Victoria','Aria','Grace','Chloe','Penelope','Riley','Zoey','Nora','Lily','Eleanor','Hannah','Lillian','Addison','Aubrey','Audrey','Camille','Chloé','Madeleine','Juliette'],
    lastNames: ['Smith','Brown','Tremblay','Martin','Roy','Wilson','MacDonald','Gagnon','Johnson','Bouchard','Lavoie','Côté','Gauthier','Morin','Leblanc','Fortin','Gagné','Pelletier','Bélanger','Bergeron','Girard','Simard','Lapointe','Cormier','Beaulieu','Lemieux','Landry','Hébert','Paquette','Picard','Taylor','Anderson','Thomas','Lee','White','Harris','Clark','Robinson','Lewis','Walker'],
    regions: [
      { name:'Ontario',abbr:'ON',cities:['Toronto','Ottawa','Hamilton','London','Kitchener','Brampton','Windsor','Mississauga'],areaCodes:['416','613','905','519','647','705'] },
      { name:'British Columbia',abbr:'BC',cities:['Vancouver','Victoria','Kelowna','Abbotsford','Surrey','Burnaby','Richmond'],areaCodes:['604','250','778'] },
      { name:'Quebec',abbr:'QC',cities:['Montreal','Quebec City','Laval','Longueuil','Gatineau','Sherbrooke'],areaCodes:['514','418','450','819','581'] },
      { name:'Alberta',abbr:'AB',cities:['Calgary','Edmonton','Red Deer','Lethbridge','St. Albert'],areaCodes:['403','780','825'] },
      { name:'Manitoba',abbr:'MB',cities:['Winnipeg','Brandon','Steinbach','Thompson'],areaCodes:['204','431'] },
      { name:'Saskatchewan',abbr:'SK',cities:['Saskatoon','Regina','Prince Albert','Moose Jaw'],areaCodes:['306','639'] },
      { name:'Nova Scotia',abbr:'NS',cities:['Halifax','Sydney','Dartmouth','Truro'],areaCodes:['902'] },
    ],
    streetNames: ['Maple','Oak','Cedar','Pine','Birch','Elm','King','Queen','Bay','Yonge','Parliament','Church','College','Bloor','Dundas','Main','Water','River','Park','Highland','Lakeshore','Rideau','Sussex','Wellington'],
    streetTypes: ['St','Ave','Blvd','Dr','Rd','Cres','Way','Ct','Pl'],
    emailProviders: ['gmail.com','yahoo.ca','outlook.com','hotmail.ca','icloud.com','rogers.com'],
    genNationalId: () => `${pad(randInt(100,999),3)}-${pad(randInt(100,999),3)}-${pad(randInt(100,999),3)}`,
    genLicense:    (r) => `${r.abbr}${randDigits(randInt(8,10))}`,
    genPhone:      (r) => `(${rand(r.areaCodes!)}) ${randInt(200,999)}-${pad(randInt(1000,9999),4)}`,
    genPostal:     () => { const L='ABCEGHJKLMNPRSTVXY'; const l=()=>L[Math.floor(Math.random()*L.length)]; return `${l()}${randInt(0,9)}${l()} ${randInt(0,9)}${l()}${randInt(0,9)}`; },
    fmtAddress:    (num,st,type,city,abbr,postal) => `${num} ${st} ${type}, ${city}, ${abbr} ${postal}`,
  },

  // ── Australia ──────────────────────────────────────────────────────────
  AU: {
    name: 'Australia', nationality: 'Australian',
    nationalIdLabel: 'Tax File No.', licenseLabel: 'Driver Licence No.',
    coords: { lat: [-44, -10], lon: [113, 154] },
    maleNames: ['Oliver','William','Noah','Jack','James','Henry','Lucas','Thomas','Liam','Jackson','Cooper','Charlie','Ethan','Alexander','Hunter','George','Riley','Xavier','Harrison','Nathan','Sebastian','Max','Harvey','Archie','Tyler','Zachary','Mitchell','Jayden','Ryan','Jordan','Flynn','Angus','Callum','Hamish','Lachlan','Finn','Kai','Hugo'],
    femaleNames: ['Charlotte','Olivia','Ava','Mia','Amelia','Grace','Isla','Zoe','Ruby','Sophie','Emily','Ella','Chloe','Isabella','Lily','Sophia','Madison','Emma','Sienna','Evie','Georgia','Abigail','Freya','Zara','Scarlett','Ivy','Willow','Hannah','Clara','Aria','Harper','Matilda','Mackenzie','Paige','Jasmine','Imogen','Piper','Poppy'],
    lastNames: ['Smith','Jones','Williams','Brown','Wilson','Taylor','Johnson','White','Martin','Anderson','Thompson','Nguyen','Thomas','Walker','Harris','Lee','Ryan','Robinson','Kelly','King','Davis','Mitchell','Morrison','Miller','Campbell','Edwards','Cook','Rogers','Murphy','Cooper','Richardson','Patterson','Graham','Evans','McDonald','Clarke','Stewart','Morris','Wood','Watson'],
    regions: [
      { name:'New South Wales',abbr:'NSW',cities:['Sydney','Newcastle','Wollongong','Parramatta','Central Coast','Maitland'],areaCodes:['02'] },
      { name:'Victoria',abbr:'VIC',cities:['Melbourne','Geelong','Ballarat','Bendigo','Shepparton','Warrnambool'],areaCodes:['03'] },
      { name:'Queensland',abbr:'QLD',cities:['Brisbane','Gold Coast','Sunshine Coast','Townsville','Cairns','Toowoomba'],areaCodes:['07'] },
      { name:'Western Australia',abbr:'WA',cities:['Perth','Fremantle','Mandurah','Bunbury','Geraldton'],areaCodes:['08'] },
      { name:'South Australia',abbr:'SA',cities:['Adelaide','Mount Gambier','Whyalla','Gawler'],areaCodes:['08'] },
      { name:'Tasmania',abbr:'TAS',cities:['Hobart','Launceston','Devonport','Burnie'],areaCodes:['03'] },
      { name:'Australian Capital Territory',abbr:'ACT',cities:['Canberra','Belconnen','Tuggeranong'],areaCodes:['02'] },
      { name:'Northern Territory',abbr:'NT',cities:['Darwin','Alice Springs','Palmerston'],areaCodes:['08'] },
    ],
    streetNames: ['King','Queen','George','Elizabeth','Victoria','William','Charles','Albert','Edward','Smith','Jones','Brown','Wilson','Taylor','Johnson','White','Martin','Anderson','Thomas','Walker','Harris','Mitchell','Miller','Campbell','Evans','Cooper','Rogers','Murray','Collins'],
    streetTypes: ['St','Ave','Rd','Dr','Cres','Way','Ct','Pl','Blvd','Ln'],
    emailProviders: ['gmail.com','yahoo.com.au','outlook.com','hotmail.com','icloud.com','bigpond.com'],
    genNationalId: () => { const n=randInt(100000000,999999999).toString(); return `${n.slice(0,3)} ${n.slice(3,6)} ${n.slice(6,9)}`; },
    genLicense:    (r) => `${r.abbr}${randAlphaNum(6)}`,
    genPhone:      () => `04${randInt(10,99)} ${randInt(100,999)} ${randInt(100,999)}`,
    genPostal:     (r) => { const p:Record<string,string>={NSW:'2',VIC:'3',QLD:'4',SA:'5',WA:'6',TAS:'7',ACT:'26',NT:'08'}; const px=p[r.abbr]??'2'; return `${px}${randDigits(4-px.length)}`; },
    fmtAddress:    (num,st,type,city,abbr,postal) => `${num} ${st} ${type}, ${city} ${abbr} ${postal}`,
  },

  // ── Germany ────────────────────────────────────────────────────────────
  DE: {
    name: 'Germany', nationality: 'German',
    nationalIdLabel: 'Personalausweis No.', licenseLabel: 'Führerschein No.',
    coords: { lat: [47, 55], lon: [6, 15] },
    maleNames: ['Luca','Jonas','Leon','Lukas','Tim','Tobias','Finn','Jan','Felix','Nico','Maximilian','Alexander','Elias','Paul','Julian','Philipp','David','Simon','Moritz','Adrian','Fabian','Daniel','Florian','Sebastian','Andreas','Markus','Christian','Dominik','Patrick','Stefan','Thomas','Michael','Klaus','Wolfgang','Karl','Bernd'],
    femaleNames: ['Emma','Mia','Hannah','Sofia','Lena','Lea','Laura','Sara','Julia','Nele','Johanna','Sophie','Marie','Clara','Elisabeth','Luisa','Katharina','Anna','Lara','Lisa','Alina','Jana','Nina','Franziska','Bianca','Martina','Sabine','Sandra','Claudia','Nadine','Petra','Monika','Ursula','Anja','Manuela','Susanne'],
    lastNames: ['Müller','Schmidt','Schneider','Fischer','Weber','Meyer','Wagner','Becker','Schulz','Hoffmann','Schäfer','Koch','Bauer','Richter','Klein','Wolf','Schröder','Neumann','Schwarz','Zimmermann','Braun','Krüger','Hofmann','Hartmann','Lange','Schmitt','Werner','Schmitz','Krause','Meier','Lehmann','Herrmann','König','Walter','Mayer','Huber','Kaiser','Fuchs','Peters','Lang'],
    regions: [
      { name:'Bayern',abbr:'BY',cities:['München','Nürnberg','Augsburg','Regensburg','Ingolstadt','Würzburg'] },
      { name:'Nordrhein-Westfalen',abbr:'NW',cities:['Köln','Düsseldorf','Dortmund','Essen','Duisburg','Bochum','Wuppertal','Münster','Bielefeld','Aachen'] },
      { name:'Berlin',abbr:'BE',cities:['Berlin','Spandau','Zehlendorf','Schöneberg','Charlottenburg','Prenzlauer Berg'] },
      { name:'Baden-Württemberg',abbr:'BW',cities:['Stuttgart','Mannheim','Karlsruhe','Freiburg im Breisgau','Heidelberg','Ulm'] },
      { name:'Hamburg',abbr:'HH',cities:['Hamburg','Altona','Wandsbek','Barmbek','Harburg'] },
      { name:'Hessen',abbr:'HE',cities:['Frankfurt am Main','Wiesbaden','Darmstadt','Kassel','Offenbach'] },
      { name:'Sachsen',abbr:'SN',cities:['Dresden','Leipzig','Chemnitz','Zwickau','Erfurt'] },
      { name:'Niedersachsen',abbr:'NI',cities:['Hannover','Braunschweig','Osnabrück','Oldenburg','Göttingen','Wolfsburg'] },
    ],
    streetNames: ['Hauptstraße','Schulstraße','Gartenstraße','Dorfstraße','Bergstraße','Kirchstraße','Bahnhofstraße','Wiesenstraße','Ringstraße','Waldstraße','Rosenstraße','Lindenstraße','Fichtenstraße','Buchenweg','Birkenweg','Eichenweg','Kastanienallee','Ahornstraße','Goethestraße','Schillerstraße'],
    streetTypes: [''],
    emailProviders: ['gmail.com','web.de','gmx.de','t-online.de','freenet.de','yahoo.de','outlook.de'],
    genNationalId: () => { const l='CFGHJKLMNPRTVWXYZ'; return `${l[Math.floor(Math.random()*l.length)]}${randDigits(8)}`; },
    genLicense:    () => `${randAlphaNum(2)}-${randDigits(6)}-${randAlpha(1)}`,
    genPhone:      () => `+49 ${rand(['015','016','017'])}${randDigits(8)}`,
    genPostal:     () => pad(randInt(10000,99999),5),
    fmtAddress:    (num,st,_t,city,_a,postal) => `${st} ${num}, ${postal} ${city}`,
  },

  // ── France ─────────────────────────────────────────────────────────────
  FR: {
    name: 'France', nationality: 'French',
    nationalIdLabel: 'Numéro INSEE', licenseLabel: 'Numéro de Permis',
    coords: { lat: [42, 51], lon: [-5, 9] },
    maleNames: ['Lucas','Thomas','Hugo','Nathan','Théo','Mathieu','Antoine','Nicolas','Pierre','Louis','Arthur','Julien','Maxime','Alexandre','Baptiste','Clément','Valentin','Simon','Alexis','Romain','Paul','Jonathan','Florian','Quentin','Victor','Raphaël','Adrien','Thibault','François','Charles','Édouard','Guillaume','Xavier','Benoît','Laurent','Cédric','Stéphane'],
    femaleNames: ['Emma','Léa','Chloé','Manon','Inès','Océane','Sarah','Jade','Lucie','Zoé','Marie','Mathilde','Julie','Claire','Laura','Margot','Pauline','Camille','Marion','Alice','Eva','Anaïs','Elise','Clémence','Justine','Charlotte','Mélanie','Amandine','Sophie','Sandrine','Isabelle','Nathalie','Valérie','Catherine','Sylvie','Brigitte','Corinne','Françoise'],
    lastNames: ['Martin','Bernard','Robert','Richard','Durand','Dubois','Moreau','Laurent','Simon','Michel','Lefebvre','Leroy','Roux','David','Bertrand','Morel','Fournier','Girard','Bonnet','Dupont','Lambert','Fontaine','Rousseau','Vincent','Muller','Lefèvre','Faure','Andre','Mercier','Blanc','Guerin','Boyer','Garnier','Chevalier','François','Legrand','Gauthier','Garcia','Thomas','Henry'],
    regions: [
      { name:'Île-de-France',abbr:'IDF',cities:['Paris','Versailles','Boulogne-Billancourt','Nanterre','Créteil','Montreuil','Saint-Denis'] },
      { name:'Auvergne-Rhône-Alpes',abbr:'ARA',cities:['Lyon','Grenoble','Saint-Étienne','Clermont-Ferrand','Villeurbanne','Annecy'] },
      { name:'Occitanie',abbr:'OCC',cities:['Toulouse','Montpellier','Nîmes','Perpignan','Béziers','Carcassonne'] },
      { name:'Nouvelle-Aquitaine',abbr:'NAQ',cities:['Bordeaux','Limoges','Poitiers','Pau','Bayonne','La Rochelle'] },
      { name:'Hauts-de-France',abbr:'HDF',cities:['Lille','Amiens','Roubaix','Tourcoing','Dunkerque'] },
      { name:'Grand Est',abbr:'GES',cities:['Strasbourg','Reims','Metz','Mulhouse','Nancy','Colmar'] },
      { name:'PACA',abbr:'PAC',cities:['Marseille','Nice','Toulon','Aix-en-Provence','Avignon','Cannes'] },
      { name:'Pays de la Loire',abbr:'PDL',cities:['Nantes','Angers','Le Mans','Saint-Nazaire'] },
    ],
    streetNames: ['Rue de la Paix','Rue du Général de Gaulle','Rue de la République','Avenue des Fleurs','Rue Victor Hugo','Rue Jean Moulin','Allée des Roses','Chemin du Moulin','Rue des Lilas','Avenue du Maréchal Foch','Rue Pasteur','Rue Molière','Avenue Voltaire','Rue Descartes','Boulevard Haussmann'],
    streetTypes: [''],
    emailProviders: ['gmail.com','yahoo.fr','orange.fr','sfr.fr','free.fr','hotmail.fr','laposte.net'],
    genNationalId: () => `${rand(['1','2'])} ${pad(randInt(0,99),2)} ${pad(randInt(1,12),2)} ${pad(randInt(1,95),2)} ${pad(randInt(1,999),3)} ${pad(randInt(1,999),3)} ${pad(randInt(1,97),2)}`,
    genLicense:    () => `${randAlpha(2)}-${randDigits(6)}-${randAlpha(2)}`,
    genPhone:      () => `+33 ${rand(['06','07'])} ${randDigits(2)} ${randDigits(2)} ${randDigits(2)} ${randDigits(2)}`,
    genPostal:     () => pad(randInt(10000,99999),5),
    fmtAddress:    (num,st,_t,city,_a,postal) => `${num} ${st}, ${postal} ${city}`,
  },

  // ── Nigeria ────────────────────────────────────────────────────────────
  NG: {
    name: 'Nigeria', nationality: 'Nigerian',
    nationalIdLabel: 'National ID No. (NIN)', licenseLabel: "Driver's Licence No.",
    coords: { lat: [4, 14], lon: [3, 15] },
    maleNames: ['Emeka','Tunde','Gbenga','Dele','Segun','Ola','Kola','Biodun','Sola','Femi','Tobi','Wale','Bode','Rotimi','Olusegun','Uche','Chidi','Obinna','Ikenna','Nnamdi','Uzoma','Chibuike','Musa','Ibrahim','Bello','Aliyu','Sani','Usman','Abubakar','Abdullahi','Mohammed','Garba','Yakubu','Chukwuemeka','Oluwaseun','Babajide','Adewale','Chinonso','Onyeka','Chukwudi','Ifeanyi','Olumide'],
    femaleNames: ['Adaeze','Chioma','Ngozi','Uchenna','Adaobi','Ifeoma','Amaka','Oluchi','Ebele','Chinyere','Chiamaka','Aisha','Fatima','Hauwa','Ramatu','Maryam','Zainab','Halima','Blessing','Favour','Grace','Peace','Joy','Precious','Gift','Folake','Toyin','Bimpe','Yewande','Shade','Ronke','Kemi','Funmi','Titi','Bisi','Remi','Omowunmi','Adeola','Temitope','Olabisi','Taiwo'],
    lastNames: ['Okonkwo','Eze','Nwosu','Obi','Chukwu','Nzekwe','Okafor','Igwe','Ogbu','Achebe','Adeyemi','Oyelaran','Badmus','Akinwunmi','Alabi','Daramola','Adesanya','Balogun','Lawal','Adeleke','Akinola','Musa','Aliyu','Mohammed','Ibrahim','Garba','Bello','Suleiman','Yusuf','Abubakar','Oduya','Oluwole','Adegoke','Akintola','Fadeyi','Adeoye','Omotosho','Olawale','Salami','Nwachukwu'],
    regions: [
      { name:'Lagos State',abbr:'LA',cities:['Lagos Island','Victoria Island','Ikeja','Lekki','Surulere','Alimosho','Oshodi','Apapa','Yaba','Ikoyi','Ajah'] },
      { name:'FCT Abuja',abbr:'FC',cities:['Wuse','Garki','Maitama','Asokoro','Gwarinpa','Kubwa','Lugbe','Gudu'] },
      { name:'Kano State',abbr:'KN',cities:['Kano City','Fagge','Dala','Gwale','Tarauni','Nassarawa'] },
      { name:'Rivers State',abbr:'RI',cities:['Port Harcourt','Obio-Akpor','Eleme','Tai','Gokana','Bonny'] },
      { name:'Oyo State',abbr:'OY',cities:['Ibadan','Ogbomosho','Oyo Town','Iseyin','Saki'] },
      { name:'Kaduna State',abbr:'KD',cities:['Kaduna City','Zaria','Kafanchan','Ikara'] },
      { name:'Anambra State',abbr:'AN',cities:['Onitsha','Awka','Nnewi','Ekwulobia','Ogidi'] },
      { name:'Delta State',abbr:'DE',cities:['Asaba','Warri','Effurun','Sapele','Ughelli'] },
    ],
    streetNames: ['Adeola Odeku','Ozumba Mbadiwe','Kofo Abayomi','Awolowo','Ahmadu Bello','Ikorodu','Lagos-Abeokuta','Agege Motor','Bode Thomas','Western Avenue','Isaac John','Saka Tinubu','Karimu Kotun','Tiamiyu Savage','Chime Avenue','Enugu-Onitsha'],
    streetTypes: ['Street','Road','Avenue','Close','Drive','Lane','Crescent'],
    emailProviders: ['gmail.com','yahoo.com','hotmail.com','outlook.com','yahoo.co.uk'],
    genNationalId: () => randDigits(11),
    genLicense:    () => `${randAlpha(3)}${randDigits(6)}${randAlpha(2)}`,
    genPhone:      () => `+234 ${rand(['703','706','708','802','803','805','811','813','814','815','816','817','818','909','906','905','904','903','902','901'])} ${randDigits(3)} ${randDigits(4)}`,
    genPostal:     () => pad(randInt(100001,999999),6),
    fmtAddress:    (num,st,type,city,_a,postal) => `${num} ${st} ${type}, ${city}, ${postal}`,
  },

  // ── India ──────────────────────────────────────────────────────────────
  IN: {
    name: 'India', nationality: 'Indian',
    nationalIdLabel: 'Aadhaar No.', licenseLabel: 'Driving Licence No.',
    coords: { lat: [8, 37], lon: [68, 97] },
    maleNames: ['Aarav','Vivaan','Aditya','Vihaan','Arjun','Reyansh','Arnav','Ayaan','Krishna','Ishaan','Shaurya','Atharva','Pranav','Ansh','Ritvik','Aarush','Sai','Siddharth','Dhruv','Kabir','Rudra','Ranbir','Harjot','Raghav','Vikram','Suresh','Ravi','Rajesh','Amit','Rahul','Raj','Kiran','Rohan','Gaurav','Varun','Tarun','Nikhil','Kapil','Sandeep','Manish','Abhishek','Ankur','Deepak','Pankaj','Manoj'],
    femaleNames: ['Saanvi','Aanya','Ananya','Pari','Aadhya','Diya','Riya','Anvi','Aaradhya','Arya','Priya','Nisha','Deepa','Pooja','Sunita','Kavya','Meera','Neha','Shreya','Divya','Anjali','Swati','Preeti','Shweta','Asha','Radha','Geeta','Sita','Lata','Rekha','Sonal','Hema','Nandini','Bharti','Sudha','Mamta','Seema','Rani','Poonam','Kavita','Usha','Sushma'],
    lastNames: ['Sharma','Verma','Singh','Kumar','Patel','Shah','Gupta','Joshi','Pandey','Mishra','Yadav','Chauhan','Rao','Nair','Pillai','Menon','Iyer','Iyengar','Reddy','Naidu','Mukherjee','Chatterjee','Banerjee','Das','Sen','Bose','Roy','Ghosh','Desai','Mehta','Kapoor','Malhotra','Bhatia','Chopra','Arora','Chawla','Anand','Saxena','Trivedi','Dubey','Tiwari','Srivastava','Agarwal','Bajaj','Bhatt','Kulkarni','Jain','Patil','More','Jadhav'],
    regions: [
      { name:'Maharashtra',abbr:'MH',cities:['Mumbai','Pune','Nagpur','Nashik','Aurangabad','Solapur','Thane','Navi Mumbai'] },
      { name:'Delhi',abbr:'DL',cities:['New Delhi','Dwarka','Rohini','Pitampura','Saket','Lajpat Nagar','Janakpuri','Karol Bagh'] },
      { name:'Karnataka',abbr:'KA',cities:['Bangalore','Mysuru','Hubballi','Mangaluru','Belagavi','Davangere'] },
      { name:'Tamil Nadu',abbr:'TN',cities:['Chennai','Coimbatore','Madurai','Salem','Trichy','Erode','Tirunelveli'] },
      { name:'West Bengal',abbr:'WB',cities:['Kolkata','Howrah','Asansol','Siliguri','Durgapur'] },
      { name:'Gujarat',abbr:'GJ',cities:['Ahmedabad','Surat','Vadodara','Rajkot','Bhavnagar','Jamnagar'] },
      { name:'Rajasthan',abbr:'RJ',cities:['Jaipur','Jodhpur','Kota','Ajmer','Bikaner','Udaipur'] },
      { name:'Uttar Pradesh',abbr:'UP',cities:['Lucknow','Kanpur','Agra','Varanasi','Allahabad','Meerut','Ghaziabad','Noida'] },
    ],
    streetNames: ['MG Road','Brigade Road','Commercial Street','Linking Road','FC Road','Anna Salai','Mount Road','Residency Road','Park Street','Connaught Place','Rajpath','Janpath','GT Road','Juhu Beach Road','Marine Drive','Nehru Place','Lajpat Nagar Main Road'],
    streetTypes: [''],
    emailProviders: ['gmail.com','yahoo.co.in','outlook.com','hotmail.com','rediffmail.com','icloud.com'],
    genNationalId: () => { const n=randDigits(12); return `${n.slice(0,4)} ${n.slice(4,8)} ${n.slice(8,12)}`; },
    genLicense:    (r) => `${r.abbr}-${pad(randInt(1,99),2)} ${randInt(2010,2024)} ${pad(randInt(1000000,9999999),7)}`,
    genPhone:      () => `+91 ${rand(['6','7','8','9'])}${randDigits(4)} ${randDigits(5)}`,
    genPostal:     (r) => { const p:Record<string,string>={MH:'4',DL:'1',KA:'5',TN:'6',WB:'7',GJ:'3',RJ:'3',UP:'2'}; return `${p[r.abbr]??'1'}${randDigits(5)}`; },
    fmtAddress:    (num,st,_t,city,abbr,postal) => `${num}, ${st}, ${city}, ${abbr} - ${postal}`,
  },
};

// ─── Main Generator ───────────────────────────────────────────────────────

export function generateIdentity(countryCode: CountryCode = 'US'): Identity {
  const def = countryDefs[countryCode];

  // Personal
  const gender: 'Male' | 'Female' = Math.random() < 0.5 ? 'Male' : 'Female';
  const firstName = gender === 'Male' ? rand(def.maleNames) : rand(def.femaleNames);
  const middleInitial = rand(INITIALS);
  const lastName = rand(def.lastNames);
  const useMI = ['US','GB','CA','AU','NG'].includes(countryCode);
  const fullName = useMI ? `${firstName} ${middleInitial}. ${lastName}` : `${firstName} ${lastName}`;

  // DOB
  const age = randInt(18, 72);
  const birthYear = new Date().getFullYear() - age;
  const birthMonth = randInt(1, 12);
  const birthDay = randInt(1, 28);
  const dob = new Date(birthYear, birthMonth - 1, birthDay);
  const dateOfBirth = formatDOB(dob);

  // Region & location
  const region = rand(def.regions);
  const city = rand(region.cities);
  const streetNum = randInt(1, 9999);
  const streetType = def.streetTypes.filter(t => t !== '').length > 0 ? rand(def.streetTypes.filter(t => t !== '')) : '';
  const streetName = rand(def.streetNames);
  const postalCode = def.genPostal(region);
  const fullAddress = def.fmtAddress(streetNum, streetName, streetType, city, region.abbr, postalCode);

  // Coordinates within country bounding box
  const { lat, lon } = def.coords;
  const latitude  = randFloat(lat[0], lat[1], 6);
  const longitude = randFloat(lon[0], lon[1], 6);

  // Documents
  const nationalId = def.genNationalId();
  const licenseId  = def.genLicense(region);

  // Contact
  const phone = def.genPhone(region);
  const fnLower = firstName.toLowerCase().replace(/[^a-z]/g, '');
  const lnLower = lastName.toLowerCase().replace(/[^a-z]/g, '').slice(0, 8);
  const emailBase = rand([
    `${fnLower}.${lnLower}`, `${fnLower}${lnLower.slice(0,4)}`,
    `${fnLower[0]}${lnLower}`, `${fnLower}${birthYear}`, `${lnLower}.${fnLower}`,
  ]);
  const email = `${emailBase}@${rand(def.emailProviders)}`;

  // Online
  const username = rand([
    `${fnLower}${lnLower.slice(0,4)}`, `${fnLower[0]}${lnLower}`,
    `${fnLower}${birthYear}`, `${fnLower}_${lnLower}`, `${lnLower}${randInt(10,99)}`,
  ]);
  const password  = generatePassword();
  const website   = generateWebsite(firstName, lastName);
  const userAgent = rand(USER_AGENTS);

  // Finance
  const card = generateCard();

  // Employment
  const company    = rand(COMPANIES);
  const occupation = rand(OCCUPATIONS);

  // Physical
  const phys = generatePhysical(gender);

  // Extras
  const mothersMaidenName = rand(def.lastNames);
  const favoriteColor = rand(COLORS);
  const vehicle = rand(VEHICLES);
  const guid = uuid();

  return {
    id: Math.random().toString(36).slice(2) + Date.now().toString(36),
    firstName, middleInitial, lastName, fullName,
    gender, dateOfBirth, age,
    zodiacSign: zodiac(birthMonth, birthDay),
    mothersMaidenName,
    countryCode, country: def.name, nationality: def.nationality,
    fullAddress, city, region: region.name, regionAbbr: region.abbr, postalCode,
    latitude, longitude,
    nationalId, nationalIdLabel: def.nationalIdLabel,
    licenseId, licenseLabel: def.licenseLabel,
    phone, email, username, password, website, userAgent,
    cardType: card.type, cardNumber: card.number, cardExpiry: card.expiry, cardCVV: card.cvv,
    company, occupation,
    height: phys.height, weight: phys.weight, bloodType: phys.bloodType,
    favoriteColor, vehicle, guid,
    generatedAt: new Date().toISOString(),
  };
}
