<h1>
  <img height="64" src="https://user-images.githubusercontent.com/6919381/149651295-0bf814f5-ad07-4d40-9af2-78dd99d8e1e7.png" alt="logo">
  Pinia Firestore Sync
</h1>

Sync your pinia 🍍 store with Firestore at ease!

## Installation

```sh
npm install pinia-plugin-firestore-sync
```

## Usage

### Preparation

At first, you need to add plugin by use

```ts
import { PiniaFirestoreSync } from 'pinia-plugin-firestore-sync'

const pinia = createPinia().use(firestoreSyncPlugin)
app.use(pinia).mount('#app') 
```

### Sync with Document

```ts
 type ExampleDoc = {
   name: string,
   age: number
 }
 
 export type State = {
   docData: ExampleDoc | null,
 }
 
 export const useExampleStore = defineStore('expamle', {
   state: (): State => {
     return {
       docData: null,
     }
   },
   actions: {
     async setup() {
       // Get Document reference
       const store = getFirestore()
       const docRef = doc(store, 'Examples/id')
 
       // Do the magic
       this.sync('docData', docRef)
     }
   }
 })
```

### Sync with Collection

```ts
type ExampleDoc = {
  name: string,
  age: number
}

export type State = {
  collectionData: ExampleDoc[] | null,
}
export const useExampleStore = defineStore('expamle', {
  state: (): State => {
    return {
      collectionData: null,
    }
  },
  actions: {
    async setup() {
      // Get Collection reference
      const store = getFirestore()
      const collectionRef = collection(store, 'Examples')

      // Do the magic
      this.sync('collectionData', collectionRef)
    }
  }
})
```

### Sync with Query

```ts
type ExampleDoc = {
  name: string,
  age: number
}
export type State = {
  queryData: ExampleDoc[] | null,
} 
export const useExampleStore = defineStore('expamle', {
  state: (): State => {
    return {
      queryData: null,
    }
  },
  actions: {
    async setup() {
      // Build query
      const store = getFirestore()
      const collectionRef = collection(store, 'Examples')
      const q = query(collectionRef, where('name', '==', 'wombat'))

      // Do the magic
      this.sync('queryData', q)
    }
  }
})
```

## License

[MIT](http://opensource.org/licenses/MIT)
