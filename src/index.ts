import { CollectionReference, DocumentReference, onSnapshot, Query, Unsubscribe } from "firebase/firestore";
import { PiniaPluginContext } from "pinia";

// 残りTODO
// 第二引数が何を入れてもコンパイルが通ってしまうので修正する(インターフェースのoverload周りやと思う)
// Debounce参考にドキュメントを書く
// peerDependencyを入れる(vue3、firestore9、pinia2)
// 公開する
// 記事を書く
// 

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
export const PiniaFirestoreSync = ({ store }: PiniaPluginContext) => {
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
    /**
     * 
     * @param key Key name of state which synchronize with firestore document data.
     * @param ref Document reference to sync
     */
    sync(key: string, ref: DocumentReference): Unsubscribe
    /**
     * 
     * @param key Key name of state which synchronize with firestore collection data.
     * @param ref Collection reference to sync
     */
    sync(key: string, ref: CollectionReference): Unsubscribe
    /**
     * 
     * @param key Key name of state which synchronize with firestore collection data.
     * @param ref Query to sync
     */
    sync(key: string, ref: Query): Unsubscribe
  }
}