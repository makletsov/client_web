$(document).ready(function () {
    var inputTextField = $("#note-input-field");

    $("#note-add-button").click(function () {
        var inputText = $(inputTextField).val();

        if (!inputText.trim()) {
            return;
        }

        var list = $("#notes-list");
        var listItem = $('<li></li>');

        function switchToViewMode() {
            listItem.html('<span class="note-text-label">' + inputText + '</span><button class="edit-button">Edit</button><button class="delete-button">Delete</button>');
            listItem.find(".note-text-label").text(inputText);

            listItem.find(".edit-button").click(function () {
                $(listItem).html('<input type="text" class="edit-text-field"><button class="apply-button">Apply</button><button class="cancel-button">Cancel</button>');
                listItem.find(".edit-text-field").val(inputText).select();

                listItem.find(".apply-button").click(function () {
                    inputText = $(".edit-text-field").val();
                    switchToViewMode();
                });

                listItem.find(".cancel-button").click(function () {
                    switchToViewMode();
                });
            });

            listItem.find(".delete-button").click(function () {
                $(listItem).remove();
            });
        }

        switchToViewMode();
        list.append(listItem);

        inputTextField.val("");
        inputTextField.focus();
    });
})