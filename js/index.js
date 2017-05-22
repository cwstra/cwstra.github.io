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
				tab[0]="N/A";
				tab.push("dA");
				tab.push("N/A");
			} else if (s<8){
				tab[0]="N/A";
				tab.push("dF");
				tab.push("N/A");
			} else if (s<12){
				tab[0]="N/A";
				tab.push("dG");
				tab.push("N/A");
			} else if (s<17){
				if (randomInt(0,1)===0){tab[0]="K";}else{tab[0]="M";}
				tab.push("V");
				tab.push(randomInt(0,9));
			} else {
				if (randomInt(0,1)===0){tab[0]="K";}else{tab[0]="M";}
				tab.push("VI");
				tab.push(randomInt(0,9));
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
	if (["dA","dF","dG"].indexOf(tab[1])>-1){
		tab.push(tab[1]);
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
						if (s[3]>900){
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
							r[0]=zoneKeeper(r[0],s[3]-4,s[3]+1);
							r.push([s[4],s[3]-8,s]);
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
	for (s = randomInt(4,12);w.length<s;){
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
    		tab[i+2].push(c1[i+2]+" "+k.toString());
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
	var tab = []; var t; var p; var x; var y; var d; var num; var i; var k; var s; var z; var j;
	var n = randomInt(1,10)-6;
	if (n<1){
		return "No Captures";
	} 
	else if (type == "Asteroid"){
		if (Array.isArray(max)){
			for (i=0;i<max.length;i++){
				t = {};
				num = max[i];
				for (j=1;j<=n;j++){
					num = max[i];
					p = randomInt(0,num);
					x = randomInt(1,10)+2;
					if (x<max[p]){
						x = max[p];
					}
					y = randomInt(1,10);
					if (y<max[p]){
						y = max[p];
					}
					d = [randomInt(0,9),randomInt(0,9)];
					t["Rogue Asteroid " + j.toString()]=[x + d[0]*0.1, y + d[1]*0.1];
				}
				tab.push(t);
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
				tab.push(["Rogue Asteroid 1",[x + d[0]*0.1, y + d[1]*0.1]]);
			}
		}
	}
	else {
		k = Array(num).fill(1);
		for (i=0;i<max.length;i++){
			t = {};
			num = max[i];
			for (j=0;j<=n;j++){
				p = randomInt(0,num);
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
				t["Rogue Planet &#"+(945+i).toString()+"; "+j.toString()]=[z,[x+d[0]*0.1,s],[y+d[1]*0.1,starCheck(x,lett[p],numb[p],dec[p])]];
			}
			tab.push(t);
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

function planetsTable(name,orbitZones,planets){
	var tab=[],i,j,t,a,ast=[],countp,counta; 
	for(i=0;i<name.length;i++){
		t = {};
		a = [];
		countp = 1;
		counta = 1;
		for(j=0;j<orbitZones[i].length;j++){
			if (planets[i][j] == "Asteroid Belt"){
				a.push(j);
			} else if (["Empty Orbit","Companion Star","N/A"].indexOf(planets[i][j])===-1){
				t[name[i]+" "+(counta++).toString()]=[j,orbitZones[i][j],planets[i][j]];
			}
		} 
		if (t!=={}){
			tab.push(t);
		}
		ast.push(a);
	} 
	if (tab===[]){
		tab = "No Planets";
	}
	if (ast===[]){
		ast = "No Asteroid Belts";
	}
	return[tab,ast];
}

//In: One row of the planets 
//Out: Satellites list
function satellites(planets){
	function close(r){
		switch(r){
			case 1:	
				return 14;
			case 2:
				return 15;
			case 3:
				return 16;
			case 4:
				return 17;
			case 5:
				return 18;
			case 6:
				return 19;
			case 7:
				return 20;
			case 8:
				return 25;
			case 9:
				return 30;
			case 10:
				return 35;
			case 11:
				return 40;
			case 12:
				return 45;
			case 13:
				return 50;
			case 14:
				return 55;
			case 15:
				return 60;
			case 16:
				return 65;
			case 17:
				return 70;
			case 18:
				return 75;
			case 19:
				return 80;
			case 20:
				return 85;
		}
	}
	function med(r){
		switch(r){
			case 1:	
				return 85;
			case 2:
				return 90;
			case 3:
				return 95;
			case 4:
				return 100;
			case 5:
				return 105;
			case 6:
				return 110;
			case 7:
				return 115;
			case 8:
				return 120;
			case 9:
				return 125;
			case 10:
				return 130;
			case 11:
				return 135;
			case 12:
				return 140;
			case 13:
				return 145;
			case 14:
				return 150;
			case 15:
				return 155;
			case 16:
				return 160;
			case 17:
				return 165;
			case 18:
				return 170;
			case 19:
				return 175;
			case 20:
				return 180;
		}
	}
	function far(r){
		switch(r){
			case 1:	
				return 180;
			case 2:
				return 185;
			case 3:
				return 190;
			case 4:
				return 195;
			case 5:
				return 200;
			case 6:
				return 205;
			case 7:
				return 210;
			case 8:
				return 215;
			case 9:
				return 220;
			case 10:
				return 230;
			case 11:
				return 240;
			case 12:
				return 250;
			case 13:
				return 260;
			case 14:
				return 270;
			case 15:
				return 280;
			case 16:
				return 290;
			case 17:
				return 300;
			case 18:
				return 320;
			case 19:
				return 340;
			case 20:
				return 360;
		}
	}
	function ring(r){
		switch(r){
			case 1:	
				return 1;
			case 2:
				return 2;
			case 3:
				return 3;
			case 4:
				return 4;
			case 5:
				return 5;
			case 6:
				return 6;
			case 7:
				return 7;
			case 8:
				return 8;
			case 9:
				return 9;
			case 10:
				return 10;
			case 11:
				return 11;
			case 12:
				return 12;
			case 13:
				return 14;
			case 14:
				return 16;
			case 15:
				return 18;
			case 16:
				return 20;
			case 17:
				return 25;
			case 18:
				return 30;
			case 19:
				return 35;
			case 20:
				return 40;
		}
	}
	var n=[], p=[], z=[];
	var i; for(i in planets){
  	if (planets.hasOwnProperty(i)) {
			n.push(i);
			p.push(planets[i][2]);
			z.push(planets[i][1]);
    }
	}
	var tab = {};
	var num = 1;
	var x, t, s, d, j, r, k, planet, pos;
	for (i=0;i<n.length;i++){
		t = {};
		switch (p[i]){
			case "Mesoplanet":
			case "Small Terrestrial":
				d = [randomInt(1,10)-7,randomInt(1,10)-9];
				if (d[0] > 0){
					s=[];
					for (j=0;j<d[0];j++){
						r = randomInt(1,20); 
						s.push([randomInt(100,1000)*0.001,close(r)]);
					}
					t["Moonlets"]=s;
				} 
				if (d[1]===1){
					r = randomInt(1,20);
					t["Small Moons"]=[randomInt(1000,2000)*0.001,close(r)];
				}
				break;
			case "Small Gas Giant":
			case "Gas Giant":
				d = [randomInt(1,10)-5,randomInt(1,10)-8,randomInt(1,10),randomInt(1,10)-1,
					 randomInt(1,10)-3,randomInt(1,10)-6,randomInt(1,10)-8];
				if (d[0]>0){
					s=[];
					for (j=0;j<d[0];j++){
						r = randomInt(1,20); 
						s.push(ring(r));
					}
					t["Minor Ring Systems"]=s;
				}
				if (d[1]>0){
					s=[];
					for (j=0;j<d[0];j++){
						r = randomInt(1,20); 
						s.push(ring(r));
					}
					t["Major Ring Systems"]=s;
				}
				for (k=2;k<7;k++){
					s = [];
					for (j=0;j<d[k];j++){
						pos = randomInt(1,10);
						r = randomInt(1,20);
						if ((["Gas Giant", "Gas Supergiant"].indexOf(p[i])>-1&&pos==10)||
							(["Gas Ultragiant/Brown Dwarf","Gas Ultragiant"].indexOf(p[i])>-1 && pos>8)){
								pos = far(r);
						} else if ((p[i]=="Small Gas Giant"&&pos > 7)||
								   (["Gas Giant", "Gas Supergiant"].indexOf(p[i])>-1 && pos>6)||
								   (["Gas Ultragiant/Brown Dwarf","Gas Ultragiant"].indexOf(p[i])>-1 && pos>4))
							{
								pos = med(r);
						} else {
								pos = close(r);
						}
						if (d[k]>0){
							switch(k){
								case 3:
									s.push([randomInt(100,1000),pos]);
									break;
								case 4:
									s.push([randomInt(1000,2000),pos]);
									break;
								case 5:
									s.push([randomInt(2000,3000),pos]);
									break;
								case 6:
									s.push([randomInt(3000,4000),pos]);
									break;
								case 7:
									planet = "Empty Orbit";
									while (["Empty Orbit", "Asteroid Belt","Super Terrestrial", "Small Gas Giant", "Gas Giant", "Gas Supergiant", "Gas Ultragiant","Gas Ultragiant/Brown Dwarf"].indexOf(planet)>-1){
										if (Array.isArray(z[i])){
											planet = zonePop([z[i][0]])[0][0];
										} else {
											planet = zonePop(z[i])[0][0];
										}
									}
									s.push(["Huge Moon"+num.toString(),planet,pos]);
									num++;
							}
						}
					}
					if (s.length>0){
						switch(k){
							case 3:
								t["Moonlets"]=s;
                				break;
							case 4:
								t["Small Moons"]=s;
                				break;
							case 5:
								t["Medium Moons"]=s;
                				break;
							case 6:
								t["Large Moons"]=s;
                				break;
							case 7:
								t["Huge Moons"]=s;
						}
					}
				}
				break;
			case "Gas Supergiant":
       		case "Gas Ultragiant/Brown Dwarf": 
       		case "Gas Ultragiant":
       			d = [randomInt(1,10)-2,randomInt(1,10)-5,randomInt(1,10)+3,randomInt(1,10)+1,
					 randomInt(1,10),randomInt(1,10)-4,randomInt(1,10)-6];
				if (d[0]>0){
					s=[];
					for (j=0;j<d[0];j++){
						r = randomInt(1,20); 
						s.push(ring(r));
					}
					t["Minor Ring Systems"]=s;
				}
				if (d[1]>0){
					s=[];
					for (j=0;j<d[0];j++){
						r = randomInt(1,20); 
						s.push(ring(r));
					}
					t["Major Ring Systems"]=s;
				}
				for (k=2;k<7;k++){
					s = [];
					for (j=0;j<d[k];j++){
						pos = randomInt(1,10);
						r = randomInt(1,20);
						if ((["Gas Giant", "Gas Supergiant"].indexOf(p[i])>-1&&pos==10)||
							(["Gas Ultragiant/Brown Dwarf","Gas Ultragiant"].indexOf(p[i])>-1 && pos>8)){
								pos = far(r);
						} else if ((p[i]=="Small Gas Giant"&&pos > 7)||
								   (["Gas Giant", "Gas Supergiant"].indexOf(p[i])>-1 && pos>6)||
								   (["Gas Ultragiant/Brown Dwarf","Gas Ultragiant"].indexOf(p[i])>-1 && pos>4))
							{
								pos = med(r);
						} else {
								pos = close(r);
						}
						if (d[k]>0){
							switch(k){
								case 3:
									s.push([randomInt(100,1000),pos]);
									break;
								case 4:
									s.push([randomInt(1000,2000),pos]);
									break;
								case 5:
									s.push([randomInt(2000,3000),pos]);
									break;
								case 6:
									s.push([randomInt(3000,4000),pos]);
									break;
								case 7:
									planet = "Empty Orbit";
									while (["Empty Orbit", "Asteroid Belt","Super Terrestrial", "Small Gas Giant", "Gas Giant", "Gas Supergiant", "Gas Ultragiant","Gas Ultragiant/Brown Dwarf"].indexOf(planet)>-1){
										if (Array.isArray(z[i])){
											planet = zonePop([z[i][0]])[0][0];
										} else {
											planet = zonePop(z[i])[0][0];
										}
									}
									s.push(["Huge Moon"+num.toString(),planet,pos]);
									num++;
							}
						}
					}
					if (s.length>0){
						switch(k){
							case 3:
								t["Moonlets"]=s;
                				break;
							case 4:
								t["Small Moons"]=s;
                				break;
							case 5:
								t["Medium Moons"]=s;
                				break;
							case 6:
								t["Large Moons"]=s;
                				break;
							case 7:
								t["Huge Moons"]=s;
						}
					}
				}
				break;
       		default:
       			d = [randomInt(1,10)-9,randomInt(1,10)-6,randomInt(1,10)-7,randomInt(1,10)-9];
       			if (d[0]===1){
       				r = randomInt(1,20);
       				t["Minor Ring Systems"]=[ring(r)];
       			}
       			if (d[1]>0){
       				s = [];
       				for (j=0;j<d[1];j++){
       					r = randomInt(1,20);
       					s.push([randomInt(100,1000)*0.001,close(r)]);
       				}
       				t["Moonlets"]=s;
       			}
       			if (d[2]>0){
       				s = [];
       				for (j=0;j<d[2];j++){
       					r = randomInt(1,20);
       					s.push([randomInt(1000,2000)*0.001,close(r)]);
       				}
       				t["Small Moons"]=s;
       			}
       			if (d[3]===1){
       				r = randomInt(1,20);
       				t["Medium Moons"]=[randomInt(2000,3000)*0.001,close(r)];
       			}
		}
		if (t === {}){
			t="No Satellites";	
		}
		tab[n[i]]=t;
	}
	return tab;
}

function tableGen(sysname,stars,orbitZones,planets,satel,asteroids,capturedPlanets,capturedAsteroids){
	function starType(letter,number){
		var s;
		switch (letter){
			case "A":
				s = "White";
				break;
			case "F":
				s = "Yellow-White";
				break;
			case "G":
				s = "Yellow";
				break;
			case "K":
				s = "Orange";
				break;
			case "M":
				s = "Red";
		}
		switch (number){
			case "II":
				s += "Luminous Giant";
				break;
			case "III":
				s += "Giant";
				break;
			case "IV":
				s += "Sub-Giant";
				break;
			case "IV":
				s += "Dwarf";
				break;
		}
		return s;
	}
	
	function round(value, decimals) {
  		return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
	}
	
	var tabstr = '<table>\n\t<tr><td colspan="3">'+sysname+" System</td><tr>\n";
	var i,s,img,prop,j; for (i=0;i<stars.length;i++){
		tabstr += '\t<tr><td colspan="3">';
		if (i===0){
			tabstr += "Primary Star: " + stars[i][0];
		} else {
			tabstr += "Secondary Star: " + stars[i][0];
		}
		if ( ["dA","dF","dG"].indexOf(stars[i][1]) ){
			s = "Degenerate White Dwarf";
		} 
		else if (stars[i][1]=="VI"){
			s = "Red Subdwarf";
		} 
		else {
			s = starType(stars[i][0],stars[i][1]);
		}
		img = '<img src="images/Class_';
		if (["dA","dF","dG"].indexOf(stars[i][1])>-1){
			img += "dX";
		} 
		else {
			img += stars[i][0];
		}
		img += '_Star.png" alt="' + s + ' Image" style = "width:200px;height:200px;">';
		tabstr += "</td></tr>\n\t<tr><td>Star Type:</td><td>"+stars[i][4]+"; "+s+'</td><td rowspan = "3">'+img+'</td></tr>\n';
		tabstr += '\t<tr><td>Number of Orbits:</td><td>'+stars[i][2]+'</td></tr>\n';
		if (i===0){
			tabstr += '\t<tr><td colspan = "2">Primary Star</td></tr>\n';
		} else {
			tabstr += '\t<tr><td>Orbital Position relative to Primary Star</td><td>'+stars[i][3]+'</td></tr>\n';
		}
		if (planets[i]==={} && capturedPlanets=="No Captures"){
			tabstr += '\t<tr><td colspan="3">No Orbiting Planets</td></tr>';
		} else {
			tabstr += '\t<tr><td colspan="3">Planets:</td></tr>\n';
			for (prop in planets[i]){if (planets[i].hasOwnProperty(prop)){
				tabstr+='\t</td><td colspan="3">'+prop+'</td></tr>\n';
				tabstr+='\t<tr><td></td><td>Planet Type:</td><td>'+planets[i][prop][2]+'</td></tr>\n';
				tabstr+='\t<tr><td></td><td>Orbital Zone:</td><td>'+planets[i][prop][1]+'</td></tr>\n';
				tabstr+='\t<tr><td></td><td>Orbital Position:</td><td>'+planets[i][prop][0]+'</td></tr>\n';
				tabstr+='\t<tr><td></td><td>Orbital Distance:</td><td>'+round(bode(planets[i][prop][0]),2)+' AU</td></tr>\n';
			}}
			if (capturedPlanets!="No Captures"){
				for (prop in capturedPlanets[i]){if (capturedPlanets[i].hasOwnProperty(prop)){
					tabstr+='\t</td><td colspan="3">'+prop+'</td></tr>\n';
					tabstr+='\t<tr><td></td><td>Planet Type:</td><td>'+capturedPlanets[i][prop][0]+'</td></tr>\n';
					tabstr+='\t<tr><td></td><td>Orbital Zone:</td><td>'+capturedPlanets[i][prop][1][1]+" to "+capturedPlanets[i][prop][2][1]+'</td></tr>\n';
					tabstr+='\t<tr><td></td><td>Orbital Position:</td><td>'+capturedPlanets[i][prop][1][0]+" to "+capturedPlanets[i][prop][2][0]+'</td></tr>\n';
					tabstr+='\t<tr><td></td><td>Orbital Distance:</td><td>'+round(bode(capturedPlanets[i][prop][1][0]),2)+" AU to "+round(bode(capturedPlanets[i][prop][2][0]),2)+' AU</td></tr>\n';
				}}
			}
		}
		if (asteroids[i].length===0){
			tabstr += '\t<tr><td colspan="3">No Asteroid Belts</td></tr>\n';
		} else {
			tabstr += '\t<tr><td colspan="3">Asteroid Belts at Orbital Positions';
			for (j=0;j<asteroids[i].length;j++){
				tabstr+= " "+asteroids[i][j].toString()+",";
			}
			tabstr = tabstr.substring(0,tabstr.length-1)+'.</td></tr>\n';
		}
		if (capturedAsteroids!="No Captures"){
			tabstr += '\t<tr><td colspan="3">Rogue Asteroids:</td></tr>\n';
			for (prop in capturedAsteroids[i]){if(capturedAsteroids[i].hasOwnProperty(prop)){
				tabstr += '\t<tr><td></td><td>'+prop+':</td><td>Orbits From: '+round(bode(capturedAsteroids[i][prop][0]),2)+'AU to '+round(bode(capturedAsteroids[i][prop][1]),2)+'AU</td></tr>\n';
			}}
		}
	}
	tabstr += "</table>";
	$("#solarSystem").html(tabstr);
	
/*	var acc = document.getElementsByClassName("accordion");

	for (i = 0; i < acc.length; i++) {
    	acc[i].onclick = function(){*/
        	/* Toggle between adding and removing the "active" class,
        	to highlight the button that controls the panel */
//        	this.classList.toggle("active");

        	/* Toggle between hiding and showing the active panel */
/*        	var panel = this.nextElementSibling;
        	if (panel.style.display === "block") {
            	panel.style.display = "none";
        	} 
        	else {
            	panel.style.display = "block";
        	}
    	};
	}*/
}

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
    var sysname = name;
    if (stars.length==1){
    	name = [name];
    } else {
    	var n = [];
    	for (i=0;i<stars.length;i++){
    		n.push(name+" &#"+(945+i).toString()+";");
    	}
    	name = n;
    }
    console.log("starRanges:");
    console.log(JSON.parse(JSON.stringify(t)));
    console.log(["t",t]);
    var n = t.filter(function (x) {
    	return !x.every(function (y){ 
    		return !isNaN(y);
    	});
    });
    console.log(["n",n]);
   	for (i=0;i<n.length;i++){
   		max.push(n[i][1]);
   	}
    t = starZones(t);
    var planets = t; 
    planets.shift();
    planets = planets.map(function (x){
    	x.shift();x.shift();x.shift(); return x;
    });
    planets = zonePop(planets);
    console.log(["max",max]);
    var capturedPlanets = capture("Planet", max, letter, numb, dec);
    var capturedAsteroids = capture("Asteroid", max, letter, numb, dec);
    var orbitZones = t;
    var asteroids = planetsTable(name,orbitZones,planets);
    planets = asteroids[0]; asteroids = asteroids[1];
    var satel = [];
    for (i=0;i<planets.length;i++){
    	satel.push(satellites(planets[i]));
    }
	console.log("Done");
    console.log("stars");
    console.log(stars);
    console.log("orbitZones");
    console.log(orbitZones);
    console.log("planets");
    console.log(planets);
    console.log("satel");
    console.log(satel);
    console.log("asteroids");
    console.log(asteroids);
    console.log("capturedPlanets");
    console.log(capturedPlanets);
    console.log("capturedAsteroids");
    console.log(capturedAsteroids);
    
    tableGen(sysname,stars,orbitZones,planets,satel,asteroids,capturedPlanets,capturedAsteroids);
	//$("#container").html("stars:<br>"+JSON.stringify(stars,null,'<br>&nbsp;&nbsp;&nbsp;&nbsp;')+"t:<br>"+JSON.stringify(t)+"<br><br>pop:<br>"+JSON.stringify(pop,null,'<br>&nbsp;&nbsp;&nbsp;&nbsp;')+"<br><br>cap:<br>"+JSON.stringify(cap,null,'<br>&nbsp;&nbsp;&nbsp;&nbsp;')+"<br><br>ast:<br>"+JSON.stringify(ast,null,'<br>&nbsp;&nbsp;&nbsp;&nbsp;'));
}