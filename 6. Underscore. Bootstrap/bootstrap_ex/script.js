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
            .addClass("list-item row justify-content-center my-2")
            .append($('<div>')
                .addClass("note-text-label col-8"))
            .append($('<button>')
                .text("Edit")
                .addClass("edit-button btn btn-dark col-2"))
            .append($('<button>')
                .text("Delete")
                .addClass("delete-button btn btn-danger col-2"));

        var initialNoteItemHtml = $notesListItem.html();

        function switchToViewMode() {
            $notesListItem.html(initialNoteItemHtml);

            /*$notesListItem
                .find('.note-text-label')
                //.text('   ' + inputText)
                .append($('<div>')
                    .text('label')
                    .addClass("material-icons pad"))
                .append($('<div>')
                    .text(inputText)
                    .addClass('note-text'));*/
            $notesListItem
                .find('.note-text-label')
                .text(inputText)
                .prepend($('<div>')
                    .text('label')
                    .addClass("material-icons pad"));

            $notesListItem.find(".edit-button").click(function () {
                $('.cancel-button').click();

                $notesListItem.html('');

                $notesListItem
                    .append($('<input>')
                        .attr('type', 'text')
                        .addClass("edit-text-field col-8"))
                    .append($('<button>')
                        .text('Apply')
                        .addClass('apply-button btn btn-dark col-2'))
                    .append($('<button>')
                        .text('Cancel')
                        .addClass('cancel-button btn btn-danger col-2'));

                var $editTextField = $notesListItem.find(".edit-text-field");
                $editTextField.val(inputText).select();

                $notesListItem.find(".apply-button").click(function () {
                    if ($editTextField.val()) {
                        hideEmptyFieldAlert();
                        inputText = $editTextField.val();
                        switchToViewMode();
                    } else {
                        $editTextField.focus();
                        showEmptyFieldAlert();
                    }
                });

                $notesListItem.find(".cancel-button").click(function () {
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
