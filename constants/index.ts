// export const categories = [
//   "Acura",
//   "Alfa Romeo",
//   "Aston Martin",
//   "Audi",
//   "Bentley",
//   "BMW",
//   "Buick",
//   "Cadillac",
//   "Chevrolet",
//   "Chrysler",
//   "Citroen",
//   "Dodge",
//   "Ferrari",
//   "Fiat",
//   "Ford",
//   "GMC",
//   "Honda",
//   "Hyundai",
//   "Infiniti",
//   "Jaguar",
//   "Jeep",
//   "Kia",
//   "Lamborghini",
//   "Land Rover",
//   "Lexus",
//   "Lincoln",
//   "Maserati",
//   "Mazda",
//   "McLaren",
//   "Mercedes-Benz",
//   "MINI",
//   "Mitsubishi",
//   "Nissan",
//   "Porsche",
//   "Ram",
//   "Rolls-Royce",
//   "Subaru",
//   "Tesla",
//   "Toyota",
//   "Volkswagen",
//   "Volvo",
// ];

export const categories = [
  "Aprilia",
  "BMW",
  "Buell",
  "Ducati",
  "Harley-Davidson",
  "Honda",
  "Husqvarna",
  "Indian",
  "Kawasaki",
  "KTM",
  "Suzuki",
  "Triumph",
  "Vespa",
  "Victory",
  "Yamaha",
];

export const yearsOfProduction = [
  { title: "Year", value: "" },
  { title: "2015", value: "2015" },
  { title: "2016", value: "2016" },
  { title: "2017", value: "2017" },
  { title: "2018", value: "2018" },
  { title: "2019", value: "2019" },
  { title: "2020", value: "2020" },
  { title: "2021", value: "2021" },
  { title: "2022", value: "2022" },
  { title: "2023", value: "2023" },
];

export const fuels = [
  {
    title: "Fuel",
    value: "",
  },
  {
    title: "Gas",
    value: "Gas",
  },
  {
    title: "Electricity",
    value: "Electricity",
  },
];

export const footerLinks = [
  {
    title: "About",
    links: [
      { title: "How it works", url: "/" },
      { title: "Partnership", url: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "Events", url: "/" },
      { title: "Blog", url: "/" },

    ],
  },
  {
    title: "Socials",
    links: [
      { title: "Instagram", url: "/" },
      { title: "X", url: "/" },
      { title: "Facebook", url: "/" },
    ],
  },
];


export const countryToCurrencyMap: Record<string, string> = {
  brazil: 'R$',
  'united states': '$',
  'united kingdom': '£',
  japan: '¥',
  france: '€',
  china: '¥',
  germany: '€',
  russia: '₽',
  australia: 'A$',
  canada: 'C$',
  india: '₹'
};