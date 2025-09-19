export function serveResponse(res, statusCode, contentType, payload){
    res.statusCode = statusCode
    res.setHeader("Content-Type", contentType)
    if(contentType.includes("json")){
        res.end(JSON.stringify(payload))
    }else{
        res.end(String(payload))
    }
}
