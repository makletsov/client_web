var express = require('express');
var router = express.Router();

var newContactId = 1;
var contacts = [];

router.get('/contacts', function(req, res) {
  var term = (req.query.term || '').toUpperCase();

  res.send(term.length === 0
      ? contacts
      : contacts.filter(function (contact) {
        return contact.name.toUpperCase().indexOf(term) >= 0 || contact.phone.toUpperCase().indexOf(term) >= 0;
      }));
});

router.post('/contacts/delete', function (req, res) {
  var id = +req.body.id;
  var message = '';

  console.log(req.body);

  var hasContact = contacts.some(function (contact) {
    return contact.id === id;
  });

  console.log(hasContact);

  if (hasContact) {
    contacts = contacts.filter(function (contact) {
      return contact.id !== id;
    });
  } else {
    message = 'Contact with given id isn\'t exists!';
  }

  res.send({
    success: hasContact,
    message: message
  });
});

router.post('/contacts/add', function (req, res) {
  var contact = req.body.contact;

  console.log(contact);

  if (!contact) {
    res.send({
      success: false,
      message: 'Contact to add should be transferred in a request body!'
    });
    return;
  }

  if (!contact.firstName) {
    res.send({
      success: false,
      message: 'Contact to add should contain the first name!'
    });
    return;
  }

  if (!contact.lastName) {
    res.send({
      success: false,
      message: 'Contact to add should contain the last name!'
    });
    return;
  }

  if (!contact.phone) {
    res.send({
      success: false,
      message: 'Contact to add should contain a phone number!'
    });
    return;
  }

  //TODO валидация, проверка повторяющихся номеров

  contact.id = newContactId;
  newContactId++;

  console.log(contact);

  contacts.push(contact);

  console.log(contacts);

  res.send({
    success: true
  })
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
