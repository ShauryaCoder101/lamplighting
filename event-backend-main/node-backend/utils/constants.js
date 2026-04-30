// ─────────────────────────────────────────────
//  CONSTANTS — banned words & guest name list
// ─────────────────────────────────────────────

const BANNED_WORDS = [
  // English
  "fuck", "shit", "bitch", "asshole", "bastard",
  "dick", "pussy", "slut", "whore", "mf", "motherfucker",
  "ass", "nigga", "nigger",

  // Hindi
  "bc", "bhenchod", "behenchod",
  "mc", "madarchod",
  "chutiya", "chut", "gandu",
  "randi", "kutti", "kamine", "harami",
  "bhomsadike", "bhosadike", "raand",
  "randikabachcha", "chutmarika",

  // Variations
  "bsdk", "bkl", "lodu", "lawda",
];

// 300 filler names — used when registrations are below 300
const GUEST_NAMES = [
  "Aarav Sharma", "Vivaan Patel", "Aditya Singh", "Krishna Gupta", "Ananya Mishra",
  "Riya Verma", "Isha Reddy", "Diya Kapoor", "Kabir Malhotra", "Arjun Nair",
  "Rahul Chopra", "Neha Joshi", "Saanvi Iyer", "Meera Bhat", "Aryan Desai",
  "Kunal Mehta", "Sneha Rao", "Tanya Saxena", "Rohan Thakur", "Priya Sinha",
  "Vihaan Kumar", "Ishaan Das", "Reyansh Jain", "Ayaan Shah", "Atharv Pillai",
  "Advik Bansal", "Sai Menon", "Dhruv Kulkarni", "Harsh Pandey", "Rudra Tiwari",
  "Arnav Choudhary", "Ritvik Agarwal", "Kian Bose", "Darsh Rajput", "Lakshya Rawat",
  "Shaurya Goyal", "Aahana Dutta", "Pari Sethi", "Myra Bhatt", "Sara Khanna",
  "Kiara Mukherjee", "Anika Arora", "Navya Srivastava", "Avni Chauhan", "Aadhya Dhawan",
  "Sanya Khatri", "Nitya Grover", "Kavya Malik", "Pihu Bajaj", "Ira Kohli",
  "Manav Lal", "Yash Mital", "Tanish Bhargava", "Aarush Rathore", "Neil Narayan",
  "Dev Sengupta", "Om Kashyap", "Krish Batra", "Jay Narang", "Ojas Sabharwal",
  "Pranav Luthra", "Virat Chawla", "Kabeer Tandon", "Sahil Vohra", "Arjun Khurana",
  "Neel Chadha", "Raghav Ahuja", "Abhinav Suri", "Kartik Goel", "Nikhil Gulati",
  "Rishi Walia", "Aman Anand", "Aakash Mani", "Varun Sagar", "Parth Vashisht",
  "Siddharth Kaul", "Gaurav Oberoi", "Mohit Bedi", "Tarun Juneja", "Vishal Marwah",
  "Ankit Gambhir", "Ajay Trehan", "Vikram Dang", "Piyush Bhasin", "Sumit Sodhi",
  "Deepak Saini", "Rakesh Chugh", "Ashish Duggal", "Naveen Puri", "Lalit Monga",
  "Manoj Bhandari", "Suresh Wadhwa", "Ramesh Kalra", "Arun Sawhney", "Vijay Bhatia",
  "Sanjay Taneja", "Alok Khosla", "Rajesh Miglani", "Naresh Sikka", "Vinod Chhabra",
  "Pooja Mehra", "Swati Singhal", "Ankita Dhingra", "Pallavi Kapoor", "Divya Rastogi",
  "Shruti Nagpal", "Nidhi Mittal", "Megha Behl", "Richa Mahajan", "Sonal Gupta",
  "Deepika Saran", "Anjali Kathuria", "Preeti Madhok", "Shikha Uppal", "Archana Khullar",
  "Vandana Kapur", "Jyoti Sahni", "Komal Maken", "Renuka Dhillon", "Manisha Bakshi",
  "Sunita Thapar", "Geeta Babbar", "Usha Jaitly", "Kamla Sethi", "Rekha Aneja",
  "Amit Ahuja", "Rohit Kalra", "Sunil Chandra", "Mohan Devgan", "Rajiv Kathpalia",
  "Sandeep Mehra", "Nitin Beri", "Hemant Jolly", "Mukesh Bajwa", "Pradeep Arya",
  "Dinesh Malhotra", "Kamal Gujral", "Bharat Bhalla", "Arvind Guleri", "Girish Sachdeva",
  "Narinder Sahota", "Anil Lamba", "Satish Chawla", "Harish Bahl", "Vivek Katyal",
  "Ashok Behl", "Prakash Dua", "Rajan Kukreja", "Baldev Nayyar", "Jaspal Rekhi",
  "Nandini Sharma", "Aditi Sharma", "Bhavna Singh", "Charu Aggarwal", "Garima Sharma",
  "Hema Kapoor", "Indu Mahajan", "Jaya Malhotra", "Kanchan Singh", "Lalita Patel",
  "Madhu Grover", "Nirmala Bajaj", "Padma Mehta", "Radha Gupta", "Saroj Khanna",
  "Tara Bhalla", "Uma Thapar", "Veena Anand", "Yamini Bakshi", "Zoya Malik",
  "Abhishek Roy", "Bipin Chand", "Chirag Vij", "Dheeraj Garg", "Ekansh Vohra",
  "Faiz Ali", "Gautam Bahl", "Hitesh Kochhar", "Ishan Sehgal", "Jagdish Sapra",
  "Keshav Dhawan", "Lokesh Chhabra", "Mayank Nanda", "Nakul Uppal", "Omkar Dhillon",
  "Pankaj Saini", "Qadir Khan", "Rattan Kalra", "Sachin Juneja", "Tushar Gambhir",
  "Udayan Mitra", "Vikas Batra", "Wasim Rizvi", "Yuvraj Chaddha", "Zubin Mehta",
  "Aarti Tandon", "Bela Sahni", "Chhavi Dutt", "Disha Kapoor", "Ekta Suri",
  "Falguni Desai", "Gitanjali Bose", "Harshita Mehra", "Iti Grover", "Jhanvi Sharma",
  "Kiran Malhotra", "Lata Bajaj", "Mala Khanna", "Namrata Sarin", "Omita Gill",
  "Purnima Sood", "Ragini Seth", "Sakshi Narang", "Tanvi Sabharwal", "Urvi Luthra",
  "Vani Chawla", "Wafa Sheikh", "Yami Puri", "Zara Ansari", "Advait Raina",
  "Bodhi Trivedi", "Chetan Rawat", "Daksh Chadha", "Ehsaan Qureshi", "Farhan Syed",
  "Gopal Thakur", "Harman Gill", "Indrajit Sen", "Jai Shankar", "Kuber Dhar",
  "Lakshman Das", "Mihir Jain", "Nakshatra Rao", "Ojasvi Pillai", "Paras Bhargava",
  "Raghuveer Rana", "Shantanu Mitra", "Trilok Yadav", "Uday Shankar", "Vaibhav Puri",
  "Akhil Chandra", "Brijesh Saxena", "Chandan Tiwari", "Devendra Singh", "Gaurang Mehta",
  "Hemraj Kulkarni", "Jitendra Nair", "Kailash Iyer", "Laxman Desai", "Mahendra Shah",
  "Navin Reddy", "Omesh Patel", "Paresh Kumar", "Rajendra Mishra", "Shyam Verma",
  "Trilokesh Gupta", "Umakant Das", "Venkatesh Rao", "Yogesh Pandey", "Ajit Agarwal",
  "Bhupesh Joshi", "Chandrashekhar Bhat", "Devdas Sinha", "Gyanendra Choudhary",
  "Hariom Bansal", "Jagmohan Menon", "Kamalnath Pillai", "Laxminarayan Rajput",
  "Madhusudan Goyal", "Nandkishore Dutta", "Paramjeet Sethi", "Rajkumar Bhatt",
  "Satyanarayan Khanna", "Udaybhan Arora", "Vishwanath Srivastava",
];

module.exports = { BANNED_WORDS, GUEST_NAMES };
