import React, { useEffect, useState } from "react";
import _get from "lodash/get";
import { firestore, auth } from "../../firebase";

function GetSnapShots(collectionName) {
  const [currentUser, setCurrentUser] = useState(null);
  const [codeSnapShots, setCodeSnapShots] = useState([]);

  useEffect(() => {
    const getSnapshots = () => {
      auth().onAuthStateChanged((user) => {
        if (user) {
          setCurrentUser(user);
          const snapShotRef = firestore
            .collection(collectionName)
            .where("createdBy", "==", _get(user, "uid", ""));

          snapShotRef.onSnapshot((snap) => {
            const data = snap.docs.map((doc) => doc.data());
            setCodeSnapShots(data);
          });
        } else {
          setCurrentUser(null);
          setCodeSnapShots([]);
        }
      });
    };

    getSnapshots();

    return () => getSnapshots();
  }, []);
  return { currentUser, codeSnapShots };
}

export default GetSnapShots;
