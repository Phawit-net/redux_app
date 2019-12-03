import {uniqueId} from 'lodash'

export const ADD_NOTE = 'ADD_NOTE';   //ประกาศเป็นตัวแปรเพื่อให้ไฟล์มันจับได้ว่าผิด และแก้ไขแค่ที่เดียว //เป็น type สำหรับaction ของเรา
export const DELETE_NOTE = 'DELETE_NOTE';
export const UPDATE_SEARCH = 'UPDATE_SEARCH';

//Action creator เป็น functionที่ใช้ return Action
export function addNote(title,content){
    return {
        type : ADD_NOTE ,
        title:title ,
        content:content ,
        id:new Date().getTime().toString()
    }
} 

export function removeNote(id){
    return {
        type : DELETE_NOTE ,
        id:id
    }
} 

export function updateSearch(value){
    return {
        type : UPDATE_SEARCH ,
        value:value
    }
} 