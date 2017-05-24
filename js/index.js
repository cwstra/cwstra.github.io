function intersect(a, b) {
  var t;
  if (b.length > a.length) {
    t = b;
    b = a;
    a = t;
  } // indexOf to loop over shorter
  return a.filter(function(e) {
    return b.indexOf(e) > -1;
  });
}

$(document).ready(function() {
	$(".sampleRP").hide();
	$('.stars').hide();
	$("#specificGen").hide();
	$('.addPlanet').click(function() {
		var currentCount = $('#repeatingPlanets').length;
		var newCount = currentCount + 1;
		var lastRepeatingGroup = $('#repeatingPlanets').last();
		var newSection = $(".sampleRP").clone().toggleClass("sampleRP planetSection").show();
		newSection.insertAfter(lastRepeatingGroup);
		newSection.find("select").each(function(index, input) {
			input.id = input.id.replace("_" + currentCount, "_" + newCount);
		});
		newSection.find("label").each(function(index, label) {
			var l = $(label);
			l.attr('for', l.attr('for').replace("_" + currentCount, "_" + newCount));
		});
		return false;
	});
	// Delete a repeating section
	$(".deletePlanet").on('click', function() {
		$(this).parent('div').remove();
		return false;
	});
	$("#random").on("change", function() {
		if ($(this).val() == 'preset') {
			$('#specificGen').show();
		} else {
			$('#specificGen').hide();
		}
	});
	$("#starNumber").on("change", function() {
		var stars = $(this).val();
		if (stars == 'random') {
			$('#stars').hide();
		} else {
			$('#stars').show();
			if (stars == 1) {
				$('.star2').hide();
				$('.star3').hide();
				$('.star4').hide();
			} else if (stars == 2) {
				$('.star2').show();
				$('.star3').hide();
				$('.star4').hide();
			} else if (stars == 3) {
				$('.star2').show();
				$('.star3').show();
				$('.star4').hide();
			} else {
				$('.star2').show();
				$('.star3').show();
				$('.star4').show();
			}
		}
	});

	function primCheck(spec, dec, lum) {
		var oSpec = spec,
			oDec = dec,
			oLum = lum;
		var possibSpect = ["random", "W", "O", "B", "A", "F", "G", "K", "M"];
		var possibDec = ["random", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		var possibLum = ["random", "Ia", "Ib", "II", "III", "IV", "V", "VI"];
		$("#star1Spect").empty();
		$("#star1Dec").empty();
		$("#star1Lum").empty();
		switch (oSpec) {
			case "W":
				possibLum = intersect(possibLum, ["random", "Ia", "Ib"]);
				break;
			case "O":
				possibLum = intersect(possibLum, ["random", "Ia", "Ib", "V"]);
				break;
			case "B":
			case "A":
				possibLum = intersect(possibLum, ["random", "Ia", "Ib", "II", "III", "IV", "V"]);
		}
		switch (oLum) {
			case "II":
			case "III":
				possibSpect = intersect(possibSpect, ["random", "B", "A", "F", "G", "K", "M"]);
				break;
			case "IV":
				possibSpect = intersect(possibSpect, ["random", "B", "A", "F", "G", "K"]);
				break;
			case "V":
				possibSpect = intersect(possibSpect, ["random", "O", "B", "A", "F", "G", "K", "M"]);
				break;
			case "VI":
				possibSpect = intersect(possibSpect, ["random", "F", "G", "K", "M"]);
		}
		switch ([oSpec, oLum]) {
			case ["K", "IV"]:
				possibDec = intersect(possibDec, ["random", 0, 1, 2, 3, 4]);
				break;
			case ["F", "VI"]:
				possibDec = intersect(possibDec, ["random", 5, 6, 7, 8, 9]);
		}
		switch ([oSpec, oDec]) {
			case ["K", 0]:
			case ["K", 1]:
			case ["K", 2]:
			case ["K", 3]:
			case ["K", 4]:
				possibLum = intersect(possibLum, ["random", "Ia", "Ib", "II", "III", "V", "VI"]);
				break;
			case ["F", 5]:
			case ["F", 6]:
			case ["F", 7]:
			case ["F", 8]:
			case ["F", 9]:
				possibLum = intersect(possibLum, ["random", "Ia", "Ib", "II", "III", "IV", "V"]);
		}
		switch ([oDec, oLum]) {
			case [0, "IV"]:
			case [1, "IV"]:
			case [2, "IV"]:
			case [3, "IV"]:
			case [4, "IV"]:
				possibSpect = intersect(possibSpect, ["random", "W", "O", "B", "A", "F", "G", "M"]);
				break;
			case [5, "VI"]:
			case [6, "VI"]:
			case [7, "VI"]:
			case [8, "VI"]:
			case [9, "VI"]:
				possibSpect = intersect(possibSpect, ["random", "W", "O", "B", "A", "G", "K", "M"]);
		}
		if (possibSpect.length === 2) {
			possibSpect = intersect(possibSpect, ["W", "O", "B", "A", "F", "G", "K", "M"]);
		}
		if (possibDec.length === 2) {
			possibDec = intersect(possibDec, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
		}
		if (possibLum.length === 2) {
			possibLum = intersect(possibLum, ["Ia", "Ib", "II", "III", "IV", "V", "VI"]);
		}
		var i;
		for (i = 0; i < possibSpect.length; i++) {
      if (possibSpect[i]===oSpec){
			     $("#star1Spect").append('<option value="' + possibSpect[i] + '" selected>' + possibSpect[i] + '</option>');
      }
      else {
			     $("#star1Spect").append('<option value="' + possibSpect[i] + '">' + possibSpect[i] + '</option>');
      }
		}
		for (i = 0; i < possibDec.length; i++) {
      if (possibDec[i]==oDec){
			     $("#star1Dec").append('<option value=' + possibDec[i] + ' selected>' + possibDec[i] + '</option>');
      }
      else {
			     $("#star1Dec").append('<option value=' + possibDec[i] + '>' + possibDec[i] + '</option>');
      }
		}
		for (i = 0; i < possibLum.length; i++) {
      if (possibLum[i]===oLum){
			     $("#star1Lum").append('<option value="' + possibLum[i] + '" selected>' + possibLum[i] + '</option>');
      }
      else {
			     $("#star1Lum").append('<option value="' + possibLum[i] + '">' + possibLum[i] + '</option>');
      }
		}
	}

	function secCheck(spec, dec, lum, n) {
		function intersect(a, b) {
			var t;
			if (b.length > a.length) {
				t = b;
				b = a;
				a = t;
			} // indexOf to loop over shorter
			return a.filter(function(e) {
				return b.indexOf(e) > -1;
			});
		}
		var oSpec = spec,
			oDec = dec,
			oLum = lum;
		var possibSpect = ["random", "W", "O", "B", "A", "F", "G", "K", "M", "dA", "dF", "dG"];
		var possibDec = ["random", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		var possibLum = ["random", "Ia", "Ib", "II", "III", "IV", "V", "VI", "VII"];
		$("#star" + n + "Spect").empty();
		$("#star" + n + "Dec").empty();
		$("#star" + n + "Lum").empty();
		switch (oSpec) {
			case "W":
				possibLum = intersect(possibLum, ["random", "Ia", "Ib"]);
				break;
			case "O":
				possibLum = intersect(possibLum, ["random", "Ia", "Ib", "V"]);
				break;
			case "B":
			case "A":
				possibLum = intersect(possibLum, ["random", "Ia", "Ib", "II", "III", "IV", "V"]);
				break;
			case "dA":
			case "dF":
			case "dG":
				possibLum = intersect(possibLum, ["VII"]);
				break;
			default:
				possibLum = intersect(possibLum, ["random", "Ia", "Ib", "II", "III", "IV", "V", "VI"]);
				possibDec = ["N/A"];
		}
		switch (oLum) {
			case "Ia":
			case "Ib":
				possibSpect = intersect(possibSpect, ["random", "W", "O", "B", "A", "F", "G", "K", "M"]);
				break;
			case "II":
			case "III":
				possibSpect = intersect(possibSpect, ["random", "B", "A", "F", "G", "K", "M"]);
				break;
			case "IV":
				possibSpect = intersect(possibSpect, ["random", "B", "A", "F", "G", "K"]);
				break;
			case "V":
				possibSpect = intersect(possibSpect, ["random", "O", "B", "A", "F", "G", "K", "M"]);
				break;
			case "VI":
				possibSpect = intersect(possibSpect, ["random", "F", "G", "K", "M"]);
				break;
			case "VII":
				possibSpect = intersect(possibSpect, ["random", "dA", "dF", "dG"]);
				possibDec = ["N/A"];
		}
		if (oDec !== "random" && possibDec !== ["N/A"]) {
			possibSpect = intersect(possibSpect, ["random", "Ia", "Ib", "II", "III", "IV", "V", "VI"]);
			possibLum = intersect(possibLum, ["random", "W", "O", "B", "A", "F", "G", "K", "M"]);
		}
		switch ([oSpec, oLum]) {
			case ["K", "IV"]:
				possibDec = intersect(possibDec, ["random", 0, 1, 2, 3, 4]);
				break;
			case ["F", "VI"]:
				possibDec = intersect(possibDec, ["random", 5, 6, 7, 8, 9]);
		}
		switch ([oSpec, oDec]) {
			case ["K", 0]:
			case ["K", 1]:
			case ["K", 2]:
			case ["K", 3]:
			case ["K", 4]:
				possibLum = intersect(possibLum, ["random", "Ia", "Ib", "II", "III", "V", "VI"]);
				break;
			case ["F", 5]:
			case ["F", 6]:
			case ["F", 7]:
			case ["F", 8]:
			case ["F", 9]:
				possibLum = intersect(possibLum, ["random", "Ia", "Ib", "II", "III", "IV", "V"]);
		}
		switch ([oDec, oLum]) {
			case [0, "IV"]:
			case [1, "IV"]:
			case [2, "IV"]:
			case [3, "IV"]:
			case [4, "IV"]:
				possibSpect = intersect(possibSpect, ["random", "W", "O", "B", "A", "F", "G", "M"]);
				break;
			case [5, "VI"]:
			case [6, "VI"]:
			case [7, "VI"]:
			case [8, "VI"]:
			case [9, "VI"]:
				possibSpect = intersect(possibSpect, ["random", "W", "O", "B", "A", "G", "K", "M"]);
		}
		if (possibSpect.length === 2) {
			possibSpect = intersect(possibSpect, ["W", "O", "B", "A", "F", "G", "K", "M"]);
		}
		if (possibDec.length === 2) {
			possibDec = intersect(possibDec, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
		}
		if (possibLum.length === 2) {
			possibLum = intersect(possibLum, ["Ia", "Ib", "II", "III", "IV", "V", "VI"]);
		}
		var i;
		for (i = 0; i < possibSpect.length; i++) {
      if (possibSpect[i]===oSpec){
			     $("#star"+n+"Spect").append('<option value="' + possibSpect[i] + '" selected>' + possibSpect[i] + '</option>');
      }
      else {
			     $("#star"+n+"Spect").append('<option value="' + possibSpect[i] + '">' + possibSpect[i] + '</option>');
      }
		}
		for (i = 0; i < possibDec.length; i++) {
      if (possibDec[i]==oDec){
			     $("#star"+n+"Dec").append('<option value=' + possibDec[i] + ' selected>' + possibDec[i] + '</option>');
      }
      else {
			     $("#star"+n+"Dec").append('<option value=' + possibDec[i] + '>' + possibDec[i] + '</option>');
      }
		}
		for (i = 0; i < possibLum.length; i++) {
      if (possibLum[i]===oLum){
			     $("#star"+n+"Lum").append('<option value="' + possibLum[i] + '" selected>' + possibLum[i] + '</option>');
      }
      else {
			     $("#star"+n+"Lum").append('<option value="' + possibLum[i] + '">' + possibLum[i] + '</option>');
      }
		}
	}
	$("#star1Spect, #star1Dec, #star1Lum").on("change", function() {
		primCheck($("#star1Spect").val(), $("#star1Dec").val(), $("#star1Lum").val());
	});
	$("#star2Spect, #star2Dec, #star2Lum").on("change", function() {
		secCheck($("#star2Spect").val(), $("#star2Dec").val(), $("#star2Lum").val(), 2);
	});
	$("#star3Spect, #star3Dec, #star3Lum").on("change", function() {
		secCheck($("#star3Spect").val(), $("#star3Dec").val(), $("#star3Lum").val(), 3);
	});
	$("#star4Spect, #star4Dec, #star4Lum").on("change", function() {
		secCheck($("#star4Spect").val(), $("#star4Dec").val(), $("#star4Lum").val(), 4);
	});
});
//Positioning function for each planet
bode = Smooth([0.2, 0.4, 0.7, 1, 1.6, 2.8, 5.2, 10, 19.6, 38.8, 77.2, 154.0, 307.6, 614.8]);
curSystem = "";
//Random integer between x and y, inclusive: x + random.nextInt(y-x+1)
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 */
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Function to determine Star Size:
function starClassSize(n, spect, dec, lum) {
	var spectt = (spect !== "random"),
		dect = (dec !== "random"),
		lumt = (lum !== "random");
	var possibDec = [];
	var r, tab = [];
	if (spectt) {
		tab.push(spect);
	}
  else {
		r = randomInt(1, 10) + randomInt(1, 10);
		if (r < 4) {
			tab.push("A");
		} else if (r < 8) {
			tab.push("F");
		} else if (r < 13) {
			tab.push("G");
		} else if (r < 18) {
			tab.push("K");
		} else {
			tab.push("M");
		}
	}
	if (lumt) {
		tab.push(lum);
		if (dect) {
			tab.push(dec);
		} else {
			$("#star" + n + "Dec > option").each(function() {
				possibDec.push(this.value);
			});
			r = randomInt(0, possibDec.length - 1);
			tab.push(possibDec[r]);
			if (n === 1) {
				tab.push("Primary");
			}
		}
	}
  else {
		r = randomInt(1, 10) + randomInt(1, 10);
		if (n === 1) {
			if (tab[0] == "W") {
				if (r < 11) {
					tab.push("Ia");
				} else {
					tab.push("Ib");
				}
			} else if (tab[0] == "O") {
				if (r < 8) {
					tab.push("Ia");
				} else if (r < 14) {
					tab.push("Ib");
				} else {
					tab.push("V");
				}
			} else if (r < 3) {
				tab.push("II");
				tab.push(randomInt(0, 9));
			} else if (r < 5) {
				tab.push("III");
				tab.push(randomInt(0, 9));
			} else if (r < 9) {
				tab.push("IV");
				if (tab[0] == "K") {
					tab.push(randomInt(0, 4));
				} else {
					tab.push(randomInt(0, 9));
				}
			} else if (r < 19) {
				tab.push("V");
				tab.push(randomInt(0, 9));
			} else {
				if (tab[0] == "A") {
					tab.push("V");
				} else {
					tab.push("VI");
				}
				if (tab[0] == "F") {
					tab.push(randomInt(5, 9));
				} else {
					tab.push(randomInt(0, 9));
				}
			}
			tab.push("Primary");
		} else {
			if (tab[0] == "W") {
				if (r < 11) {
					tab.push("Ia");
				} else {
					tab.push("Ib");
				}
			} else if (tab[0] == "O") {
				if (r < 8) {
					tab.push("Ia");
				} else if (r < 14) {
					tab.push("Ib");
				} else {
					tab.push("V");
				}
			} else if (r < 3) {
				tab.push("II");
				tab.push(randomInt(0, 9));
			} else if (r < 4) {
				tab.push("III");
				tab.push(randomInt(0, 9));
			} else if (r < 7) {
				tab.push("IV");
				if (tab[0] == "K") {
					tab.push(randomInt(0, 4));
				} else {
					tab.push(randomInt(0, 9));
				}
			} else if (r < 15) {
				tab.push("V");
				tab.push(randomInt(0, 9));
			} else if (r < 19) {
				if (tab[[1]] == "A") {
					tab.push("V");
				} else {
					tab.push("VI");
				}
				if (tab[[1]] == "F") {
					tab.push(randomInt(5, 9));
				} else {
					tab.push(randomInt(0, 9));
				}
			} else {
				var s = randomInt(1, 10) + randomInt(1, 10);
				if (s < 5) {
					tab[0] = "dA";
					tab.push("VII");
					tab.push("N/A");
				} else if (s < 8) {
					tab[0] = "dF";
					tab.push("VII");
					tab.push("N/A");
				} else if (s < 12) {
					tab[0] = "dG";
					tab.push("VII");
					tab.push("N/A");
				} else if (s < 17) {
					if (randomInt(0, 1) === 0) {
						tab[0] = "K";
					} else {
						tab[0] = "M";
					}
					tab.push("V");
					tab.push(randomInt(0, 9));
				} else {
					if (randomInt(0, 1) === 0) {
						tab[0] = "K";
					} else {
						tab[0] = "M";
					}
					tab.push("VI");
					tab.push(randomInt(0, 9));
				}
			}
			r = randomInt(1, 10);
			if (r == 1) {
				tab.push(1);
			} else if (r == 2) {
				tab.push(2);
			} else if (r < 8) {
				tab.push(randomInt(1, 10) + 2 * (r - 2));
			} else {
				tab.push(randomInt(1, 10) * 1000);
			}
		}
		if (["dA", "dF", "dG"].indexOf(tab[0]) > -1) {
			tab.push(tab[1]);
		} else {
			tab.push(tab[0] + tab[2] + " " + tab[1]);
		}
	}
	return tab;
}
//Add new orbits to existing sets
function zoneKeeper(tab, min, max) {
	var t = new Set(tab);
	var j;
	for (j = min; j <= max; j++) {
		t.add(j);
	}
	return [...t];
}

function starRanges(stars) {
	var orbits;
	var mod;
	if (Array.isArray(stars[0])) {
		var r = [
			[]
		];
		var t = [];
		var i;
		var s;
		var n;
		for (i = 0; i < stars.length; i++) {
      console.log(r);
			s = stars[i];
			if (typeof s[3] !== "string") {
				while (t.indexOf(s[3]) > -1) {
					s[3] = s[3] + 1;
				}
				t.push(s[3]);
				switch (s[3]) {
					case 1:
						r[0] = zoneKeeper(r[0], 0, 1);
						r.push([s[4], 0, s]);
						break;
					case 2:
						r[0] = zoneKeeper(r[0], 1, 2);
						r.push([s[4], 1, s]);
						break;
					case 3:
						r[0] = zoneKeeper(r[0], 2, 3);
						r.push([s[4], 1, s]);
						break;
					case 4:
						r[0] = zoneKeeper(r[0], 2, 4);
						r.push([s[4], 2, s]);
						break;
					case 5:
						r[0] = zoneKeeper(r[0], 3, 5);
						r.push([s[4], 2, s]);
						break;
					case 6:
						r[0] = zoneKeeper(r[0], 3, 6);
						r.push([s[4], 3, s]);
						break;
					case 7:
						r[0] = zoneKeeper(r[0], 4, 7);
						r.push([s[4], 4, s]);
						break;
					case 8:
						r[0] = zoneKeeper(r[0], 4, 8);
						r.push([s[4], 5, s]);
						break;
					case 9:
						r[0] = zoneKeeper(r[0], 5, 9);
						r.push([s[4], 6, s]);
						break;
					case 10:
						r[0] = zoneKeeper(r[0], 6, 10);
						r.push([s[4], 7, s]);
						break;
					case 11:
						r[0] = zoneKeeper(r[0], 7, 12);
						r.push([s[4], 8, s]);
						break;
					case 12:
						r[0] = zoneKeeper(r[0], 8, 13);
						r.push([s[4], 4, s]);
						break;
					case 13:
						r[0] = zoneKeeper(r[0], 9, 14);
						r.push([s[4], 5, s]);
						break;
					default:
						if (s[3] > 900) {
							mod = 0;
							switch (s[0]) {
								case "M":
									mod = mod - 6;
									break;
								case "K":
									mod = mod - 3;
									break;
							}
							switch (s[1]) {
								case "II":
									mod = mod + 8;
									break;
								case "III":
									mod = mod + 6;
									break;
							}
							orbits = randomInt(1, 10) + mod;
							if (orbits < 0) {
								orbits = 0;
							}
							r.push([s[4], orbits, s]);
						} else {
							r[0] = zoneKeeper(r[0], s[3] - 4, s[3] + 1);
							r.push([s[4], s[3] - 8, s]);
						}
				}
			} else {
				mod = 0;
				switch (s[0]) {
					case "M":
						mod = mod - 6;
						break;
					case "K":
						mod = mod - 3;
						break;
				}
				switch (s[1]) {
					case "II":
						mod = mod + 8;
						break;
					case "III":
						mod = mod + 6;
						break;
				}
				orbits = randomInt(1, 10) + mod;
				if (orbits < 0) {
					orbits = 0;
				}
				r.push([s[4], orbits, s, "Primary"]);
			}
		}
		var list = r.filter(function(x) {
			return x.every(function(y) {
				return !isNaN(y);
			});
		});
		var prime = r.filter(function(x) {
			return x.indexOf("Primary") > -1;
		});
		var y = r.filter(function(x) {
			return !(list.indexOf(x) > -1 || prime.indexOf(x) > -1);
		});
		var m = prime[0][1];
		for (i = 0; i < y.length; i++) {
			if (m < y[i][2][3] && y[i][2][3] < 1000) {
				m = y[i][2][3];
			}
		}
		prime[0][1] = m;
		r = list.concat(prime).concat(y);
		return r;
	} else {
		mod = 0;
		switch (stars[0]) {
			case "M":
				mod = mod - 6;
				break;
			case "K":
				mod = mod - 3;
				break;
		}
		switch (stars[1]) {
			case "II":
				mod = mod + 8;
				break;
			case "III":
				mod = mod + 6;
				break;
		}
		orbits = randomInt(1, 10) + mod;
		if (orbits < 0) {
			orbits = 0;
		}
		return [
			[stars[4], orbits, stars, "Primary"]
		];
	}
}

function randomName() {
	var v = ["a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "ae", "ou", "io"];
	var c = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];
	var w = [];
	var l;
	var s;
	if (randomInt(0, 1) === 0) {
		l = v[randomInt(0, v.length - 1)];
		w.push(l);
		l = c[randomInt(0, c.length - 1)];
		w.push(l);
	} else {
		l = c[randomInt(0, c.length - 1)];
		w.push(l);
	}
	for (s = randomInt(4, 12); w.length < s;) {
		l = v[randomInt(0, v.length - 1)];
		w.push(l);
		l = c[randomInt(0, c.length - 1)];
		w.push(l);
	}
	w[0] = w[0].substring(0, 1).toUpperCase() + w[0].substring(1);
	return w.join("");
}

function pZone(sR) {
	var t = sR.filter(function(x) {
		return (x.indexOf("Primary") > -1);
	});
	var n = sR.filter(function(x) {
		return x.every(function(y) {
			return !isNaN(y);
		});
	});
	if (t.length > 1) {
		return "Two Primary Stars";
	}
	t = t[0];
	n = n[0];
	var z = [];
	var i;
	for (i = 0; i <= t[1]; i++) {
		if (n.indexOf(i) == -1) {
			z.push(i);
		}
	}
	return z;
}

function zChart(star) {
	var t = [];
	var i;
	switch (star[2][1]) {
		case "VII":
			if (star[2][0] == "dA") {
				for (i = 0; i <= star[1] && i <= 5; i++) {
					if (i === 0) {
						t.push("eHab");
					} else if (i < 5) {
						t.push("eOut");
					} else {
						t.push("Out");
					}
				}
			} else {
				for (i = 0; i <= star[1] && i <= 5; i++) {
					if (i < 5) {
						t.push("eOut");
					} else {
						t.push("Out");
					}
				}
			}
			break;
		case "Ia":
			if (star[2][0] == "W" && star[2][2] < 5) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 12) {
						t.push("Incineration Zone");
					} else if (i < 14) {
						t.push("In");
					} else if (i < 15) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "W") {
				for (i = 0; i <= star[1]; i++) {
					if (i < 12) {
						t.push("Incineration Zone");
					} else if (i < 13) {
						t.push("In");
					} else if (i < 14) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "O") {
				for (i = 0; i <= star[1]; i++) {
					if (i < 11) {
						t.push("Incineration Zone");
					} else if (i < 13) {
						t.push("In");
					} else if (i < 14) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "B" && star[2][2] < 5) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 9) {
						t.push("Incineration Zone");
					} else if (i < 12) {
						t.push("In");
					} else if (i < 14) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "B") {
				for (i = 0; i <= star[1]; i++) {
					if (i < 8) {
						t.push("Incineration Zone");
					} else if (i < 12) {
						t.push("In");
					} else if (i < 13) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "A" && star[2][2] < 5) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 8) {
						t.push("Incineration Zone");
					} else if (i < 11) {
						t.push("In");
					} else if (i < 13) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "A" || star[2][0] == "K" || (star[2][0] == "M" && star[2][2] < 5)) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 8) {
						t.push("Incineration Zone");
					} else if (i < 11) {
						t.push("In");
					} else if (i < 12) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "F" && star[2][2] < 5) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 6) {
						t.push("Incineration Zone");
					} else if (i < 12) {
						t.push("In");
					} else if (i < 13) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "F") {
				for (i = 0; i <= star[1]; i++) {
					if (i < 6) {
						t.push("Incineration Zone");
					} else if (i < 11) {
						t.push("In");
					} else if (i < 12) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "G" && star[2][2] < 5) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 8) {
						t.push("Incineration Zone");
					} else if (i < 11) {
						t.push("In");
					} else if (i < 12) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "G") {
				for (i = 0; i <= star[1]; i++) {
					if (i < 8) {
						t.push("Incineration Zone");
					} else if (i < 12) {
						t.push("In");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "M" && star[2][2] < 9) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 9) {
						t.push("Incineration Zone");
					} else if (i < 11) {
						t.push("In");
					} else if (i < 12) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else {
				for (i = 0; i <= star[1]; i++) {
					if (i < 9) {
						t.push("Incineration Zone");
					} else if (i < 11) {
						t.push("In");
					} else if (i < 13) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			}
			break;
		case "Ib":
			if (star[2][0] == "W" && star[2][2] < 5) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 11) {
						t.push("Incineration Zone");
					} else if (i < 14) {
						t.push("In");
					} else if (i < 15) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "W") {
				for (i = 0; i <= star[1]; i++) {
					if (i < 11) {
						t.push("Incineration Zone");
					} else if (i < 13) {
						t.push("In");
					} else if (i < 14) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "O") {
				for (i = 0; i <= star[1]; i++) {
					if (i < 10) {
						t.push("Incineration Zone");
					} else if (i < 13) {
						t.push("In");
					} else if (i < 14) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "B" && star[2][2] < 5) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 9) {
						t.push("Incineration Zone");
					} else if (i < 12) {
						t.push("In");
					} else if (i < 13) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "B" || (star[2][0] == "K" && star[2][2] >= 5) || (star[2][0] == "M" && star[2][2] < 5)) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 7) {
						t.push("Incineration Zone");
					} else if (i < 11) {
						t.push("In");
					} else if (i < 12) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "A" || (star[2][0] == "F" && star[2][2] < 5) || (star[2][0] == "G" && star[2][2] >= 5) || (star[2][0] == "K")) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 6) {
						t.push("Incineration Zone");
					} else if (i < 10) {
						t.push("In");
					} else if (i < 11) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "F" || (star[2][0] == "G" && star[2][2] < 5)) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 5) {
						t.push("Incineration Zone");
					} else if (i < 10) {
						t.push("In");
					} else if (i < 11) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else {
				for (i = 0; i <= star[1]; i++) {
					if (i < 8) {
						t.push("Incineration Zone");
					} else if (i < 10) {
						t.push("In");
					} else if (i < 11) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			}
			break;
		case "II":
			if ((star[2][0] == "A" && star[2][2] < 5) || (star[2][0] == "K" && star[2][2] > 4)) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 4) {
						t.push("Incineration Zone");
					} else if (i < 8) {
						t.push("In");
					} else if (i == 8) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (["A", "F", "G", "K"].indexOf(star[2][0])) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 3) {
						t.push("Incineration Zone");
					} else if (i < 8) {
						t.push("In");
					} else if (i == 8) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "M" && star[2][2] < 5) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 5) {
						t.push("Incineration Zone");
					} else if (i < 8) {
						t.push("In");
					} else if (i == 8) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else {
				for (i = 0; i <= star[1]; i++) {
					if (i < 7) {
						t.push("Incineration Zone");
					} else if (i < 8) {
						t.push("In");
					} else if (i == 8) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			}
			break;
		case "III":
			if ((star[2][0] == "A" && star[2][2] < 5) || (star[2][0] == "M" && star[2][2] < 5)) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 2) {
						t.push("Incineration Zone");
					} else if (i < 6) {
						t.push("In");
					} else if (i == 6) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (["A", "K"].indexOf(star[2][0]) > -1) {
				for (i = 0; i <= star[1]; i++) {
					if (i === 0) {
						t.push("Incineration Zone");
					} else if (i < 6) {
						t.push("In");
					} else if (i == 6) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (["F", "G"].indexOf(star[2][0]) > -1) {
				for (i = 0; i <= star[1]; i++) {
					if (i === 0) {
						t.push("Incineration Zone");
					} else if (i < 5) {
						t.push("In");
					} else if (i == 5) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else {
				for (i = 0; i <= star[1]; i++) {
					if (i < 4) {
						t.push("Incineration Zone");
					} else if (i < 6) {
						t.push("In");
					} else if (i == 6) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			}
			break;
		case "IV":
			if (star[2][0] == "A" && star[2][2] < 5) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 2) {
						t.push("Incineration Zone");
					} else if (i < 6) {
						t.push("In");
					} else if (i == 6) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "A") {
				for (i = 0; i <= star[1]; i++) {
					if (i === 0) {
						t.push("Incineration Zone");
					} else if (i < 5) {
						t.push("In");
					} else if (i < 7) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "F" && star[2][2] < 5) {
				for (i = 0; i <= star[1]; i++) {
					if (i === 0) {
						t.push("Incineration Zone");
					} else if (i < 5) {
						t.push("In");
					} else if (i == 5) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "F") {
				for (i = 0; i <= star[1]; i++) {
					if (i === 0) {
						t.push("Incineration Zone");
					} else if (i < 4) {
						t.push("In");
					} else if (i < 6) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else {
				for (i = 0; i <= star[1]; i++) {
					if (i === 0) {
						t.push("Incineration Zone");
					} else if (i < 3) {
						t.push("In");
					} else if (i < 5) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			}
			break;
		case "V":
			if (star[2][0] == "O" && star[2][2] < 5) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 8) {
						t.push("Incineration Zone");
					} else if (i < 12) {
						t.push("In");
					} else if (i < 14) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "O") {
				for (i = 0; i <= star[1]; i++) {
					if (i < 7) {
						t.push("Incineration Zone");
					} else if (i < 12) {
						t.push("In");
					} else if (i < 13) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "A") {
				for (i = 0; i <= star[1]; i++) {
					if (i === 0) {
						t.push("Incineration Zone");
					} else if (i < 5) {
						t.push("In");
					} else if (i == 5) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "F") {
				for (i = 0; i <= star[1]; i++) {
					if (i === 0) {
						t.push("Incineration Zone");
					} else if (i < 4) {
						t.push("In");
					} else if (i < 6) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "G" && star[2][2] < 5) {
				for (i = 0; i <= star[1]; i++) {
					if (i === 0) {
						t.push("Incineration Zone");
					} else if (i < 3) {
						t.push("In");
					} else if (i < 5) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "G") {
				for (i = 0; i <= star[1]; i++) {
					if (i === 0) {
						t.push("Incineration Zone");
					} else if (i < 3) {
						t.push("In");
					} else if (i == 3) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "K") {
				for (i = 0; i <= star[1]; i++) {
					if (i === 0) {
						t.push("Incineration Zone");
					} else if (i < 3) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "M" && star[2][2] < 5) {
				for (i = 0; i <= star[1]; i++) {
					if (i === 0) {
						t.push("Incineration Zone");
					} else if (i < 1) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else {
				for (i = 0; i <= star[1]; i++) {
					if (i === 0) {
						t.push("Incineration Zone");
					} else {
						t.push("Out");
					}
				}
			}
			break;
		default:
			if (star[2][0] == "F") {
				for (i = 0; i <= star[1]; i++) {
					if (i < 4) {
						t.push("In");
					} else if (i == 4) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "G" && star[2][2] < 5) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 3) {
						t.push("In");
					} else if (i == 3) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "G") {
				for (i = 0; i <= star[1]; i++) {
					if (i < 2) {
						t.push("In");
					} else if (i == 2) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "K" && star[2][2] < 5) {
				for (i = 0; i <= star[1]; i++) {
					if (i < 1) {
						t.push("In");
					} else if (i == 1) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else if (star[2][0] == "K") {
				for (i = 0; i <= star[1]; i++) {
					if (i === 0) {
						t.push("Hab");
					} else {
						t.push("Out");
					}
				}
			} else {
				for (i = 0; i <= star[1]; i++) {
					t.push("Out");
				}
			}
	}
	return t;
}

function starZones(sR) {
	var pz = pZone(sR);
	var tab = [
		["Main System", "Position", "Classification"]
	];
	var fzone = sR.filter(function(x) {
		return x.every(function(y) {
			return !isNaN(y);
		});
	});
	fzone = fzone[0];
	var x = sR.filter(function(x) {
		return x.indexOf("Primary") > -1;
	})[0];
	var n = sR.filter(function(y) {
		return !(y == x || y == fzone);
	});
	var chart = zChart(x);
	var t = ["Primary Star", "N/A", x[0]];
	var i;
	for (i = 0; i <= x[1]; i++) {
		if (fzone.indexOf(i) > -1) {
			t.push("Companion Star");
		} else {
			t.push(chart[i]);
		}
	}
	tab.push(t);
	var j;
	for (j = 0; j < n.length; j++) {
		chart = zChart(n[j]);
		t = ["Companion Star", n[j][2][3], n[j][0]];
		if (chart.length < n[j][1]) {
			for (i = 0; i < chart.length; i++) {
				t.push(chart[i]);
			}
		} else {
			for (i = 0; i < n[j][1]; i++) {
				t.push(chart[i]);
			}
		}
		tab.push(t);
	}
	var m = 0;
	for (i = 0; i < tab.length; i++) {
		if (m < tab[i].length) {
			m = tab[i].length;
		}
	}
	t = tab[0];
	for (i = 0; i < m - 3; i++) {
		t.push("Orbit" + i.toString());
	}
	tab[0] = t;
	for (i = 1; i < length[tab]; i++) {
		tab[i] = tab[i].concat(Array(m - tab[i].length).fill("N/A"));
	}
	return tab;
}

function zonePop(zones, test) {
	var dim = [zones.length, zones[0].length];
	var t = $('#repeatingPlanets').length,
		i, j, k, sort, x, r,test;
	if (t) {
		sort = {
			In: [],
			Hab: [],
			Out: []
		};
		for (i = 0; i < zones.length; i++) {
			for (j = 0; j < zones[i].length; j++) {
				if (["In", "Hab", "Out"].indexOf(zones[i][j])>-1) {
					sort[zones[i][j]].push([i, j]);
				}
			}
		}
		selected = {};
		for (i = 1; i <= t; i++) {
			x = $("#planetType_" + i).val();
			if (x == "Random") {
        if (sort.In.length>0&&sort.Hab.length>0&&sort.Out.length>0){
				  r = randomInt(1, 3);
        }
        else if (sort.In.length>0&&sort.Hab.length>0){
          r = randomInt(1, 2);
        }
        else if (sort.Hab.length>0&&sort.Out.length>0){
          r = randomInt(2, 3);
        }
        else if (sort.In.length>0&&sort.Out.length>0){
          r = randomInt(3, 4);
          if (r===4){
            r = 1;
          }
        }
        else if (sort.In.length>0){
          r = 1;
        }
        else if (sort.Hab.length>0){
          r = 2;
        }
        else if (sort.Out.length>0){
          r = 3;
        }
        else {
          break;
        }
				if (r == 1) {
					r = randomInt(0, sort.In.length - 1);
					j = sort.In[r];
					x = zonePop([["In"]], "")[0][0];
					while (["Empty Orbit", "Asteroid Belt"].indexOf(x) > -1) {
						x = zonePop([["In"]], "")[0][0];
					}
					selected[j[0].toString() + " " + j[1].toString()] = x;
          sort.In.splice(r, 1);
				}
        else if (r == 2) {
					r = randomInt(0, sort.Hab.length - 1);
					j = sort.Hab[r];
					x = zonePop([["Hab"]], "")[0][0];
					while (["Empty Orbit", "Asteroid Belt"].indexOf(x) > -1) {
						x = zonePop([["Hab"]], "")[0][0];
					}
					selected[j[0].toString() + " " + j[1].toString()] = x;
          sort.Hab.splice(r, 1);
				}
        else {
					r = randomInt(0, sort.Out.length - 1);
					j = sort.Out[r];
					x = zonePop([["Out"]], "")[0][0];
					while (["Empty Orbit", "Asteroid Belt"].indexOf(x) > -1) {
						x = zonePop([["Out"]], "")[0][0];
					}
					selected[j[0].toString() + " " + j[1].toString()] = x;
          sort.Out.splice(r, 1);
				}
			}
      else {
        switch(x){
          case "Small Gas Giant":
            k = ["In"];
            break;
          case "Desert":
          case "Marginal":
          case "Paradise":
          case "Oceanic":
          case "Glaciated":
            k = ["Hab"];
            break;
          case "Ice World":
          case "Dirty Snowball":
            k = ["Out"];
            break;
          case "Reducing":
          case "Ultra Hostile":
            k = ["In","Hab"];
            break;
          default:
            k = ["In","Hab","Out"];
            break;
        }
        test = [];
        for (j=0;j<k.length;j++){
          if (sort[k[j]].length>0){
            test.push(k[j]);
          }
        }
        k = intersect(test,k);
        if (sort.In.length===0&&sort.Hab.length===0&&sort.Out.length===0){
          break;
        }
        else if (k===[]){
          continue;
        }
        r = randomInt(0,k.length-1);
        k = k[r];
        r = randomInt(0,sort[k].length-1);
        j = sort[k][r];
        selected[j[0].toString() + " " + j[1].toString()] = x;
      }
		}
	}
  console.log(JSON.stringify(selected));
	var tab = [];
	for (i = 0; i < dim[0]; i++) {
		t = [];
		for (j = 0; j < dim[1]; j++) {
			if (selected.hasOwnProperty(i.toString() + " " + j.toString())) {
				t.push(selected[i.toString() + " " + j.toString()]);
			}
      else {
				x = randomInt(1, 100);
				switch ([zones[i][j], test]) {
					case ["eHab", ""]:
					case ["eOut", ""]:
					case ["Incineration Zone", ""]:
					case ["Incineration Zone", "Cap"]:
						t.push("Empty Orbit");
						break;
					case ["N/A", ""]:
					case ["N/A", "Cap"]:
						t.push("N/A");
						break;
					case ["Companion Star", ""]:
					case ["Companion Star", "Cap"]:
						t.push("Companion Star");
						break;
					case ["In", ""]:
					case ["In", "Cap"]:
						if (x < 11) {
							t.push("Empty Orbit");
						} else if (x < 22) {
							t.push("Asteroid Belt");
						} else if (x < 41) {
							t.push("Mesoplanet");
						} else if (x < 61) {
							t.push("Small Terrestrial");
						} else if (x < 66) {
							t.push("Geoactive");
						} else if (x < 72) {
							t.push("Super Terrestrial");
						} else if (x == 72) {
							t.push("Small Gas Giant");
						} else if (x == 73) {
							t.push("Gas Giant");
						} else if (x < 88) {
							t.push("Reducing");
						} else if (x == 88) {
							t.push("Gas Supergiant");
						} else if (x == 89) {
							t.push("Gas Ultragiant/Brown Dwarf");
						} else {
							t.push("Ultra Hostile");
						}
						break;
					case ["Hab", ""]:
					case ["Hab", "Cap"]:
					case ["eHab", "Cap"]:
						if (x < 12) {
							t.push("Empty Orbit");
						} else if (x < 22) {
							t.push("Asteroid Belt");
						} else if (x < 31) {
							t.push("Mesoplanet");
						} else if (x < 41) {
							t.push("Small Terrestrial");
						} else if (x < 46) {
							t.push("Geoactive");
						} else if (x < 49) {
							t.push("Super Terrestrial");
						} else if (x < 57) {
							t.push("Desert");
						} else if (x == 57) {
							t.push("Gas Supergiant");
						} else if (x == 58) {
							t.push("Gas Giant");
						} else if (x < 69) {
							t.push("Marginal");
						} else if (x < 71) {
							t.push("Paradise");
						} else if (x < 78) {
							t.push("Reducing");
						} else if (x < 84) {
							t.push("Oceanic");
						} else if (x < 90) {
							t.push("Glaciated");
						} else if (x == 90) {
							t.push("Gas Ultragiant");
						} else if (x == 91) {
							t.push("Gas Ultragiant/Brown Dwarf");
						} else {
							t.push("Ultra Hostile");
						}
						break;
					default:
						if (x < 11) {
							t.push("Empty Orbit");
						} else if (x < 22) {
							t.push("Asteroid Belt");
						} else if (x == 22) {
							t.push("Mesoplanet");
						} else if (x == 23) {
							t.push("Small Terrestrial");
						} else if (x == 24) {
							t.push("Geoactive");
						} else if (x < 30) {
							t.push("Super Terrestrial");
						} else if (x < 41) {
							t.push("Gas Supergiant");
						} else if (x < 72) {
							t.push("Gas Giant");
						} else if (x < 83) {
							t.push("Gas Ultragiant");
						} else if (x < 89) {
							t.push("Gas Ultragiant/Brown Dwarf");
						} else if (x < 95) {
							t.push("Ice World");
						} else {
							t.push("Dirty Snowball");
						}
				}
			}
		}
		tab.push(t);
	}
	return tab;
}

function starCheck(pos, lett, num, dec) {
	switch (num) {
		case "VII":
			if (lett == "dA" && pos === 0) {
				return "Hab";
			} else {
				return "Out";
			}
			break;
		case "II":
			if ((lett == "A" && dec < 5) || (lett == "K" && dec > 4)) {
				if (pos < 4) {
					return "Incineration Zone";
				} else if (pos < 8) {
					return "In";
				} else if (pos < 9) {
					return "Hab";
				} else {
					return "Out";
				}
			} else if (["A", "F", "G", "K"].indexOf(lett) > -1) {
				if (pos < 3) {
					return "Incineration Zone";
				} else if (pos < 8) {
					return "In";
				} else if (pos < 9) {
					return "Hab";
				} else {
					return "Out";
				}
			} else if (lett == "M" && dec < 5) {
				if (pos < 5) {
					return "Incineration Zone";
				} else if (pos < 8) {
					return "In";
				} else if (pos < 9) {
					return "Hab";
				} else {
					return "Out";
				}
			} else {
				if (pos < 7) {
					return "Incineration Zone";
				} else if (pos < 8) {
					return "In";
				} else if (pos < 9) {
					return "Hab";
				} else {
					return "Out";
				}
			}
			break;
		case "III":
			if ((lett == "A" && dec < 5) || (lett == "M" && dec < 5)) {
				if (pos < 2) {
					return "Incineration Zone";
				} else if (pos < 6) {
					return "In";
				} else if (pos < 7) {
					return "Hab";
				} else {
					return "Out";
				}
			} else if (["A", "K"].indexOf(lett) > -1) {
				if (pos < 6) {
					return "In";
				} else if (pos < 7) {
					return "Hab";
				} else {
					return "Out";
				}
			} else if (["F", "G"].indexOf(lett) > -1) {
				if (pos < 5) {
					return "In";
				} else if (pos < 6) {
					return "Hab";
				} else {
					return "Out";
				}
			} else {
				if (pos < 4) {
					return "Incineration Zone";
				} else if (pos < 6) {
					return "In";
				} else if (pos < 7) {
					return "Hab";
				} else {
					return "Out";
				}
			}
			break;
		case "IV":
			if (lett == "A" && dec < 5) {
				if (pos < 2) {
					return "Incineration Zone";
				} else if (pos < 6) {
					return "In";
				} else if (pos < 7) {
					return "Hab";
				} else {
					return "Out";
				}
			} else if (lett == "A") {
				if (pos < 5) {
					return "In";
				} else if (pos < 8) {
					return "Hab";
				} else {
					return "Out";
				}
			} else if (lett == "F" && dec < 5) {
				if (pos < 5) {
					return "In";
				} else if (pos < 6) {
					return "Hab";
				} else {
					return "Out";
				}
			} else if (lett == "F") {
				if (pos < 4) {
					return "In";
				} else if (pos < 6) {
					return "Hab";
				} else {
					return "Out";
				}
			} else {
				if (pos < 3) {
					return "In";
				} else if (pos < 5) {
					return "Hab";
				} else {
					return "Out";
				}
			}
			break;
		case "V":
			if (lett == "A") {
				if (pos < 5) {
					return "In";
				} else if (pos < 6) {
					return "Hab";
				} else {
					return "Out";
				}
			} else if (lett == "F") {
				if (pos < 4) {
					return "In";
				} else if (pos < 6) {
					return "Hab";
				} else {
					return "Out";
				}
			} else if (lett == "G" && dec < 5) {
				if (pos < 3) {
					return "In";
				} else if (pos < 5) {
					return "Hab";
				} else {
					return "Out";
				}
			} else if (lett == "G") {
				if (pos < 3) {
					return "In";
				} else if (pos < 4) {
					return "Hab";
				} else {
					return "Out";
				}
			} else if (lett == "K") {
				if (pos < 3) {
					return "Hab";
				} else {
					return "Out";
				}
			} else if (lett == "M" && dec < 5) {
				if (pos < 2) {
					return "Hab";
				} else {
					return "Out";
				}
			} else {
				return "Out";
			}
			break;
		default:
			if (lett == "F") {
				if (pos < 4) {
					return "In";
				} else if (pos < 5) {
					return "Hab";
				} else {
					return "Out";
				}
			} else if (lett == "G" && dec < 5) {
				if (pos < 3) {
					return "In";
				} else if (pos < 4) {
					return "Hab";
				} else {
					return "Out";
				}
			} else if (lett == "G") {
				if (pos < 2) {
					return "In";
				} else if (pos < 3) {
					return "Hab";
				} else {
					return "Out";
				}
			} else if (lett == "K" && dec < 5) {
				if (pos < 1) {
					return "In";
				} else if (pos < 2) {
					return "Hab";
				} else {
					return "Out";
				}
			} else if (lett == "K") {
				if (pos === 0) {
					return "Hab";
				} else {
					return "Out";
				}
			} else {
				return "Out";
			}
	}
}

function capture(type, max, lett, numb, dec) {
	var tab = [];
	var t;
	var p;
	var x;
	var y;
	var d;
	var num;
	var i;
	var k;
	var s;
	var z;
	var j;
	var n = randomInt(1, 10) - 6;
	if (n < 1) {
		return "No Captures";
	} else if (type == "Asteroid") {
		if (Array.isArray(max)) {
			for (i = 0; i < max.length; i++) {
				t = {};
				num = max[i];
				for (j = 1; j <= n; j++) {
					num = max[i];
					p = randomInt(0, num);
					x = randomInt(1, 10) + 2;
					if (x < max[p]) {
						x = max[p];
					}
					y = randomInt(1, 10);
					if (y < max[p]) {
						y = max[p];
					}
					d = [randomInt(0, 9), randomInt(0, 9)];
					t["Rogue Asteroid " + j.toString()] = [x + d[0] * 0.1, y + d[1] * 0.1];
				}
				tab.push(t);
			}
		} else {
			for (i = 1; i <= n; i++) {
				x = randomInt(1, 10) + 2;
				if (x < max) {
					x = max;
				}
				y = randomInt(1, 10);
				if (y < max) {
					y = max;
				}
				d = [randomInt(0, 9), randomInt(0, 9)];
				tab.push(["Rogue Asteroid 1", [x + d[0] * 0.1, y + d[1] * 0.1]]);
			}
		}
	} else {
		k = Array(num).fill(1);
		for (i = 0; i < max.length; i++) {
			t = {};
			num = max[i];
			for (j = 1; j <= n; j++) {
				p = randomInt(0, num);
				x = randomInt(1, 10) + 2;
				if (x < max[p]) {
					x = max[p];
				}
				y = randomInt(1, 10);
				if (y < max[p]) {
					y = max[p];
				}
				s = starCheck(x, lett[p], numb[p], dec[p]);
				z = zonePop([
					[s]
				], "Cap")[0][0];
				while (["Empty Orbit", "Asteroid Belt"].indexOf(z) > -1) {
					z = zonePop([
						[s]
					], "Cap")[0][0];
				}
				d = [randomInt(0, 9), randomInt(0, 9)];
				t["Rogue Planet &#" + (945 + i).toString() + "; " + j.toString()] = [z, [x + d[0] * 0.1, s],
					[y + d[1] * 0.1, starCheck(x, lett[p], numb[p], dec[p])]
				];
			}
			tab.push(t);
		}
	}
	return tab;
}

function planetsTable(name, orbitZones, planets) {
	var tab = [],
		i, j, t, a, ast = [],
		countp, counta;
	for (i = 0; i < name.length; i++) {
		t = {};
		a = [];
		countp = 1;
		counta = 1;
		for (j = 0; j < orbitZones[i].length; j++) {
			if (planets[i][j] == "Asteroid Belt") {
				a.push(j);
			} else if (["Empty Orbit", "Companion Star", "N/A"].indexOf(planets[i][j]) === -1) {
				t[name[i] + " " + (counta++).toString()] = [j, orbitZones[i][j], planets[i][j]];
			}
		}
		if (t !== {}) {
			tab.push(t);
		}
		ast.push(a);
	}
	if (tab === []) {
		tab = "No Planets";
	}
	if (ast === []) {
		ast = "No Asteroid Belts";
	}
	return [tab, ast];
}
//In: One row of the planets
//Out: Satellites list
function satellites(planets) {
	function close(r) {
		switch (r) {
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

	function med(r) {
		switch (r) {
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

	function far(r) {
		switch (r) {
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

	function ring(r) {
		switch (r) {
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
	var n = [],
		p = [],
		z = [];
	var i;
	for (i in planets) {
		if (planets.hasOwnProperty(i)) {
			n.push(i);
			p.push(planets[i][2]);
			z.push(planets[i][1]);
		}
	}
	var tab = {};
	var num = 1;
	var x, t, s, d, j, r, k, planet, pos;
	for (i = 0; i < n.length; i++) {
		t = {};
		switch (p[i]) {
			case "Mesoplanet":
			case "Small Terrestrial":
				d = [randomInt(1, 10) - 7, randomInt(1, 10) - 9];
				if (d[0] > 0) {
					s = [];
					for (j = 0; j < d[0]; j++) {
						r = randomInt(1, 20);
						s.push([randomInt(100, 1000) * 0.001, close(r)]);
					}
					t.Moonlets = s;
				}
				if (d[1] === 1) {
					r = randomInt(1, 20);
					t["Small Moons"] = [randomInt(1000, 2000) * 0.001, close(r)];
				}
				break;
			case "Small Gas Giant":
			case "Gas Giant":
				d = [randomInt(1, 10) - 5, randomInt(1, 10) - 8, randomInt(1, 10), randomInt(1, 10) - 1,
					randomInt(1, 10) - 3, randomInt(1, 10) - 6, randomInt(1, 10) - 8
				];
				if (d[0] > 0) {
					s = [];
					for (j = 0; j < d[0]; j++) {
						r = randomInt(1, 20);
						s.push(ring(r));
					}
					t["Minor Ring Systems"] = s;
				}
				if (d[1] > 0) {
					s = [];
					for (j = 0; j < d[0]; j++) {
						r = randomInt(1, 20);
						s.push(ring(r));
					}
					t["Major Ring Systems"] = s;
				}
				for (k = 2; k < 7; k++) {
					s = [];
					for (j = 0; j < d[k]; j++) {
						pos = randomInt(1, 10);
						r = randomInt(1, 20);
						if ((["Gas Giant", "Gas Supergiant"].indexOf(p[i]) > -1 && pos == 10) || (["Gas Ultragiant/Brown Dwarf", "Gas Ultragiant"].indexOf(p[i]) > -1 && pos > 8)) {
							pos = far(r);
						} else if ((p[i] == "Small Gas Giant" && pos > 7) || (["Gas Giant", "Gas Supergiant"].indexOf(p[i]) > -1 && pos > 6) || (["Gas Ultragiant/Brown Dwarf", "Gas Ultragiant"].indexOf(p[i]) > -1 && pos > 4)) {
							pos = med(r);
						} else {
							pos = close(r);
						}
						if (d[k] > 0) {
							switch (k) {
								case 3:
									s.push([randomInt(100, 1000), pos]);
									break;
								case 4:
									s.push([randomInt(1000, 2000), pos]);
									break;
								case 5:
									s.push([randomInt(2000, 3000), pos]);
									break;
								case 6:
									s.push([randomInt(3000, 4000), pos]);
									break;
								case 7:
									planet = "Empty Orbit";
									while (["Empty Orbit", "Asteroid Belt", "Super Terrestrial", "Small Gas Giant", "Gas Giant", "Gas Supergiant", "Gas Ultragiant", "Gas Ultragiant/Brown Dwarf"].indexOf(planet) > -1) {
										if (Array.isArray(z[i])) {
											planet = zonePop([z[i][0]], "")[0][0];
										} else {
											planet = zonePop(z[i], "")[0][0];
										}
									}
									s.push(["Huge Moon" + num.toString(), planet, pos]);
									num++;
							}
						}
					}
					if (s.length > 0) {
						switch (k) {
							case 3:
								t.Moonlets = s;
								break;
							case 4:
								t["Small Moons"] = s;
								break;
							case 5:
								t["Medium Moons"] = s;
								break;
							case 6:
								t["Large Moons"] = s;
								break;
							case 7:
								t["Huge Moons"] = s;
						}
					}
				}
				break;
			case "Gas Supergiant":
			case "Gas Ultragiant/Brown Dwarf":
			case "Gas Ultragiant":
				d = [randomInt(1, 10) - 2, randomInt(1, 10) - 5, randomInt(1, 10) + 3, randomInt(1, 10) + 1,
					randomInt(1, 10), randomInt(1, 10) - 4, randomInt(1, 10) - 6
				];
				if (d[0] > 0) {
					s = [];
					for (j = 0; j < d[0]; j++) {
						r = randomInt(1, 20);
						s.push(ring(r));
					}
					t["Minor Ring Systems"] = s;
				}
				if (d[1] > 0) {
					s = [];
					for (j = 0; j < d[0]; j++) {
						r = randomInt(1, 20);
						s.push(ring(r));
					}
					t["Major Ring Systems"] = s;
				}
				for (k = 2; k < 7; k++) {
					s = [];
					for (j = 0; j < d[k]; j++) {
						pos = randomInt(1, 10);
						r = randomInt(1, 20);
						if ((["Gas Giant", "Gas Supergiant"].indexOf(p[i]) > -1 && pos == 10) || (["Gas Ultragiant/Brown Dwarf", "Gas Ultragiant"].indexOf(p[i]) > -1 && pos > 8)) {
							pos = far(r);
						} else if ((p[i] == "Small Gas Giant" && pos > 7) || (["Gas Giant", "Gas Supergiant"].indexOf(p[i]) > -1 && pos > 6) || (["Gas Ultragiant/Brown Dwarf", "Gas Ultragiant"].indexOf(p[i]) > -1 && pos > 4)) {
							pos = med(r);
						} else {
							pos = close(r);
						}
						if (d[k] > 0) {
							switch (k) {
								case 3:
									s.push([randomInt(100, 1000), pos]);
									break;
								case 4:
									s.push([randomInt(1000, 2000), pos]);
									break;
								case 5:
									s.push([randomInt(2000, 3000), pos]);
									break;
								case 6:
									s.push([randomInt(3000, 4000), pos]);
									break;
								case 7:
									planet = "Empty Orbit";
									while (["Empty Orbit", "Asteroid Belt", "Super Terrestrial", "Small Gas Giant", "Gas Giant", "Gas Supergiant", "Gas Ultragiant", "Gas Ultragiant/Brown Dwarf"].indexOf(planet) > -1) {
										if (Array.isArray(z[i])) {
											planet = zonePop([z[i][0]], "")[0][0];
										} else {
											planet = zonePop(z[i], "")[0][0];
										}
									}
									s.push(["Huge Moon" + num.toString(), planet, pos]);
									num++;
							}
						}
					}
					if (s.length > 0) {
						switch (k) {
							case 3:
								t.Moonlets = s;
								break;
							case 4:
								t["Small Moons"] = s;
								break;
							case 5:
								t["Medium Moons"] = s;
								break;
							case 6:
								t["Large Moons"] = s;
								break;
							case 7:
								t["Huge Moons"] = s;
						}
					}
				}
				break;
			default:
				d = [randomInt(1, 10) - 9, randomInt(1, 10) - 6, randomInt(1, 10) - 7, randomInt(1, 10) - 9];
				if (d[0] === 1) {
					r = randomInt(1, 20);
					t["Minor Ring Systems"] = [ring(r)];
				}
				if (d[1] > 0) {
					s = [];
					for (j = 0; j < d[1]; j++) {
						r = randomInt(1, 20);
						s.push([randomInt(100, 1000) * 0.001, close(r)]);
					}
					t.Moonlets = s;
				}
				if (d[2] > 0) {
					s = [];
					for (j = 0; j < d[2]; j++) {
						r = randomInt(1, 20);
						s.push([randomInt(1000, 2000) * 0.001, close(r)]);
					}
					t["Small Moons"] = s;
				}
				if (d[3] === 1) {
					r = randomInt(1, 20);
					t["Medium Moons"] = [randomInt(2000, 3000) * 0.001, close(r)];
				}
		}
		if (t === {}) {
			t = "No Satellites";
		}
		tab[n[i]] = t;
	}
	return tab;
}

function planetDeets(planets, satellites) {
	function multiroll(min, max, num) {
		var i, x = 0;
		for (i = 0; i < num; i++) {
			x += randomInt(min, max);
		}
		return x;
	}

	function round(value, decimals) {
		return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
	}

	function size(type) {
		switch (type) {
			case "Mesoplanet":
				return Math.max(0.8, randomInt(1, 10) - 6);
			case "Small Terrestrial":
				return Math.min(9, randomInt(1, 10) + 3);
			case "Ultra Hostile":
				return 1000 * (randomInt(1, 10) + 5);
			case "Super Terrestrial":
				return Math.max(16, multiroll(1, 10, 2) + 10);
			case "Ice World":
				return Math.max(4, randomInt(1, 10));
			case "Dirty Snowball":
				return Math.max(4, randomInt(1, 10));
			case "Small Gas Giant":
				return Math.max(16, multiroll(1, 10, 7) + 30);
			case "Gas Giant":
				return Math.max(4, 100 + 10 * randomInt(1, 10));
			case "Gas Supergiant":
			case "Gas Ultragiant/Brown Dwarf":
				return Math.max(4, 200 + 10 * randomInt(1, 10));
			default:
				return Math.max(8, randomInt(1, 10) + 5);
		}
	}

	function atmosphere(type, location, size) {
		var t = [],
			mod = 0,
			r;
		switch (location) {
			case "In":
				mod += -2;
				break;
			case "Hab":
				mod += 1;
				break;
			case "In":
				mod += 2;
		}
		if (size < 5) {
			mod += -2;
		} else if (size > 8) {
			mod += 1;
		}
		r = Math.min(Math.max(randomInt(1, 10) + mod, 1), 10);
		switch (type) {
			case "Marginal":
				if (r < 6) {
					t.push("Carbon Dioxide");
				} else {
					t.push("Methane");
				}
				break;
			case "Mesoplanet":
				if (r < 4) {
					t.push("None");
				} else if (r < 6) {
					t.push("Hydrogen");
				} else if (r < 9) {
					t.push("Helium");
				} else {
					t.push("Methane");
				}
				break;
			case "Small Terrestrial":
				if (r < 6) {
					t.push("None");
				} else if (r < 8) {
					t.push("Hydrogen");
				} else {
					t.push("Helium");
				}
				break;
			case "Ultra Hostile":
			case "Reducing":
				if (r === 1) {
					t.push("Hydrogen");
				} else if (r === 2) {
					t.push("Bromine");
				} else if (r < 5) {
					t.push("Hydrochloric acid");
				} else if (r < 7) {
					t.push("Sulfuric acid");
				} else if (r === 7) {
					t.push("Oxygen");
				} else if (r === 2) {
					t.push("Fluorine");
				} else {
					t.push("Chlorine");
				}
				break;
			case "Super Terrestrial":
				if (r < 6) {
					t.push("Carbon Dioxide");
				} else if (r === 6) {
					t.push("Hydrogen Sulfide");
				} else if (r < 10) {
					t.push("Methane");
				} else {
					t.push("Chlorine");
				}
				break;
			case "Ice World":
			case "Dirty Snowball":
				if (r === 1) {
					t.push("None");
				} else if (r === 2) {
					t.push("Hydrogen");
				} else {
					t.push("Methane");
				}
				break;
			case "Geoactive":
				if (r === 1) {
					t.push("None");
				} else if (r === 2) {
					t.push("Hydrogen");
				} else if (r === 3) {
					t.push("Hydrogen Fluoride");
				} else if (r < 8) {
					t.push("Hydrogen Sulfide");
				} else {
					t.push("Sulfur Dioxide");
				}
				break;
			case "Small Gas Giant":
			case "Gas Giant":
			case "Gas Supergiant":
			case "Gas Ultragiant/Brown Dwarf":
				t.push("Hydrogen");
				break;
			default:
				t.push("Oxygen-Nitrogen");
		}
		mod = 0;
		if (size < 3) {
			mod += -8;
		} else if (size < 4) {
			mod += -7;
		} else if (size < 5) {
			mod += -6;
		} else if (size < 6) {
			mod += -5;
		} else if (size < 7) {
			mod += -4;
		} else if (size < 8) {
			mod += -3;
		} else if (size < 9) {
			mod += -2;
		} else if (size < 10) {
			mod += -1;
		} else if (size < 11) {
			mod += 0;
		} else if (size < 12) {
			mod += 1;
		} else if (size < 14) {
			mod += 2;
		} else if (size < 16) {
			mod += 3;
		} else if (size < 17) {
			mod += 4;
		} else if (size < 20) {
			mod += 5;
		} else if (size < 22) {
			mod += 6;
		} else if (size < 24) {
			mod += 7;
		} else {
			mod += 8;
		}
		r = Math.min(Math.max(randomInt(1, 10) + mod, 1), 10);
		switch (type) {
			case "Marginal":
			case "Mesoplanet":
			case "Small Terrestrial":
			case "Ultra Hostile":
			case "Reducing":
			case "Super Terrestrial":
			case "Ice World":
			case "Dirty Snowball":
			case "Geoactive":
				switch (r) {
					case 1:
						t.push(0.00000001);
						break;
					case 2:
						t.push(0.000001);
						break;
					case 3:
						t.push(0.01);
						break;
					case 4:
					case 5:
						t.push(0.3);
						break;
					case 6:
					case 7:
						t.push(1);
						break;
					case 8:
						t.push(3);
						break;
					case 9:
						t.push(10);
						break;
					default:
						t.push(90);
						break;
				}
				break;
			case "Small Gas Giant":
			case "Gas Giant":
			case "Gas Supergiant":
			case "Gas Ultragiant/Brown Dwarf":
				t.push("Liquifying");
				break;
			default:
				switch (r) {
					case 1:
					case 2:
						t.push(0.5);
						break;
					case 9:
					case 10:
						t.push(1.5);
						break;
					default:
						t.push(1);
				}
		}
		return t;
	}

	function hydro(type, location) {
		if (["In", "Out"].indexOf(location) > -1) {
			return 0;
		} else {
			var x;
			switch (type) {
				case "Geoactive":
				case "Glaciated":
				case "Super Terrestrial":
					return 10 * randomInt(1, 10);
				case "Desert":
					return multiroll(1, 20, 2) - 2;
				case "Marginal":
					x = 10 * (randomInt(1, 10) - 6);
					break;
				case "Oceanic":
					x = 10 * (randomInt(1, 10) + 7);
					break;
				case "Paradise":
					return Math.min(Math.max(randomInt(1, 10) * 10, 20), 80);
				default:
					return 0;
			}
			return Math.min(Math.max(x, 0), 100);
		}
	}

	function cryo(type, location) {
		if (location == "In") {
			return 0;
		} else if (location == "Hab") {
			switch (type) {
				case "Geoactive":
				case "Oceanic":
				case "Super Terrestrial":
					return 10 * randomInt(1, 10);
				case "Small Terrestrial":
					return 5 * randomInt(1, 10);
				case "Desert":
				case "Marginal":
					return Math.max(10 * (randomInt(1, 10) - 3), 0);
				case "Glaciated":
					return Math.min(Math.max(10 * (randomInt(1, 10) + 7), 0), 100);
				case "Paradise":
					return randomInt(2, 4) * 10;
				default:
					return 0;
			}
		} else {
			switch (type) {
				case "Geoactive":
				case "Small Terrestrial":
					return 10 * randomInt(1, 10);
				case "Super Terrestrial":
					x = 10 * (randomInt(1, 10) + 5);
					break;
				case "Dirty Snowball":
					x = 10 * (randomInt(1, 10) + 3);
					break;
				case "Ice World":
					x = 10 * (randomInt(1, 10) + 7);
					break;
				default:
					return 0;
			}
			return Math.min(100, x);
		}
	}

	function volc(type) {
		var x;
		switch (type) {
			case "Mesoplanet":
				x = randomInt(1, 10) - 2;
				break;
			case "Geoactive":
				x = 10 * (randomInt(1, 10) + 5);
				break;
			case "Reducing":
			case "Super Terrestrial":
				x = 10 * (randomInt(1, 10) - 4);
				break;
			case "Ultra Hostile":
				x = 10 * (randomInt(1, 10) - 5);
				break;
			case "Dirty Snowball":
			case "Ice World":
				x = 10 * (randomInt(1, 10) - 7);
				break;
			default:
				x = 10 * (randomInt(1, 10) - 6);
		}
		return Math.max(0, Math.min(x, 100));
	}

	function tect(type) {
		var x;
		switch (type) {
			case "Mesoplanet":
				return 0;
			case "Geoactive":
				x = Math.max(10 * (randomInt(1, 10) + 5), 90);
				break;
			case "Ice World":
				x = 10 * (randomInt(1, 10) - 8);
				break;
			case "Dirty Snowball":
				x = 10 * (randomInt(1, 10) - 7);
				break;
			case "Ultra Hostile":
				x = 10 * (randomInt(1, 10) - 5);
				break;
			default:
				x = 10 * (randomInt(1, 10) - 6);
		}
		return Math.max(0, Math.min(100, x));
	}

	function hoursPDay(hydro, sat) {
		var mass = 0,
			prop, i;
		for (prop in sat) {
			if (sat.hasOwnProperty(prop)) {
				if (["Minor Ring Systems", "Major Ring Systems"].indexOf(prop)) {
					for (i = 0; i < sat[prop]; i++) {
						mass += sat[prop][i][0];
					}
				}
			}
		}
		return multiroll(1, 10, 3) + mass;
	}

	function minerals(type) {
		var tab = [randomInt(1, 10) + 3, randomInt(1, 10) + 1, randomInt(1, 10) - 2, randomInt(1, 10), randomInt(1, 10) - 4, randomInt(1, 10) - 4],
			i;
		if (type == "Ice World") {
			tab[0] -= 4;
			tab[1] -= 6;
			tab[2] -= 8;
			tab[3] -= 5;
			tab[4] -= 4;
			tab[5] -= 3;
		} else if (type == "Dirty Snowball") {
			tab[1] -= 4;
			tab[2] -= 6;
			tab[3] -= 3;
			tab[4] -= 2;
		}
		for (i = 0; i < tab.length; i++) {
			tab[i] = Math.min(9, Math.max(0, tab[i]));
		}
		return tab;
	}
	var i, tab, prop, planet;
	for (i = 0; i < planets.length; i++) {
		for (prop in planets[i]) {
			if (planets[i].hasOwnProperty(prop)) {
				planet = planets[i][prop];
				tab = {};
				tab.Diameter = size(planet[2]);
				tab.Circumference = Math.PI * tab.Diameter;
				tab["Surface Area"] = tab.Circumference / 2;
				tab["Surface Gravity"] = tab.Diameter / 12;
				tab["Atmospheric Makeup"] = atmosphere(planet[2], planet[1], tab.Diameter);
				tab["Atmospheric Pressure"] = tab["Atmospheric Makeup"][1];
				tab["Atmospheric Makeup"] = tab["Atmospheric Makeup"][0];
				tab.Hydrosphere = hydro(planet[2], planet[1]);
				tab.Cryosphere = cryo(planet[2], planet[1]);
				if (planet[2] == "Paradise" && tab.Hydrosphere + tab.Cryosphere > 80) {
					tab.Cryosphere = Math.max(80 - tab.Hydrosphere, 0);
				} else if (tab.Hydrosphere + tab.Cryosphere > 100) {
					tab.Cryosphere = 100 - tab.Hydrosphere;
				}
				tab.Volcanism = volc(planet[2]);
				tab["Tectonic Activity"] = tect(planet[2]);
				tab["% Land Area"] = 100 - tab.Hydrosphere - tab.Cryosphere;
				if (["Desert", "Glaciated", "Marginal", "Oceanic", "Paradise"].indexOf(planet[2]) > -1) {
					tab["Relative Humidity"] = round((randomInt(1, 10) + tab.Hydrosphere) / 110, 2);
					tab["Mean Temperature"] = 100 - (tab.Cryosphere * 10);
					tab["Mean High Temperature"] = tab["Mean Temperature"] + 20;
					tab["Mean Low Temperature"] = tab["Mean Temperature"] - 20;
				}
				tab["Hours per Day"] = hoursPDay(tab.Hydrosphere, satellites[i][planet]);
				tab.Minerals = minerals(planet[2]);
				planets[i][prop].push(tab);
			}
		}
	}
}

function tableGen(sysname, name, stars, orbitZones, planets, satel, asteroids, capturedPlanets, capturedAsteroids) {
	function starType(letter, number) {
		var s;
		switch (letter) {
			case "A":
				s = "White ";
				break;
			case "F":
				s = "Yellow-White ";
				break;
			case "G":
				s = "Yellow ";
				break;
			case "K":
				s = "Orange ";
				break;
			case "M":
				s = "Red ";
		}
		switch (number) {
			case "II":
				s += "Luminous Giant";
				break;
			case "III":
				s += "Giant";
				break;
			case "IV":
				s += "Sub-Giant";
				break;
			case "V":
				s += "Dwarf";
				break;
			case "V":
				s += "Subdwarf";
				break;
		}
		return s;
	}

	function round(value, decimals) {
		return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
	}

	function planetImage(type) {
		var s = '<img src="images/planet';
		switch (type) {
			case "Geoactive":
				s += "1";
				break;
			case "Mesoplanet":
				s += "2";
				break;
			case "Small Terrestrial":
				s += "3";
				break;
			case "Desert":
				s += "4";
				break;
			case "Glaciated":
				s += "5";
				break;
			case "Marginal":
				s += "6";
				break;
			case "Oceanic":
				s += "7";
				break;
			case "Paradise":
				s += "8";
				break;
			case "Reducing":
				s += "9";
				break;
			case "Ultra Hostile":
				s += "10";
				break;
			case "Gas Giant":
				s += "11";
				break;
			case "Gas Supergiant":
			case "Gas Ultragiant/Brown Dwarf":
				s += "12";
				break;
			case "Small Gas Giant":
				s += "13";
				break;
			case "Ice World":
				s += "14";
				break;
			case "Gas Supergiant":
				s += "15";
				break;
			default:
				s += "16";
		}
		s += '.png" alt="' + type + ' Planet Image" style="width:100px;height:100px;">';
		return s;
	}
	var tabstr = '\n\t<div class="big-header header">' + sysname + " System</div>\n";
	var i, s, img, prop, j, num, x;
	for (i = 0; i < stars.length; i++) {
		tabstr += '\t<button class="system">';
		if (i === 0) {
			tabstr += "Primary Star: " + name[i];
		} else {
			tabstr += "Secondary Star: " + name[i];
		}
		tabstr += '</button>\n';
		if (["dA", "dF", "dG"].indexOf(stars[i][0]) > -1) {
			s = "Degenerate White Dwarf";
		} else if (stars[i][1] == "VI") {
			s = "Red Subdwarf";
		} else {
			s = starType(stars[i][0], stars[i][1]);
		}
		img = '<img src="images/Class_';
		if (["dA", "dF", "dG"].indexOf(stars[i][0]) > -1) {
			img += "dX";
		} else {
			img += stars[i][0];
		}
		img += '_Star.png" alt="' + s + ' Image" style = "width:200px;height:200px;">';
		tabstr += '\t<div class="system"><table class="big-table"><tr><td>Star Type:</td><td>' + stars[i][4] + "; " + s + '</td><td rowspan = "3" style="width:200px;">' + img + '</td></tr>\n';
		tabstr += '\t<tr><td>Number of Orbits:</td><td>' + stars[i][2] + '</td></tr>\n';
		if (i === 0) {
			tabstr += '\t<tr><td colspan = "2">Primary Star</td></tr>\n';
		} else {
			tabstr += '\t<tr><td>Orbital Position relative to Primary Star</td><td>' + stars[i][3] + '</td></tr>\n';
		}
		if (planets[i] === {} && capturedPlanets == "No Captures") {
			tabstr += '\t<tr><td colspan="3">No Orbiting Planets</td></tr>';
		} else {
			tabstr += '\t<tr><td colspan="3" class="header">Planets:</td></tr>\n';
			for (prop in planets[i]) {
				if (planets[i].hasOwnProperty(prop)) {
					tabstr += '\t<tr><td colspan="3"><button class="system">' + prop + '</button>\n';
					tabstr += '\t<table class="system"><tr><td></td><td>Planet Type:</td><td>' + planets[i][prop][2] + '</td><td rowspan="4" style="width:100px;">' + planetImage(planets[i][prop][2]) + '</td></tr>\n';
					tabstr += '\t<tr><td></td><td>Orbital Zone:</td><td>' + planets[i][prop][1] + '</td></tr>\n';
					tabstr += '\t<tr><td></td><td>Orbital Position:</td><td>' + planets[i][prop][0] + '</td></tr>\n';
					tabstr += '\t<tr><td></td><td>Orbital Distance:</td><td>' + round(bode(planets[i][prop][0]), 2) + ' AU</td></tr>\n';
					tabstr += '\t<tr><td></td><td>Surface Gravity:</td><td colspan="2">' + round(planets[i][prop][3]["Surface Gravity"], 2) + 'g</td></tr>\n';
					tabstr += '\t<tr><td></td><td>Surface Area:</td><td colspan="2">' + round(planets[i][prop][3]["Surface Area"], 2) + 'km&sup2;</td></tr>\n';
					tabstr += '\t<tr><td></td><td>Circumference at Equator:</td><td colspan="2">' + round(planets[i][prop][3].Circumference, 2) + 'km</td></tr>\n';
					tabstr += '\t<tr><td></td><td>Land Area Percentage:</td><td colspan="2">' + planets[i][prop][3]["% Land Area"] + '%</td></tr>\n';
					tabstr += '\t<tr><td></td><td>Sea Area Percentage:</td><td colspan="2">' + planets[i][prop][3].Hydrosphere + '%</td></tr>\n';
					tabstr += '\t<tr><td></td><td>Glacial Area Percentage:</td><td colspan="2">' + planets[i][prop][3].Cryosphere + '%</td></tr>\n';
					tabstr += '\t<tr><td></td><td>Basic Atmospheric Composition:</td><td colspan="2">' + planets[i][prop][3]["Atmospheric Makeup"] + '</td></tr>\n';
					x = planets[i][prop][3]["Atmospheric Pressure"];
					if (typeof x !== "string" && x > 1) {
						x = round(x, 2);
					}
					tabstr += '\t<tr><td></td><td>Surface Atmospheric Pressure:</td><td colspan="2">' + x + '</td></tr>\n';
					tabstr += '\t<tr><td></td><td>Volcanism:</td><td colspan="2">' + planets[i][prop][3].Volcanism + ' out of 100</td></tr>\n';
					tabstr += '\t<tr><td></td><td>Tectonic Activity:</td><td colspan="2">' + planets[i][prop][3]["Tectonic Activity"] + ' out of 100</td></tr>\n';
					tabstr += '\t<tr><td></td><td>Hours per Day:</td><td colspan="2">' + planets[i][prop][3]["Hours per Day"] + '</td></tr>\n';
					if (planets[i][prop][3].hasOwnProperty("Relative Humidity")) {
						tabstr += '\t<tr><td></td><td>Relative Humidity Percentage:</td><td colspan="2">' + planets[i][prop][3]["Relative Humidity"] + '%</td></tr>\n';
						tabstr += '\t<tr><td></td><td>Mean Planetary Temperature:</td><td colspan="2">' + planets[i][prop][3]["Mean Temperature"] + '&deg;F</td></tr>\n';
						tabstr += '\t<tr><td></td><td>Mean Temperature Range:</td><td colspan="2">' + planets[i][prop][3]["Mean Low Temperature"] + "&deg;F to " + planets[i][prop][3]["Mean High Temperature"] + '&deg;F</td></tr>\n';
					}
					tabstr += '\t<tr><td></td><td colspan="3">Mineral Ratings, scale of 0 to 9</td></tr>\n';
					num = round(planets[i][prop][3].Minerals[0], 2);
					tabstr += '\t<tr><td colspan="2"></td><td>Industrial Minerals</td><td>' + num + '</td></tr>\n';
					num = round(planets[i][prop][3].Minerals[1], 2);
					tabstr += '\t<tr><td colspan="2"></td><td>Common Metals</td><td>' + num + '</td></tr>\n';
					num = round(planets[i][prop][3].Minerals[2], 2);
					tabstr += '\t<tr><td colspan="2"></td><td>Rare Metals</td><td>' + num + '</td></tr>\n';
					num = round(planets[i][prop][3].Minerals[3], 2);
					tabstr += '\t<tr><td colspan="2"></td><td>Industrial Crystals</td><td>' + num + '</td></tr>\n';
					num = round(planets[i][prop][3].Minerals[4], 2);
					tabstr += '\t<tr><td colspan="2"></td><td>Gemstones</td><td>' + num + '</td></tr>\n';
					num = round(planets[i][prop][3].Minerals[5], 2);
					tabstr += '\t<tr><td colspan="2"></td><td>Radioactives</td><td>' + num + '</td></tr>\n</div></td></tr></table></td></tr>\n';
				}
			}
			if (capturedPlanets != "No Captures") {
				for (prop in capturedPlanets[i]) {
					if (capturedPlanets[i].hasOwnProperty(prop)) {
						tabstr += '\t<tr><td colspan="3"><button class="system">' + prop + '</button>\n';
						tabstr += '\t<table class="system"><tr><td></td><td>Planet Type:</td><td>' + capturedPlanets[i][prop][0] + '</td><td rowspan="4" style="width:100px;">' + planetImage(capturedPlanets[i][prop][2]) + '</td></tr>\n';
						tabstr += '\t<tr><td></td><td>Orbital Zone:</td><td>' + capturedPlanets[i][prop][1][1] + " to " + capturedPlanets[i][prop][2][1] + '</td></tr>\n';
						tabstr += '\t<tr><td></td><td>Orbital Position:</td><td>' + capturedPlanets[i][prop][1][0] + " to " + capturedPlanets[i][prop][2][0] + '</td></tr>\n';
						tabstr += '\t<tr><td></td><td>Orbital Distance:</td><td>' + round(bode(capturedPlanets[i][prop][1][0]), 2) + " AU to " + round(bode(capturedPlanets[i][prop][2][0]), 2) + ' AU</td></tr>\n';
						tabstr += '\t<tr><td></td><td>Surface Gravity:</td><td colspan="2">' + round(capturedPlanets[i][prop][3]["Surface Gravity"], 2) + 'g</td></tr>\n';
						tabstr += '\t<tr><td></td><td>Surface Area:</td><td colspan="2">' + round(capturedPlanets[i][prop][3]["Surface Area"], 2) + 'km&sup2;</td></tr>\n';
						tabstr += '\t<tr><td></td><td>Circumference at Equator:</td><td colspan="2">' + round(capturedPlanets[i][prop][3].Circumference, 2) + 'km</td></tr>\n';
						tabstr += '\t<tr><td></td><td>Land Area Percentage:</td><td colspan="2">' + capturedPlanets[i][prop][3]["% Land Area"] + '%</td></tr>\n';
						tabstr += '\t<tr><td></td><td>Sea Area Percentage:</td><td colspan="2">' + capturedPlanets[i][prop][3].Hydrosphere + '%</td></tr>\n';
						tabstr += '\t<tr><td></td><td>Glacial Area Percentage:</td><td colspan="2">' + capturedPlanets[i][prop][3].Cryosphere + '%</td></tr>\n';
						tabstr += '\t<tr><td></td><td>Basic Atmospheric Composition:</td><td colspan="2">' + capturedPlanets[i][prop][3]["Atmospheric Makeup"] + '</td></tr>\n';
						x = capturedPlanets[i][prop][3]["Atmospheric Pressure"];
						if (typeof x !== "string") {
							x = round(x, 2).toString();
						}
						tabstr += '\t<tr><td></td><td>Surface Atmospheric Pressure:</td><td colspan="2">' + x + '</td></tr>\n';
						tabstr += '\t<tr><td></td><td>Volcanism:</td><td colspan="2">' + capturedPlanets[i][prop][3].Volcanism + ' out of 100</td></tr>\n';
						tabstr += '\t<tr><td></td><td>Tectonic Activity:</td><td colspan="2">' + capturedPlanets[i][prop][3]["Tectonic Activity"] + ' out of 100</td></tr>\n';
						tabstr += '\t<tr><td></td><td>Hours per Day:</td><td colspan="2">' + capturedPlanets[i][prop][3]["Hours per Day"] + '</td></tr>\n';
						if (capturedPlanets[i][prop][3].hasOwnProperty("Relative Humidity")) {
							tabstr += '\t<tr><td></td><td>Relative Humidity Percentage:</td><td colspan="2">' + capturedPlanets[i][prop][3]["Relative Humidity"] + '%</td></tr>\n';
							tabstr += '\t<tr><td></td><td>Mean Planetary Temperature:</td><td colspan="2">' + capturedPlanets[i][prop][3]["Mean Temperature"] + '&#2109;</td></tr>\n';
							tabstr += '\t<tr><td></td><td>Mean Temperature Range:</td><td colspan="2">' + capturedPlanets[i][prop][3]["Mean Low Temperature"] + " to " + capturedPlanets[i][prop][3]["Mean High Temperature"] + '&#2109;</td></tr>\n';
						}
						tabstr += '\t<tr><td></td><td colspan="3">Mineral Ratings, scale of 0 to 9</td></tr>\n';
						num = round(capturedPlanets[i][prop][3].Minerals[0], 2);
						tabstr += '\t<tr><td colspan="2"></td><td>Industrial Minerals</td><td>' + num + '</td></tr>\n';
						num = round(capturedPlanets[i][prop][3].Minerals[1], 2);
						tabstr += '\t<tr><td colspan="2"></td><td>Common Metals</td><td>' + num + '</td></tr>\n';
						num = round(capturedPlanets[i][prop][3].Minerals[2], 2);
						tabstr += '\t<tr><td colspan="2"></td><td>Rare Metals</td><td>' + num + '</td></tr>\n';
						num = round(capturedPlanets[i][prop][3].Minerals[3], 2);
						tabstr += '\t<tr><td colspan="2"></td><td>Industrial Crystals</td><td>' + num + '</td></tr>\n';
						num = round(capturedPlanets[i][prop][3].Minerals[4], 2);
						tabstr += '\t<tr><td colspan="2"></td><td>Gemstones</td><td>' + num + '</td></tr>\n';
						num = round(capturedPlanets[i][prop][3].Minerals[5], 2);
						tabstr += '\t<tr><td colspan="2"></td><td>Radioactives</td><td>' + num + '</td></tr>\n</div></td></tr></table></td></tr>\n';
					}
				}
			}
		}
		if (asteroids[i].length === 0) {
			tabstr += '\t<tr><td colspan="3">No Asteroid Belts</td></tr>\n';
		} else {
			tabstr += '\t<tr><td colspan="3">Asteroid Belts at Orbital Positions';
			for (j = 0; j < asteroids[i].length; j++) {
				tabstr += " " + asteroids[i][j].toString() + ",";
			}
			tabstr = tabstr.substring(0, tabstr.length - 1) + '.</td></tr>\n';
		}
		if (capturedAsteroids != "No Captures") {
			tabstr += '\t<tr><td colspan="3">Rogue Asteroids:</td></tr>\n';
			for (prop in capturedAsteroids[i]) {
				if (capturedAsteroids[i].hasOwnProperty(prop)) {
					tabstr += '\t<tr><td></td><td>' + prop + ':</td><td>Orbits From: ' + round(bode(capturedAsteroids[i][prop][0]), 2) + 'AU to ' + round(bode(capturedAsteroids[i][prop][1]), 2) + 'AU</td></tr>\n';
				}
			}
		}
		tabstr += "</table></div>";
	}
	$("#solarSystem").html(tabstr);
	$('.vertical .progress-fill span').each(function() {
		var percent = $(this).html();
		var pTop = 100 - (percent.slice(0, percent.length - 1)) + "%";
		$(this).parent().css({
			'height': percent,
			'top': pTop
		});
	});
	$("button.system").click(function() {
		$(this).next().toggle();
	});
	$("div.system").hide();
	$("table.system").hide();
	if ($("#export").length === 0) {
		$("#buttonZone").append('<br>\n<button onclick="systemExport()" id="export">Export</button>');
	}
}

function generate() {
	var presets = ($("#random").val() == "preset");
	var r;
	if (presets && $("starNumber").val() != "random") {
		if ($("starSign").val() === "=") {
			if ($("starNumber").val() === 1) {
				r = 1;
			} else if ($("starNumber").val() === 2) {
				r = 10;
			} else if ($("starNumber").val() === 3) {
				r = 18;
			} else {
				r = 20;
			}
		} else if ($("starSign").val() === ">") {
			if ($("starNumber").val() === 1) {
				r = randomInt(1, 20);
			} else if ($("starNumber").val() === 2) {
				r = 9 + randomInt(1, 10);
			} else if ($("starNumber").val() === 3) {
				r = 17 + randomInt(1, 3);
			} else {
				r = 20;
			}
		} else if ($("starSign").val() === "<") {
			if ($("starNumber").val() === 1) {
				r = 1;
			} else if ($("starNumber").val() === 2) {
				r = randomInt(1, 17);
			} else if ($("starNumber").val() === 3) {
				r = randomInt(1, 19);
			} else {
				r = randomInt(1, 20);
			}
		}
	} else {
		r = randomInt(1, 20);
	}
	var t = [];
	var letter = [];
	var numb = [];
	var dec = [];
	var max = [];
	var i;
	t.push(starClassSize(1, $("#star1Spect").val(), $("#star1Dec").val(), $("#star1Lum").val()));
	if (r > 9) {
		t.push(starClassSize(2, $("#star2Spect").val(), $("#star2Dec").val(), $("#star2Lum").val()));
	}
	if (r > 17) {
		t.push(starClassSize(3, $("#star3Spect").val(), $("#star3Dec").val(), $("#star3Lum").val()));
	}
	if (r > 19) {
		t.push(starClassSize(4, $("#star4Spect").val(), $("#star4Dec").val(), $("#star4Lum").val()));
	}
	for (i = 0; i < t.length; i++) {
		letter.push(t[i][0]);
		numb.push(t[i][1]);
		dec.push(t[i][2]);
	}
	var stars = JSON.parse(JSON.stringify(t));
	t = starRanges(t);
	var name = randomName();
	var sysname = name;
	var n;
	if (stars.length == 1) {
		name = [name];
	} else {
		n = [];
		for (i = 0; i < stars.length; i++) {
			n.push(name + " &#" + (945 + i).toString() + ";");
		}
		name = n;
	}
	n = t.filter(function(x) {
		return !x.every(function(y) {
			return !isNaN(y);
		});
	});
	for (i = 0; i < n.length; i++) {
		max.push(n[i][1]);
	}
	t = starZones(t);
	var planets = t;
	planets.shift();
	planets = planets.map(function(x) {
		x.shift();
		x.shift();
		x.shift();
		return x;
	});
	planets = zonePop(planets, "");
	var capturedPlanets = capture("Planet", max, letter, numb, dec);
	var capturedAsteroids = capture("Asteroid", max, letter, numb, dec);
	var orbitZones = t;
	for (i = 0; i < planets.length; i++) {
		orbitZones[i] = orbitZones[i].slice(0, planets[i].length);
	}
	var asteroids = planetsTable(name, orbitZones, planets);
	planets = asteroids[0];
	asteroids = asteroids[1];
	var satel = [];
	for (i = 0; i < planets.length; i++) {
		satel.push(satellites(planets[i]));
	}
	planetDeets(planets, satel);
	if (capturedPlanets != "No Captures") {
		planetDeets(capturedPlanets, satel);
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
	curSystem = {};
	curSystem.sysname = sysname;
	curSystem.name = name;
	curSystem.stars = stars;
	curSystem.orbitZones = orbitZones;
	curSystem.planets = planets;
	curSystem.satel = satel;
	curSystem.asteroids = asteroids;
	curSystem.capturedPlanets = capturedPlanets;
	curSystem.capturedAsteroids = capturedAsteroids;
	tableGen(sysname, name, stars, orbitZones, planets, satel, asteroids, capturedPlanets, capturedAsteroids);
}

function systemImport() {
	var file = document.getElementById('import').files[0];
	var reader = new FileReader();
	// Closure to capture the file information.
	reader.onload = (function(theFile) {
		return function(e) {
			var obj = JSON.parse(e.target.result);
			curSystem = obj;
			tableGen(obj.sysname, obj.name, obj.stars, obj.orbitZones, obj.planets, obj.satel, obj.asteroids, obj.capturedPlanets, obj.capturedAsteroids);
		};
	})(file);
	reader.readAsText(file);
}

function systemExport() {
	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(curSystem));
	var dlAnchorElem = document.getElementById('downloadAnchorElem');
	dlAnchorElem.setAttribute("href", dataStr);
	dlAnchorElem.setAttribute("download", curSystem.sysname + "_System.json");
	dlAnchorElem.click();
}
