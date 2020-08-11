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
        checkedContacts: [],
        newContact: {
            firstName: {
                value: '',
                error: '',
                isValid: false,
                isInvalid: false
            },
            lastName: {
                value: '',
                error: '',
                isValid: false,
                isInvalid: false
            },
            phone: {
                value: '',
                error: '',
                isValid: false,
                isInvalid: false
            }
        },
        term: ''
    },
    created: function () {
        this.loadContacts();
    },
    computed: {
        isNoContactsExists: function () {
            return this.contacts.length === 0;
        },
        isAllContactsChecked: function () {
            return this.contacts.length === this.checkedContacts.length;
        },
        isSomeContactsChecked: function () {
            return this.checkedContacts.length !== 0;
        }
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
                    property.isValid = false;
                    property.isInvalid = true;
                } else if (!checkPropertyText(property.value, regexp)) {
                    property.error = 'Insert correct ' + propertyString + '!';
                    property.isValid = false;
                    property.isInvalid = true;
                } else {
                    property.error = '';
                    property.isValid = true;
                    property.isInvalid = false;
                }
            }

            function isPhoneRepetitive(phone) {
                return this.contacts.some(function (contact) {
                    return contact.phone === phone;
                });
            }

            for (var property in this.newContact) {
                if (this.newContact.hasOwnProperty(property)) {
                    this.newContact[property].value = this.newContact[property].value.trim();
                }
            }

            var nameRegExp = /[a-zA-Zа-яА-ЯёЁ]+[-?a-zA-Zа-яА-ЯёЁ]*/g;

            validateProperty(this.newContact.firstName, nameRegExp, 'first name');
            validateProperty(this.newContact.lastName, nameRegExp, 'last name');

            var phoneRegExp = /^\+?[0-9]+/g;

            this.newContact.phone.value = normalisePhoneNumber(this.newContact.phone.value);

            validateProperty(this.newContact.phone, phoneRegExp, 'phone number');

            if (isPhoneRepetitive.call(this, this.newContact.phone.value)) {
                this.newContact.phone.error = 'A contact with the given phone number is already exist!';
                this.newContact.phone.isValid = false;
                this.newContact.phone.isInvalid = true;
            }

            if (this.newContact.firstName.isInvalid
                || this.newContact.lastName.isInvalid
                || this.newContact.phone.isInvalid) {
                return;
            }

            var self = this;

            post('contacts/add', {
                contact: {
                    firstName: this.newContact.firstName.value,
                    lastName: this.newContact.lastName.value,
                    phone: this.newContact.phone.value
                }
            }).done(function () {
                self.loadContacts();
            }).fail(function (data) {
                if (!data.responseJSON.success) {
                    alert(data.responseJSON.message);
                }
            });

            for (property in this.newContact) {
                if (this.newContact.hasOwnProperty(property)) {
                    this.newContact[property].value = '';
                    this.newContact[property].isInvalid = false;
                    this.newContact[property].isValid = false;
                }
            }
        },
        deleteContacts: function (identities) {
            var self = this;

            post('/contacts/delete', {
                ids: identities
            }).done(function (data) {
                if (!data.success) {
                    alert(data.message);
                    return;
                }

                self.loadContacts();
            }).fail(function () {
                alert('Contact deletion error!');
            });
        },
        toggleAllContacts: function (e) {
            if (e.target.checked) {
                this.checkedContacts = this.contacts.map(function (contact) {
                    return contact.id;
                });
            } else {
                this.checkedContacts = [];
            }
        },
        clearCheckedContactsList: function () {
            this.checkedContacts = [];
        },
        deleteCheckedContacts: function () {
            this.deleteContacts(this.checkedContacts);
            this.clearCheckedContactsList();
        }
    }
});
