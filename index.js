//Positioning function for each planet
bode = Smooth([0.2, 0.4, 0.7, 1, 1.6, 2.8, 5.2, 10, 19.6, 38.8, 77.2, 154.0, 307.6, 614.8]);
//Random integer between x and y, inclusive: x + random.nextInt(y-x+1)
/**
* Returns a random integer between min (inclusive) and max (inclusive)
*/
function randomInt(min, max) {
   	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Function to determine Star Size:
function starClassSize(type){
	var r = randomInt(1,10)+randomInt(1,10);
	var tab = [];
	if (r<4){
		tab.push("A");
	} else if (r<8) {
		tab.push("F");
	} else if (r<13) {
		tab.push("G");
	} else if (r<18) {
		tab.push("K");
	} else {
		tab.push("M");
	}
	r = randomInt(1,10)+randomInt(1,10);
	if (type=="Primary"){
		if (r<3){
			tab.push("II");
			tab.push(randomInt(0,9));
		} else if (r<5) {
			tab.push("III");
			tab.push(randomInt(0,9));
		} else if (r<9) {
			tab.push("IV");
			if (tab[0]=="K"){
				tab.push(randomInt(0,4));
			} else {
				tab.push(randomInt(0,9));
			}
		} else if (r<19) {
			tab.push("V");
			tab.push(randomInt(0,9));
		} else {
   			if(tab[0] == "A"){
				tab.push("V");
  			} else {
				tab.push("VI");
     		}
    		if(tab[0] == "F"){
				tab.push(randomInt(5,9));
  			} else {
				tab.push(randomInt(0,9));
      		}
		}
		tab.push("Primary");
	} 
	else {
		if (r<3){
			tab.push("II");
			tab.push(randomInt(0,9));
		} else if (r<4) {
			tab.push("III");
			tab.push(randomInt(0,9));
		} else if (r<7) {
			tab.push("IV");
			if (tab[0]=="K"){
				tab.push(randomInt(0,4));
			} else {
				tab.push(randomInt(0,9));
			}
		} else if (r<15) {
			tab.push("V");
			tab.push(randomInt(0,9));
		} else if (r<19){
     		if(tab[[1]] == "A"){
				tab.push("V");
      		} else {
				tab.push("VI");
  			}
     		if(tab[[1]] == "F"){
				tab.push(randomInt(5,9));
      		} else {
				tab.push(randomInt(0,9));
      		}
		}
		else {
			var s = randomInt(1,10)+randomInt(1,10);
			if (s<5){
				tab.push("dA");
				tab.push("N/A");
			} else if (s<8){
				tab.push("dF");
				tab.push("N/A");
			} else if (s<12){
				tab.push("dG");
				tab.push("N/A");
			} else if (s<17){
				tab.push("dK");
				tab.push(randomInt(0,5));
			} else {
				tab.push("dM");
				tab.push(randomInt(0,5));
			}
		}
		r = randomInt(1,10);
		if (r==1){
			tab.push(1);
		} else if (r == 2){
			tab.push(2);
		} else if (r < 8){
			tab.push(randomInt(1,10)+2*(r-2));
		} else {
			tab.push(randomInt(1,10)*1000);
		}
	}
	if (typeof tab[2]==="string"){
		tab.push(tab[0]+" "+tab[1]);
	} 
	else {
		tab.push(tab[0]+tab[2]+" "+tab[1]);
	}
	return tab;
}
	//Add new orbits to existing sets
function zoneKeeper(tab,min,max){
	var t = new Set(tab);
	var j; for (j=min;j<=max;j++){
		t.add(j);
	}
	return [...t];
}

function starRanges(stars){
	var orbits; var mod; 
	if (Array.isArray(stars[0])){
		var r = [[]];
		var t = [];
		console.log("stars:");
		console.log(JSON.parse(JSON.stringify(stars)));
		var i; var s; var n; for (i=0;i<stars.length;i++){
			s = stars[i];
			if (typeof s[3] !== "string"){
				while (t.indexOf(s[3])>-1){
					s[3]=s[3]+1;
				}
				t.push(s[3]);
				switch(s[3]){
					case 1:
						r[0]=zoneKeeper(r[0],0,1);
						r.push([s[4],0,s]);
						break;
					case 2:
						r[0]=zoneKeeper(r[0],1,2);
						r.push([s[4],1,s]);
						break;
					case 3:
						r[0]=zoneKeeper(r[0],2,3);
						r.push([s[4],1,s]);
						break;
					case 4:
						r[0]=zoneKeeper(r[0],2,4);
						r.push([s[4],2,s]);
						break;
					case 5:
						r[0]=zoneKeeper(r[0],3,5);
						r.push([s[4],2,s]);
						break;
					case 6:
						r[0]=zoneKeeper(r[0],3,6);
						r.push([s[4],3,s]);
						break;
					case 7:
						r[0]=zoneKeeper(r[0],4,7);
						r.push([s[4],4,s]);
						break;
					case 8:
						r[0]=zoneKeeper(r[0],4,8);
						r.push([s[4],5,s]);
						break;
					case 9:
						r[0]=zoneKeeper(r[0],5,9);
						r.push([s[4],6,s]);
						break;
					case 10:
						r[0]=zoneKeeper(r[0],6,10);
						r.push([s[4],7,s]);
						break;
					case 11:
						r[0]=zoneKeeper(r[0],7,12);
						r.push([s[4],8,s]);
						break;
					case 12:
						r[0]=zoneKeeper(r[0],8,13);
						r.push([s[4],4,s]);
						break;
					case 13:
						r[0]=zoneKeeper(r[0],9,14);
						r.push([s[4],5,s]);
						break;
					default:
						if (n>900){
							mod = 0;
							switch(s[0]){
								case "M":
									mod = mod - 6;
									break;
								case "K":
									mod = mod - 3;
									break;
							}
							switch(s[1]){
								case "II":
									mod = mod + 8;
									break;
								case "III":
									mod = mod + 6;
									break;
							}
							orbits = randomInt(1,10)+mod;
							if (orbits < 0){orbits=0;}
							r.push([s[4],orbits,s]);
						} else {
							r[0]=zoneKeeper(r[0],n-4,n+1);
							r.push([s[4],n-8,s]);
						}
				}
			} 
			else {
				mod = 0;
				switch(s[0]){
					case "M":
						mod = mod - 6;
						break;
					case "K":
						mod = mod - 3;
						break;
				}
				switch(s[1]){
					case "II":
						mod = mod + 8;
						break;
					case "III":
						mod = mod + 6;
						break;
				}
				orbits = randomInt(1,10)+mod;
				if (orbits < 0){orbits=0;}
				r.push([s[4],orbits,s,"Primary"]);
			}
			console.log("r "+i.toString());
			console.log(JSON.parse(JSON.stringify(r)));
		}
		var list = r.filter(
			function(x){
				return x.every(function (y){return !isNaN(y);});
			}
		);
		var prime = r.filter(function (x) {return x.indexOf("Primary")>-1;});
		var y = r.filter(function (x){
			return !(list.indexOf(x)>-1||prime.indexOf(x)>-1);
		});
		var m = prime[0][1];
		for (i=0;i<y.length;i++){
			if (m<y[i][2][3]&&y[i][2][3]<1000){
				m=y[i][2][3];
			}
		}
		prime[0][1] = m;
		r = list.concat(prime).concat(y);
		return r;
	} 
	else {
		mod = 0;
		switch(stars[0]){
			case "M":
				mod = mod - 6;
				break;
			case "K":
				mod = mod - 3;
				break;
		}
		switch(stars[1]){
			case "II":
				mod = mod + 8;
				break;
			case "III":
				mod = mod + 6;
				break;
		}
		orbits = randomInt(1,10)+mod;
		if (orbits<0){orbits=0;}
		return [[stars[4],orbits,stars,"Primary"]];
	}
}

function randomName(){
	var v = ["a","e","i","o","u","a","e","i","o","u","a","e","i","o","u","ae","ou","io"];
	var c = ["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"];
	var w = []; var l; var s;
	if (randomInt(0,1)===0){
		l = v[randomInt(0,v.length-1)];
		w.push(l);
		l = c[randomInt(0,c.length-1)];
		w.push(l);
	} else {
		l = c[randomInt(0,c.length-1)];
		w.push(l);
	}
	for (s = randomInt(2,6);w.length<s;){
		l = v[randomInt(0,v.length-1)];
		w.push(l);
		l = c[randomInt(0,c.length-1)];
		w.push(l);
	}
	w[0]=w[0].toUpperCase();
	return w.join("");
}

function pZone(sR){
	var t = sR.filter(function (x) {
		return (x.indexOf("Primary")>-1);
	});
	var n = sR.filter(function (x) {
		return x.every(function (y){
			return !isNaN(y);
		});
	});
	if (t.length > 1){
		return "Two Primary Stars";
	}
	t = t[0];
	n = n[0];
	var z = [];
	var i; for (i=0;i<=t[1];i++){
		if (n.indexOf(i)==-1){
			z.push(i);
		}
	}
	return z;
}

function zChart(star){
	var t = []; var i;
	switch(star[2][1]){
		case "dK":
		case "dM":
		case "dF":
		case "dG":
			for(i=0;i<=star[1]&&i<=5;i++){
				if (i<5){
					t.push("eOut"); 
				} else {
					t.push("Out");
				}
			}
			break;
		case "dA":
			for(i=0;i<=star[1]&&i<=5;i++){
				if (i===0){
					t.push("eHab"); 
				}else if (i<5){
					t.push("eOut"); 
				} else {
					t.push("Out");
				}
			}
			break;
		case "II":
			if ((star[2][0]=="A"&&star[2][2]<5)||(star[2][0]=="K"&&star[2][2]>4)){
				for (i=0;i<=star[1];i++){
					if (i<4){
						t.push("Incineration Zone");
					} else if (i<8){
						t.push("In");
					} else if (i==8){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else if (["A","F","G","K"].indexOf(star[2][0])){
				for (i=0;i<=star[1];i++){
					if (i<3){
						t.push("Incineration Zone");
					} else if (i<8){
						t.push("In");
					} else if (i==8){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			}
			else if (star[2][0]=="M" && star[2][2]<5){
				for (i=0;i<=star[1];i++){
					if (i<5){
						t.push("Incineration Zone");
					} else if (i<8){
						t.push("In");
					} else if (i==8){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			}
			else {
				for (i=0;i<=star[1];i++){
					if (i<7){
						t.push("Incineration Zone");
					} else if (i<8){
						t.push("In");
					} else if (i==8){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			}
			break;
		case "III":
			if ((star[2][0]=="A"&&star[2][2]<5)||(star[2][0]=="M"&&star[2][2]<5)){
				for (i=0;i<=star[1];i++){
					if (i<2){
						t.push("Incineration Zone");
					} else if (i<6){
						t.push("In");
					} else if (i==6){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else if (["A","K"].indexOf(star[2][0])>-1){
				for (i=0;i<=star[1];i++){
					if (i===0){
						t.push("Incineration Zone");
					} else if (i<6){
						t.push("In");
					} else if (i==6){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else if (["F","G"].indexOf(star[2][0])>-1){
				for (i=0;i<=star[1];i++){
					if (i===0){
						t.push("Incineration Zone");
					} else if (i<5){
						t.push("In");
					} else if (i==5){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else {
				for (i=0;i<=star[1];i++){
					if (i<4){
						t.push("Incineration Zone");
					} else if (i<6){
						t.push("In");
					} else if (i==6){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			}
			break;
		case "IV":
			if (star[2][0]=="A"&&star[2][2]<5){
				for (i=0;i<=star[1];i++){
					if (i<2){
						t.push("Incineration Zone");
					} else if (i<6){
						t.push("In");
					} else if (i==6){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else if (star[2][0]=="A"){
				for (i=0;i<=star[1];i++){
					if (i===0){
						t.push("Incineration Zone");
					} else if (i<5){
						t.push("In");
					} else if (i<7){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else if (star[2][0]=="F"&&star[2][2]<5){
				for (i=0;i<=star[1];i++){
					if (i===0){
						t.push("Incineration Zone");
					} else if (i<5){
						t.push("In");
					} else if (i==5){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else if (star[2][0]=="F"){
				for (i=0;i<=star[1];i++){
					if (i===0){
						t.push("Incineration Zone");
					} else if (i<4){
						t.push("In");
					} else if (i<6){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else {
				for (i=0;i<=star[1];i++){
					if (i===0){
						t.push("Incineration Zone");
					} else if (i<3){
						t.push("In");
					} else if (i<5){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			}
			break;
		case "V":
			if (star[2][0]=="A"){
				for (i=0;i<=star[1];i++){
					if (i===0){
						t.push("Incineration Zone");
					} else if (i<5){
						t.push("In");
					} else if (i==5){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else if (star[2][0]=="F"){
				for (i=0;i<=star[1];i++){
					if (i===0){
						t.push("Incineration Zone");
					} else if (i<4){
						t.push("In");
					} else if (i<6){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else if (star[2][0]=="G"&&star[2][2]<5){
				for (i=0;i<=star[1];i++){
					if (i===0){
						t.push("Incineration Zone");
					} else if (i<3){
						t.push("In");
					} else if (i<5){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else if (star[2][0]=="G"){
				for (i=0;i<=star[1];i++){
					if (i===0){
						t.push("Incineration Zone");
					} else if (i<3){
						t.push("In");
					} else if (i==3){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else if (star[2][0]=="K"){
				for (i=0;i<=star[1];i++){
					if (i===0){
						t.push("Incineration Zone");
					} else if (i<3){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else if (star[2][0]=="M"&&star[2][2]<5){
				for (i=0;i<=star[1];i++){
					if (i===0){
						t.push("Incineration Zone");
					} else if (i<1){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else {
				for (i=0;i<=star[1];i++){
					if (i===0){
						t.push("Incineration Zone");
					} else {
						t.push("Out");
					}
				}
			}
			break;
		default:
			if (star[2][0]=="F"){
				for (i=0;i<=star[1];i++){
					if (i<4){
						t.push("In");
					} else if (i==4){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else if (star[2][0]=="G"&&star[2][2]<5){
				for (i=0;i<=star[1];i++){
					if (i<3){
						t.push("In");
					} else if (i==3){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else if (star[2][0]=="G"){
				for (i=0;i<=star[1];i++){
					if (i<2){
						t.push("In");
					} else if (i==2){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else if (star[2][0]=="K"&&star[2][2]<5){
				for (i=0;i<=star[1];i++){
					if (i<1){
						t.push("In");
					} else if (i==1){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else if (star[2][0]=="K"){
				for (i=0;i<=star[1];i++){
					if (i===0){
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} 
			else {
				for (i=0;i<=star[1];i++){
					t.push("Out");
				}
			}
	}
	return t;
}

function starZones(sR){
	var pz = pZone(sR);
	var tab = [["Main System","Position","Classification"]];
	var fzone = sR.filter(function (x){
		return x.every(function(y){
			return !isNaN(y);
		});
	});
	fzone = fzone[0];
	var x = sR.filter(function (x){return x.indexOf("Primary")>-1;})[0];
	var n = sR.filter(function (y){return !(y==x||y==fzone);});
	var chart = zChart(x);
	var t = ["Primary Star","N/A",x[0]];
	var i; for (i=0;i<=x[1];i++){
		if (fzone.indexOf(i)>-1){
			t.push("Companion Star");
		} else {
			t.push(chart[i]);
		}
	}
	tab.push(t);
	var j; for (j=0;j<n.length;j++){
		chart = zChart(n[j]);
		t = ["Companion Star",n[j][2][3],n[j][0]];
		if (chart.length<n[j][1]){
			for (i=0;i<chart.length;i++){
				t.push(chart[i]);
			}
		} 
		else {
			for (i=0;i<n[j][1];i++){
				t.push(chart[i]);
			}
		}
		tab.push(t);
	}
	var m = 0;
	for (i=0;i<tab.length;i++){
		if (m<tab[i].length){
			m = tab[i].length;
		}
	}
	t = tab[0];
	for (i = 0; i< m-3; i++){
		t.push("Orbit"+i.toString());
	}
	tab[0]=t;
	for (i=1;i<length[tab];i++){
		tab[i] = tab[i].concat(Array(m-tab[i].length).fill("N/A"));
	}
	return tab;
}

function zonePop(zones){
	var dim = [zones.length,zones[0].length];
	var tab = [];
	var t; var i; var j; var x;
	for (i=0;i<dim[0];i++){
		t = [];
		for (j=0;j<dim[1];j++){
			x = randomInt(1,100);
			switch(zones[i][j]){
				case "eHab":
				case "eOut":
				case "Incineration Zone":
					t.push("Empty Orbit");
					break;
				case "N/A":
					t.push("N/A");
					break;
				case "Companion Star":
					t.push("Companion Star");
					break;
				case "In":
					if (x<11){
						t.push("Empty Orbit");
					} else if (x<22){
						t.push("Asteroid Belt");
					} else if (x<41){
						t.push("Mesoplanet");
					} else if (x<61){
						t.push("Small Terrestrial");
					} else if (x<66){
						t.push("Geoactive");
					} else if (x<72){
						t.push("Super Terrestrial");
					} else if (x==72){
						t.push("Small Gas Giant");
					} else if (x==73){
						t.push("Gas Giant");
					} else if (x<88){
						t.push("Reducing");
					} else if (x==88){
						t.push("Gas Supergiant");
					} else if (x==89){
						t.push("Gas Ultragiant/Brown Dwarf");
					} else {
						t.push("Ultra Hostile");
					}
					break;
				case "Hab":
					if (x<12){
						t.push("Empty Orbit");
					} else if (x<22){
						t.push("Asteroid Belt");
					} else if (x<31){
						t.push("Mesoplanet");
					} else if (x<41){
						t.push("Small Terrestrial");
					} else if (x<46){
						t.push("Geoactive");
					} else if (x<49){
						t.push("Super Terrestrial");
					} else if (x<57){
						t.push("Desert");
					} else if (x==57){
						t.push("Gas Supergiant");
					} else if (x==58){
						t.push("Gas Giant");
					} else if (x<69){
						t.push("Marginal");
					} else if (x<71){
						t.push("Paradise");
					} else if (x<78){
						t.push("Reducing");
					} else if (x<84){
						t.push("Oceanic");
					} else if (x<90){
						t.push("Glaciated");
					} else if (x==90){
						t.push("Gas Ultragiant");
					} else if (x==91){
						t.push("Gas Ultragiant/Brown Dwarf");
					} else {
						t.push("Ultra Hostile");
					}
					break;
				default:
					if (x<11){
						t.push("Empty Orbit");
					} else if (x<22){
						t.push("Asteroid Belt");
					} else if (x==22){
						t.push("Mesoplanet");
					} else if (x==23){
						t.push("Small Terrestrial");
					} else if (x==24){
						t.push("Geoactive");
					} else if (x<30){
						t.push("Super Terrestrial");
					} else if (x<41){
						t.push("Gas Supergiant");
					} else if (x<72){
						t.push("Gas Giant");
					} else if (x<83){
						t.push("Gas Ultragiant");
					} else if (x<89){
						t.push("Gas Ultragiant/Brown Dwarf");
					} else if (x<95){
						t.push("Ice World");
					} else {
						t.push("Dirty Snowball");
					}
			}
		}	
		tab.push(t);
	}
	return tab;
}

function tableJoin(name,t1,t2){
	var dim = [t1.length,t1[0].length];
	var c1 = [name+" System","SpanFromAbove"];
	var c2 = [t1[0][1],"SpanFromAbove"];
	var c3 = [t1[0][2],"SpanFromAbove"];
	var i; for(i=1;i<dim[0];i++){
		if (dim[0]==2){
			c1.push(name);
		} else {
			c1.push(name+" &#"+(914+i).toString()+";");
		}
		c2.push(t1[i][1]);
		c3.push(t1[i][2]);
	} 
	var t = t1.slice(1);
	t = t.map(function (x){
		x.slice(3);
	});
	var tab = [];
	for (i=3;i<dim[2];i++){
		tab.push(t1[0][i]);
		tab.push("SpanFromLeft");
		tab.push("SpanFromLeft");
	}
	tab = [tab,[]];
	dim = [dim[0]-1,dim[1]-3];
	for (i=0;i<dim[1];i++){
		tab[1].push("Name");
		tab[1].push("Zone");
		tab[1].push("Type");
	}
	var j = 0;var k = 1;
	tab.push([]);
	for (i=0;i<dim[0];j++){
		if (j>dim[1]){
			j=0;
			k=0;
			tab.push({});
			i++;
		}
		if (["Empty Orbit", "Asteroid Belt", "Companion Star", "N/A"].indexOf(t2[i][j])>-1){
			tab[i+2].push("N/A");
		} else {
    		tab[i+2].push(c1[i+2]+" "+k.toString);
   			k++;
		}
		tab[i+2].push(t[i][j]);
		tab[i+2].push(t2[i][j]);
	}
	tab.pop();
	for (i=0;i<tab.length;i++){
		tab[i].unshift(c1[i],c2[i],c3[i]);
	}
	return tab;
}

function starCheck(pos,lett,num,dec){
	switch(num){
		case "dK":
		case "dM":
		case "dF":
		case "dG":
			return "Out";
		case "dA":
			if (pos===0){
				return "Hab";
			} else {
				return "Out";
			}
			break;
		case "II":
			if ((lett=="A"&& dec < 5)||(lett=="K"&&dec>4)) {
				if (pos<4){
					return "Incineration Zone";
				} else if (pos<8){
					return "In";
				} else if (pos<9){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else if (["A","F","G","K"].indexOf(lett)>-1){
				if (pos<3){
					return "Incineration Zone";
				} else if (pos<8){
					return "In";
				} else if (pos<9){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else if (lett=="M"&&dec<5){
				if (pos<5){
					return "Incineration Zone";
				} else if (pos<8){
					return "In";
				} else if (pos<9){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else {
				if (pos<7){
					return "Incineration Zone";
				} else if (pos<8){
					return "In";
				} else if (pos<9){
					return "Hab";
				} else {
					return "Out";
				}
			}
			break;
		case "III":
			if ((lett=="A"&& dec < 5)||(lett=="M"&&dec<5)) {
				if (pos<2){
					return "Incineration Zone";
				} else if (pos<6){
					return "In";
				} else if (pos<7){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else if (["A","K"].indexOf(lett)>-1){
				if (pos<6){
					return "In";
				} else if (pos<7){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else if (["F","G"].indexOf(lett)>-1){
				if (pos<5){
					return "In";
				} else if (pos<6){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else {
				if (pos<4){
					return "Incineration Zone";
				} else if (pos<6){
					return "In";
				} else if (pos<7){
					return "Hab";
				} else {
					return "Out";
				}
			}
			break;
		case "IV":
			if (lett=="A"&& dec < 5) {
				if (pos<2){
					return "Incineration Zone";
				} else if (pos<6){
					return "In";
				} else if (pos<7){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else if (lett=="A"){
				if (pos<5){
					return "In";
				} else if (pos<8){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else if (lett=="F"&& dec < 5){
				if (pos<5){
					return "In";
				} else if (pos<6){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else if (lett=="F"){
				if (pos<4){
					return "In";
				} else if (pos<6){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else {
				if (pos<3){
					return "In";
				} else if (pos<5){
					return "Hab";
				} else {
					return "Out";
				}
			}
			break;
		case "V":
			if (lett=="A") {
				if (pos<5){
					return "In";
				} else if (pos<6){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else if (lett=="F"){
				if (pos<4){
					return "In";
				} else if (pos<6){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else if (lett=="G"&& dec < 5){
				if (pos<3){
					return "In";
				} else if (pos<5){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else if (lett=="G"){
				if (pos<3){
					return "In";
				} else if (pos<4){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else if (lett=="K"){
				if (pos<3){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else if (lett=="M"&& dec < 5){
				if (pos<2){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else {
				return "Out";
			}
			break;
		default:
			if (lett=="F") {
				if (pos<4){
					return "In";
				} else if (pos<5){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else if (lett=="G"&&dec<5){
				if (pos<3){
					return "In";
				} else if (pos<4){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else if (lett=="G"){
				if (pos<2){
					return "In";
				} else if (pos<3){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else if (lett=="K"&&dec<5){
				if (pos<1){
					return "In";
				} else if (pos<2){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else if (lett=="K"){
				if (pos===0){
					return "Hab";
				} else {
					return "Out";
				}
			} 
			else {
				return "Out";
			}
	}
}

function capture(type, max, lett, numb, dec){
	var tab = []; var t = []; var p; var x; var y; var d; var num; var i; var k; var s; var z;
	var n = randomInt(1,10)-6;
	if (n<1){
		return "No Captures";
	} 
	else if (type == "Asteroid"){
		if (Array.isArray(max)){
			num = max.length;
			for (i=1;i<=n;i++){
				p = randomInt(0,num-1);
				x = randomInt(1,10)+2;
				if (x<max[p]){
					x = max[p];
				}
				y = randomInt(1,10);
				if (y<max[p]){
					y = max[p];
				}
				d = [randomInt(0,9),randomInt(0,9)];
				tab.push(["Rogue Asteroid", p, ["Asteroid", [x + d[[0]]*0.1, y + d[[1]]*0.1]]]);
				t=[];
			}
		} else {
			for (i=1;i<=n;i++){
				x = randomInt(1,10)+2;
				if (x < max){
					x = max;
				}
				y = randomInt(1,10);
				if (y < max){
					y = max;
				}
				d = [randomInt(0,9),randomInt(0,9)];
				tab.push(["Rogue Asteroid", 1, ["Asteroid", [x + d[[0]]*0.1, y + d[[1]]*0.1]]]);
				t = [];
			}
		}
	}
	else if (Array.isArray(max)){
		num = max.length;
		k = Array(num).fill(1);
		for (i=0;i<n;i++){
			p = randomInt(0,num-1);
			x = randomInt(1,10)+2;
			if (x<max[p]){
				x = max[p];
			}
			y = randomInt(1,10);
			if (y<max[p]){
				y = max[p];
			}
			s = starCheck(x,lett[p],numb[p],dec[p]);
			z = zonePop([[s]])[0][0];
			while(["Empty Orbit", "Asteroid Belt"].indexOf(z)>-1){
				z = zonePop([[s]])[0][0];
			}
			d = [randomInt(0,9),randomInt(0,9)];
			t.push([z,[x+d[0]*0.1,s],[y+d[1]*0.1,starCheck(x,lett[p],numb[p],dec[p])]]);
			tab.push(["Rogue Planet &#"+(915+i).toString()+"; "+k[p].toString(),t]);
			t = [];
		}
	} 
	else {
		k = 1; 
		for (i=1;i<=n;i++){
			x = randomInt(1,10)+2;
			if (x<max[p]){
				x = max[p];
			}
			y = randomInt(1,10);
			if (y<max[p]){
				y = max[p];
			}
			s = starCheck(x,lett[p],numb[p],dec[p]);
			z = zonePop([[s]])[0][0];
			while(["Empty Orbit", "Asteroid Belt"].indexOf(z)>-1){
				z = zonePop([[s]])[0][0];
			}
			d = [randomInt(0,9),randomInt(0,9)];
			t.push([z,[x+d[0]*0.1,s],[y+d[1]*0.1,starCheck(x,lett[p],numb[p],dec[p])]]);
			tab.push(["Rogue Planet",t]);
			t = [];
		}
	}
	return tab;
}

function planetPicker(tab,ct){
	var planets=[];
	var t = tab.slice(2);
	t = t.map(function (x){
		x.slice(3);
	});
	var dim1 = [t.length,t[0].length];
	var dim2 = [ct.length,ct[0].length];
	var ts;
	if (ct != [["No Rogue Asteroids"]]){
		ts = ct.slice(1);
		dim2 = [ts.length,ts[0].length];
	}
	var i; var j=0; for (i=0;i<dim1[0];j=j+3){
		if (j>dim1[1]){
			j = 0; i++;
		}
		if (t[i][j]!="N/A"){
			planets.push([t[i][j],t[i][j+1],t[i][j+2],tab[0][j+3]]);
		}
	}
	if (Array.isArray(dim2)){
		for (i=0;i<dim2[0];i++){
			planets.push([ts[i][0],ts[i][2][1],ts[i][3][1],ts[i][1],[ts[i][2][0],ts[i][3][0]]]);
		}
	}
	return planets;
}

//Output: Array of planet 
function planetsTable(name,orbitZones,planets){
	var tab=[],i,j,t,ast=[]; 
	for(i=0;i<name.length;i++){
		t = {};
		a = {};
		countp = 1;
		counta = 1;
		for(j=0;j<orbitZones[0].length;j++){
			if (planets[i][j] == "Asteroid Belt"){
				a["Asteroid Belt "+(countp++).toString()] = j;
			} else if (["Empty Orbit","Companion Star","N/A"].indexOf(planets[i][j])===-1){
				t[name[i]+" "+(counta++).toString()]=[j,orbitZones[i][j],planets[i][j]];
			}
		} 
		tab.push(t);
		ast.push(a);
	} 
	return[tab,ast]
}

function satellites(planets){
	var n =[], p = [], z = [];
	var i; for(i=0;i<planets.length;i++){
		
	}
}

satellites[planets_] := Module[{n, p, z, tab, i, x, d, t, s, r, k, j, pos, planet, num},
   For[i = 1; n = {}; p = {}; z = {};, i <= Length[planets], i++,
    n = Append[n, planets[[i, 1]]];
    p = Append[p, planets[[i, 3]]];
    z = Append[z, planets[[i, 2]]];];
   tab = {};
   num = 1;
   For[i = 1, i <= Length[p], i++,
    x = p[[i]];
    t = {n[[i]], z[[i]]};
    s = {};
    Which[
     MemberQ[{"Empty Orbit", "Asteroid Belt", "Companion Star", 
       "N/A"}, x],
     	,
     MemberQ[{"Mesoplanet", "Small Terrestrial"}, x],
     	d = {RandomInteger[{1, 10}] - 7, RandomInteger[{1, 10}] - 9};
     	Which[
      	d[[1]] > 1,
      		Do[
       		r = RandomInteger[{1, 20}];
       		Which[
        		r == 1,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 14}];,
        		r == 2,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 15}];,
        		r == 3,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 16}];,
        		r == 4,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 17}];,
        		r == 5,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 18}];,
        		r == 6,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 19}];,
        		r == 7,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 20}];,
        		r == 8,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 25}];,
        		r == 9,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 30}];,
        		r == 10,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 35}];,
        		r == 11,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 40}];,
        		r == 12,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 45}];,
        		r == 13,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 50}];,
        		r == 14,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 55}];,
        		r == 15,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 60}];,
        		r == 16,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 65}];,
        		r == 17,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 70}];,
        		r == 18,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 75}];,
        		r == 19,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 80}];,
        		r == 20,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 85}];
        		];, {d[[1]]}];
      		       t = Append[t, {ToString[d[[1]]] <> " Moonlets", s}];
      		       s = {};,
      	d[[1]] == 1,
      		r = RandomInteger[{1, 20}];
      		Which[
       			r == 1,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 14}];,
       			r == 2,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 15}];,
       			r == 3,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 16}];,
       			r == 4,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 17}];,
       			r == 5,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 18}];,
       			r == 6,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 19}];,
       			r == 7,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 20}];,
       			r == 8,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 25}];,
       			r == 9,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 30}];,
       			r == 10,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 35}];,
       			r == 11,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 40}];,
       			r == 12,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 45}];,
       			r == 13,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 50}];,
       			r == 14,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 55}];,
       			r == 15,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 60}];,
       			r == 16,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 65}];,
       			r == 17,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 70}];,
       			r == 18,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 75}];,
       			r == 19,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 80}];,
       			r == 20,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 85}];
       		];
      		t = Append[t, {"1 Moonlet", s}];
      		s = {};
      	];
     	If[d[[2]] == 1,
      	r = RandomInteger[{1, 20}];
      	Which[
       	r == 1,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 14}];,
       	r == 2,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 15}];,
       	r == 3,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 16}];,
       	r == 4,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 17}];,
       	r == 5,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 18}];,
       	r == 6,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 19}];,
       	r == 7,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 20}];,
       	r == 8,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 25}];,
       	r == 9,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 30}];,
       	r == 10,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 35}];,
       	r == 11,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 40}];,
       	r == 12,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 45}];,
       	r == 13,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 50}];,
       	r == 14,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 55}];,
       	r == 15,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 60}];,
       	r == 16,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 65}];,
       	r == 17,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 70}];,
       	r == 18,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 75}];,
       	r == 19,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 80}];,
       	r == 20,
       		s = Append[s, {RandomInteger[{1000, 2000}]*.001, 85}];
       		];
      	t = Append[t, {"1 Small Moon", s}];];
     	  s = {};,
     MemberQ[{"Small Gas Giant", "Gas Giant", "Gas Supergiant", 
       "Gas Ultragiant/Brown Dwarf", "Gas Ultragiant"}, x],
     	If[MemberQ[{"Small Gas Giant", "Gas Giant"}, x],
      	d = {RandomInteger[{1, 10}] - 5, RandomInteger[{1, 10}] - 8, 
         RandomInteger[{1, 10}], RandomInteger[{1, 10}] - 1, 
         RandomInteger[{1, 10}] - 3, RandomInteger[{1, 10}] - 6, 
         RandomInteger[{1, 10}] - 8};,
      	d = {RandomInteger[{1, 10}] - 2, RandomInteger[{1, 10}] - 5, 
         RandomInteger[{1, 10}] + 3, RandomInteger[{1, 10}] + 1, 
         RandomInteger[{1, 10}], RandomInteger[{1, 10}] - 4, 
         RandomInteger[{1, 10}] - 6};];
     	Which[
      	d[[1]] > 1,
      		Do[
       		r = RandomInteger[{1, 20}];
       		Which[
        		r == 1,
        			s = Append[s, 1];,
        		r == 2,
        			s = Append[s, 2];,
        		r == 3,
        			s = Append[s, 3];,
        		r == 4,
        			s = Append[s, 4];,
        		r == 5,
        			s = Append[s, 5];,
        		r == 6,
        			s = Append[s, 6];,
        		r == 7,
        			s = Append[s, 7];,
        		r == 8,
        			s = Append[s, 8];,
        		r == 9,
        			s = Append[s, 9];,
        		r == 10,
        			s = Append[s, 10];,
        		r == 11,
        			s = Append[s, 11];,
        		r == 12,
        			s = Append[s, 12];,
        		r == 13,
        			s = Append[s, 14];,
        		r == 14,
        			s = Append[s, 16];,
        		r == 15,
        			s = Append[s, 18];,
        		r == 16,
        			s = Append[s, 20];,
        		r == 17,
        			s = Append[s, 25];,
        		r == 18,
        			s = Append[s, 30];,
        		r == 19,
        			s = Append[s, 35];,
        		r == 20,
        			s = Append[s, 40];];
       		, {d[[1]]}];
      		t = 
       Append[t, {ToString[d[[1]]] <> " Minor Ring Systems", s}];
      		s = {};,
      	d[[1]] == 1,
      		r = RandomInteger[{1, 20}];
      		Which[
       		r == 1,
       			t = Append[t, {"1 Minor Ring System", 1}];,
       		r == 2,
       			t = Append[t, {"1 Minor Ring System", 2}];,
       		r == 3,
       			t = Append[t, {"1 Minor Ring System", 3}];,
       		r == 4,
       			t = Append[t, {"1 Minor Ring System", 4}];,
       		r == 5,
       			t = Append[t, {"1 Minor Ring System", 5}];,
       		r == 6,
       			t = Append[t, {"1 Minor Ring System", 6}];,
       		r == 7,
       			t = Append[t, {"1 Minor Ring System", 7}];,
       		r == 8,
       			t = Append[t, {"1 Minor Ring System", 8}];,
       		r == 9,
       			t = Append[t, {"1 Minor Ring System", 9}];,
       		r == 10,
       			t = Append[t, {"1 Minor Ring System", 10}];,
       		r == 11,
       			t = Append[t, {"1 Minor Ring System", 11}];,
       		r == 12,
       			t = Append[t, {"1 Minor Ring System", 12}];,
       		r == 13,
       			t = Append[t, {"1 Minor Ring System", 14}];,
       		r == 14,
       			t = Append[t, {"1 Minor Ring System", 16}];,
       		r == 15,
       			t = Append[t, {"1 Minor Ring System", 18}];,
       		r == 16,
       			t = Append[t, {"1 Minor Ring System", 20}];,
       		r == 17,
       			t = Append[t, {"1 Minor Ring System", 25}];,
       		r == 18,
       			t = Append[t, {"1 Minor Ring System", 30}];,
       		r == 19,
       			t = Append[t, {"1 Minor Ring System", 35}];,
       		r == 20,
       			t = Append[t, {"1 Minor Ring System", 40}];];
      	];
     	Which[
      	d[[2]] > 1,
      		Do[
       		r = RandomInteger[{1, 20}];
       		Which[
        		r == 1,
        			s = Append[s, 1];,
        		r == 2,
        			s = Append[s, 2];,
        		r == 3,
        			s = Append[s, 3];,
        		r == 4,
        			s = Append[s, 4];,
        		r == 5,
        			s = Append[s, 5];,
        		r == 6,
        			s = Append[s, 6];,
        		r == 7,
        			s = Append[s, 7];,
        		r == 8,
        			s = Append[s, 8];,
        		r == 9,
        			s = Append[s, {9}];,
        		r == 10,
        			s = Append[s, 10];,
        		r == 11,
        			s = Append[s, 11];,
        		r == 12,
        			s = Append[s, 12];,
        		r == 13,
        			s = Append[s, 14];,
        		r == 14,
        			s = Append[s, 16];,
        		r == 15,
        			s = Append[s, 18];,
        		r == 16,
        			s = Append[s, 20];,
        		r == 17,
        			s = Append[s, 25];,
        		r == 18,
        			s = Append[s, 30];,
        		r == 19,
        			s = Append[s, 35];,
        		r == 20,
        			s = Append[s, 40];];
       		, {d[[2]]}];
      		t = 
       Append[t, {ToString[d[[2]]] <> " Major Ring Systems", s}];
      		s = {};,
      	d[[2]] == 1,
      		r = RandomInteger[{1, 20}];
      		Which[
       		r == 1,
       			t = Append[t, {"1 Major Ring System", 1}];,
       		r == 2,
       			t = Append[t, {"1 Major Ring System", 2}];,
       		r == 3,
       			t = Append[t, {"1 Major Ring System", 3}];,
       		r == 4,
       			t = Append[t, {"1 Major Ring System", 4}];,
       		r == 5,
       			t = Append[t, {"1 Major Ring System", 5}];,
       		r == 6,
       			t = Append[t, {"1 Major Ring System", 6}];,
       		r == 7,
       			t = Append[t, {"1 Major Ring System", 7}];,
       		r == 8,
       			t = Append[t, {"1 Major Ring System", 8}];,
       		r == 9,
       			t = Append[t, {"1 Major Ring System", 9}];,
       		r == 10,
       			t = Append[t, {"1 Major Ring System", 10}];,
       		r == 11,
       			t = Append[t, {"1 Major Ring System", 11}];,
       		r == 12,
       			t = Append[t, {"1 Major Ring System", 12}];,
       		r == 13,
       			t = Append[t, {"1 Major Ring System", 14}];,
       		r == 14,
       			t = Append[t, {"1 Major Ring System", 16}];,
       		r == 15,
       			t = Append[t, {"1 Major Ring System", 18}];,
       		r == 16,
       			t = Append[t, {"1 Major Ring System", 20}];,
       		r == 17,
       			t = Append[t, {"1 Major Ring System", 25}];,
       		r == 18,
       			t = Append[t, {"1 Major Ring System", 30}];,
       		r == 19,
       			t = Append[t, {"1 Major Ring System", 35}];,
       		r == 20,
       			t = Append[t, {"1 Major Ring System", 40}];];
      	];
     	For[k = 3, k <= 7, k++,
      	For[j = 1, j <= d[[k]], j++,
       	pos = RandomInteger[{1, 10}];
       	r = RandomInteger[{1, 20}];
       	Which[
        	(MemberQ[{"Gas Giant", "Gas Supergiant", x}] && 
           pos == 10) || (MemberQ[{"Gas Ultragiant/Brown Dwarf", 
             "Gas Ultragiant"}, x] && pos > 8),
        		Which[
          		r == 1,
          			pos = 190;,
          		r == 2,
          			pos = 195;,
          		r == 3,
          			pos = 200;,
          		r == 4,
          			pos = 205;,
          		r == 5,
          			pos = 210;,
          		r == 6,
          			pos = 215;,
          		r == 7,
          			pos = 220;,
          		r == 8,
          			pos = 230;,
          		r == 9,
          			pos = 240;,
          		r == 10,
          			pos = 250;,
          		r == 11,
          			pos = 260;,
          		r == 12,
          			pos = 270;,
          		r == 13,
          			pos = 280;,
          		r == 14,
          			pos = 290;,
          		r == 15,
          			pos = 300;,
          		r == 16,
          			pos = 320;,
          		r == 17,
          			pos = 340;,
          		r == 18,
          			pos = 360;,
          		r == 19,
          			pos = 380;,
          		r == 20,
          			pos = 400;
          		];,
        	(x == "Small Gas Giant" && 
           pos > 7) || (MemberQ[{"Gas Giant", "Gas Supergiant", x}] &&
            pos > 6) || (MemberQ[{"Gas Ultragiant/Brown Dwarf", 
             "Gas Ultragiant"}, x] && pos > 4),
        		Which[
          		r == 1,
          			pos = 90;,
          		r == 2,
          			pos = 95;,
          		r == 3,
          			pos = 100;,
          		r == 4,
          			pos = 105;,
          		r == 5,
          			pos = 110;,
          		r == 6,
          			pos = 115;,
          		r == 7,
          			pos = 120;,
          		r == 8,
          			pos = 125;,
          		r == 9,
          			pos = 130;,
          		r == 10,
          			pos = 135;,
          		r == 11,
          			pos = 140;,
          		r == 12,
          			pos = 145;,
          		r == 13,
          			pos = 150;,
          		r == 14,
          			pos = 155;,
          		r == 15,
          			pos = 160;,
          		r == 16,
          			pos = 165;,
          		r == 17,
          			pos = 170;,
          		r == 18,
          			pos = 175;,
          		r == 19,
          			pos = 180;,
          		r == 20,
          			pos = 185;
          		];,
        	True,
        		Which[
          		r == 1,
          			pos = 14;,
          		r == 2,
          			pos = 15;,
          		r == 3,
          			pos = 16;,
          		r == 4,
          			pos = 17;,
          		r == 5,
          			pos = 18;,
          		r == 6,
          			pos = 19;,
          		r == 7,
          			pos = 20;,
          		r == 8,
          			pos = 25;,
          		r == 9,
          			pos = 30;,
          		r == 10,
          			pos = 35;,
          		r == 11,
          			pos = 40;,
          		r == 12,
          			pos = 45;,
          		r == 13,
          			pos = 50;,
          		r == 14,
          			pos = 55;,
          		r == 15,
          			pos = 60;,
          		r == 16,
          			pos = 65;,
          		r == 17,
          			pos = 70;,
          		r == 18,
          			pos = 75;,
          		r == 19,
          			pos = 80;,
          		r == 20,
          			pos = 85;
          		];
        	];
       
       	Which[
        	d[[k]] > 1,
        		Which[
          		k == 3,
          			s = Append[s, {RandomInteger[{100, 1000}], pos}];,
          		k == 4,
          			s = Append[s, {RandomInteger[{1000, 2000}], pos}];,
          		k == 5,
          			s = Append[s, {RandomInteger[{2000, 3000}], pos}];,
          		k == 6,
          			s = Append[s, {RandomInteger[{3000, 4000}], pos}];,
          		k == 7,
          			If[ListQ[z[[i]]],
           			planet = zonePop[{{z[[i]][[1]]}}][[1, 1]];,
           			planet = zonePop[{{z[[i]]}}][[1, 1]];];
          			
          While[MemberQ[{"Empty Orbit", "Asteroid Belt", 
             "Super Terrestrial", "Small Gas Giant", "Gas Giant", 
             "Gas Supergiant", "Gas Ultragiant",
             						"Gas Ultragiant/Brown Dwarf"}, planet],
           			If[ListQ[z[[i]]],
             			planet = zonePop[{{z[[i]][[1]]}}][[1, 1]];,
             			planet = zonePop[{{z[[i]]}}][[1, 1]];];
           			];
          			
          s = Append[
            s, {"Huge Moon " <> ToString[num], planet, pos}];
          			num = num + 1;
          		];,
        	d[[k]] == 1,
        		Which[
          		k == 3,
          			
          t = Append[
             t, {"1 Moonlet", {RandomInteger[{100, 1000}], pos}}];,
          		k == 4,
          			
          t = Append[
             t, {"1 Small Moon", {RandomInteger[{1000, 2000}], pos}}];,
          		k == 5,
          			
          t = Append[
             t, {"1 Medium Moon", {RandomInteger[{2000, 3000}], 
               pos}}];,
          		k == 6,
          			
          t = Append[
             t, {"1 Large Moon", {RandomInteger[{3000, 4000}], pos}}];,
          		k == 7,
          			If[ListQ[z[[i]]],
           			planet = zonePop[{{z[[i]][[1]]}}][[1, 1]];,
           			planet = zonePop[{{z[[i]]}}][[1, 1]];];
          			
          While[MemberQ[{"Empty Orbit", "Asteroid Belt", 
             "Super Terrestrial", "Small Gas Giant", "Gas Giant", 
             "Gas Supergiant", "Gas Ultragiant",
             						"Gas Ultragiant/Brown Dwarf"}, planet],
           			If[ListQ[z[[i]]],
             			planet = zonePop[{{z[[i]][[1]]}}][[1, 1]];,
             			planet = zonePop[{{z[[i]]}}][[1, 1]];];
           			];
          			
          t = Append[
            t, {"1 Huge Moon", {"Huge Moon " <> ToString[num], planet,
               pos}}];
          			num = num + 1;];
        	];
       	];
      	If[s != {},
       	Which[
        	k == 3,
        		t = Append[t, {ToString[d[[k]]] <> " Moonlets", s}];,
        	k == 4,
        		t = Append[t, {ToString[d[[k]]] <> " Small Moons", s}];,
        	k == 5,
        		t = Append[t, {ToString[d[[k]]] <> " Medium Moons", s}];,
        	k == 6,
        		t = Append[t, {ToString[d[[k]]] <> " Large Moons", s}];,
        	k == 7,
        		t = Append[t, {ToString[d[[k]]] <> " Huge Moons", s}];
        	];
       	s = {};
       	];
      	];,
     True,
     	d = {RandomInteger[{1, 10}] - 9, RandomInteger[{1, 10}] - 6, 
       RandomInteger[{1, 10}] - 7, RandomInteger[{1, 10}] - 9};
     	If[d[[1]] == 1,
      	r = RandomInteger[{1, 20}];
      		Which[
       		r == 1,
       			t = Append[t, {"1 Minor Ring System", 1}];,
       		r == 2,
       			t = Append[t, {"1 Minor Ring System", 2}];,
       		r == 3,
       			t = Append[t, {"1 Minor Ring System", 3}];,
       		r == 4,
       			t = Append[t, {"1 Minor Ring System", 4}];,
       		r == 5,
       			t = Append[t, {"1 Minor Ring System", 5}];,
       		r == 6,
       			t = Append[t, {"1 Minor Ring System", 6}];,
       		r == 7,
       			t = Append[t, {"1 Minor Ring System", 7}];,
       		r == 8,
       			t = Append[t, {"1 Minor Ring System", 8}];,
       		r == 9,
       			t = Append[t, {"1 Minor Ring System", 9}];,
       		r == 10,
       			t = Append[t, {"1 Minor Ring System", 10}];,
       		r == 11,
       			t = Append[t, {"1 Minor Ring System", 11}];,
       		r == 12,
       			t = Append[t, {"1 Minor Ring System", 12}];,
       		r == 13,
       			t = Append[t, {"1 Minor Ring System", 14}];,
       		r == 14,
       			t = Append[t, {"1 Minor Ring System", 16}];,
       		r == 15,
       			t = Append[t, {"1 Minor Ring System", 18}];,
       		r == 16,
       			t = Append[t, {"1 Minor Ring System", 20}];,
       		r == 17,
       			t = Append[t, {"1 Minor Ring System", 25}];,
       		r == 18,
       			t = Append[t, {"1 Minor Ring System", 30}];,
       		r == 19,
       			t = Append[t, {"1 Minor Ring System", 35}];,
       		r == 20,
       			t = Append[t, {"1 Minor Ring System", 40}];
       		];];
     	Which[
      	d[[2]] > 1,
      		Do[
       		r = RandomInteger[{1, 20}];
       		Which[
        		r == 1,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 14}];,
        		r == 2,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 15}];,
        		r == 3,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 16}];,
        		r == 4,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 17}];,
        		r == 5,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 18}];,
        		r == 6,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 19}];,
        		r == 7,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 20}];,
        		r == 8,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 25}];,
        		r == 9,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 30}];,
        		r == 10,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 35}];,
        		r == 11,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 40}];,
        		r == 12,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 45}];,
        		r == 13,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 50}];,
        		r == 14,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 55}];,
        		r == 15,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 60}];,
        		r == 16,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 65}];,
        		r == 17,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 70}];,
        		r == 18,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 75}];,
        		r == 19,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 80}];,
        		r == 20,
        			s = Append[s, {RandomInteger[{100, 1000}]*.001, 85}];
        		];, {d[[2]]}];
      		 t = Append[t, {ToString[d[[2]]] <> " Moonlets", s}];
      		s = {};,
      	d[[2]] == 1,
      		r = RandomInteger[{1, 20}];
      		Which[
       			r == 1,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 14}];,
       			r == 2,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 15}];,
       			r == 3,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 16}];,
       			r == 4,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 17}];,
       			r == 5,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 18}];,
       			r == 6,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 19}];,
       			r == 7,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 20}];,
       			r == 8,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 25}];,
       			r == 9,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 30}];,
       			r == 10,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 35}];,
       			r == 11,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 40}];,
       			r == 12,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 45}];,
       			r == 13,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 50}];,
       			r == 14,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 55}];,
       			r == 15,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 60}];,
       			r == 16,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 65}];,
       			r == 17,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 70}];,
       			r == 18,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 75}];,
       			r == 19,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 80}];,
       			r == 20,
       				s = Append[s, {RandomInteger[{100, 1000}]*.001, 85}];
       		];
      		t = Append[t, {"1 Moonlet", s}];
      	s = {};
      	];
     	Which[
      	d[[3]] > 1,
      		Do[
       		r = RandomInteger[{1, 20}];
       		Which[
        		r == 1,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 14}];,
        		r == 2,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 15}];,
        		r == 3,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 16}];,
        		r == 4,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 17}];,
        		r == 5,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 18}];,
        		r == 6,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 19}];,
        		r == 7,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 20}];,
        		r == 8,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 25}];,
        		r == 9,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 30}];,
        		r == 10,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 35}];,
        		r == 11,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 40}];,
        		r == 12,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 45}];,
        		r == 13,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 50}];,
        		r == 14,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 55}];,
        		r == 15,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 60}];,
        		r == 16,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 65}];,
        		r == 17,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 70}];,
        		r == 18,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 75}];,
        		r == 19,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 80}];,
        		r == 20,
        			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 85}];
        		];, {d[[3]]}];
      		t = Append[t, {ToString[d[[3]]] <> " Small Moons", s}];
      		s = {};,
      	d[[3]] == 1,
      		r = RandomInteger[{1, 20}];
      		Which[
       		r == 1,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 14}];,
       		r == 2,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 15}];,
       		r == 3,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 16}];,
       		r == 4,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 17}];,
       		r == 5,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 18}];,
       		r == 6,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 19}];,
       		r == 7,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 20}];,
       		r == 8,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 25}];,
       		r == 9,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 30}];,
       		r == 10,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 35}];,
       		r == 11,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 40}];,
       		r == 12,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 45}];,
       		r == 13,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 50}];,
       		r == 14,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 55}];,
       		r == 15,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 60}];,
       		r == 16,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 65}];,
       		r == 17,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 70}];,
       		r == 18,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 75}];,
       		r == 19,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 80}];,
       		r == 20,
       			s = Append[s, {RandomInteger[{1000, 2000}]*.001, 85}];
       		];
      		t = Append[t, {"1 Small Moon", s}];
      		s = {};
      	];
     	If[d[[4]] == 1,
      	r = RandomInteger[{1, 20}];
      	Which[
       	r == 1,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 14}];,
       	r == 2,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 15}];,
       	r == 3,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 16}];,
       	r == 4,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 17}];,
       	r == 5,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 18}];,
       	r == 6,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 19}];,
       	r == 7,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 20}];,
       	r == 8,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 25}];,
       	r == 9,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 30}];,
       	r == 10,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 35}];,
       	r == 11,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 40}];,
       	r == 12,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 45}];,
       	r == 13,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 50}];,
       	r == 14,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 55}];,
       	r == 15,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 60}];,
       	r == 16,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 65}];,
       	r == 17,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 70}];,
       	r == 18,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 75}];,
       	r == 19,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 80}];,
       	r == 20,
       		s = Append[s, {RandomInteger[{2000, 3000}]*.001, 85}];
       	];
      	t = Append[t, {"1 Medium Moon", s}];
      	s = {};
      	];];
    If[t == {n[[i]], z[[i]]},
     t = Append[t, "No Satellites"];];
    tab = Append[tab, t];
    ]; Return[tab];];

function generate(){
	var r = randomInt(1,20);
	var t = [];
	var letter = [];
	var numb = [];
	var dec = [];
	var max = [];
	var i; 
   	t.push(starClassSize("Primary"));
	if (r > 9){
   		t.push(starClassSize(""));
	} 
	if (r > 17){
   		t.push(starClassSize(""));
	} 
	if (r > 19){
    	t.push(starClassSize(""));
	} 
    for (i = 0;i<t.length;i++){
    	letter.push(t[i][0]);
    	numb.push(t[i][1]);
    	dec.push(t[i][2]);
    }
    var stars = JSON.parse(JSON.stringify(t));
    t = starRanges(t);
    var name = randomName();
    if (stars.length==1){
    	stars[0].unshift(name);
    	name = [name];
    } else {
    	for (i=0;i<stars.length;i++){
    		stars[i].unshift(name+" &#"+(945+i).toString()+";");
    	}
    	name = [];
    	for (i=0;i<stars.length;i++){
    		name.push(stars[i][0]);
    	}
    }
    console.log("starRanges:");
    console.log(JSON.parse(JSON.stringify(t)));
    var n = t.filter(function (x) {
    	return !x.every(function (y){ 
    		return !isNaN(y);
    	});
    });
    if (n.length > 1){
    	for (i=1;i<n.length;i++){
    		max.push(n[i][1]);
    	}
    } 
    else {
    	max = n[0][1];
    }
    t = starZones(t);
    var planets = t; 
    planets.shift();
    planets = planets.map(function (x){
    	x.shift();x.shift();x.shift(); return x;
    });
    planets = zonePop(planets);
    var capturedPlanets = capture("Planet", max, letter, numb, dec);
    var capturedAsteroids = capture("Asteroid", max, letter, numb, dec);
    var orbitZones = t;
    var asteroids = planetsTable(name,orbitZones,planets);
    planets = asteroids[0]; asteroids = asteroids[1];
    
    
	console.log("Done");
    console.log("stars");
    console.log(stars);
    console.log("orbitZones");
    console.log(orbitZones);
    console.log("planets");
    console.log(planets);
    console.log("asteroids");
    console.log(asteroids);
    console.log("capturedPlanets");
    console.log(capturedPlanets);
    console.log("capturedAsteroids");
    console.log(capturedAsteroids);
	//$("#container").html("stars:<br>"+JSON.stringify(stars,null,'<br>&nbsp;&nbsp;&nbsp;&nbsp;')+"t:<br>"+JSON.stringify(t)+"<br><br>pop:<br>"+JSON.stringify(pop,null,'<br>&nbsp;&nbsp;&nbsp;&nbsp;')+"<br><br>cap:<br>"+JSON.stringify(cap,null,'<br>&nbsp;&nbsp;&nbsp;&nbsp;')+"<br><br>ast:<br>"+JSON.stringify(ast,null,'<br>&nbsp;&nbsp;&nbsp;&nbsp;'));
}