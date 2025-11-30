// verify-hash.js
// pour l'utiliser dans la console : 
// dans le terminal (1ere argument : hash entre '', 2eme arguement : mdp à comparer entre '')
// node verify-hash.js '$argon2id$v=19$m=65536,t=3,p=4$U8Lkz...etc...' 'P@ssword1234!'
import argon2 from "argon2";

const hashFromDB = process.argv[2];       // le hash stocké en BDD
const passwordCandidate = process.argv[3]; // le mot de passe que tu veux tester

const main = async () => {
  try {
    const isValid = await argon2.verify(hashFromDB, passwordCandidate);
    if (isValid) {
      console.log("✅ Mot de passe correct !");
    } else {
      console.log("❌ Mot de passe incorrect !");
    }
  } catch (err) {
    console.error(err);
  }
};

main();
