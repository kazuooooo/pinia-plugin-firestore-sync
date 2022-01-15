import { CollectionReference, DocumentReference, onSnapshot, Query, Unsubscribe } from "firebase/firestore";
import { PiniaPluginContext } from "pinia";

export const firestoreSyncPlugin = ({ store }: PiniaPluginContext) => {

  /**
   * Synchronize pinia state and firestore Document/Collection/Query
   * @param key Key name of state which synchronize with ref.
   * @param ref Reference to subscribe.
   * @returns 
   */
  store.sync = (key, ref) => {
    // Document
    if (ref instanceof DocumentReference) {
      return onSnapshot(ref, async (ds) => {
        if (ds.exists()) {
          store.$patch({ [key]: ds.data() })
        }
      })
    }

    // Collection or Query
    return onSnapshot(ref, async (qs) => {
      const datum = qs.docs.map(d => d.data())
      store.$patch((state) => {
        state[key] = datum
      })
    })
  }
}

declare module 'pinia' {
  export interface PiniaCustomProperties<Id, S, G, A> {
    // FIXME: Want to make key type to keys of State
    sync(key: string, ref: DocumentReference): Unsubscribe
    sync(key: string, ref: CollectionReference): Unsubscribe
    sync(key: string, ref: Query): Unsubscribe
  }
}