// ********************** Initialize server **********************************

const server = require('../src/index'); //TODO: Make sure the path to your index.js is correctly added

// ********************** Import Libraries ***********************************

const chai = require('chai'); // Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

// ********************** DEFAULT WELCOME TESTCASE ****************************

describe('Server!', () => {
  // Sample test case given to test / endpoint.
  it('Returns the default welcome message', done => {
    chai
      .request(server)
      .get('/welcome')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        assert.strictEqual(res.body.message, 'Welcome!');
        done();
      });
  });
});

// *********************** TODO: WRITE 2 UNIT TESTCASES **************************
//Unit Tests for login
describe('Testing Render', () => {
  // Positive test case
  it('test "/login" route should render with an html response', (done) => {
    chai.request(server)
      .get('/login')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });

  // Negative test case
  it('test "/non-existing-route" route should not render with an html response', (done) => {
    chai.request(server)
      .get('/non-existing-route')
      .end((err, res) => {
        res.should.not.have.status(404);
        done();
      });
  });
});
//Unit Tests for Register
describe('Testing Register API', () => {
  // Positive Test Case
  it('should successfully register a new user and return a redirect to /login', (done) => {
    chai.request(server)
      .post('/register')
      .send({
        username: 'adriannica',
        email: 'adrian@gmail.com',
        password: 'supercoolpassword',
        first_name: 'Adrian',
        last_name: 'Nica',
        date_of_birth: '2003-08-29'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });


});
// ********************************************************************************