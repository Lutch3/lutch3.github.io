// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import 'firebase/firestore';
// import { deleteDoc, doc, getFirestore, orderBy, query, setDoc } from 'firebase/firestore';
// import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Event, EventPlayer, Game, Player } from '../model/models';

import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  getFirestore,
  updateDoc,
  OrderByDirection
} from 'firebase/firestore';

import { signInWithEmailAndPassword, getAuth, signOut} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDT0HOrVe9bRmAt8AhFP1-GBxoROoUD31s',
  authDomain: 'ohanagames-3188e.firebaseapp.com',
  projectId: 'ohanagames-3188e',
  storageBucket: 'ohanagames-3188e.appspot.com',
  messagingSenderId: '725095833043',
  appId: '1:725095833043:web:143ee2fb12c2bfd5d1e326',
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const fireStore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export const login = async (username:string, password:string) => {
  await signInWithEmailAndPassword(auth,username,password);
}

export const logout = async () => {
    await signOut(auth);
}

export const findAll = async (collectionName: string, orderByProperty:string, orderByDirection?:OrderByDirection) => {
  const collectionRef = collection(fireStore, collectionName);
  const q = query(collectionRef, orderBy(orderByProperty, orderByDirection));
  const doc_refs = await getDocs(q);

  const result: any[] = [];

  
  doc_refs.forEach((r: any) => {
    result.push({
      id: r.id,
      ...r.data(),
    });
  });
  console.log(collectionName,result)
  return result;
};

//PLAYERS
export const addPlayer = async (player: Player) => {
  try {
    const docRef: any = await addDoc(collection(fireStore, 'players'), player);
    return { id: docRef.id, name: player.name };
  } catch (e) {
    console.error('Error adding Player document: ', e);
  }
};

export const removePlayer = async (player: Player) => {
  const colletionRef = collection(fireStore, 'players');
  const playerRef = doc(colletionRef, player.id);
  try {
    await deleteDoc(playerRef);
  } catch (error) {
    console.error(error);
  }
};

//GAMES
export const addGame = async (game: Game) => {
  try {
    const docRef: any = await addDoc(collection(fireStore, 'games'), game);
    return { id: docRef.id, name: game.name };
  } catch (e) {
    console.error('Error adding Game document: ', e);
  }
};

export const removeGame = async (game: Game) => {
  const colletionRef = collection(fireStore, 'games');
  const gameRef = doc(colletionRef, game.id);
  try {
    await deleteDoc(gameRef);
  } catch (error) {
    console.error(error);
  }
};

//EVENTS
export const addEvent = async (event: Event) => {
  try {
    console.log('adding Event', event);
    const docRef: any = await addDoc(collection(fireStore, 'events'), event);
    const obj = { id: docRef.id, date: event.date, gameId:event.gameId };
    return obj;
  } catch (e) {
    console.error('Error adding Event document: ', e);
  }
};

export const removeEvent = async (event: Event) => {
  const colletionRef = collection(fireStore, 'events');
  const eventRef = doc(colletionRef, event.id);
  try {
    await deleteDoc(eventRef);
  } catch (error) {
    console.error(error);
  }
};

//EVENT PLAYERS
export const addEventPlayer = async (eventPlayer: EventPlayer) => {
  try {
    console.log('adding Event Player', eventPlayer);
    const docRef: any = await addDoc(collection(fireStore, 'eventPlayers'), eventPlayer);
    const obj = { id: docRef.id, eventId: eventPlayer.eventId, playerId: eventPlayer.playerId };
    return obj;
  } catch (e) {
    console.error('Error adding Event Player document: ', e);
  }
};

export const updateEventPlayer = async (eventPlayer: EventPlayer) => {
  try {
    console.log('updating Event Player', eventPlayer);
    const colletionRef = collection(fireStore, 'eventPlayers');
    const eventPlayerRef = doc(colletionRef, eventPlayer.id);
    await updateDoc(eventPlayerRef, {id:eventPlayer.id, eventId:eventPlayer.eventId, playerId:eventPlayer.playerId, isWinner: eventPlayer.isWinner})
    const obj = { id: eventPlayerRef.id, eventId: eventPlayer.eventId, playerId: eventPlayer.playerId, isWinner: eventPlayer.isWinner };
    return obj;
  } catch (e) {
    console.error('Error adding Event Player document: ', e);
  }
};

export const removeEventPlayer = async (eventPlayer: EventPlayer) => {
  const colletionRef = collection(fireStore, 'eventPlayers');
  const eventPlayerRef = doc(colletionRef, eventPlayer.id);
  try {
    await deleteDoc(eventPlayerRef);
  } catch (error) {
    console.error(error);
  }
};