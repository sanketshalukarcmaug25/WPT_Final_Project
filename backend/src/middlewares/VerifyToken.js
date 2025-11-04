import jwt from "jsonwebtoken";

export function verifyToken(request,response,next){
    const authHeader = request.get('Authorization'); //'Bearer eyn43543fgfdg.sgfgdfgg'
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,'user1234',(error, payload)=>{
            if(error){
               response.status(401).send({message:'Token is invalid'}); 
            }
            else{
                console.log(payload);
                request.loggedInUserId = payload.userId;
                request.role = payload.role;
               next(); 
            }
        });
    }
    else{
       response.status(401).send({message:'Token is missing'}); 
    }
}

export function authorize(allowedRoles){
    return (request, response, next)=>{
        if(allowedRoles.includes(request.role)){
            next();
        }
        else{
            response.status(403).send({message:'Access denied'});
        }
    }
}