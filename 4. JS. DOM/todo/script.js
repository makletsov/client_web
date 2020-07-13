document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.querySelector(".add-button");
    var inputTextField = document.querySelector(".input-text-field");

    addButton.addEventListener("click", function (event) {
        event.preventDefault();

        if (!inputTextField.value.trim()) {
            inputTextField.value = "";
            inputTextField.set

            return;
        }

        var noteText = inputTextField.value;
        var noteItem = document.createElement("li");

        noteItem.tabIndex = 0;
        noteItem.setAttribute("class", "list-item");

        function switchToViewMode() {
            noteItem.innerHTML = "<div class='label-container'><span class='note-text-label'></span></div><button class='edit-button'>Edit</button><button class='delete-button'>Delete</button>";

            var noteItemLabel = noteItem.querySelector(".note-text-label");
            noteItemLabel.textContent = noteText;

            noteItem.querySelector(".edit-button").addEventListener("click", function () {
                noteItem.innerHTML = "<input type='text' class='edit-text-field'><button class='apply-button'>Apply</button><button class='cancel-button'>Cancel</button>";

                var editTextField = noteItem.querySelector(".edit-text-field");
                editTextField.value = noteText;
                editTextField.select();

                noteItem.querySelector(".apply-button").addEventListener("click", function () {
                    if (editTextField.value.trim()) {
                        noteText = editTextField.value;
                    }

                    switchToViewMode();
                });

                noteItem.querySelector(".cancel-button").addEventListener("click", function () {
                    switchToViewMode();
                });
            });

            noteItem.querySelector(".delete-button").addEventListener("click", function () {
                noteItem.parentNode.removeChild(noteItem);
            });
        }

        switchToViewMode();

        var container = document.querySelector(".container");
        container.appendChild(noteItem);

        inputTextField.value = "";
        inputTextField.focus();
    })
});