import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword} from "firebase/auth";
import { collection, getFirestore, onSnapshot,getDocs, doc, getDoc, 
        addDoc,deleteDoc,
        query, where, limit} from "firebase/firestore";
import { initialize } from "next/dist/server/lib/render-server";

interface TodoItem{
    user_id:string,
    title:string,
    descriptions:string,
    create_date:string,
    due_date:string
}

const firebaseConfig = {
    apiKey: "AIzaSyBGYUPFMSA-Y96MFI6Q2AZxQxk-FQuWxLk",
    authDomain: "todowebsite-c93c2.firebaseapp.com",
    projectId: "todowebsite-c93c2",
    storageBucket: "todowebsite-c93c2.appspot.com",
    messagingSenderId: "698972296432",
    appId: "1:698972296432:web:49e1080f11c9d5e52c5e35",
    measurementId: "G-H6J0915CEE"
};
const TODO_COLLECTION_NAME='todos';
const USER_COLLECTION_NAME='userInfos';
initializeApp(firebaseConfig);
const db=getFirestore();
const todoCollectionRef=collection(db,TODO_COLLECTION_NAME);
const userInfoCollectionRef=collection(db,USER_COLLECTION_NAME);
const auth=getAuth();


const getAllData=()=>{ //get all todos 
    onSnapshot(userInfoCollectionRef,(snapshot)=>{
        let todos:any[]=[];
        snapshot.docs.forEach((doc)=>{
            todos.push({
                id:doc.id,
                ...doc.data()
            })
        })
        console.log(todos);
    })
}

const getUserDocWithUid=async (uid:string)=>{
    try{
        const userQuery=query(userInfoCollectionRef,
                                where('uid','==',uid),
                                limit(1)); 
        const snapshot= await getDocs(userQuery);
        if(!snapshot.empty){
            return snapshot.docs[0].data().username;
        }
    }catch(err){
        console.log(err);
    }
}

const getTodoDocsWithUserId=async(uid:string)=>{
    try{
        const todoQuery=query(todoCollectionRef,
                                where('user_id','==',uid))
        const snapshot=await getDocs(todoQuery);
        if(!snapshot.empty){
            return snapshot.docs;
        }
    }catch(err){
        console.log("Get todo docs with user_id "+err);
    }
}

const addTodoItem=async(todoItem:TodoItem)=>{
    try{
        addDoc(todoCollectionRef,todoItem);
    }catch(err){
        console.log("Add todo "+err);
    }
}

const deleteTodoItem=async(uid:string)=>{
    const docRef=doc(db,TODO_COLLECTION_NAME,uid);
    try{
        deleteDoc(docRef);
    }catch(err){
        console.log("Delete Err "+err);
    }
}

export {db,todoCollectionRef,auth,firebaseConfig,
        addTodoItem,deleteDoc,
        getUserDocWithUid,getAllData};