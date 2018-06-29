function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Import', functionName: 'import_'}
  ];
  spreadsheet.addMenu('Import Data', menuItems);
  menuItems = [
    {name: 'Trainer', functionName: 'generate_'}
  ];
  spreadsheet.addMenu('Generate', menuItems);
}

function testGen(){
  generate_();
}

function testGen(){
  generate_();
}

function generate_() {
  //Tree Def
  {
  function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
  }
  function Tree(data) {
    var node = new Node(data);
    this._root = node;
  }
  Tree.prototype.traverseDF = function(callback) {
 
    // this is a recurse and immediately-invoking function 
    (function recurse(currentNode) {
        // step 2
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            // step 3
            recurse(currentNode.children[i]);
        }
 
        // step 4
        callback(currentNode);
         
        // step 1
    })(this._root);
  };
  Tree.prototype.traverseBF = function(callback) {
    var queue = new Queue();
     
    queue.enqueue(this._root);
 
    currentTree = queue.dequeue();
 
    while(currentTree){
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.enqueue(currentTree.children[i]);
        }
 
        callback(currentTree);
        currentTree = queue.dequeue();
    }
};
  Tree.prototype.contains = function(callback, traversal) {
    traversal.call(this, callback);
  };
  Tree.prototype.add = function(data, toData, traversal) {
    var child = new Node(data),
        parent = null,
        callback = function(node) {
            if (node.data === toData) {
                parent = node;
            }
        };
 
    this.contains(callback, traversal);
 
    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
  };
  Tree.prototype.remove = function(data, fromData, traversal) {
    var tree = this,
        parent = null,
        childToRemove = null,
        index;
 
    var callback = function(node) {
        if (node.data === fromData) {
            parent = node;
        }
    };
 
    this.contains(callback, traversal);
 
    if (parent) {
        index = findIndex(parent.children, data);
 
        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    }
 
    return childToRemove;
  };
  }
  //First Loop Functions
  {
  function upToEmpty(values) {
    var ct = 0,l=[];
    while (ct<values.length&&values[ct][0] !== "") {
      l.push(values[ct]);
      ct++;
    }
    return l;
  }
  }
  //Second Loop Functions
  {
  function randomClass(para,data,trainerType,classes,passiveSkills){
  	var i,p,l=[0,0];
  	if (trainerType=="Mixed (Balanced)"){
  	  for (p in classes) {if (classes.hasOwnProperty(p)) {
        if (classes[p].Style=="Combat"){
          l[0]++;
        } else {
          l[1]++;
        }
	  }}
	  if (l[0]>1){
	  	p = "Support";
	  } else if (l[1]>1){
	  	p = "Combat";
	  } else {
	  	if (Math.random()<0.5){
	  	  p = "Support";
	  	} else {
	  	  p = "Combat";
	  	}
	  }
	  l = Object.keys(data).filter(function(x){return data[x].Style==p&&!classes.hasOwnProperty(x);});
  	} else {
  	  l = Object.keys(data).filter(function(x){return !classes.hasOwnProperty(x);});
  	}
	var wl = [],j,count;
	for (i=0;i<l.length;i++){
	  count = 1;
	  for (j=0;j<passiveSkills.length;j++){
	    if (l[i].indexOf(passiveSkills[j])!=-1){
	    	count++;
	    }
	  }
	  for(j=0;j<count;j++){
	    wl.push(l[i]);
	  }
	}
	return l[Math.floor(Math.random()*l.length)];
  }
  function columnSearch(sheet,searchString,column){
    var columnValues = sheet.getRange(1, column, sheet.getLastRow()).getValues();
    var searchResult = columnValues.findIndex(searchString); //Row Index - 1
    if(searchResult != -1){
     	//searchResult + 1 is row index.
    	return searchResult+1;
    }
    return -1;
  }
  function wRandom(orig, count,f) {
    var arr = [],i,j;
  	if (Array.isArray(orig)){
      for (i=0;i<orig.length;i++){
        for (j=f(orig[i]);j>0;j--){
          arr.push(orig[i]);
        }
      }
    } else {
      for (i in orig){if (orig.hasOwnProperty(i)){
        for (j=f(i,orig[i]);j>0;j--){
          arr.push(i);
        }
      }}
    }
    if (count == 1){
      return [arr[Math.floor(Math.random()*arr.length)]];
    } else {
      if (Array.isArray(orig)){
        j = arr[Math.floor(Math.random()*arr.length)];
        arr = orig.slice(orig.indexOf(j),orig.indexOf(j)+1);
        return [j].concat(wRandom(arr,count-1,f));
      } else {
        j = arr[Math.floor(Math.random()*arr.length)];
        arr = JSON.parse(JSON.stringify(orig));
        delete arr.j;
        return [j].concat(wRandom(arr,count-1,f));
      }
    }
  }
  function skillCheck(skills,subClass,key,count,researcher,typeAce,str){
    var j,k,sub,x,i,nSkills=[];
  	if (key.indexOf('"')==-1){
  	  nSkills.push(key);
  	  if (skills.indexOf(key)==-1){
  	  	skills.push(key);
  	  }
  	} else {
  	  j = JSON.parse(key);
  	  if (Array.isArray(j)){
  	    k = wRandom(j,count,function(x){return 2-(skills.indexOf(x)==-1);});
  	  	nSkills = nSkills.concat(k);
  	  	for (i=0;i<k.length;i++){
  	      if (skills.indexOf(k[i])==-1){
  	  	    skills.push(k[i]);
  	      }
  	    }
  	  } else {
  	    if ("Apothecary" in j){
  	      i = 2;
  	    } else {
  	      i = 1;
  	    }
  	    if (i==1&&(subClass[0][0] in j)){
  	  	  k = subClass[0];
  	    } else if (i==1||!((subClass[0][0] in j)||(subClass[1][0] in j))) {
  	      k = wRandom(j,i,function(x,y){return 2-(skills.indexOf(y)==-1)-3*(researcher.indexOf(x)!=-1||typeAce.indexOf(x)!=-1);});
  	    } else if ((subClass[0][0] in j)&&(subClass[1][0] in j)) {
  	      k = subClass[0].concat(subClass[1]);
  	    } else {
  	      if (subClass[0][0] in j) {
  	        k = subClass[0];
  	      } else {
  	        k = subClass[1];
  	      }
  	      k = k.concat(wRandom(j,1,function(x,y){return 2-(skills.indexOf(y)==-1)-3*(y==k[0]||researcher.indexOf(x)!=-1||typeAce.indexOf(x)!=-1);}));
  	    }
        if ("Apothecary" in j){
          researcher = researcher.concat(k);
        } else {
          typeAce = typeAce.concat(k);
        }
  	  	sub = k.join(', ');
  	  	for (i=0;i<k.length;i++){
          if (typeof j[k[i]]=="string"){
            x = skillCheck(skills,"",j[k[i]],1,researcher,typeAce,"");
          } else {
            x = skillCheck(skills,"",JSON.stringify(j[k[i]]),1,researcher,typeAce,"");
          }
          x=x[1];
  	  	  nSkills = nSkills.concat(x);
  	    }
  	    str += " ("+sub+")";
  	  }
  	}
  	return [str,nSkills,researcher,typeAce];
  }
  function newSkills(skills,subClass,data,researcher,typeAce,str){
  	var a = data.Skills.split(';'),i,ob={},key,l=[],nSkills=[];
  	for (i=0;i<a.length;i++){
  	  if (ob.hasOwnProperty(a[i])){
  	  	ob[a[i]]++;
  	  } else {
  	  	ob[a[i]]=1;
  	  }
  	}
  	for (key in ob){if (ob.hasOwnProperty(key)){
  	  l = skillCheck(skills,subClass,key,ob[key],researcher,typeAce,str);
  	  str = l[0]; nSkills = nSkills.concat(l[1]);
      researcher = l[2]; typeAce = l[3];
  	}}
  	return [str,nSkills,researcher,typeAce];
  }
  }
  //Third Loop Functions
  {
  
  }
  //Setup
  {
  var genPara = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Trainer Generator"),
  genData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("trainerGenInfo"),
  featData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Features Data"),
  minLevel = genPara.getRange("B4").getValue(), maxLevel = genPara.getRange("D4").getValue(),
  trainerType = genPara.getRange("B5").getValue(),
  passiveSkills = [], data = [["B11","B12:B13","I3:J72"],["D11","D12:D13","K4:L72"],["B14","B15:B16","M4:N72"],["D14","D15:D16","O4:P72"]],
  researcher=[],typeAce=[];
  var x,y,i,j,o,classes={};
  }
  //Get Data
  for (i=0;i<4;i++){
  	x = upToEmpty(genData.getRange(data[i][2]).getValues());
  	o = {};
  	for (j=0;j<x.length;j++){
  		o[x[j][0]]=JSON.parse(x[j][1]);
  		o[x[j][0]].Skills=genData.getRange(o[x[j][0]].Skills).getValue();
  	}
  	data[i][2] = o;
  }
  
  //Class Selection
  for (i=0;i<4;i++){
    x = genPara.getRange(data[i][0]).getValue();
    y = genPara.getRange(data[i][1]).getValues();
    if (x=="Random"){
      x = randomClass(genPara,data[i][2],trainerType,classes,passiveSkills);
    }
    if (x!="None"){
      x = newSkills(passiveSkills,y,data[i][2][x],researcher,typeAce,x);
      if (x[0].indexOf('(')==-1){
        classes[x[0]]=data[i][2][x[0]];
      } else {
        classes[x[0]]=data[i][2][x[0].substring(0,x[0].indexOf(' ('))];
      }
      classes[x[0]].Skills=x[1];
      researcher = x[2]; typeAce = x[3];
    }
  }
  
  //Get Detailed Data on Valid feats/edges
  var feats = {classes:[],general:{}}, cla,arr,
  fetch = JSON.parse(UrlFetchApp.fetch("https://raw.githubusercontent.com/absorr/ptu-toolkit/master/data/features.json").getContentText()),
  edges = JSON.parse(UrlFetchApp.fetch("https://raw.githubusercontent.com/absorr/ptu-toolkit/master/data/edges.json").getContentText());
  data = {"General":fetch["General"]}
  for (cla in classes){if (classes.hasOwnProperty(cla)) {
    if (cla.indexOf('Researcher')!=-1){
      feats[cla] = {'Researcher':JSON.parse(JSON.stringify(fetch['Researcher']['Researcher']))};
      y = cla.substring(cla.indexOf('(')+1,cla.indexOf(')'));
      y = y.split(','); y[0]=y[0].replace(/^\s+|\s+$/g,'');y[1]=y[1].replace(/^\s+|\s+$/g,'');
      if ((y[0] = "General" && genPara.getRange("B8").getValue()=="In Effect") || (y[0] = "Apothecary" && genPara.getRange("D8").getValue()=="In Effect")) {
        for (i in fetch['Researcher'][y[0]]) {if (fetch['Researcher'][y[0]].hasOwnProperty(i)) {
          feats[cla][i] = JSON.parse(JSON.stringify(fetch['Researcher'][y[0]+"_n"][i]));
        }}
      } 
      else {
        for (i in fetch['Researcher'][y[0]]) {if (fetch['Researcher'][y[0]].hasOwnProperty(i)) {
          feats[cla][i] = JSON.parse(JSON.stringify(fetch['Researcher'][y[0]][i]));
        }}
      }
      if ((y[1] = "General" && genPara.getRange("B8").getValue()=="In Effect") || (y[1] = "Apothecary" && genPara.getRange("D8").getValue()=="In Effect")) {
        for (i in fetch['Researcher'][y[1]]) {if (fetch['Researcher'][y[1]].hasOwnProperty(i)) {
          feats[cla][i] = JSON.parse(JSON.stringify(fetch['Researcher'][y[1]+"_n"][i]));
        }}
      } 
      else {
        for (i in fetch['Researcher'][y[1]]) {if (fetch['Researcher'][y[1]].hasOwnProperty(i)) {
          feats[cla][i] = JSON.parse(JSON.stringify(fetch['Researcher'][y[1]][i]));
        }}
      }
    } 
    else if (cla.indexOf('Type Ace')!=-1){
      feats[cla] = JSON.parse(JSON.stringify(fetch['Type Ace'][cla.substring(cla.indexOf('(')+1,cla.indexOf(')'))]));
    } 
    else if (cla=="Cheerleader" && genPara.getRange("D8").getValue()=="In Effect"){
      feats[cla] = fetch["Cheerleader_n"];
    } 
    else {
      feats[cla] = fetch[cla];
    }
  }}
  
  Logger.log(feats);
  Logger.log(JSON.stringify(classes));
  Logger.log([researcher,typeAce]);
}

function import_() {
   var response = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Import JSON").getRange('A2').getValue();
   // Process the user's response.
   if (response !== 'cancel') {
      var import = JSON.parse(response), sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Trainer");
      var vSet = function (r,v) {
        if (v!==undefined){
          sheet.getRange(r).setValue(v);
        }
      };
      var multiVSet = function (r,v) {
        if (v!==undefined){
          sheet.getRange(r).setValues(v);
        }
      };
      multiVSet('A2:F2',import.Trainer.basicInfo);
      vSet('J2',import.Trainer.Money);
      multiVSet('C4:C9',import.Trainer.featStat);
      multiVSet('E4:E9',import.Trainer.levelStat);
      vSet('I4',import.Trainer.backgroundName);
      vSet('H5',import.Trainer.backgroundDesc);
      vSet('H7',import.Trainer.backgroundAdept);
      vSet('H9',import.Trainer.backgroundNovice);
      multiVSet('I7:I9',import.Trainer.backgroundPath);
      multiVSet('J4:J9',import.Trainer.team);
      multiVSet('B13:B29',import.Trainer.skillsB);
      multiVSet('E13:E29',import.Trainer.skills);
      multiVSet('G14:J28',import.Trainer.featEdge1);
      multiVSet('G29:I30',import.Trainer.featEdge2);
      vSet('C30',import.Trainer.Training);
      multiVSet('K30:K32',import.Trainer.bonusSkill);
      vSet('G32',import.Trainer.Milestones);
      vSet('I32',import.Trainer.miscEXP);
      multiVSet('A33:A37',import.Trainer.bonusAdva);
      multiVSet('E33:F37',import.Trainer.bonusStat);
      multiVSet('G34:J37',import.Trainer.bonusFeat);
      multiVSet('L27:M37',import.Trainer.wish);
      multiVSet('A39:H39',import.Trainer.desc1);
      multiVSet('A41:H41',import.Trainer.desc2);
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Inventory");
      multiVSet('A3:B22',import.Trainer.key1);
      multiVSet('C13:D22',import.Trainer.key2);
      multiVSet('H3:I22',import.Trainer.mon1);
      multiVSet('J18:K22',import.Trainer.mon2);
      multiVSet('A25:B44',import.Trainer.med1);
      multiVSet('C38:D44',import.Trainer.med2);
      multiVSet('H25:I44',import.Trainer.ball1);
      multiVSet('J38:L44',import.Trainer.ball2);
      multiVSet('A47:B66',import.Trainer.food1);
      multiVSet('C59:D66',import.Trainer.food2);
      multiVSet('H47:I66',import.Trainer.equ1);
      multiVSet('J59:L66',import.Trainer.equ2);
      multiVSet('A68:I70',import.Trainer.stored);
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Features");
      multiVSet('A2:B41',import.Trainer.feats);
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Edges");
      multiVSet('A2:B41',import.Trainer.edges);
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Extras");
      multiVSet('A3:A6',import.Trainer.mech);
      multiVSet('A9:A28',import.Trainer.tech);
      multiVSet('A31:A50',import.Trainer.reci);
      multiVSet('A53:A62',import.Trainer.lege);
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Combat");
      multiVSet('C5:C9',import.Trainer.cs);
      multiVSet('G1:G2',import.Trainer.hp);
      multiVSet('H4:K5',import.Trainer.clas);
      multiVSet('H7:L9',import.Trainer.capa);
      multiVSet('O2:R7',import.Trainer.weap);
      vSet('N9',import.Trainer.capref);
      vSet('A11',import.Trainer.stat);
      vSet('C12',import.Trainer.fBuff);
      multiVSet('A26:C37',import.Trainer.rest);
      multiVSet('A40:A45',import.Trainer.abil);
      multiVSet('A48:A57',import.Trainer.orders);
      multiVSet('K47:K57',import.Trainer.augs);
      multiVSet('K44:P44',import.Trainer.emb);
      multiVSet('F15:F34',import.Trainer.moves);
      vSet('F37',import.Trainer.mane);
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Pokédex");
      multiVSet('B2:B151',import.Trainer.dex1);
      multiVSet('D2:D151',import.Trainer.dex2);
      multiVSet('F2:F151',import.Trainer.dex3);
      multiVSet('H2:H151',import.Trainer.dex4);
      multiVSet('J2:J133',import.Trainer.dex5);
      multiVSet('I134:J151',import.Trainer.home);
      var i; for (i in import.pokemon){
        if ((i!=='Starter'&&i!=='Pokemon Template')||(import.pokemon[i].species!=="")||(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Starter')===null&&SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Pokemon Template')===null)) {
          if (SpreadsheetApp.getActiveSpreadsheet().getSheetByName(i)===null){
            sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Pokemon Template").copyTo(SpreadsheetApp.getActiveSpreadsheet());
            sheet.setName(i);
          } else {
            sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(i);
          }
          vSet('B1',import.pokemon[i].name);
          vSet('J1',import.pokemon[i].species);
          vSet('E2',import.pokemon[i].exp);
          vSet('B3',import.pokemon[i].nature);
          vSet('J3',import.pokemon[i].shiny);
          multiVSet('C6:C11',import.pokemon[i].statMod);
          multiVSet('E6:E11',import.pokemon[i].statAdded);
          multiVSet('H7:H11',import.pokemon[i].statStage);
          vSet('K6',import.pokemon[i].injuries);
          vSet('M6',import.pokemon[i].hp);
          vSet('M9',import.pokemon[i].dr);
          multiVSet('H12:N13',import.pokemon[i].vitamins);
          vSet('B12',import.pokemon[i].item);
          multiVSet('B15:B17',import.pokemon[i].food);
          vSet('I16',import.pokemon[i].tp);
          vSet('J15',import.pokemon[i].backDesc);
          multiVSet('L16:N17',import.pokemon[i].background);
          multiVSet('P13:P17',import.pokemon[i].inherit1);
          multiVSet('R13:R16',import.pokemon[i].inherit2);
          multiVSet('A21:A30',import.pokemon[i].moves);
          vSet('A39',import.pokemon[i].weather);
          vSet('H39',import.pokemon[i].strat);
          vSet('M39',import.pokemon[i].capRef);
          multiVSet('P38:R38',import.pokemon[i].extraCap);
          multiVSet('A42:A49',import.pokemon[i].ability);
          multiVSet('A55:A63',import.pokemon[i].aug);
          multiVSet('K42:K57',import.pokemon[i].edges);
        }
      }
      for (i in import.pokebot){
        if ((i!=='Pokebot Template')||(import.pokebot[i].name!=="")||(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Pokebot Template')===null)) {
          if (SpreadsheetApp.getActiveSpreadsheet().getSheetByName(i)===null){
            sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Pokebot Template").copyTo(SpreadsheetApp.getActiveSpreadsheet());
            sheet.setName(i);
          } else {
            sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(i);
          }
          vSet('B1',import.pokebot[i].name);
          vSet('J1',import.pokebot[i].maker);
          vSet('E2',import.pokebot[i].exp);
          vSet('J2',import.pokebot[i].mat);
          vSet('J3',import.pokebot[i].size);
          multiVSet('B6:B11',import.pokebot[i].statBase);
          multiVSet('C6:C11',import.pokebot[i].statMod);
          multiVSet('E6:E11',import.pokebot[i].statAdded);
          multiVSet('H7:H11',import.pokebot[i].statStage);
          vSet('K6',import.pokebot[i].injuries);
          vSet('M6',import.pokebot[i].hp);
          vSet('M9',import.pokebot[i].dr);
          multiVSet('H12:J13',import.pokebot[i].extraItems);
          vSet('B12',import.pokebot[i].item);
          multiVSet('B15:B17',import.pokebot[i].food);
          multiVSet('I15:I17',import.pokebot[i].rotom);
          multiVSet('K16:M17',import.pokebot[i].wired);
          multiVSet('A21:A30',import.pokebot[i].moves);
          vSet('A39',import.pokebot[i].weather);
          vSet('M39',import.pokebot[i].capRef);
          multiVSet('Q38:R38',import.pokebot[i].extraCap);
          multiVSet('A42:A49',import.pokebot[i].ability);
          multiVSet('B52:B53',import.pokebot[i].skill1);
          multiVSet('B55:B56',import.pokebot[i].skill2);
          multiVSet('H55:J56',import.pokebot[i].skill3);
          multiVSet('K42:K56',import.pokebot[i].upgrades);
        }
      }
   } 
}
