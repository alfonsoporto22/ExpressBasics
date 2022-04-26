import { response } from "express";
import { users } from "../models/usersModels.mjs";

function decodeAuthBasic (headerContent) {
    const [ method, token ] = headerContent.split(" ");
    const tokenString = atob(token);
    const [ username, password ] = tokenString.split(":");
    return { method, username, password }
}

export function authMiddleware( request, response, next ) {
    try {
        const { method, username, password } = decodeAuthBasic(request.headers.authorization);

        if ( method != "Basic" ) {
            response.sendState(401);
            return;
        }//throw "Invalid authorization method. Use Basic instead."
    
        const user = users.find(
            item => item.name === username && item.password === password
        )
    
        if ( user ) {
            next()
        }  else {
            response.sendState(401);
            return;
            //throw "Authorization error"
        }
    } catch (err) {
        response.sendStatus(401);
        return;
    }
}