function generate(){ 
	var bode = Smooth([.2, .4, .7, 1, 1.6, 2.8, 5.2, 10, 19.6, 38.8, 77.2, 154.0, 307.6, 614.8]);
	var random = new Random()
	//Random integer between x and y, inclusive: x + random.nextInt(y-x+1)
	//Function to determine Star Size:
	function starClassSize(type){1,2,3,4,5,6
		var r = 2 + random.nextInt(10)+random.nextInt(10);
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
		r = 2 + random.nextInt(10)+random.nextInt(10);
		if (type=="Primary"){
			if (r<3){
				tab.push("II");
				tab.push(random.nextInt(10));
			} else if (r<5) {
				tab.push("III");
				tab.push(random.nextInt(10));
			} else if (r<9) {
				tab.push("IV");
				if (tab[0]=="K"){
					tab.push(random.nextInt(5));
				} else {
					tab.push(random.nextInt(10));
				}
			} else if (r<19) {
				tab.push("V");
				tab.push(random.nextInt(10));
			} else {
     			if(tab[0] == "A"){
					tab.push("V");
      			} else {
					tab.push("VI");
      			}
     			if(tab[0] == "F"){
					tab.push(5+random.nextInt(5));
      			} else {
					tab.push(random.nextInt(10));
      			}
			}
			tab.push("Primary")
		} 
		else {
			if (r<3){
				tab.push("II");
				tab.push(random.nextInt(10));
			} else if (r<4) {
				tab.push("III");
				tab.push(random.nextInt(10));
			} else if (r<7) {
				tab.push("IV");
				if (tab[0]=="K"){
					tab.push(random.nextInt(5));
				} else {
					tab.push(random.nextInt(10));
				}
			} else if (r<15) {
				tab.push("V");
				tab.push(random.nextInt(10));
			} else if (r<19){
     			if(tab[[1]] == "A"){
					tab.push("V");
      			} else {
					tab.push("VI");
      			}
     			if(tab[[1]] == "F"){
					tab.push(5+random.nextInt(5));
      			} else {
					tab.push(random.nextInt(10));
      			}
			}
			else {
				var s = 2 + random.nextInt(10)+random.nextInt(10);
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
					tab.push(random.nextInt(6));
				} else {
					tab.push("dM");
					tab.push(random.nextInt(6));
				}
			}
			r = 1+random.nextInt(10);
			if (r==1){
				tab.push(1);
			} else if (r == 2){
				tab.push(2);
			} else if (r == 3){
				tab.push(3+random.nextInt(10));
			} else if (r == 4){
				tab.push(5+random.nextInt(10));
			} else if (r == 5){
				tab.push(7+random.nextInt(10));
			} else if (r == 6){
				tab.push(9+random.nextInt(10));
			} else if (r == 7){
				tab.push(11+random.nextInt(10));
			} else {
				tab.push((1+random.nextInt(10))*1000);
			}
		}
		if (typeof tab[2]==="string"){
			tab.push(tab[0]+" "+tab[1])
		} else {
			tab.push(tab[0]+tab[2]+" "+tab[1]);
		}
	}
	$("#container").html(JSON.stringify(starClassSize("Primary")));
}