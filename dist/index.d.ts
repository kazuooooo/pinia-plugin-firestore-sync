import { CollectionReference, DocumentReference, Query, Unsubscribe } from "firebase/firestore";
import { PiniaPluginContext } from "pinia";
export declare const firestoreSyncPlugin: ({ store }: PiniaPluginContext) => void;
declare module 'pinia' {
    interface PiniaCustomProperties<Id, S, G, A> {
        sync(key: string, ref: DocumentReference): Unsubscribe;
        sync(key: string, ref: CollectionReference): Unsubscribe;
        sync(key: string, ref: Query): Unsubscribe;
    }
}
