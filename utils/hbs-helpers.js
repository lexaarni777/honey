module.exports = {
    ifeq(a,b,option){
        console.log(a,b)
        if(a == b){
            return option.fn(this)
        }
        return option.inverse(this)
    }
}