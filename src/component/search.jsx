import { async } from '@firebase/util';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { db } from "../firebase";
import './search.scss';


const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const {currentUser} = useContext(AuthContext)
  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    //checking -- group(in firestore) exist or if not creat
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats",combinedId));
      if (!res.exists()) {
        await setDoc(doc (db, "chats", combinedId), { messages: [] });
        //create user chats
        await updateDoc(doc(db, "userChat", currentUser.uid), {
          [combinedId + ".useInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
          
        });
        await updateDoc(doc(db, "userChat", user.uid), {
          [combinedId + ".useInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
          
        });
      }
    } catch (err) { }
    
  };
  return ( 
    <div className='search'>
      <div className="searchForm">
        <input type="search" placeholder='Look for a user'
          onKeyDown={handleKey}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      {err && <span>User not found</span>}
      {user && <div className="contect1" onClick={handleSelect}>
        <img src={user.photoURL}  />
        <div className="contect1Name">
          {user.displayName} <br />
          <span className='status'>World of Creative Desginer</span>
        </div>
      </div>}
            
           
    </div>
  )
}

export default Search 