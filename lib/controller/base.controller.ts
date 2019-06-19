export class baseController{
   bearer="bearer"
   controllerName
   public status_code:Status   
   public data:any
}

export enum Status {
    success="success",
    server_error="server_error",
    logic_error="logic_error"
}