(function () {
	function getFirstFiveItems(array) {
		return array.slice(0, 5);
	}

	function getLastFiveItems(array) {
		return array.slice(-5);
	}

	function getEvenItemsSum(array) {
		return array.filter(function (value) {
			return value % 2 === 0;
		}).reduce(function (previousValue, item) {
			return previousValue + item;
		}, 0);
	}

	var array = [1, 5, 0, 2, 4, 10, 7, 12, 8, 4, 3, 15, 18, -2];
	
	array.sort(function (a, b) {
		return b - a;
	});
	
	console.log(array); 
	console.log(getFirstFiveItems(array)); 
	console.log(getLastFiveItems(array)); 
	console.log(getEvenItemsSum(array));
})();
