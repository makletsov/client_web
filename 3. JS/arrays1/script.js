(function () {
	var array = [1, 5, 0, 2, 4, 10, 7, 12, 8, 4, 3, 15, 18, -2];
	
	array.sort((a, b) => b - a);
	
	console.log(array); 
	console.log(getFirstFiveItems(array)); 
	console.log(getLastFiveItems(array)); 
	console.log(getEvenItemsSum(array)); 

	function getFirstFiveItems(array) {
		return array.filter((value, index) => index < 5);
	}

	function getLastFiveItems(array) {
		return array.filter((value, index) => index > array.length - 6);
	}

	function getEvenItemsSum(array) {
		return array.filter(value => value % 2 === 0)
			.reduce((previousValue, item) => previousValue + item, 0);
	}
})();
