var myApp = angular.module('eplSpa', ["ngRoute"]);

//eplController start
myApp.controller('eplController', ['$http', '$q', function($http, $q) {
    var main = this;
    this.combinedData = [];
    this.allData = function() {
        main.firstData = $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json');
        main.secondData = $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json');
        $q.all([main.firstData, main.secondData]).then(function successCallback(response1) {
            var main2 = this;
            this.firstDataRounds = [];
            this.secondDataRounds = [];
            this.firstDataRounds = response1[0].data.rounds;
            this.secondDataRounds = response1[1].data.rounds;
            main.combinedData = response1[0].data.rounds.concat(response1[1].data.rounds);
        }, 
        function errorCallback(response) {
            alert("Error occurred");
        });
    } // end all Data
    this.allData();
}]); // end eplController

//matchViewController start
myApp.controller('matchViewController', ['$http', '$q', '$routeParams', function($http, $q, $routeParams) {
    var main = this;
    this.combinedData = [];
    this.teamName1 = "";
    this.teamName2 = "";
    this.teamCode1 = "";
    this.teamCode2 = "";
    this.teamKey1 = "";
    this.teamKey2 = "";
    this.teamScore1 = "";
    this.teamScore2 = "";
    this.roundName = "";
    this.matchDate = "";

    this.date = $routeParams.date;
    this.team1code = $routeParams.team1code;
    this.team2code = $routeParams.team2code;
    this.allData = function() {
        main.firstData = $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json');
        main.secondData = $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json');
        $q.all([main.firstData, main.secondData]).then(function successCallback(response1) {
            var main2 = this;
            this.firstDataRounds = [];
            this.secondDataRounds = [];
            this.firstDataRounds = response1[0].data.rounds;
            this.secondDataRounds = response1[1].data.rounds;
            
            main.combinedData = response1[0].data.rounds.concat(response1[1].data.rounds);

            function matchFunction() {
                for (var i = 0; i < main.combinedData.length; i++) {
                    
                    var myNewData = main.combinedData[i];
                    for (var j = 0; j < myNewData.matches.length; j++) {
                        
                        main.roundName = main.combinedData[i].name;
                        var dateNew = myNewData.matches[j].date;
                        dateNew = dateNew.replace(/[^\/\d]/g, '');
                        
                        if (dateNew == main.date && myNewData.matches[j].team1.code == main.team1code && myNewData.matches[j].team2.code == main.team2code) {

                            //transfering data to matchview.controller.main

                            main.matchDate = myNewData.matches[j].date;
                            main.teamName1 = myNewData.matches[j].team1.name;
                            main.teamName2 = myNewData.matches[j].team2.name;
                            main.teamCode1 = myNewData.matches[j].team1.code;
                            main.teamCode2 = myNewData.matches[j].team2.code;
                            main.teamKey1 = myNewData.matches[j].team1.key;
                            main.teamKey2 = myNewData.matches[j].team2.key;
                            main.teamScore1 = myNewData.matches[j].score1;
                            main.teamScore2 = myNewData.matches[j].score2;
                            if(main.teamScore1 > main.teamScore2){
                                main.matchWinner = main.teamName1;
                            }
                            else if(main.teamScore2 > main.teamScore1){
                                main.matchWinner = main.teamName2;
                            }
                            else{
                                main.matchWinner = "Match is Draw";
                            }

                        }
                    }
                }
            }; //matchFunction end
            matchFunction();
        }, 
        function errorCallback(response) {
            alert("Error occurred");
        });
    } // end all Data
    this.allData();
}]); // end matchViewController

//teamViewController start
myApp.controller('teamViewController', ['$http', '$q', '$routeParams', function($http, $q, $routeParams) {
    var main = this;
    this.combinedData = [];
    this.totalMatchesPlayed1 = [];
    this.totalWins1 = [];
    this.totalLost1 = [];
    this.totaltie1 = [];
    this.totalgoals1 = 0;
    this.totalMatchesPlayed2 = [];
    this.totalWins2 = [];
    this.totalLost2 = [];
    this.totaltie2 = [];
    this.totalgoals2 = 0;
    this.totalMatchesPlayed = [];
    this.totalWins = [];
    this.totalLost = [];
    this.totaltie = [];
    this.totalgoals = 0;
    this.teamname1 = "";
    this.teamname2 = "";


    this.teamcode = $routeParams.teamcode;
    this.teamkey = $routeParams.teamkey;

    this.allData = function() {
        main.firstData = $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json');
        main.secondData = $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json');
        $q.all([main.firstData, main.secondData]).then(function successCallback(response1) {
            var main2 = this;
            this.firstDataRounds = [];
            this.secondDataRounds = [];
            this.myNewData = [];
            this.myNewData1 = [];

            this.firstDataRounds = response1[0].data.rounds;
            this.secondDataRounds = response1[1].data.rounds;
            main.combinedData = response1[0].data.rounds.concat(response1[1].data.rounds);
            // function for epl1
            function matchFunction() {
                for (var i = 0; i < main2.firstDataRounds.length; i++) {
                    for (var j = 0; j < main2.firstDataRounds[i].matches.length; j++) {
                        main2.myNewData.push(main2.firstDataRounds[i].matches[j]);
                    }
                }

                for (var i = 0; i < main2.myNewData.length; i++) {
                    if ((main2.myNewData[i].team1.code === main.teamcode || main2.myNewData[i].team2.code === main.teamcode) && (main2.myNewData[i].team1.key === main.teamkey || main2.myNewData[i].team2.key === main.teamkey)) {
                        main.totalMatchesPlayed1.push(main2.myNewData[i].team1.name);
                        
                        if (main2.myNewData[i].team1.code === main.teamcode && main2.myNewData[i].team1.key === main.teamkey) {
                            main.teamname1 = main2.myNewData[i].team1.name;

                            //total goals 1 
                            main.totalgoals1 = main.totalgoals1 + main2.myNewData[i].score1;
                            
                            if (main2.myNewData[i].score1 > main2.myNewData[i].score2) {
                            //total wins 1  
                                main.totalWins1.push(main2.myNewData[i].team2.code);
                            } 
                            else if (main2.myNewData[i].score1 < main2.myNewData[i].score2) {
                            //total lost 1   
                                main.totalLost1.push(main2.myNewData[i].team1.code);
                            }
                            else if (main2.myNewData[i].score1 == main2.myNewData[i].score2) {
                            //total draw 1   
                                main.totaltie1.push(main2.myNewData[i].team1.code);
                            } 
                            else {
                                alert("No Details available");
                            }
                        }
                        
                        if (main2.myNewData[i].team2.code === main.teamcode && main2.myNewData[i].team2.key === main.teamkey) {
                            //total goals 2
                            main.totalgoals1 = main.totalgoals1 + main2.myNewData[i].score2;
                            

                            if (main2.myNewData[i].score1 < main2.myNewData[i].score2) {
                                //total wins 2
                                main.totalWins1.push(main2.myNewData[i].team2.code);
                            } 
                            else if (main2.myNewData[i].score1 > main2.myNewData[i].score2) {
                                //total lost 2
                                main.totalLost1.push(main2.myNewData[i].team1.code);
                            } 
                            else if (main2.myNewData[i].score1 == main2.myNewData[i].score2) {
                                //total draw 2
                                main.totaltie1.push(main2.myNewData[i].team1.code);
                            } 
                            else {
                                alert("No Details available");
                            }
                        }   
                    } 
                } // end for loop myNewData
            }; //matchFunction for epl1 end
            matchFunction();

            //function for epl2 start
            function matchFunction1() {
                for (var i = 0; i < main2.secondDataRounds.length; i++) {
                    for (var j = 0; j < main2.secondDataRounds[i].matches.length; j++) {
                        main2.myNewData1.push(main2.secondDataRounds[i].matches[j]);
                    }
                }
                
                for (var i = 0; i < main2.myNewData1.length; i++) {
                    if ((main2.myNewData1[i].team1.code === main.teamcode || main2.myNewData1[i].team2.code === main.teamcode) && (main2.myNewData1[i].team1.key === main.teamkey || main2.myNewData1[i].team2.key === main.teamkey)) {


                        main.totalMatchesPlayed2.push(main2.myNewData1[i].team1.name);
                        
                        if (main2.myNewData1[i].team1.code === main.teamcode && main2.myNewData1[i].team1.key === main.teamkey) {
                            main.teamname2 = main2.myNewData1[i].team1.name;

                            //total goals 
                            main.totalgoals2 = main.totalgoals2 + main2.myNewData[i].score1;
                            
                            if (main2.myNewData1[i].score1 > main2.myNewData1[i].score2) {
                                //total wins
                                main.totalWins2.push(main2.myNewData1[i].team2.code);
                            } 
                            else if (main2.myNewData1[i].score1 < main2.myNewData1[i].score2) {
                                //total lost
                                main.totalLost2.push(main2.myNewData1[i].team1.code);
                            } 
                            else if (main2.myNewData1[i].score1 == main2.myNewData1[i].score2) {
                                //total draw
                                main.totaltie2.push(main2.myNewData1[i].team1.code);
                            } 
                            else {
                                alert("No Details available");
                            }
                        }
                        
                        if (main2.myNewData1[i].team2.code === main.teamcode && main2.myNewData1[i].team2.key === main.teamkey) {

                            //total goals
                            main.totalgoals2 = main.totalgoals2 + main2.myNewData[i].score2;
                            
                            if (main2.myNewData1[i].score1 < main2.myNewData1[i].score2) {
                                //total wins
                                main.totalWins2.push(main2.myNewData1[i].team2.code);
                            } 
                            else if (main2.myNewData1[i].score1 > main2.myNewData1[i].score2) {
                                //total losts
                                main.totalLost2.push(main2.myNewData1[i].team1.code);
                            } 
                            else if (main2.myNewData1[i].score1 == main2.myNewData1[i].score2) {
                                //total draw
                                main.totaltie2.push(main2.myNewData1[i].team1.code);
                            } 
                            else {
                                 alert("No Details available");
                            }
                        }
                    }
                } 
            }; //matchFunction1 for epl2 end
            matchFunction1();
            
            //total team stats
            main.totalMatchesPlayed = main.totalMatchesPlayed1.length + main.totalMatchesPlayed2.length;
            main.totalWins = main.totalWins1.length + main.totalWins2.length;
            main.totalLost = main.totalLost1.length + main.totalLost2.length;
            main.totaltie = main.totaltie1.length + main.totaltie2.length;
            main.totalgoals = main.totalgoals1 + main.totalgoals2;
            
        }, 
        function errorCallback(response) {
            alert("Error occurred.");
        });
    } // end all Data
    this.allData();
}]); // end teamViewController