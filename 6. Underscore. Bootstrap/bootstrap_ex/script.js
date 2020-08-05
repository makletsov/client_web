$(function () {
    function switchAllItemsToLeanModeExceptGiven(item) {
        $('.list-item')
            .not(item)
            .find('.cancel-button')
            .click();

        $('.edit-delete-button-group').hide();
    }

    var $noteInputField = $('.note-input-field');

    $noteInputField.keyup(function () {
        var inputText = $noteInputField.val();

        if (inputText.trim()) {
            $noteInputField.removeClass('is-invalid');
        }
    });

    $noteInputField.click(function () {
        switchAllItemsToLeanModeExceptGiven();
    });

    $('.note-add-button').click(function () {
        $noteInputField.removeClass('is-invalid');
        $('.cancel-button').click();

        var inputText = $noteInputField.val();

        $noteInputField.focus();

        if (!inputText.trim()) {
            $noteInputField.addClass('is-invalid');
            return;
        }

        $noteInputField.val('');

        var $notesListItem = $('<li></li>')
            .addClass('list-item list-group-item row justify-content-center')
            .append($('<div>')
                .addClass('note-text-label col-12'))
            .append($('<div>')
                .addClass('edit-delete-button-group btn-group mt-2 col-12')
                .hide()
                .append($('<button>')
                    .text('Edit')
                    .addClass('edit-button btn btn-dark'))
                .append($('<button>')
                    .text('Delete')
                    .addClass('delete-button btn btn-danger')));

        var initialNoteItemHtml = $notesListItem.html();

        $notesListItem.click(function () {
            $noteInputField.removeClass('is-invalid');

            switchAllItemsToLeanModeExceptGiven($notesListItem);

            $notesListItem.find('.edit-delete-button-group').show();
        });

        function switchToViewMode() {
            $notesListItem.html(initialNoteItemHtml);

            $notesListItem.find('.note-text-label').text(inputText);

            $notesListItem.find('.edit-button').click(function (event) {
                event.stopPropagation();

                $('.cancel-button').click();

                $notesListItem.html('');

                $notesListItem
                    .append($('<textarea>')
                        .addClass('edit-text-field form-control col-12'))
                    .append($('<div>')
                        .text('Cannot save an empty note!')
                        .addClass('edit-field-alert invalid-feedback text-center col-12'))
                    .append($('<div>')
                        .addClass('apply-cancel-button-group btn-group col-12 mt-2')
                        .append($('<button>')
                            .text('Apply')
                            .addClass('apply-button btn btn-dark'))
                        .append($('<button>')
                            .text('Cancel')
                            .addClass('cancel-button btn btn-danger')));

                var $editTextField = $notesListItem.find('.edit-text-field');
                $editTextField.val(inputText).select();

                $editTextField.keyup(function () {
                    if ($editTextField.val()) {
                        $editTextField.removeClass('is-invalid');
                    }
                });

                $notesListItem.find('.apply-button').click(function (event) {
                    event.stopPropagation();
                    $editTextField.removeClass('is-invalid');

                    if ($editTextField.val()) {
                        inputText = $editTextField.val();
                        switchToViewMode();
                    } else {
                        $editTextField.addClass('is-invalid');
                        $editTextField.focus();
                    }
                });

                $notesListItem.find('.cancel-button').click(function (event) {
                    event.stopPropagation();
                    switchToViewMode();
                });
            });

            var $deleteButton = $notesListItem.find('.delete-button');

            $deleteButton.confirmation({
                rootSelector: '.delete-button',
                singleton: true,
                placement: 'bottom',
                title: 'Are you shure?',
                buttons: [
                    {
                        class: 'btn btn-danger',
                        iconClass: 'material-icons',
                        iconContent: 'done_outline',
                        label: 'Yes'
                    },
                    {
                        class: 'btn btn-dark',
                        iconClass: 'material-icons',
                        iconContent: 'cancel',
                        label: 'No',
                        cancel: true
                    }
                ]
            });

            $deleteButton.click(function () {
                $notesListItem.remove();
                $noteInputField.focus();
            });

            $noteInputField.focus();

            $('html').click(function () {
                $deleteButton.confirmation('hide');
            });
        }

        switchToViewMode();

        $('.notes-list').append($notesListItem);
    });
});
