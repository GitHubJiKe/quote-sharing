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
import {
    GoogleAuthProvider,
    signInWithPopup,
    getAuth,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink,
} from "firebase/auth";
import { pick } from "lodash-es";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

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
        return await addDoc(collection(getDB(), entity), entityObj);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function getDocument<T>({ entity }: Pick<AddDocOpt, "entity">) {
    const data: T[] = [];
    try {
        const querySnapshot = await getDocs(collection(getDB(), entity));
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
                    vipLevel: -1,
                    exteraCardCount: 0,
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

async function queryDocument(
    entity: string,
    conditions: Condition[],
    filter = null
) {
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
    const q = filter
        ? // @ts-ignore
          query(entityRef, ...con, filter)
        : // @ts-ignore
          query(entityRef, ...con);
    try {
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    } catch (error) {
        console.error(error);
    }
}

function sendLoginLinklWithEmail(email: string) {
    const actionCodeSettings = {
        url: window.location.href,
        handleCodeInApp: true,
    };
    const auth = getAuth();
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            window.localStorage.setItem("emailForSignIn", email);
            toast.success("邮件发送成功，请前往邮箱，点击登录链接完成登录");
            // ...
        })
        .catch((error) => {
            console.error(error);
        });
}

function signInSuccessWithEmail() {
    // Confirm the link is a sign-in with email link.
    const router = useRouter();
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
            // User opened the link on a different device. To prevent session fixation
            // attacks, ask the user to provide the associated email again. For example:
            email = window.prompt("请提供邮箱地址")!;
        }
        // The client SDK will parse the code from the link for you.
        signInWithEmailLink(auth, email, window.location.href)
            .then((result) => {
                // Clear email from storage.
                window.localStorage.removeItem("emailForSignIn");
                // You can access the new user via result.user
                // Additional user info profile not available via:
                // result.additionalUserInfo.profile == null
                // You can check if the user is new or existing:
                // result.additionalUserInfo.isNewUser
                const { user } = result;
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
                        vipLevel: -1,
                        exteraCardCount: 0,
                    } as unknown as AddDocOpt["entityObj"],
                }).then(() => {
                    router.push("/writing");
                });
            })
            .catch((error) => {
                console.error(error);
            });
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
    sendLoginLinklWithEmail,
    signInSuccessWithEmail,
};
