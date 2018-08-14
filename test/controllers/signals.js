let Signal = require('../../app/models/signal');

describe('Signals', () => {
  beforeEach(done => {
    //Before each test we empty the database
    Signal.remove({}, err => {
      done();
    });
  });

  // Index
  describe('/GET /signals', () => {
    it('it should GET all the books', done => {
      chai
        .request(app)
        .get('/signals')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  // Create
  describe('/POST /signals', () => {
    it('it should not POST a signal without timestamp', done => {
      let signal = {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        year: 1954,
      };
      chai
        .request(app)
        .post('/signals')
        .send(signal)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          // res.body.should.have.property('error');
          // res.body.errors.should.have.property('pages');
          // res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
    });
    it('it should POST a signal ', done => {
      let signal = {
        record_id: '5b696d508be676337a28bca4',
        lead: 1,
        timestamp: 1234567890,
        value: 0.87,
      };
      chai
        .request(app)
        .post('/signals')
        .send(signal)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have
            .property('record_id')
            .eql('5b696d508be676337a28bca4');
          res.body.should.have.property('lead').eql(1);
          res.body.should.have.property('timestamp').eql(1234567890);
          res.body.should.have.property('value').eql(0.87);
          done();
        });
    });
  });

  // Show
  describe('/GET /signals/:id', () => {
    it('it should GET a signal by the given id', done => {
      let signal = new Signal({
        record_id: '5b696d508be676337a28bca4',
        lead: 1,
        timestamp: 1234567890,
        value: 0.87,
      });
      signal.save((err, signal) => {
        chai
          .request(app)
          .get('/signals/' + signal._id)
          .send(signal)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('record_id');
            res.body.should.have.property('lead');
            res.body.should.have.property('timestamp');
            res.body.should.have.property('value');
            res.body.should.have.property('_id').equal(signal._id.toString());
            done();
          });
      });
    });
  });

  // Update
  describe('/PUT/:id signal', () => {
    it('it should UPDATE a signal given the id', done => {
      let signal = new Signal({
        record_id: '5b696d508be676337a28bca4',
        lead: 1,
        timestamp: 1234567890,
        value: 0.87,
      });
      signal.save((err, signal) => {
        chai
          .request(app)
          .patch('/signals/' + signal._id)
          .send({
            lead: 2,
            timestamp: 12345678901,
            value: 1.87,
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('lead').eql(2);
            res.body.should.have.property('timestamp').eql(12345678901);
            res.body.should.have.property('value').eql(1.87);
            done();
          });
      });
    });
  });

  // Delete
  describe('/DELETE/:id signal', () => {
    it('it should DELETE a signal given the id', done => {
      let signal = new Signal({
        record_id: '5b696d508be676337a28bca4',
        lead: 1,
        timestamp: 1234567890,
        value: 0.87,
      });
      signal.save((err, signal) => {
        chai
          .request(app)
          .delete('/signals/' + signal._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have
              .property('record_id')
              .eql('5b696d508be676337a28bca4');
            done();
          });
      });
    });
  });
});
