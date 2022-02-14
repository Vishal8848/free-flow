import { getDownloadURL, getStorage, ref, uploadBytes, updateMetadata } from 'firebase/storage'
import { doc, getFirestore, updateDoc } from 'firebase/firestore/lite'
import firebase from './firebase'

const bulk = getStorage(firebase);
const store = getFirestore(firebase);
const cast = (data) => { return data.substring(data.lastIndexOf('(') + 1, data.lastIndexOf(')')) }

export const firebaseUploadImage = async (id, blob, type) => {

    try {
        const imageRef = ref(bulk, type + '/' + id);

        await uploadBytes(imageRef, blob);

        const metadata = { cacheControl: "public,max-age=172800" }

        await updateMetadata(imageRef, metadata)

        if(type === 'bgs') await updateDoc(doc(store, 'users', id), { hasBG: true, updatedAt: Date.now().toString() })

        if(type === 'dps') await updateDoc(doc(store, 'users', id), { hasDP: true, updatedAt: Date.now().toString() })

    }   catch(err)  { return { error: true, data: cast(err.message) } }

}

export const firebaseDownloadImage = async (type, id = null) => {

    try {
        const imageRef = ref(bulk, type + '/' + (id ? id : `default-${type.slice(0, -1)}-min.jpg`))

        const URL = await getDownloadURL(imageRef);

        return { error: false, data: URL }

    }   catch(err) { return { error: true, data: cast(err.message) } }
}