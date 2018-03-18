import { Personal } from "./Personal";


export interface ApprovePersonal {
    $key?:string;
    approver:string;
    statusApprove:boolean;
    Personal:Personal;
    description:string;
}