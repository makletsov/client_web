Vue.component('list-item', {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data: function () {
        return {
            newText: this.item.text
        };
    },
    computed: {
        isInvalid: function () {
            return this.newText.trim().length === 0;
        }
    },
    methods: {
        requestConfirmation: function () {
            this.$emit('request-confirmation', this.item);
        },
        switchToExtendedMode: function () {
            if (this.item.isEditing) {
                return;
            }

            this.$emit('switch-to-extended-mode', this.item);
        },
        switchToEditingMode: function () {
            this.$emit('switch-to-editing-mode', this.item);
            this.$nextTick(function () {
                this.$refs.edit.select();
            });
        },
        switchToLeanMode: function () {
            this.$emit('switch-to-lean-mode', this.item);
        },
        setText: function () {
            if (this.isInvalid) {
                return;
            }

            this.$emit('set-text', this.item, this.newText);
        },
        cancelEditingMode: function () {
            this.newText = this.item.text;
            this.switchToLeanMode();
        }
    },
    template: '#list-item-template'
});

Vue.component('confirmation-dialog', {
    props: {
        item: {
            type: Object,
            required: true
        },
        isModalShown: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        deleteItem: function () {
            this.$emit('delete-item', this.item);
        },
        hideDialog: function () {
            this.$emit('hide-dialog');
        }
    },
    template: '#confirmation-dialog-template'
});

Vue.component('todo-list', {
    data: function () {
        return {
            inputText: '',
            nextId: 1,
            items: [],
            isInvalidInput: false,
            currentItem: {},
            isModalShown: false
        }
    },
    mounted: function () {
        this.$refs.input.focus();
    },
    methods: {
        addItem: function () {
            if (this.inputText.trim().length === 0) {
                this.isInvalidInput = true;
                return;
            }

            this.isInvalidInput = false;

            this.items.push({
                id: this.nextId,
                text: this.inputText,
                isExtended: false,
                isEditing: false
            });

            this.nextId++;
            this.inputText = '';
            this.$nextTick(function () {
                this.$refs.input.focus();
            });
        },
        deleteItem: function (item) {
            this.items = this.items.filter(function (current) {
                return current !== item;
            });

            this.isModalShown = false;
        },
        switchItemToExtendedMode: function (item) {
            this.switchAllItemsToLeanMode();
            item.isExtended = true;

            this.hideInputWarning();
        },
        switchAllItemsToLeanMode: function () {
            this.items.forEach(function (current) {
                current.isExtended = false;
                current.isEditing = false;
            });
        },
        switchItemToLeanMode: function (item) {
            item.isExtended = false;
            item.isEditing = false;
        },
        switchItemToEditingMode: function (item) {
            item.isExtended = false;
            item.isEditing = true;

            this.hideInputWarning();
        },
        setItemText: function (item, newText) {
            item.text = newText;
            item.isEditing = false;
            item.isExtended = true;
        },
        hideInputWarning: function () {
            this.isInvalidInput = false;
        },
        showModal: function (item) {
            this.currentItem = item;
            this.isModalShown = true;
        },
        hideModal: function () {
            this.isModalShown = false;
        }
    },
    template: '#todo-list-template'
});

new Vue({
    el: '#main-container'
});