function addWorker(workerData) {
  return db.collection("workers").add({
    name: workerData.name,
    nationality: workerData.nationality,
    idNumber: workerData.idNumber,
    phone: workerData.phone,
    campId: workerData.campId,
    roomNumber: workerData.roomNumber,
    joinDate: firebase.firestore.Timestamp.now(),
    status: "active",
    createdBy: auth.currentUser?.email || "unknown"
  });
}

function getAllWorkers() {
  return db.collection("workers")
    .orderBy("joinDate", "desc")
    .get()
    .then((snapshot) => {
      let workers = [];
      snapshot.forEach((doc) => {
        workers.push({ id: doc.id, ...doc.data() });
      });
      return workers;
    });
}

function getWorkersByCamp(campId) {
  return db.collection("workers")
    .where("campId", "==", campId)
    .where("status", "==", "active")
    .get()
    .then((snapshot) => {
      let workers = [];
      snapshot.forEach((doc) => {
        workers.push({ id: doc.id, ...doc.data() });
      });
      return workers;
    });
}

function updateWorker(workerId, newData) {
  return db.collection("workers").doc(workerId).update(newData);
}

function deleteWorker(workerId) {
  return db.collection("workers").doc(workerId).update({
    status: "inactive",
    deletedAt: firebase.firestore.Timestamp.now()
  });
}

function addCamp(campData) {
  return db.collection("camps").add({
    name: campData.name,
    location: campData.location,
    capacity: campData.capacity,
    managerName: campData.managerName,
    managerPhone: campData.managerPhone,
    currentOccupancy: 0,
    status: "active",
    createdAt: firebase.firestore.Timestamp.now()
  });
}

function getAllCamps() {
  return db.collection("camps")
    .where("status", "==", "active")
    .orderBy("createdAt", "desc")
    .get()
    .then((snapshot) => {
      let camps = [];
      snapshot.forEach((doc) => {
        camps.push({ id: doc.id, ...doc.data() });
      });
      return camps;
    });
}

function updateCamp(campId, newData) {
  return db.collection("camps").doc(campId).update(newData);
}

function deleteCamp(campId) {
  return db.collection("camps").doc(campId).update({
    status: "inactive",
    deletedAt: firebase.firestore.Timestamp.now()
  });
}

function updateCampOccupancy(campId) {
  return db.collection("workers")
    .where("campId", "==", campId)
    .where("status", "==", "active")
    .get()
    .then((snapshot) => {
      const count = snapshot.size;
      return db.collection("camps").doc(campId).update({
        currentOccupancy: count
      });
    });
}
