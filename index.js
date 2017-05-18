
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
		tab.push("Primary")
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
		tab.push(tab[0]+" "+tab[1])
	} else {
		tab.push(tab[0]+tab[2]+" "+tab[1]);
	}
	return tab;
}
	//Add new orbits to existing sets
function zoneKeeper(tab,min,max){
	var t = tab;
	var j; for (j=min;j<=max,j++){
		if(t.indexOf(j)==-1){
			t.push(j);
		}
	}
	return t;
}
function starRanges(stars){
	if (Array.isArray(stars[0])){
		var r = [[]];
		var t = [];
		var i,s,n,mod; for (i=0;i<stars.length;i++){
			s = stars[i];
			if (typeof s[3] !== "string"){
				while (t.indexOf(s[3])>-1){
					s[3]=s[3]+1;
				}
				t.push(s[3]);
				n=s[3];
				switch(n){
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
						if (n>1000){
							mod = 0;
							switch(s[0]){
								case "M":
									mod = mod - 6;
									break;
								case "K":
									mod = mod - 3;
							}
							switch(s[1]){
								case "II":
									mod = mod + 8;
									break;
								case "III":
									mod = mod + 6;
							}
							orbits = randomInt(1,10)+mod;
							if (orbits < 0){orbits=0;}
							r.push([s[4],orbits,s])
						} else {
							r[0]=zoneKeeper(r[1],n-4,n+1)
							r.push([s[4],n-8,s])
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
				}
				switch(s[1]){
					case "II":
						mod = mod + 8;
						break;
					case "III":
						mod = mod + 6;
				}
				orbits = randomInt(1,10)+mod;
				if (orbits < 0){orbits=0;}
				r.push([s[4],orbits,s,"Primary"])
			}
		}
		function f(x){
			function g(x){
				return !isNaN(x)
			}
			return x.every(g);
		}
		var list = r.filter(f);
		function f(x){
			return x.indexOf("Primary")>-1;
		}
		var prime = r.filter(f);
		function f(x){
			return !(list.indexOf(x)>-1||prime.indexOf(x)>-1);
		}
		var y = r.filter(f);
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
	var mod = 0;
	switch(stars[0]){
		case "M":
			mod = mod - 6;
			break;
		case "K":
			mod = mod - 3;
	}
	switch(stars[1]){
		case "II":
			mod = mod + 8;
			break;
		case "III":
			mod = mod + 6;
	}
	var orbits = randomInt(1,10)+mod;
	if (orbits<0){orbits=0;}
	return [[stars[4],orbits,s,"Primary"]];
}
}

function generate(){
	var r = randomInt(1,20);
	var t = [];
	var let = [];
	var numb = [];
	var dec = [];
	var max = [];
	if (r < 10){
   		t.push(starClassSize("Primary"));
    	let = t[0][0];
   		numb = t[0][1];
   		dec = t[0][2];
	} 
	else if (r < 18){
   		t.concat([starClassSize("Primary"),starClassSize("")]);
   		for (i = 0;i<2;i++){
    		let.push(t[i][0]);
     		num.push(t[i][1]);
     		dec.push(t[i][2]);
     	}
	} 
	else if (r < 20){
    	t.concat([starClassSize("Primary"),starClassSize(""),starClassSize("")]);
    	for (i = 0;i<3;i++){
     		let.push(t[i][0]);
     		num.push(t[i][1]);
     		dec.push(t[i][2]);
     	}
	} 
	else {
    	t.concat([starClassSize("Primary"),starClassSize(""),starClassSize(""),starClassSize("")]);
    	for (i = 0;i<4;i++){
     		let.push(t[i][0]);
     		num.push(t[i][1]);
     		dec.push(t[i][2]);
     	}
    }
    t = starRanges(t);
	console.log("Done");
	$("#container").html(JSON.stringify(t));
}