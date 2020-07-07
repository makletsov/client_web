(function () {
    function ready() {
        var button = document.querySelector(".calculate");
        var input = document.querySelector(".input-temperature")
        var container = document.createElement("div");

        document.body.insertBefore(container, button);

        button.addEventListener("click", function() {
            container.innerHTML = "";

            var celsius = parseFloat(input.value);

            if (!isNaN(celsius)) {
                var fahrenheit = (celsius *  9 / 5) + 32;
                var kelvin = celsius + 273.15;

                var fahrenheitLabel = document.createElement("p");
                var kelvinLabel = document.createElement("p");

                fahrenheitLabel.textContent = "Fahrenheit:" + fahrenheit;
                kelvinLabel.textContent = "Kelvin:" + kelvin;

                container.appendChild(fahrenheitLabel);
                container.appendChild(kelvinLabel);
            } else {
                var errorMessage = document.createElement("p");
                errorMessage.textContent = "Should insert a value of temperature in Celsius.";
                container.appendChild(errorMessage);
            }
        })
    }

    document.addEventListener("DOMContentLoaded", ready);
})();