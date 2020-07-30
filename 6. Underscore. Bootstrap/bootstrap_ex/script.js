$(function () {
    function hideEditDeleteButtonGroups() {
        $('.cancel-button').click();
        $('.edit-delete-button-group').css('display', 'none');
    }

    var $inputTextField = $("#note-input-field");

    $inputTextField.keyup(function () {
        var inputText = $inputTextField.val();

        if (inputText.trim()) {
            $inputTextField.removeClass('is-invalid');
        }
    });

    $inputTextField.click(function () {
        hideEditDeleteButtonGroups();
    })

    $("#note-add-button").click(function () {
        $inputTextField.removeClass('is-invalid');
        $('.cancel-button').click();

        var inputText = $inputTextField.val();

        $inputTextField.focus();

        if (!inputText.trim()) {
            $inputTextField.addClass('is-invalid');
            return;
        }

        $inputTextField.val("");

        var $notesListItem = $('<li></li>')
            .addClass("list-item list-group-item row justify-content-center")
            .append($('<div>')
                .addClass("note-text-label"))
            .append($('<div>')
                .addClass('edit-delete-button-group btn-group mt-2')
                .append($('<button>')
                    .text("Edit")
                    .addClass("edit-button btn btn-dark"))
                .append($('<button>')
                    .text("Delete")
                    .addClass("delete-button btn btn-danger")));

        var initialNoteItemHtml = $notesListItem.html();

        $notesListItem.click(function () {
            $inputTextField.removeClass('is-invalid');

            hideEditDeleteButtonGroups();

            $notesListItem.find('.edit-delete-button-group').css('display', 'inline-flex');
        });

        function switchToViewMode() {
            $notesListItem.html(initialNoteItemHtml);

            $notesListItem.find('.note-text-label').text(inputText);

            $notesListItem.find(".edit-button").click(function (event) {
                event.stopPropagation();

                $('.cancel-button').click();

                $notesListItem.html('');

                $notesListItem
                    .append($('<textarea>')
                        .addClass("edit-text-field form-control col-12"))
                    .append($('<div>')
                        .text('Cannot save an empty note!')
                        .prop('id', 'edit-field-alert')
                        .addClass("invalid-feedback text-center col-12"))
                    .append($('<div>')
                        .addClass('apply-cancel-button-group btn-group mt-2')
                        .append($('<button>')
                            .text("Apply")
                            .addClass("apply-button btn btn-dark"))
                        .append($('<button>')
                            .text("Cancel")
                            .addClass("cancel-button btn btn-danger")));

                var $editTextField = $notesListItem.find(".edit-text-field");
                $editTextField.val(inputText).select();

                $editTextField.keyup(function () {
                    if ($editTextField.val()) {
                        $editTextField.removeClass('is-invalid');
                    }
                })

                $notesListItem.find(".apply-button").click(function (event) {
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

                $notesListItem.find(".cancel-button").click(function (event) {
                    event.stopPropagation();
                    switchToViewMode();
                });
            });

            $notesListItem.find(".delete-button").click(function () {
                $notesListItem.remove();
                $inputTextField.focus();
            });

            $inputTextField.focus();
        }

        switchToViewMode();

        $("#notes-list").append($notesListItem);
    });
});
