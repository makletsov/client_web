document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".calculate");
    var input = document.querySelector(".input-temperature");
    var container = document.querySelector(".container");

    button.addEventListener("click", function () {
        container.innerHTML = "";

        var celsius = parseFloat(input.value);

        if (!isNaN(celsius)) {
            var fahrenheit = (celsius * 9 / 5) + 32;
            var kelvin = celsius + 273.15;

            var fahrenheitLabel = document.createElement("p");
            var kelvinLabel = document.createElement("p");

            fahrenheitLabel.textContent = "Fahrenheit: " + fahrenheit.toFixed(2);
            kelvinLabel.textContent = "Kelvin: " + kelvin.toFixed(2);

            container.appendChild(fahrenheitLabel);
            container.appendChild(kelvinLabel);
        } else {
            var errorMessage = document.createElement("p");
            errorMessage.textContent = "Should insert a decimal numeric value of temperature in Celsius.";
            errorMessage.classList.add("error");
            container.appendChild(errorMessage);
        }
    })
});
