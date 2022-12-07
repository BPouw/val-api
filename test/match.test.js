// process.env.MONGO_DB_NAME = 'ValorantTestDatabase';

// let server = require('../server');

// const chai = require('chai');
// let chaiHttp = require('chai-http');
// const assert = chai.assert();


// chai.use(chaiHttp);
//Our parent block
// describe('Books', () => {
//     beforeEach((done) => { //Before each test we empty the database
//         Book.remove({}, (err) => { 
//            done();           
//         });        
//     });
// /*
//   * Test the /GET route
//   */
//   describe('/GET book', () => {
//       it('it should GET all the books', (done) => {
//         chai.request(server)
//             .get('/book')
//             .end((err, res) => {
//                   res.should.have.status(200);
//                   res.body.should.be.a('array');
//                   res.body.length.should.be.eql(0);
//               done();
//             });
//       });
//   });

// });