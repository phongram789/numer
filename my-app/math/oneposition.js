const math = require('mathjs');
function cal(x){
    result = (1-(x*0.15))/1.85;
    return result;
}
function One_pst(X){
    X1 = X;
    var Xs = cal(X1);
	for(var i = 0 ; i<10000;i++){
		if(math.abs((X1-Xs)/X1) < 0.000001){
			console.log(X1);
			break;
		}
		else{
            X1 = Xs;
            Xs = cal(X1);
		}
	}
}

var X=0.0;
One_pst(X);