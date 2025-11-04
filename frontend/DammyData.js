const DailyBlogList = [
  {
    username: "A1",
    name: "Admin 1",
    email: "admin1@gmail.com",
    image: "",
    profileimg: "", //require("../app/assets/images/NUSTWEBLOGO.png"),
    description:
      "Its hard for you to sleep when you really know you need Win to be successful. Yes Its hard for you to sleep when you really know you need Win to be successful. ",
    department: "Admins",
    tags: "Admin2, Admin3",
    views: "200",
  },
  {
    username: "A2",
    name: "Admin 2",
    email: "admin2@gmail.com",
    image: "", //require("../app/assets/images/NUSTBUILDING.png"),
    profileimg: "", //require("../app/assets/images/logonust.jpg"),
    description:
      "Its hard for you to sleep when you really know you need Win to be successful. Yes Its hard for you to sleep when you really know you need Win to be successful. ",
    department: "Admins",
    tags: "Admin2, Admin3",
    time: "08:00",
    views: "130",
  },
  {
    username: "A2",
    name: "Admin 2",
    email: "admin2@gmail.com",
    image: "", //require("../app/assets/images/NUSTBUILDING.png"),
    profileimg: null,
    description:
      "Its hard for you to sleep when you really know you need Win to be successful. Yes Its hard for you to sleep when you really know you need Win to be successful. ",
    department: "Admins",
    tags: "Admin1, Admin3",
    time: "14:08",
    views: "20",
  },
];

const PostList = [
  {
    username: "A3",
    name: "Admin 3",
    email: "admin3@gmail.com",
    image: "", //require("../app/assets/images/N.png"),
    profileimg: "", //require("../app/assets/images/NUSTWEBLOGO.png"),
    description:
      "Its hard for you to sleep when you really know you need Win to be successful. Yes Its hard for you to sleep when you really know you need Win to be successful. ",
    year: "✅",
    time: "21:00",
    views: "500",
    stars: "15",
  },
  {
    username: "A1",
    name: "Admin 1",
    email: "admin1@gmail.com",
    image: "", //require("../app/assets/images/N.png"),
    profileimg: "", //require("../app/assets/images/NUSTWEBLOGO.png"),
    description:
      "Its hard for you to sleep when you really know you need Win to be successful. Yes Its hard for you to sleep when you really know you need Win to be successful. ",
    year: "✅",
    time: "21:00",
    views: "1k",
    stars: "70",
  },
  {
    username: "A2",
    name: "Admin 2",
    email: "admin2@gmail.com",
    image: "", //require("../app/assets/images/N.png"),
    profileimg: "", //require("../app/assets/images/NUSTWEBLOGO.png"),
    description:
      "Its hard for you to sleep when you really know you need Win to be successful. Yes Its hard for you to sleep when you really know you need Win to be successful. ",
    year: "✅",
    time: "21:00",
    views: "27",
    stars: "521",
  },
];

const tags = [
  {
    name: "Admin1",
    email: "admin1@gmail.com",
    id: "A1",
  },
  {
    name: "Admin2",
    email: "admin2@gmail.com",
    id: "A2",
  },
  {
    name: "Admin3",
    email: "admin3@gmail.com",
    id: "A3",
  },
  {
    name: "Admin4",
    email: "admin4@gmail.com",
    id: "A4",
  },
  {
    name: "Admin5",
    email: "admin5@gmail.com",
    id: "A5",
  },
];

const userDirectory = [
  {
    id: 1,
    name: "Tinotenda Jenya Muyambo",
    email: "tinotendajenya.org@gmail.com",
    username: "Tinotenda Jenya Muyambo",
    ds1: "Unverified",
    verificationStatus: null,
    cellDetails: null,
    profInitials: null,
    service: null,
    serviceName: null,
    // year: null,
    program: null,
    profession: null,
    networkLink: null,
    qualification: null,
    specifications: null,
    bio: null,
  },
  {
    id: 2,
    name: "Tinotenda Jenya Muyambo",
    email: "tinotendajenya.org@gmail.com",
    username: "Tinotenda Jenya Muyambo",
    ds1: "STUDENT",
    verificationStatus: "staff",
    cellDetails: "0786443025",
    profInitials: "Engineer",
    service: "ACADEMIC DEPARTMENT",
    serviceName: "Chemical Engineering",
    // year: "3.2",
    program: "BSC and Honours in Chemical Engineering",
    profession: "Undergraduate",
    networkLink: "#tino01",
    qualification: null,
    specifications: null,
    bio: "hello",
  },
  {
    id: 3,
    name: "Tinotenda Muyambo",
    email: "tinotendajenya@gmail.com",
    username: "Tinotenda Muyambo",
    ds1: "staff",
    verificationStatus: "Dean",
    profession: "Dean",
    cellDetails: "0786443025",
    profInitials: "Dr",
    service: "FACULTY",
    serviceName: "Chemical Engineering",
    year: null,
    program: null,
    qualification: "MSC in Environmental Safety",
    specifications: {
      publications: "Enviromental Safety on Carbon Monoxide Emissions",
      Research: "Research in Enviromental Safety on Carbon Monoxide Emissions",
      certifications: "Certificate in Environmental Science",
    },
  },
];

const orgDirectory = [
  {
    id: "E01",
    name: "engineering",
    ds1: "FACULTY",
    ds2: null,
    email: "engineering@gmail.com",
    executives: [
      userDirectory.map((item) =>
        item.organisation == "ds1"
          ? "profession: " +
            item.ds2 +
            " Initial" +
            item.profInitials +
            "," +
            " name" +
            item.name +
            ";"
          : item.orgDirectory == "ds1"
          ? "profession: " +
            item.ds2 +
            " Initial" +
            item.profInitials +
            "," +
            " name" +
            item.name +
            ";"
          : null
      ),
    ],
    department: null,
    faculty: null,
    programs: null,
    bio: "What is Engineering",
  },
  {
    id: "ECE",
    name: "Chemical Engineering",
    ds1: "ACADEMIC DEPARTMENT",
    ds2: null,
    email: "eceengineering@gmail.com",
    executives: [
      userDirectory.map((item) =>
        item.organisation == "ds1"
          ? "profession: " +
            item.ds2 +
            " Initial" +
            item.profInitials +
            "," +
            " name" +
            item.name +
            ";"
          : item.orgDirectory == "ds1"
          ? "profession: " +
            item.ds2 +
            " Initial" +
            item.profInitials +
            "," +
            " name" +
            item.name +
            ";"
          : null
      ),
    ],
    department: null,
    faculty: null,
    programs: [
      { id: 1, program: "MSC in Environmental Safety" },
      { id: 2, program: "BSC in Environmental Safety" },
      { id: 3, program: "BSC and Honours in Chemical Engineering" },
      { id: 4, program: "MSC and Honours in Chemical Engineering" },
    ],
    bio: "What is Chemical Engineering",
  },
  {
    id: "orgsrc01",
    name: "Academic Affairs",
    ds1: "Office",
    ds2: null,
    email: "orgsrc@gmail.com",
    executives: [
      userDirectory.map((item) =>
        item.organisation == "ds1"
          ? "profession: " +
            item.ds2 +
            " Initial" +
            item.profInitials +
            "," +
            " name" +
            item.name +
            ";"
          : item.orgDirectory == "ds1"
          ? "profession: " +
            item.ds2 +
            " Initial" +
            item.profInitials +
            "," +
            " name" +
            item.name +
            ";"
          : null
      ),
    ],
    department: null,
    faculty: null,
    programs: null,
    bio: "What is Organisation",
  },
  {
    id: "SS1",
    name: "Security Service",
    ds1: "SERVICE",
    ds2: "securityService",
    email: "securityservice@gmail.com",
    executives: [
      userDirectory.map((item) =>
        item.organisation == "ds1"
          ? "profession: " +
            item.ds2 +
            " Initial" +
            item.profInitials +
            "," +
            " name" +
            item.name +
            ";"
          : item.orgDirectory == "ds1"
          ? "profession: " +
            item.ds2 +
            " Initial" +
            item.profInitials +
            "," +
            " name" +
            item.name +
            ";"
          : null
      ),
    ],
    department: null,
    faculty: null,
    programs: null,
    bio: "What is security service",
  },
  {
    id: "BS1",
    name: "Bursary",
    ds1: "OFFICE DEPARTMENT",
    ds2: "Bursary",
    email: "bursary@gmail.com",
    executives: [
      userDirectory.map((item) =>
        item.organisation == ""
          ? "profession: " +
            item.ds2 +
            " Initial" +
            item.profInitials +
            "," +
            " name" +
            item.name +
            ";"
          : item.orgDirectory == ""
          ? "profession: " +
            item.ds2 +
            " Initial" +
            item.profInitials +
            "," +
            " name" +
            item.name +
            ";"
          : null
      ),
    ],
    department: "",
    faculty: null,
    programs: null,
    bio: "What is Bursary",
  },
  {
    id: "SRC01",
    name: "SRC",
    ds1: "OFFICE DEPARTMENT",
    ds2: "SRC",
    email: "src@gmail.com",
    executives: [
      userDirectory.map((item) =>
        item.organisation == "ds1"
          ? "profession: " +
            item.ds2 +
            " Initial" +
            item.profInitials +
            "," +
            " name" +
            item.name +
            ";"
          : item.orgDirectory == "ds1"
          ? "profession: " +
            item.ds2 +
            " Initial" +
            item.profInitials +
            "," +
            " name" +
            item.name +
            ";"
          : null
      ),
    ],
    department: "",
    faculty: null,
    programs: null,
    bio: "What is SRC",
  },
  {
    id: "ASH",
    name: "Applied Science",
    ds1: "ACADEMIC DEPARTMENT",
    ds2: "AppliedScience",
    email: "ASH@gmail.com",
    executives: [
      userDirectory.map((item) =>
        item.organisation == "ds1"
          ? "profession: " +
            item.ds2 +
            " Initial" +
            item.profInitials +
            "," +
            " name" +
            item.name +
            ";"
          : item.orgDirectory == "ds1"
          ? "profession: " +
            item.ds2 +
            " Initial" +
            item.profInitials +
            "," +
            " name" +
            item.name +
            ";"
          : null
      ),
    ],
    department: "",
    faculty: null,
    programs: null,
    bio:
      "When you call showMessage method you'll need to pass a message object to show your message. In this call you could pass some custom attributes to customize your message. Most of the FlashMessage Component props can be passed in runtime calls of showMessage. This common props/attributes are identified in Props table as In Message Object." +
      "If you need to customize de background color or text color of your message beyond the default types (success, warning, info and danger) you could use the backgroundColor or/and color attributes in your message object:",
  },
  {
    id: "12",
    name: "Tino's Blog",
    ds1: "Blog page",
    ds2: "Tino's Blog",
    email: "tinoblog@gmail.com",
    executives: null,
    department: null,
    faculty: null,
    programs: null,
    bio:
      "When you call showMessage method you'll need to pass a message object to show your message. In this call you could pass some custom attributes to customize your message. Most of the FlashMessage Component props can be passed in runtime calls of showMessage. This common props/attributes are identified in Props table as In Message Object." +
      "If you need to customize de background color or text color of your message beyond the default types (success, warning, info and danger) you could use the backgroundColor or/and color attributes in your message object:",
  },
  {
    id: "21",
    name: "Tech Updates",
    ds1: "Community",
    ds2: "tech_updates",
    email: "tinotendajenya.org@gmail.com",
    executives: null,
    department: null,
    faculty: null,
    programs: null,
    bio:
      "When you call showMessage method you'll need to pass a message object to show your message. In this call you could pass some custom attributes to customize your message. Most of the FlashMessage Component props can be passed in runtime calls of showMessage. This common props/attributes are identified in Props table as In Message Object." +
      "If you need to customize de background color or text color of your message beyond the default types (success, warning, info and danger) you could use the backgroundColor or/and color attributes in your message object:",
  },
  {
    id: "ADMINS1",
    name: "ADMINS1",
    ds1: "ACADEMIC DEPARTMENT",
    ds2: "ADMINS1",
    email: "A1@gmail.com",
    executives: [
      userDirectory.map((item) =>
        item.organisation == "ds1"
          ? "profession: " +
            item.ds2 +
            " Initial" +
            item.profInitials +
            "," +
            " name" +
            item.name +
            ";"
          : item.orgDirectory == "ds1"
          ? "profession: " +
            item.ds2 +
            " Initial" +
            item.profInitials +
            "," +
            " name" +
            item.name +
            ";"
          : null
      ),
    ],
    department: "",
    faculty: null,
    programs: null,
    bio:
      "When you call showMessage method you'll need to pass a message object to show your message. In this call you could pass some custom attributes to customize your message. Most of the FlashMessage Component props can be passed in runtime calls of showMessage. This common props/attributes are identified in Props table as In Message Object." +
      "If you need to customize de background color or text color of your message beyond the default types (success, warning, info and danger) you could use the backgroundColor or/and color attributes in your message object:",
  },
];

const trendingData = [
  {
    trendingtype: "Accommodation",
    locationName: "Acc1",
    image: require("./assets/images/general.jpg"),
    Profileimg: require("./assets/images/adminblock.jpg"),
    description: "Miss Nust 2025, The winner gets $5",
    MutualConnects: "Admin5, Admin3, Admin10",
  },

  {
    trendingtype: "Accommodation",
    locationName: "Acc2",
    image: require("./assets/images/general.jpg"),
    Profileimg: require("./assets/images/adminblock.jpg"),
    description: "Miss Nust 2025, The winner gets $5",
    MutualConnects: "Admin5, Admin3, Admin10",
  },

  {
    trendingtype: "Accommodation",
    locationName: "Acc3",
    image: require("./assets/images/general.jpg"),
    Profileimg: require("./assets/images/adminblock.jpg"),
    description: "Miss Nust 2025, The winner gets $5",
    MutualConnects: "Admin5, Admin3, Admin10",
  },

  {
    trendingtype: "Marketing",
    locationName: "Marketing1",
    image: require("./assets/images/general.jpg"),
    Profileimg: require("./assets/images/adminblock.jpg"),
    description: "Miss Nust 2025, The winner gets $5",
    MutualConnects: "Admin5, Admin3, Admin10",
  },

  {
    trendingtype: "Marketing",
    locationName: "Marketing2",
    image: require("./assets/images/general.jpg"),
    Profileimg: require("./assets/images/adminblock.jpg"),
    description: "Miss Nust 2025, The winner gets $5",
    MutualConnects: "Admin5, Admin3, Admin10",
  },

  {
    trendingtype: "Marketing",
    locationName: "Marketing3",
    image: require("./assets/images/general.jpg"),
    Profileimg: require("./assets/images/adminblock.jpg"),
    description: "Miss Nust 2025, The winner gets $5",
    MutualConnects: "Admin5, Admin3, Admin10",
  },

  {
    trendingtype: "Events",
    locationName: "Events1",
    Profileimg: require("./assets/images/general.jpg"),
    description: "its hard but we make through",
    MutualConnects: "Admin5, Admin3, Admin10",
  },
  
  {
    trendingtype: "Events",
    locationName: "Events2",
    name: "Examination Issues",
    Profileimg: require("./assets/images/general.jpg"),
    description: "Kindly check if you are one of them",
    MutualConnects: "Admin5, Admin3, Admin10",
  },
];

export {
  trendingData,

  DailyBlogList,

  orgDirectory,
  PostList,
  tags,
  userDirectory,
};
