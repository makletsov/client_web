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
        firstName: '',
        lastName: '',
        phone: '',
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
            var self = this;

            post('contacts/add', {
                contact: {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phone: this.phone
                }
            }).done(function (data) {
                self.loadContacts();
            }).fail(function (data) {
                if (!data.responseJSON.success) {
                    alert(data.responseJSON.message);
                }
            });
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
