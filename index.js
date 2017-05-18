function generate(){ 
	var bode = Smooth([0.2, 0.4, 0.7, 1, 1.6, 2.8, 5.2, 10, 19.6, 38.8, 77.2, 154.0, 307.6, 614.8]);
	//Random integer between x and y, inclusive: x + random.nextInt(y-x+1)
	//Function to determine Star Size:
	/**
 	* Returns a random integer between min (inclusive) and max (inclusive)
 	*/
	function randomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function starClassSize(type){
		var r = randomInt(1,10)+randomInt(1,10);
		tab = [];
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
	}
	result = starClassSize("Primary");
	console.log(result);
	console.log("Done");
	$("#container").html(JSON.stringify(result));
}