(function () {
	var array = [];

	for (var i = 0; i <= 100; i++) {
		array.push(i);
	}

	console.log(array);
	console.log(getEvenSquaresList(array));

	function getEvenSquaresList(array) {
		return array.filter(value => value % 2 === 0).map(value => value *= value);
	}
})();
