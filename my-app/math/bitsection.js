function cal(x){
    var result = Math.pow(x,4)-13;
    return result;
}
function bitsection(){
    var cal = this.cal
    var xl = this.state.XL ,xr = this.state.XR
    var data = [];
    data['Iter'] = []
    data['xl'] = []
    data['xr'] = []
    data['error']=[];
    var Xm;
    var Xmo;
    var iter = 0;
    var error;
    console.log("fx: ",this.state.Function);
    console.log("xl: ",xl,"xr: ",xr)
    Xm = (xl + xr) / 2;
    if(cal(Xm) * cal(xr) > 0){
        xr = Xm
    }
    if(cal(Xm) * cal(xr) < 0){
        xl = Xm
    }
    while(true){
        iter++;
        Xmo = Xm
        Xm = (xl + xr) / 2
        error = Math.abs(Xm-Xmo)/Xm>0.000001
        if(error<0.000001){
            data['Iter'][iter] = iter
            data['xl'][iter] = xl
            data['xr'][iter] = xr
            data['error'][iter] = Number(error)
            console.log(Xm.toFixed(6))
            break;
        }
        else if(iter>500)
        {   
            data['Iter'][iter] = iter
            data['xl'][iter] = xl
            data['xr'][iter] = xr
            data['error'][iter] = Number(error)
            break;
        }
        else if(cal(Xm)*cal(xr)>0)
        {
            Xmo = xr;
            xr = Xm;
        }
        else{
            Xmo = xl;
            xl = Xm;
        }
        data['Iter'][iter] = iter
        data['xl'][iter] = xl
        data['xr'][iter] = xr
        data['error'][iter] = Number(error)
    }
    this.createdataset(data['Iter'], data['xl'], data['xr'],data['error'])
}

bitsection()
