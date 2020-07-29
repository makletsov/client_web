$(function () {
    var $inputTextField = $("#note-input-field");

    $("#note-add-button").click(function () {
        var inputText = $inputTextField.val();

        $inputTextField.val("");
        $inputTextField.focus();

        var $emptyFieldAlert = $("#empty-field-alert");

        function showEmptyFieldAlert() {
            $emptyFieldAlert.text("Cannot add an empty note. Insert note text in a text field.");
        }

        function hideEmptyFieldAlert() {
            $emptyFieldAlert.text("");
        }

        if (!inputText.trim()) {
            showEmptyFieldAlert();
            return;
        }

        hideEmptyFieldAlert();

        var $notesListItem = $('<li></li>')
            .addClass("list-group-item row justify-content-center")
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
            $('.cancel-button').click();
            $('.edit-delete-button-group').css('display', 'none');

            $notesListItem.find('.edit-delete-button-group').css('display', 'inline-flex');
        });

        function switchToViewMode() {
            $notesListItem.html(initialNoteItemHtml);

            $notesListItem
                .find('.note-text-label')
                .text(inputText);

            $notesListItem.find(".edit-button").click(function (event) {
                event.stopPropagation();

                $('.cancel-button').click();

                $notesListItem.html('');

                $notesListItem
                    .append($('<textarea>')
                        .addClass("edit-text-field col-12"))
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

                $notesListItem.find(".apply-button").click(function (event) {
                    event.stopPropagation();

                    if ($editTextField.val()) {
                        hideEmptyFieldAlert();
                        inputText = $editTextField.val();
                        switchToViewMode();
                    } else {
                        /*debugger;*/
                        $editTextField.focus();
                        showEmptyFieldAlert();
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
