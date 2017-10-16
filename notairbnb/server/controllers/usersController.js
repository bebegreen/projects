var usersService = require('../models/users-service.js');

exports.login = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  usersService.authenticate(username, password)
    .then(token => {
      res.json({ token });
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(err.message);
    })
}


exports.getApplicants = (req, res) => {
  let username = req.username;

  let job_id = req.params.job_id;
  usersService.getApplicants(job_id)
    .then(applicants => {
      res.json(applicants);
    })
    .catch(err => {
      if (err.message === 'no applicants') {
        res.send('no applicants');
      }
      else {

        res.sendStatus(500);
      }
    })

}

exports.register = (req, res) => {
  let user = req.body;
  usersService.register(user)
    .then(token => {
      res.json(token);
    })
    .catch(err => {
      if (err.message === 'exists') {
        res.sendStatus(400);
      }
    })
}

exports.getUser = (req, res) => {
  let username = req.username;
  usersService.getUser(username)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.sendStatus(500);
    })
}