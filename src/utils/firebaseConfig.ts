import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword} from "firebase/auth";
import { collection, getFirestore, onSnapshot,getDocs, doc, getDoc, query, where, limit} from "firebase/firestore";
import { initialize } from "next/dist/server/lib/render-server";

interface TodoItem{
    describe:string,
    subtitle:string,
    title:string,
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

initializeApp(firebaseConfig);
const db=getFirestore();
const todoCollectionRef=collection(db,'todos');
const userInfoCollectionRef=collection(db,'userInfos');
const auth=getAuth();


const getData=()=>{ //get all todos 
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

const getDocWithUid=async (uid:string)=>{
    try{
        const userQuery=query(userInfoCollectionRef,
                                where('uid','==',uid),
                                limit(1)); 
        const querySnapshot= await getDocs(userQuery);
        if(!querySnapshot.empty){
            return querySnapshot.docs[0].data().username;
        }
    }catch(err){
        console.log(err);
    }
}


export {db,todoCollectionRef,auth,firebaseConfig,getDocWithUid,getData};