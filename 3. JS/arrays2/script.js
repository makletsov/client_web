(function () {
	function getEvenSquaresList(array) {
		return array.filter(function (value) {
			return value % 2 === 0;
		}).map(function (value) {
			return value * value;
		});
	}

	var array = [];

	for (var i = 1; i <= 100; i++) {
		array.push(i);
	}

	console.log(array);
	console.log(getEvenSquaresList(array));
})();
