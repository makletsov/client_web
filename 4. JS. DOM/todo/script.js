(function () {
    function ready() {
        var addButton = document.querySelector(".add-button");
        var inputTextField = document.querySelector(".input-text-field");

        addButton.addEventListener("click", function() {
            if (!inputTextField.value) {
                return;
            }

            var noteText = inputTextField.value;
            var noteItem = document.createElement("li");

            noteItem.tabIndex = 0;

            function switchToViewMode() {
                noteItem.innerHTML = "<span class='note-text-label'></span><button class='edit-button'>Edit</button><button class='delete-button'>Delete</button>";

                var noteItemLabel = noteItem.querySelector(".note-text-label");
                noteItemLabel.textContent = noteText;

                noteItem.querySelector(".edit-button").addEventListener("click", function() {
                    noteItem.innerHTML = "<input type='text' class='edit-text-field'><button class='apply-button'>Apply</button><button class='cancel-button'>Cancel</button>";

                    var editTextField = noteItem.querySelector(".edit-text-field");
                    editTextField.value = noteText;

                    noteItem.querySelector(".apply-button").addEventListener("click", function() {
                        noteText = editTextField.value;
                        switchToViewMode();
                    });

                    noteItem.querySelector(".cancel-button").addEventListener("click", function() {
                        switchToViewMode();
                    });
                });

                noteItem.querySelector(".delete-button").addEventListener("click", function() {
                    noteItem.parentNode.removeChild(noteItem);
                });
            }

            switchToViewMode();

            document.body.appendChild(noteItem);

            inputTextField.value = "";
        })
    }

    document.addEventListener("DOMContentLoaded", ready);
})();