var express = require('express');
var router = express.Router();

var newContactId = 1;
var contacts = [];

router.get('/contacts', function(req, res) {
  var term = (req.query.term || '').toUpperCase();

  res.send(term.length === 0
      ? contacts
      : contacts.filter(function (contact) {
        return contact.name.toUpperCase().indexOf(term) >= 0
            || contact.phone.toUpperCase().indexOf(term) >= 0;
      }));
});

router.post('/contacts/delete', function (req, res) {
  var id = +req.body.id;
  var message = '';

  var hasContact = contacts.some(function (contact) {
    return contact.id === id;
  });

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
  var messages = [];

  function sendErrorRequest(status) {
    res.status(status).send({
      success: false,
      message: messages
    });
  }

  function checkProperty(property, regexp) {
    var check = property.match(regexp);

    return check && check.length === 1 && property === check[0];
  }

  function normalisePhoneNumber(phone) {
    return phone.replace(/[()\- ]/g, "");
  }

  var contact = req.body.contact;

  if (!contact) {
    messages.push('Contact to add should be transferred in the request body!');
    sendErrorRequest(400);
    return;
  }

  for (var property in contact) {
    if (contact.hasOwnProperty(property)) {
      property = property.trim();
    }
  }

  contact.phone = normalisePhoneNumber(contact.phone);

  var nameRegExp = /[a-zA-Zа-яА-ЯёЁ]+[-?a-zA-Zа-яА-ЯёЁ]*/g;

  if (!contact.firstName) {
    messages.push('Contact to add should contain the first name!');
  } else if (!checkProperty(contact.firstName, nameRegExp)) {
    messages.push('Contact to add has an incorrect first name!');
  }

  if (!contact.lastName) {
    messages.push('Contact to add should contain the last name!');
  } else if (!checkProperty(contact.lastName, nameRegExp)) {
    messages.push('Contact to add has an incorrect last name!');
  }

  var phoneRegExp = /^\+?[0-9]+/g;

  if (!contact.phone) {
    messages.push('Contact to add should contain a phone number!');
  } else if (!checkProperty(contact.phone, phoneRegExp)) {
    messages.push('Contact to add has an incorrect phone number!');
  }

  if (messages.length) {
    sendErrorRequest(400);
    return;
  }

  var isRepeat = contacts.some(function (c) {
    return c.phone === contact.phone;
  });

  if (isRepeat) {
    messages.push('The contact with the same phone number is already exist in the phone book!');
    sendErrorRequest(409);
    return;
  }

  contact.id = newContactId;
  newContactId++;

  contacts.push(contact);

  res.send({
    success: true
  })
});

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
