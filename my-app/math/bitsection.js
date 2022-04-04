function cal(x){
    var result = Math.pow(x,4)-13;
    return result;
}
function bitsection(){
    eps = 0.00001;
    var XR = 2.0 ,XL = 1.5 ;
    var A = 0;
    var XMN;
    XMN = (XL+XR)/2
    var time = 0 ;
    while(Math.abs(XMN-A)/XMN>eps){
        time++;
        if(cal(XMN)*cal(XR)>0)
        {
            A = XR;
            XR = XMN;
        }
        else
        {
            A = XL;
            XL = XMN;
        }
        XMN=(XL+XR)/2;
    }
    console.log(time);
    return XMN
    
}

console.log(bitsection());
