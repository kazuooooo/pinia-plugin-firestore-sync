import { CollectionReference, DocumentReference, Query, Unsubscribe } from "firebase/firestore";
import { PiniaPluginContext } from "pinia";
/**
 * Adds a `sync` function to your store.
 * The `sync` method can sync your state propery with firestore  Document/Collection/Query easily.
 *
 * @example
 *
 * ```ts
 * import { PiniaFirestoreSync } from 'pinia-plugin-firestore-sync'
 * ...
 * const pinia = createPinia().use(firestoreSyncPlugin)
 * app.use(pinia).mount('#app')
 *
 * ```
 */
export declare const PiniaFirestoreSync: ({ store }: PiniaPluginContext) => void;
declare module 'pinia' {
    interface PiniaCustomProperties<Id, S, G, A> {
        /**
         *
         * @param key Key name of state which synchronize with firestore document data.
         * @param ref Document reference to sync
         *
         * @example
         *
         * ```ts
         * type ExampleDoc = {
         *   name: string,
         *   age: number
         * }
         *
         * export type State = {
         *   docData: ExampleDoc | null,
         * }
         *
         * export const useExampleStore = defineStore('expamle', {
         *   state: (): State => {
         *     return {
         *       docData: null,
         *     }
         *   },
         *   actions: {
         *     async setup() {
         *       // Get Document reference
         *       const store = getFirestore()
         *       const docRef = doc(store, 'Examples/id')
         *
         *       // Do the magic
         *       this.sync('docData', docRef)
         *     }
         *   }
         * })
         *```
         */
        sync(key: string, ref: DocumentReference): Unsubscribe;
        /**
         *
         * @param key Key name of state which synchronize with firestore collection data.
         * @param ref Collection reference to sync
         *
         * @example
         *
         * ```ts
         * type ExampleDoc = {
         *   name: string,
         *   age: number
         * }
         *
         * export type State = {
         *   collectionData: ExampleDoc[] | null,
         * }
         * export const useExampleStore = defineStore('expamle', {
         *   state: (): State => {
         *     return {
         *       collectionData: null,
         *     }
         *   },
         *   actions: {
         *     async setup() {
         *       // Get Collection reference
         *       const store = getFirestore()
         *       const collectionRef = collection(store, 'Examples')
         *
         *       // Do the magic
         *       this.sync('collectionData', collectionRef)
         *     }
         *   }
         * })
         *```
         */
        sync(key: string, ref: CollectionReference): Unsubscribe;
        /**
         *
         * @param key Key name of state which synchronize with firestore collection data.
         * @param ref Query to sync
         *
         * @example
         * ```ts
         * type ExampleDoc = {
         *   name: string,
         *   age: number
         * }
         * export type State = {
         *   queryData: ExampleDoc[] | null,
         * }
         * export const useExampleStore = defineStore('expamle', {
         *   state: (): State => {
         *     return {
         *       queryData: null,
         *     }
         *   },
         *   actions: {
         *     async setup() {
         *       // Build query
         *       const store = getFirestore()
         *       const collectionRef = collection(store, 'Examples')
         *       const q = query(collectionRef, where('name', '==', 'wombat'))
         *
         *       // Do the magic
         *       this.sync('queryData', q)
         *     }
         *   }
         * })
         * ```
         */
        sync(key: string, ref: Query): Unsubscribe;
    }
}
