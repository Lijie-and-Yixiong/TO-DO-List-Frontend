// import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore,collection, getDocs,addDoc,deleteDoc, updateDoc,doc 
        ,query,onSnapshot, where,orderBy

} from "firebase/firestore";
import { NextResponse,NextRequest } from "next/server";



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
const collectionRef=collection(db,'todos');

const getData=()=>{
    // getDocs(collectionRef).then((snapshot)=>{
    //     let todos:any[]=[];
    //     snapshot.docs.forEach((doc)=>{
    //         todos.push({...doc.data(), id:doc.id});
    //     })
    //     console.log(todos);
    // }).catch((e)=>console.log(e));

    onSnapshot(collectionRef,(snapshot)=>{
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

interface TodoItem{
    describe:string,
    subtitle:string,
    title:string,
}

export async function GET(req:NextRequest){
    if(req.nextUrl.searchParams.has('describe')){ //Do query search in database if search param exist
        let docArr=[];
        const queriedDocId=req.nextUrl.searchParams.get("describe");
        const q=query(collectionRef,where("describe","==",queriedDocId));
        const querySnapshot=await getDocs(q);
        const data=querySnapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        }))
        console.log(data);

        return NextResponse.json({"message":"search Success"});
    }
    const response={};
    getData();
    return NextResponse.json({"data":response,"message":"todolist retrieved",status:200});
}

export async function POST(req:NextRequest){
    const data=await req.json();
    console.log(data);
    try{
        addDoc(collectionRef,data);

    }catch(err){
        console.log(err);
    }
    return NextResponse.json({"message":"success",status:200});
}

export async function DELETE(req:NextRequest){
    const data=await req.json();
    console.log(data.id);
    const docRef=doc(db,'todos',data.id);
    try{
        deleteDoc(docRef);
        console.log("success");
    }catch(err){
        console.log(err);
    }

    return NextResponse.json({"message":"success",status:200});
}


/*
{
    "id":,
    "body":{
        "describe":"updated value"
    }
}
*/ 
export async function PUT(req:NextRequest){
    const data=await req.json();
    try{
        const docRef=doc(db,'todos',data.id);
        await updateDoc(docRef,data.body);
        console.log("update success");
    }catch(err){
        console.log(err);
    }

    return NextResponse.json({"message":"success",status:200});

}