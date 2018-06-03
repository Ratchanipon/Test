import { Gallery } from "./gallery";
export interface Project{
    $key?:string
    category:string
    name:string
    detail:string
    location:string
    video:string
    contact:string
    store:string
    imageproject:string
    gallery:Gallery[]
    travel:string
    hostelry:string
    status:boolean
    home:boolean
}