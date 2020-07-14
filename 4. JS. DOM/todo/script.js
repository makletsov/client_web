document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.querySelector(".add-button");
    var inputTextField = document.querySelector(".input-text-field");

    addButton.addEventListener("click", function (event) {
        var noteText = inputTextField.value;

        inputTextField.value = "";
        inputTextField.focus();

        if (!noteText.trim()) {
            return;
        }

        var listItem = document.createElement("li");

        listItem.setAttribute("class", "list-item");

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
                    if (editTextField.value.trim()) {
                        noteText = editTextField.value;
                    }

                    switchToViewMode();
                });

                listItem.querySelector(".cancel-button").addEventListener("click", function () {
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