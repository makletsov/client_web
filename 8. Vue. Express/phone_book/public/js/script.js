function get(url, data) {
    return $.get({
        url: url,
        data: data
    });
}

function post(url, data) {
    return $.post({
        url: url,
        data: JSON.stringify(data),
        contentType: 'application/json'
    });
}

var vm = new Vue({
    el: '#app',
    data: {
        contacts: [],
        contact: {
            newFirstName: {
                value: '',
                error: '',
                validation: {
                    isValid: false,
                    isInvalid: false
                }
            },
            newLastName: {
                value: '',
                error: '',
                validation: {
                    isValid: false,
                    isInvalid: false
                }
            },
            newPhone: {
                value: '',
                error: '',
                validation: {
                    isValid: false,
                    isInvalid: false
                }
            }
        },
        term: ''
    },
    created: function () {
        this.loadContacts();
    },
    methods: {
        loadContacts: function () {
            var self = this;

            get('/contacts', {
                term: this.term
            }).done(function (data) {
                self.contacts = data;
            }).fail(function () {
                alert('Contacts list load error!');
            });
        },
        addContact: function () {
            function checkPropertyText(property, regexp) {
                var check = property.match(regexp);

                return check && check.length === 1 && property === check[0];
            }

            function normalisePhoneNumber(phone) {
                return phone.replace(/[()\- ]/g, "");
            }

            function validateProperty(property, regexp, propertyString) {
                if (!property.value) {
                    property.error = 'Insert ' + propertyString + '!';
                    property.validation.isValid = false;
                    property.validation.isInvalid = true;
                } else if (!checkPropertyText(property.value, regexp)) {
                    property.error = 'Insert correct ' + propertyString + '!';
                    property.validation.isValid = false;
                    property.validation.isInvalid = true;
                } else {
                    property.error = '';
                    property.validation.isValid = true;
                    property.validation.isInvalid = false;
                }
            }

            for (var property in this.contact) {
                if (this.contact.hasOwnProperty(property)) {
                    this.contact[property].value = this.contact[property].value.trim();
                }
            }

            var nameRegExp = /[a-zA-Zа-яА-ЯёЁ]+[-?a-zA-Zа-яА-ЯёЁ]*/g;

            validateProperty(this.contact.newFirstName, nameRegExp, 'first name');
            validateProperty(this.contact.newLastName, nameRegExp, 'last name');

            var phoneRegExp = /^\+?[0-9]+/g;

            this.contact.newPhone.value = normalisePhoneNumber(this.contact.newPhone.value);

            validateProperty(this.contact.newPhone, phoneRegExp, 'phone number');

            if (this.contact.newFirstName.validation.isInvalid
                || this.contact.newLastName.validation.isInvalid
                || this.contact.newPhone.validation.isInvalid) {
                return;
            }

            var self = this;

            post('contacts/add', {
                contact: {
                    firstName: this.contact.newFirstName.value,
                    lastName: this.contact.newLastName.value,
                    phone: this.contact.newPhone.value
                }
            }).done(function () {
                self.loadContacts();
            }).fail(function (data) {
                if (!data.responseJSON.success) {
                    alert(data.responseJSON.message);
                }
            });

            for (property in this.contact) {
                if (this.contact.hasOwnProperty(property)) {
                    this.contact[property].value = '';
                    this.contact[property].validation.isInvalid = false;
                    this.contact[property].validation.isValid = false;
                }
            }
        },
        deleteContact: function (contact) {
            var self = this;

            post('/contacts/delete', {
                id: contact.id
            }).done(function (data) {
                if (!data.success) {
                    alert(data.message);
                    return;
                }

                self.loadContacts();
            }).fail(function () {
                alert('Contact deletion error!');
            });
        }
    }
});
