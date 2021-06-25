import bcrypt from "bcryptjs";
const data = {
  users_mentor: [
    {
          name : "Sujoy Seal",
          email: "sujoysea33l@gmail.com",
          password: "22",
          mobilenumber: "9064729868",
          companyName: "Conjuring",
          employeeIDNumber: "22",
          address: "Durgapur",
          employeeIDimage: "898",
          governmentIDimage: "99"
      },
    
    {
          name : "Shuvro Das",
          email: "shuvrodas@gmail.com",
          password: "33",
          mobilenumber: "9064729868",
          companyName: "Conjuring",
          employeeIDNumber: "22",
          address: "Durgapur",
          employeeIDimage: "898",
          governmentIDimage: "99"
      },
    
    {
          name : "Aisha Naseer",
          email: "naseeraisha34@gmail.com",
          password: "11",
          mobilenumber: "98676723232",
          companyName: "Conjuring",
          employeeIDNumber: "22",
          address: "Durgapur",
          employeeIDimage: "898",
          governmentIDimage: "99"
      },
    
  ]
,
users_mentee: [
  {
        name : "Tomar Husaiin",
        email: "tomar@gmail.com",
        password: "22",
        mobilenumber: "9066629868",
        instituteName: "erConjuring",
        enrollmentNumber: "222",
        address: "Himachal",
        
    },
  
  {
    name : "Rima Choudhury",
    email: "chrima@gmail.com",
    password: "22",
    mobilenumber: "906779868",
    instituteName: "lo",
    enrollmentNumber: "222",
    address: "Himachal",
    },
  
  {
    name : "Shivangi Mehta",
    email: "mehtashivangi@gmail.com",
    password: "2277",
    mobilenumber: "9066629800",
    instituteName: "ty",
    enrollmentNumber: "922",
    address: "UK",
    },
  
]
,

sessions : [
  {
    sessionName: "Networks",
    Date: "18 Augast,2021",
    Price: 900,
    Referral : true,
    Test: true,
    Interview: true,
    multipleOrganizers: true,
    multipleStudents: true,
    Testlink: "https://www.codechef.com/ide",
    Organizers : ["60c49a7ae0d4bb7954175d0b","60c49a7ae0d4bb7954175d0c"],
    Participants : ["60bc302b1b83b75858b9bba7","60bc302b1b83b75858b9bba8"]
  },
  {
    sessionName: "DBMS",
    Date: "18 June,2021",
    Price: 3900,
    Referral : true,
    Test: true,
    Interview: true,
    multipleOrganizers: true,
    multipleStudents: true,
    Testlink: "https://www.codechef.com/ide",
    Organizers : ["60c49a7ae0d4bb7954175d0b","60c49a7ae0d4bb7954175d0d","60c49a7ae0d4bb7954175d0c"],
    Participants : ["60bc302b1b83b75858b9bba7","60bc302b1b83b75858b9bba6"]
  },
  {
    sessionName: "C++",
    Date: "20 July,2021",
    Price: 100,
    Referral : true,
    Test: true,
    Interview: true,
    multipleOrganizers: true,
    multipleStudents: true,
    Testlink: "https://www.geeksforgeeks.org/",
    Organizers : ["60c49a7ae0d4bb7954175d0b","60c49a7ae0d4bb7954175d0c"],
    Participants : ["60bc302b1b83b75858b9bba7","60bc302b1b83b75858b9bba6"]
  },
]
  
  
};

export default data;
