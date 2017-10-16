const MongoClient = require('mongodb').MongoClient;
const url = require('./dbUrl.js').url;
const objectID = require('mongodb').ObjectID;
const connection = require('./dbUrl.js').connection;
const locations = require('./mock-locations.js').locations; 
const users = require('./mock-locations.js').users; 


async function createDB() {

  const db = await connection.then(db => db);

  locationCollection = db.collection('locations');
  usersCollection = db.collection('users');
  await locationCollection.deleteMany({})
  await locationCollection.insertMany(locations);
  await usersCollection.deleteMany({}); 
  await usersCollection.insertMany(users); 
  console.log('restarted database');



  // MongoClient.connect(url, (err, db) => {
  //   if (err) console.log(err)
  //   else {
  //     let skills = db.collection('skills');
  //     skills.deleteMany({}, (err, obj) => {
  //       skills.insertMany([
  //         { "id": 1, "skill": "Plant Identification" },
  //         { "id": 2, "skill": "FS-CD" },
  //         { "id": 3, "skill": "Hiring" },
  //         { "id": 4, "skill": "DG Sets" },
  //         { "id": 5, "skill": "LCL" },
  //         { "id": 6, "skill": "Global Marketing" },
  //         { "id": 7, "skill": "FCPA" },
  //         { "id": 8, "skill": "HTML" },
  //         { "id": 9, "skill": "Mobile Marketing" },
  //         { "id": 10, "skill": "OSGi" },
  //         { "id": 11, "skill": "CFML" },
  //         { "id": 12, "skill": "CBRN" },
  //         { "id": 13, "skill": "JDF" },
  //         { "id": 14, "skill": "Permanent Placement" },
  //         { "id": 15, "skill": "WS" },
  //         { "id": 16, "skill": "Digital Electronics" },
  //         { "id": 17, "skill": "Theology" },
  //         { "id": 18, "skill": "xSeries" },
  //         { "id": 19, "skill": "IPv6" },
  //         { "id": 20, "skill": "Vector Illustration" },
  //         { "id": 21, "skill": "Kaizen Leadership" },
  //         { "id": 22, "skill": "Zynx" },
  //         { "id": 23, "skill": "NRF" },
  //         { "id": 24, "skill": "Nightlife" },
  //         { "id": 25, "skill": "JDK" },
  //         { "id": 26, "skill": "Two-factor Authentication" },
  //         { "id": 27, "skill": "Tax" },
  //         { "id": 28, "skill": "OOS" },
  //         { "id": 29, "skill": "NWDS" },
  //         { "id": 30, "skill": "Typewriter" }]);
  //     })

  //     console.log('db connected')
  //     //   db.createCollection('jobs', function (err, res) {
  //     //     db.createCollection('users', function (err, res) {
  //     //       if (err) console.log(err);
  //     //       console.log(res);
  //     //     })
  //     //   })
  //     // })
  //     var usersCollection = db.collection('users');
  //     var jobsCollection = db.collection('jobs');

  //     usersCollection.deleteMany({}, (err, obj) => {


  //       usersCollection.insertMany([{
  //         username: 'dani',
  //         password: '1234',
  //         // skills: ['javascript', 'mongodb', 'angular', 'react'],
  //         skills: [1,2,3,4,5],
  //         email: 'dani@gmail.com',
  //         location: 'tel aviv',
  //         firstname: 'dani',
  //         address: {
  //           city: 'ramat hasharon',
  //           street: 'Khana Szenes St 5',
  //           coordinates: [34.8403, 32.1378]
  //         },
  //         lastname: 'green',
  //         public_description: 'hard worker, dedicated',
  //         private_data: `2005-2007: microsoft  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`

  //       },
  //       {
  //         username: 'steff',
  //         password: '4321',
  //         // skills: ['es6', 'backbone', 'nodejs', 'php', 'css3'],
  //         skills: [5,6,7,8,9,10],
  //         email: 'binyamin.green@gmail.com',
  //         location: 'amsterdam',
  //         firstname: 'seffi',
  //         lastname: 'vanbo',
  //         // address: 'king george 5 tel aviv',
  //         address: {
  //           city: 'Tel Aviv-Yafo, Israel',
  //           street: 'Khana Szenes St 5',
  //           coordinates: [34.787779, 32.057918]
  //         },

  //         public_description: 'really nice',
  //         private_data: `2001-2006: pixar There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,`,
  //         // intrestedJobs: []
  //       },
  //       {
  //         username: 'binyamin',
  //         password: 'asdf',
  //         // skills: ['vuejs', 'backbone', 'nodejs', 'post-cc3', 'helloworld'],
  //         skills: [20,21,22,19,15],
  //         email: 'binyamin.green@gmail.com',
  //         location: 'berlin',
  //         firstname: 'bebe',
  //         lastname: 'green',
  //         address: 'haviva riek 1 tel aviv',
  //         public_description: 'cool',
  //         private_data: `2001-2006: pixar There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,`,
  //         // intrestedJobs: []
  //       }
  //       ],
  //         (err, res) => {
  //           usersCollection.findOne({
  //             username: 'dani'
  //           }).then((data) => {
  //             console.log(data._id);
  //             daniID = data._id;
  //             usersCollection.findOne({
  //               username: 'steff'
  //             }).then((data) => {
  //               console.log(data._id);
  //               steffID = data._id;
  //               jobsCollection.deleteMany({}, (err, obj) => {

  //                 jobsCollection.insertMany([{
  //                   timestamp: new Date(),
  //                   title: 'javascript developer',
  //                   // skills: ['javascript', 'nodejs'],
  //                   skills: [3, 4, 5],
  //                   location: 'berlin',
  //                   company: 'google',
  //                   // address: 'zabotinski 10 ramat gan',
  //                   address: {
  //                     city: 'Ramat Gan, Israel',
  //                     street: 'bezalel St 19',

  //                   },
  //                   coordinates: [34.801426, 32.086502],
  //                   geometry: {
  //                     type: 'Point',
  //                     coordinates: [34.801426, 32.086502]
  //                   },
  //                   date: new Date(),
  //                   coordinates: [34.85549, 32.1093339],
  //                   description: `Where does it come from?
  //                   Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

  //                   The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
  //                   publisher: 'dani',
  //                   applicants: ['steff']
  //                 }, {
  //                   timestamp: new Date(),
  //                   title: 'full stack engineer',
  //                   // skills: ['react', 'es6'],
  //                   skills: [6, 7, 8],

  //                   location: 'San Francisco',
  //                   company: 'cooler company',
  //                   date: new Date(),
  //                   coordinates: [34.81842, 32.119365],
  //                   // address: '',
  //                   address: {
  //                     city: 'Tel Aviv-Yafo, Israel',
  //                     street: 'herbst St 2',

  //                   },
  //                   geometry: {
  //                     type: 'Point',
  //                     coordinates: [34.81842, 32.119365]
  //                   },

  //                   description: `Where does it come from?
  //                   Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

  //                   The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.` ,
  //                   publisher: 'steff',
  //                   applicants: ['dani', 'steff']
  //                 }, {
  //                   timestamp: new Date(),
  //                   title: 'backend developer',
  //                   // skills: ['Angular 4', 'backbone', 'vuejs'],
  //                   skills: [8, 9, 10],

  //                   location: 'amsterdam',
  //                   company: 'cool company',
  //                   date: new Date(),
  //                   coordinates: [34.81739, 32.17198],
  //                   // address: 'tel aviv',
  //                   address: {
  //                     city: 'Herzliya, Israel',
  //                     street: 'tsela darom St 5',

  //                   },
  //                   geometry: {
  //                     type: 'Point',
  //                     coordinates: [34.81739, 32.17198]
  //                   },
  //                   description: `Where does it come from?
  //                   Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

  //                   The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
  //                   publisher: 'steff',
  //                   applicants: ['dani']
  //                 }, {
  //                   timestamp: new Date(),
  //                   title: 'fullstack web developer',
  //                   // skills: ['html5', 'vuejs', 'css3', 'es5'],
  //                   skills: [10, 11, 12, 13, 14, 15],

  //                   location: 'berlin',
  //                   company: 'facebook',
  //                   date: Date(),
  //                   coordinates: [35.206375, 31.788594],
  //                   // address: 'tel aviv',
  //                   address: {
  //                     city: 'Jerusalem, Israel',
  //                     street: 'yafo St 212',

  //                   },
  //                   geometry: {
  //                     type: 'Point',
  //                     coordinates: [35.206375, 31.788594]
  //                   },

  //                   description: `Where does it come from?
  //                   Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

  //                   The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.` ,
  //                   publisher: 'steff',
  //                   // applicants: ['steff']
  //                 }, {
  //                   timestamp: new Date(),
  //                   title: 'Senior javascript developer',
  //                   // skills: ['react', 'es6'],
  //                   skills: [15, 16, 17, 18],
  //                   location: 'New York',
  //                   company: 'hp',
  //                   date: Date(),
  //                   // geometry: {
  //                   // type: 'point',
  //                   coordinates: [34.771447, 32.062757]
  //                   // }
  //                   ,
  //                   // address: 'tel aviv',
  //                   address: {
  //                     city: 'Tel Aviv-Yafo, Israel',
  //                     street: 'Rothschild 22',

  //                   },

  //                   geometry: {
  //                     type: 'Point',
  //                     coordinates: [35.014801, 31.905541]
  //                   },

  //                   description: `Where does it come from?
  //                     Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

  //                     The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
  //                   publisher: 'steff',
  //                   // applicants: ['steff']
  //                 },
  //                 {
  //                   timestamp: new Date(),
  //                   title: 'Devops engineer',
  //                   // skills: ['backbone', 'post-css'],
  //                   skills: [3, 4, 5],

  //                   location: 'New York',
  //                   company: 'microsoft',
  //                   date: Date(),

  //                   coordinates: [34.889317, 32.174741],
  //                   // address: 'jerusalem',
  //                   address: {
  //                     city: 'Ramat Hasharon, Israel',
  //                     street: 'HaPnina St 3',

  //                   },
  //                   geometry: {
  //                     type: 'Point',
  //                     coordinates: [34.889317, 32.174741]
  //                   },

  //                   description: `Where does it come from?
  //                     Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

  //                     The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
  //                   publisher: 'steff',
  //                   // applicants: ['steff']
  //                 }
  //                 ], (err, res) => {
  //                   if (err) console.log(err);
  //                   jobsCollection.findOne({ title: 'javascript developer' })
  //                     .then((data) => {
  //                       usersCollection.updateOne({ username: "steff" },
  //                         {
  //                           $addToSet: {
  //                             intrestedJobs: data._id
  //                           }
  //                         }, (err, res) => {
  //                           db.collection('jobs').createIndex({ geometry: "2dsphere" })
  //                             .then((res) => {
  //                               db.collection('jobs').createIndex({ coordinates: '2dsphere' })
  //                                 .then(res => {
  //                                   console.log(res);

  //                                 })
  //                             })
  //                         })
  //                     })
  //                   // console.log(res);
  //                 })
  //               })

  //             }).catch((err) => {
  //               console.log(err);
  //             })
  //           }).catch((err) => {
  //             console.log(err);
  //           })
  //         });
  //     });
  //   }

  // })
}

module.exports = createDB;
