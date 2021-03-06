document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.querySelector(".add-button");
    var inputTextField = document.querySelector(".input-text-field");

    inputTextField.focus();

    addButton.addEventListener("click", function () {
        function removeAlertMessageAndPrepareInput() {
            alert.textContent = "";
            inputTextField.focus();
        }

        var noteText = inputTextField.value;

        inputTextField.value = "";

        var alert = document.querySelector(".alert");

        if (!noteText.trim()) {
            alert.textContent = "Cannot add an empty note. Insert note text in a text field.";
            return;
        }

        removeAlertMessageAndPrepareInput();

        var listItem = document.createElement("li");

        listItem.className = "list-item";

        function switchToViewMode() {
            listItem.innerHTML = "<div class='label-container'><span class='note-text-label'></span></div><button class='edit-button'>Edit</button><button class='delete-button'>Delete</button>";

            var noteItemLabel = listItem.querySelector(".note-text-label");
            noteItemLabel.textContent = noteText;

            listItem.querySelector(".edit-button").addEventListener("click", function () {
                listItem.innerHTML = "<input type='text' class='edit-text-field'><button class='apply-button'>Apply</button><button class='cancel-button'>Cancel</button>";

                var editTextField = listItem.querySelector(".edit-text-field");
                editTextField.value = noteText;
                editTextField.select();

                listItem.querySelector(".apply-button").addEventListener("click", function () {
                    if (!editTextField.value.trim()) {
                        alert.textContent = "Cannot add an empty note. Insert note text in a text field.";
                        editTextField.focus();
                        return;
                    }

                    removeAlertMessageAndPrepareInput();

                    noteText = editTextField.value;
                    switchToViewMode();
                });

                listItem.querySelector(".cancel-button").addEventListener("click", function () {
                    removeAlertMessageAndPrepareInput();

                    switchToViewMode();
                });
            });

            listItem.querySelector(".delete-button").addEventListener("click", function () {
                listItem.parentNode.removeChild(listItem);
            });
        }

        switchToViewMode();

        var list = document.querySelector(".notes-list");
        list.appendChild(listItem);
    })
});