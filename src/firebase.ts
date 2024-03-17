import {
    collection,
    addDoc,
    setDoc,
    doc,
    getDocs,
    query,
    where,
    and,
    or,
    getFirestore,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, listAll } from "firebase/storage";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { FIREBASE } from "../conf.json";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { pick } from "lodash-es";

function getAuthUser() {
    return getAuth().currentUser;
}

interface AddDocOpt {
    entity: string;
    entityObj: Record<string, unknown>;
    path: string;
}

let app: FirebaseApp;

function initApp() {
    if (!app) {
        app = initializeApp(FIREBASE);
    }

    return app;
}

function logPageView(params: Record<string, string>) {
    const analytics = getAnalytics(initApp());
    logEvent(analytics, "page_view", params);
}

function getDB() {
    return getFirestore(initApp());
}

async function setDocument({ entity, path, entityObj }: AddDocOpt) {
    await setDoc(doc(getDB(), path, entity), entityObj);
}

async function addDocument({ entity, entityObj }: Omit<AddDocOpt, "path">) {
    try {
        console.log(entity, entityObj);
        return await addDoc(collection(getDB(), entity), entityObj);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function getDocument<T>({ entity }: Pick<AddDocOpt, "entity">) {
    const data: T[] = [];
    try {
        const querySnapshot = await getDocs(collection(getDB(), entity));
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            data.push({
                ...doc.data(),
                _id: doc.id,
            } as T);
        });
    } catch (error) {
        console.error("Error get document: ", error);
    }
    return data;
}

async function uploadFileByBytes({
    file,
    filename,
    path,
}: {
    file: File | Blob;
    filename: string;
    path: string;
}) {
    const storage = getStorage();
    const storageRef = ref(storage, `${path}/${path}_${filename}`);
    try {
        const snapshot = await uploadBytes(storageRef, file);
        return snapshot;
    } catch (error) {
        console.error(error);
    }
}

async function listAllImages(path: string) {
    const storage = getStorage();

    // Create a reference under which you want to list
    const listRef = ref(storage, path);

    // Find all the prefixes and items.
    listAll(listRef)
        .then((res) => {
            console.log("res:::", res);
            res.prefixes.forEach((folderRef) => {
                console.log("folderRef:::", folderRef);
                // All the prefixes under listRef.
                // You may call listAll() recursively on them.
            });
            res.items.forEach((itemRef) => {
                console.log("itemRef:::", itemRef);
                // All the items under listRef.
            });
        })
        .catch((error) => {
            console.error(error);
            // Uh-oh, an error occurred!
        });
}

async function authLoginByGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    const auth = getAuth();
    auth.languageCode = "zh-CN";
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result)!;
        const token = credential.accessToken;
        const user = result.user;
        const res = await queryDocument("user", [
            {
                conditions: [{ field: "email", value: user.email!, op: "==" }],
                op: "",
            },
        ]);

        console.log("queryDocument:::", res);
        if (res && res?.size === 0 && res.empty) {
            addDocument({
                entity: "user",
                entityObj: {
                    ...pick(user, [
                        "displayName",
                        "accessToken",
                        "email",
                        "isAnonymous",
                        "phoneNumber",
                        "photoURL",
                        "refreshToken",
                        "uid",
                    ]),
                    token,
                } as unknown as AddDocOpt["entityObj"],
            });
        }

        return {
            avatar: user.photoURL,
            username: user.displayName,
            email: user.email,
        };
    } catch (error) {
        console.error(error);
    }
}

interface ConditionItem {
    field: string;
    op:
        | "=="
        | "!="
        | ">"
        | "<"
        | ">="
        | "<="
        | "in"
        | "not-in"
        | "array-contains"
        | "array-contains-any";
    value: string;
}

interface Condition {
    conditions: ConditionItem[];
    op: "and" | "or" | "";
}

async function queryDocument(entity: string, conditions: Condition[]) {
    // Create a reference to the cities collection
    const entityRef = collection(getDB(), entity);
    const con = conditions.map((condition) => {
        if (condition.op === "and") {
            const andConditions = condition.conditions.map(
                ({ field, op, value }) => {
                    return where(field, op, value);
                }
            );

            return and(...andConditions);
        } else if (condition.op === "or") {
            const orConditions = condition.conditions.map(
                ({ field, op, value }) => {
                    return where(field, op, value);
                }
            );

            return or(...orConditions);
        } else {
            return condition.conditions.map(({ field, op, value }) => {
                return where(field, op, value);
            });
        }
    });
    // @ts-ignore
    const q = query(entityRef, ...con);
    try {
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    } catch (error) {
        console.error(error);
    }
}

export {
    setDocument,
    addDocument,
    getDocument,
    uploadFileByBytes,
    listAllImages,
    logPageView,
    initApp,
    authLoginByGoogle,
    queryDocument,
    getAuthUser,
};
