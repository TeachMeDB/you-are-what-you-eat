
export const GenerateBase64=(file:Blob,callback:(url:string)=>void)=>{

    let r = new FileReader();


    r.onload = function(){

        let str=r.result.toString();
        callback(str);
    }

    r.readAsDataURL(file);

}