var check = (req,res,next)=>{
   if(req.local.type==1){
       next()
   }else{
       res.json('Not admin')
   }
}
module.exports = check