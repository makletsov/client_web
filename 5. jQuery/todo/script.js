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

        var $notesListItem = $('<li class="list-item"></li>');

        function switchToViewMode() {
            $notesListItem.html('<span class="note-text-label"></span><button class="edit-button">Edit</button><button class="delete-button">Delete</button>');

            $notesListItem.find(".note-text-label").text(inputText);

            $notesListItem.find(".edit-button").click(function () {
                $notesListItem.html('<input type="text" class="edit-text-field"><button class="apply-button">Apply</button><button class="cancel-button">Cancel</button>');

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
