const inquirer = require('inquirer');

console.log('Welcome to CLI Yelp!\n');

const initUserFlowChoices = {
	manual: 'Manually enter a query',
	broswe: 'Browse available categories',
};
const browseCategoryChoices = {
	restaurants: 'Restaurants',
	food: 'Food',
	bars: 'Bars',
};
const locationChoices = {
	stateCode: '2 character state code',
	postalCode: 'Postal code'
};

const prompts = [
	{
		type: 'list',
		name: 'initUserFlow',
		message: 'What do you want to do?',
		choices: Object.values(initUserFlowChoices),
	},
	{
		type: 'input',
		name: 'manualQuery',
		message: 'Please submit a query:',
		when: function (answers) {
			return answers.initUserFlow === initUserFlowChoices.manual;
		}
	},
	{
		type: 'list',
		name: 'browseCategories',
		message: 'Please choose a category:',
		choices: Object.values(browseCategoryChoices),
		when: function (answers) {
			return answers.initUserFlow === initUserFlowChoices.broswe;
		}
	},
	{
		type: 'list',
		name: 'locationType',
		message: 'Please specify how you want to enter your location',
		choices: Object.values(locationChoices),
	}
];

async function main () {
	const answers = await inquirer.prompt(prompts);
	console.log(answers);
}

main();
