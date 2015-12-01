var fs = require('fs');
var naming = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,l,o,p,r,s,t,w,x,y,z,1,2,3,4,5,6,7,8,9,0,_,_a,_b,_c,_d,_e,_f,_g,_1,_2,_3,_4,_5,_6,_7,_8,_9,_0'.split(',');
var exclude = ['.','..', 'renamer.js'];
var dir = process.cwd();

var self = {
	path: process.argv[1],
	file: 'renamer.js'
}

function renameAll(dir) {
	var files = fs.readdirSync(dir);
	files.forEach(function(file, index) {
		// cannot rename if the name is already the same as the newone
		if(file == 'renamer.js') return;
		if(file != getNewName(index) ) {
			try {
				fs.renameSync(dir + '\\' + file, dir + '\\' + getNewName(index));		
			} catch(e) {
				console.error(e);
			}
			
		}		
	});

	files = fs.readdirSync(dir);
	files.forEach(function(f){
		console.log(dir + '\\' + f);
		ff = fs.statSync(dir + '\\' + f);
		if(ff.isDirectory()) {
		 	renameAll(dir+'\\'+f);
		}
	})
}

function getNewName(index) {
	if(index >= naming.length) {
		var name = naming[ Math.round(index.length/index)] + getNewName(naming.length - index);
	} else {
		return naming[index];
	}
}

renameAll(dir);
