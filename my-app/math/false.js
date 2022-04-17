function cal(x){
    var result = x*(43)-1;
    return result;
}
function False_pst(L,R){
    var xl = L
    var xr = R
    var time = 0;
    var Xn = xl
    while(true){
        time = time + 1
        Xn = ( (xl*cal(xr)-xr*cal(xl)) / (cal(xr)-cal(xl)) )
        var error = cal(Xn)
        if(error < 0.000001){
            console.log(Xn)
            break;
        }
        else if(cal(Xn)*cal(xr) > 0){
            xl = Xn;
        }
        else{
            xr = Xn;
        }
    }
};

var L =0.02;
var R = 0.03;
False_pst(L,R);
//console.log(1/43);