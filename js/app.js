var CompanyDir = new Backbone.Marionette.Application();


var Company = Backbone.Model.extend({});
var Competitor = Backbone.Model.extend({});

var Companies = Backbone.Collection.extend({
	model: Company
});

var Competitors = Backbone.Collection.extend({
	model: Competitor
});

var CompanyView = Backbone.Marionette.ItemView.extend({
	template: '#CompanyView',
});

var CompetitorChildView = Backbone.Marionette.ItemView.extend({
	template: '#CompetitorChildView',
});

var CompetitorsView = Backbone.Marionette.CollectionView.extend({
 	template: '#CompetitorsView',
 	childView: CompetitorChildView
});

CompanyDir.addRegions({
	company: '#searchedCompany',
	competitor: '#searchedCompetitors'
});

CompanyDir.addInitializer(function () {

	var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/126ObPPlqQh0XG7ZQCMhiM8kBKwibtplNqOLQVkt5bKc/pubhtml';

	Tabletop.init({
		key: public_spreadsheet_url,
		callback: showInfo,
		simpleSheet: true
	})

	// User enters Company to search
	// Check if searched company is in database 
		// if it is 

			// show company in the left panel
			// check if searched company has competitors
				// if it does, show competitors in right panel
				// if it doesn't, show 'No listed competitors'
	
		// if it isn't 
			// show 'Company not found' in lef panel
			// don't search for competitors 



	function showInfo(data, tabletop) {
		CompanyDir.companies = new Companies(data)

		var companySearched,
		    searchTerm = "buffer";

		companySearched = CompanyDir.companies.find(function(model) {
			return model.get('company_name') == searchTerm;
		});

		var searchedCompetitors = [];

		searchedCompetitors = new Competitors(CompanyDir.companies.select(function(model) {
			return model.get('competitors').indexOf(searchTerm) >= 0 
		}));
		
		var listView = new CompanyView({ model: companySearched })
	   	CompanyDir.company.show(listView);

	   	var listsView = new CompetitorsView({ collection: searchedCompetitors })
	   	CompanyDir.competitor.show(listsView);
	}

});



CompanyDir.start();





//initialize: function() {
//	Backbone.history.start();
//	init(); 

//	var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/126ObPPlqQh0XG7ZQCMhiM8kBKwibtplNqOLQVkt5bKc/pubhtml';

//		function init() {
//			Tabletop.init( { key: public_spreadsheet_url,
//	                callback: showInfo,
//	                simpleSheet: true } )
//			}

//		function showInfo(data, tabletop) {
//			alert("Successfully processed!")
//	    	console.log(data);
//			}
//		}
//	});