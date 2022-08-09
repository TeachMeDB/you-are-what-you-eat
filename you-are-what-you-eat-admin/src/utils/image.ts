
export const GenerateBase64=(file:Blob,callback:(url:string)=>void)=>{

    let r = new FileReader();


    r.onload = function(){

        let str=r.result.toString();

        callback(str);
    }

    r.readAsDataURL(file);

}


export const Base64ToData=(str:string)=>{

    if(str.includes(";base64,")){
        str=str.slice(str.indexOf(";base64,")+8);
    }

    return str;
}