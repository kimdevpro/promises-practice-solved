export const getFirstResolvedPromise = (promises) => {
  return new Promise((resolve) => {
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then(resolve)        
        .catch(() => {}); 
    });
  });
};

export const getFirstPromiseOrFail = (promises) => {
  return Promise.race(promises);
};

export const getQuantityOfRejectedPromises = (promises) => {
  return Promise.allSettled(promises).then((results) => {
    return results.filter((result) => result.status === 'rejected').length;
  });
};

export const getQuantityOfFulfilledPromises = (promises) => {
  return Promise.allSettled(promises).then((results) => {
    return results.filter((result) => result.status === 'fulfilled').length;
  });
};

//!  ⬇ ⬇ ⬇ ⬇ Don't Edit This Array ⬇ ⬇ ⬇ ⬇
export const allCharacters = [
  { id: 1, name: "billy" },
  { id: 2, name: "mandy" },
  { id: 3, name: "grim" },
];
//! ⬆  ⬆  ⬆  ⬆ do not edit this array   ⬆  ⬆  ⬆  ⬆ ️

//!  ⬇ ⬇ ⬇ ⬇ Don't Edit This Function ⬇ ⬇ ⬇ ⬇
export const fetchCharacterById = (id) => {
  // This function simulates an API, although most api's will return
  // simple data like this quickly, we want you to practice concurrent programming
  // so we're forcing each call to take one second

  const validIds = allCharacters.map((character) => character.id);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!validIds.includes(id))
        reject(`we do not have a character with the id of ${id}`);

      return resolve(allCharacters.find((character) => character.id === id));
    }, 1000);
  });
};
//! ⬆  ⬆  ⬆  ⬆ do not edit this function   ⬆  ⬆  ⬆  ⬆ ️

export const fetchAllCharactersByIds = async (ids) => {
  // To solve this you must fetch all characters passed in the array at the same time
  // use the `fetchCharacterById` function above to make this work
  //*  write code to pass test ⬇ ️
  try {
      const fetchPromises = ids.map((id) => fetchCharacterById(id));
      return await Promise.all(fetchPromises);
  } catch (error) {
      return [];
  }
};
