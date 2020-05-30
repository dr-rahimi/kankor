document.cookie = "jsMath=font%3Aunicode%2Cautofont%3A0%2Cwarn%3A0%2Ckeep%3A5Y";

pageChanger(0);
var questionPart = 20;
function select(selectedSubject, selectedPart){
	
	if (selectedSubject == ""){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var myObj = JSON.parse(this.responseText);
				var db = myObj.records;
				
				if(document.getElementById("modaltrigger") != null){
					document.getElementById("modaltrigger").innerHTML = "";
				}
				if(document.getElementById("subjectTab") != null){
					document.getElementById("subjectTab").innerHTML = "";
				}
				if(document.getElementById("questionSet") != null){
					document.getElementById("questionSet").innerHTML = "";
				}
				for(i = 0; i < db.length; i++){
				
					var partsCount = Math.ceil(db[i].CountOfSubjectID / questionPart); //floored
					var partBody = "";
					for(t = 1; t <= partsCount; t++){
						partBody += "<div class='section'> قسمت " + t +
						"<span class='left'><a class='waves-effect waves-light btn' onclick='select(\"" + db[i].SubjectID + "\", " + t + ")'>شروع</a></span>" +
						"</div>";
					}
					if(document.getElementById("subjectTab") != null){
						document.getElementById("subjectTab").innerHTML +=
						"<li>" +
							"<div class='collapsible-header'><span class='new badge blue'> تعداد " + partsCount + "</span>" + subjectName(db[i].SubjectID) + "</div>" +
							"<div class='collapsible-body'>" + partBody + "</div>" +
						"</li>";
					}
					
				}
			}
		};
		xmlhttp.open("GET", "dbs/subjectDB.json", true);
		xmlhttp.send();
	}
	else{
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var myObj = JSON.parse(this.responseText);
				var db = myObj.records;
				

				var db2 = new Array();
				//selecting subject
				for(i = 0; i < db.length; i++){
					if(db[i].SubjectID == selectedSubject){
						db2.push(db[i]);
					}
				}
				//selecting part
				db2 = db2.splice(questionPart * (selectedPart-1), questionPart * (selectedPart-1) + questionPart);


				document.getElementById("questionSet").innerHTML ="";
				for(i = 0; i < db2.length; i++){
					document.getElementById("questionSet").innerHTML += 
					"<table  class='highlight'><tr><th class='no-autoinit'><li id = 'question" + i + "'><span class='equation'>" + db2[i].question + "<span></li></th></tr>" +
					"<tr><td class='no-autoinit'><label class='no-autoinit'><input type = 'radio' name = 'question" + i + "' id = 'question" + i + "a'><span><span class='equation'>" + db2[i].choice_a + "</span><span></label></td></tr>" +
					"<tr><td class='no-autoinit'><label class='no-autoinit'><input type = 'radio' name = 'question" + i + "' id = 'question" + i + "b'><span><span class='equation'>" + db2[i].choice_b + "</span><span></label></td></tr>" +
					"<tr><td class='no-autoinit'><label class='no-autoinit'><input type = 'radio' name = 'question" + i + "' id = 'question" + i + "c'><span><span class='equation'>" + db2[i].choice_c + "</span><span></label></td></tr>" +
					"<tr><td class='no-autoinit'><label class='no-autoinit'><input type = 'radio' name = 'question" + i + "' id = 'question" + i + "d'><span><span class='equation'>" + db2[i].choice_d + "</span><span></label></td></tr>"// +
					//"<tr hidden><td><label><input type = 'radio' name = 'question" + i + "' id = 'question" + i + "d'><span>" + db2[i].answer + "</span></label></td></tr></table>"
				}
				document.getElementById("subjectTab").innerHTML =
				"<li class='section'>" +
                    "<a class='waves-effect waves-light btn' onclick='select(\"\")'>برگشت</a>" +  
                    "<h5 class='left'>بیست سوال؛ مضمون:" + subjectName(db[0].SubjectID) +" قسمت " +selectedPart+ "</h5>" +
				"</li>";		
				document.getElementById("modaltrigger").innerHTML = 
				"<a class='waves-effect waves-light btn modal-trigger btn-large' href='#modal1' onclick='check(\"" + selectedSubject + "\", " + selectedPart + ")'>تمام شد!</a><div class='section'></div>";
				setTimeout(mathing, 1);//need fixation
			}
		};
		xmlhttp.open("GET", "dbs/db.json", true);
		xmlhttp.send();
	}
}
function mathing(){
jsMath.ConvertTeX();
jsMath.Process();
}
function colorChanger(q, choice, color) {
    document.getElementById("question" + q + "a").disabled = true;
    document.getElementById("question" + q + "b").disabled = true;
    document.getElementById("question" + q + "c").disabled = true;
    document.getElementById("question" + q + "d").disabled = true;
	return document.getElementById("question" + q + choice).parentElement.parentElement.style.backgroundColor = color;
}
function check(selectedSubject, selectedPart){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			var db = myObj.records;
			

			var db2 = new Array();
			//selecting subject
			for(i = 0; i < db.length; i++){
				if(db[i].SubjectID == selectedSubject){
					db2.push(db[i]);
				}
			}
			//selecting part
			db2 = db2.splice(questionPart * (selectedPart-1), questionPart * (selectedPart-1) + questionPart);

			var result = 0;
			for(i = 0; i < db2.length; i++){
				if(db2[i].answer == 1){
					if(document.getElementById("question" + i +"a").checked == true){
						result +=1;
						colorChanger(i, "a", "lightgreen");
					}
					else{
						colorChanger(i, "a", "lightgreen");
						colorChanger(i, "b", "#ffebee");
						colorChanger(i, "c", "#ffebee");
						colorChanger(i, "d", "#ffebee");						
					}
				} 
				else if(db2[i].answer == 2){
					if (document.getElementById("question" + i +"b").checked == true) {
						result +=1;
						colorChanger(i, "b", "lightgreen");
					}
					else{
						colorChanger(i, "a", "#ffebee");
						colorChanger(i, "b", "lightgreen");
						colorChanger(i, "c", "#ffebee");
						colorChanger(i, "d", "#ffebee");
					}
				} 
				else if(db2[i].answer == 3){
					if (document.getElementById("question" + i +"c").checked == true) {
						result +=1;
						colorChanger(i, "c", "lightgreen");
					}
					else{
						colorChanger(i, "a", "#ffebee");
						colorChanger(i, "b", "#ffebee");
						colorChanger(i, "c", "lightgreen");
						colorChanger(i, "d", "#ffebee");
					}
				}
				else if(db2[i].answer == 4){
					if (document.getElementById("question" + i +"d").checked == true) {
						result +=1;
						colorChanger(i, "d", "lightgreen");
					}
					else{
						colorChanger(i, "a", "#ffebee");
						colorChanger(i, "b", "#ffebee");
						colorChanger(i, "c", "#ffebee");
						colorChanger(i, "d", "lightgreen");
					}
				}
			}
			document.getElementById("result_sheet").innerHTML = result;
		}
	};
	xmlhttp.open("GET", "dbs/db.json", true);
	xmlhttp.send();
}

function pageChanger(currentPage){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
			var db = myObj.records;
			
			document.getElementById("nav-mobile").innerHTML =""
			document.getElementById("nav-small").innerHTML =""
			document.getElementById("foot-nav").innerHTML =""
			for(i = 0; i < db.length; i++){
				document.getElementById("nav-mobile").innerHTML += "<li><a onclick='pageChanger("+i+")'>"+db[i].title+"</a></li>"
				document.getElementById("nav-small").innerHTML += "<li><a onclick='pageChanger("+i+")'>"+db[i].title+"</a></li>"
				document.getElementById("foot-nav").innerHTML += "<li><a class='grey-text text-lighten-3' onclick='pageChanger("+i+")'>"+db[i].title+"</a></li>"
			}
				
			document.getElementById("title").innerText = "آکادمی کانکور - "+db[currentPage].title;
			document.getElementById("content").innerHTML = db[currentPage].content;
			select("");
			M.AutoInit();
    }
  };
  xhttp.open("GET", "dbs/pages.json", true);
  xhttp.send();
}



function subjectName(SubjectID) {
    switch(SubjectID){
        case "MA10":
            return "ریاضی دهم";
            break;
        case "HI10":
            return "تاریخ دهم";
            break;
    }

}