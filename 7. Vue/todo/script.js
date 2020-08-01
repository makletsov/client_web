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
        }
    },
    methods: {
        deleteItem: function () {
            this.$emit('delete-item', this.item);
        },
        switchToExtendedMode: function () {
            this.$emit('switch-to-extended-mode', this.item);
        },
        switchToEditingMode: function () {
            console.log(this.$refs);
            this.$emit('switch-to-editing-mode', this.item);
        },
        switchToLeanMode: function () {
            this.$emit('switch-to-lean-mode', this.item);
        },
        setText: function () {
            console.log(this.item.text);
            console.log(this.newText);
            this.$emit('set-text', this.item, this.newText);
        },
        cancelEditingMode: function () {
            this.newText = this.item.text;
            this.switchToLeanMode();
        }
    },
    template: '#list-item-template'
});

Vue.component('todo-list', {
    data: function () {
        return {
            inputText: '',
            nextId: 1,
            items: []
        }
    },
    methods: {
        addItem: function () {
            if (this.inputText.trim().length === 0) {
                //TODO show warning
                return;
            }

            this.items.push({
                id: this.nextId,
                text: this.inputText,
                isExtended: false,
                isEditing: false
            });

            this.nextId++;
            this.inputText = '';
        },
        deleteItem: function (item) {
            this.items = this.items.filter(function (current) {
                return current !== item;
            })
        },
        switchItemToExtendedMode: function (item) {
            this.switchAllItemsToLeanMode();
            item.isExtended = true;
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
        },
        setItemText: function (item, newText) {
            if (newText.trim().length === 0) {
                //TODO: show warning
                return;
            }

            item.text = newText;
            item.isEditing = false;
            item.isExtended = true;
        }
    },
    template: '#todo-list-template'
})

new Vue({
    el: '#main-container'
})