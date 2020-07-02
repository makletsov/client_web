(function () {
	var countries = [
		{
			name: "Russia",
			cities: [
				{
					name: "Moscow",
					population: 12506468,
				},

				{
					name: "Saint Petersburg",
					population: 5351935,
				},

			],
		},
		
		{
			name: "USA",
			cities: [
				{
					name: "New York",
					population: 8175133,
				},

				{
					name: "Los Angeles",
					population: 3792621,
				},

				{
					name: "Washington, D. C.",
					population: 705749,
				},
			],
		},
		
		{
			name: "Germany",
			cities: [
				{
					name: "Berlin",
					population: 3769495,
				},

				{
					name: "Munich",
					population: 1471508,
				},

				{
					name: "Stuttgart",
					population: 634830,
				},

				{
					name: "Baden-Baden",
					population: 55123,
				},
			],
		},
	];

	console.log(getMaxCitiesCountCountries(countries));
	console.log(getCountriesWithPopulations(countries));

	function getMaxCitiesCountCountries(countries) {
		var maxCitiesCount = countries.map(country => country.cities.length)
					.sort((a, b) => b - a)[0];
		
		return countries.filter(country => country.cities.length === maxCitiesCount);		
	}

	function getCountriesWithPopulations(countries) {
		var populations = {};

		for (var country of countries) {
			populations[country.name] = country.cities.reduce((sumPopulation, city) => sumPopulation + city.population, 0); 
		}

		return populations;
	}
})();
